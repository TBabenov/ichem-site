import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { translations } from '../data/translations';

function generateIdempotencyKey(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    // @ts-expect-error - TS doesn't always know about randomUUID.
    return crypto.randomUUID();
  }
  return `idemp_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

interface ContactFormProps {
  language: 'en' | 'ru' | 'kz';
  onClose: () => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ language, onClose }) => {
  const t = translations[language].contactForm;
  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_V3_SITE_KEY as string | undefined;
  const [idempotencyKey] = useState(() => generateIdempotencyKey());
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    requestType: 'general'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isRecaptchaConfigured, setIsRecaptchaConfigured] = useState<boolean>(!!recaptchaSiteKey);

  useEffect(() => {
    const scriptId = 'recaptcha-script-v3';

    if (!recaptchaSiteKey) {
      setIsRecaptchaConfigured(false);
      return;
    }

    setIsRecaptchaConfigured(true);

    if (document.getElementById(scriptId)) return;

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, [recaptchaSiteKey]);

  const requestTypeMap: Record<string, string> = {
    general: 'general_request',
    product: 'product_request',
    technical: 'technical_support',
    partnership: 'partnership',
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    // 1) Simple validation for required fields
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage(t.requiredFields || 'Пожалуйста, заполните все обязательные поля');
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }
    // 2) Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage(t.invalidEmail || 'Неверный формат email');
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    try {
      // 3) Send via backend API
      if (!recaptchaSiteKey) {
        setErrorMessage(
          language === 'en'
            ? 'Captcha is not configured (missing VITE_RECAPTCHA_V3_SITE_KEY).'
            : language === 'kz'
              ? 'Captcha бапталмаған (VITE_RECAPTCHA_V3_SITE_KEY жоқ).'
              : 'Captcha не настроена (отсутствует VITE_RECAPTCHA_V3_SITE_KEY).'
        );
        setSubmitStatus('error');
        setIsSubmitting(false);
        return;
      }

      const request_type = requestTypeMap[formData.requestType];

      const action = 'submit';
      if (!window.grecaptcha?.execute || !window.grecaptcha?.ready) {
        setErrorMessage(
          language === 'en'
            ? 'Captcha is not ready yet. Please try again.'
            : language === 'kz'
              ? 'Captcha әлі дайын емес. Қайта қайталап көріңіз.'
              : 'Captcha еще не готова. Попробуйте ещё раз.'
        );
        setSubmitStatus('error');
        setIsSubmitting(false);
        return;
      }

      // Wait until reCAPTCHA is ready before requesting a token.
      await new Promise<void>((resolve) => {
        window.grecaptcha?.ready(() => resolve());
      });

      const captchaToken = await window.grecaptcha.execute(recaptchaSiteKey, { action });
      if (!captchaToken) {
        setErrorMessage(
          language === 'en'
            ? 'Captcha token is empty.'
            : language === 'kz'
              ? 'Captcha токені бос.'
              : 'Captcha токен пустой.'
        );
        setSubmitStatus('error');
        setIsSubmitting(false);
        return;
      }

      const payload = {
        idempotency_key: idempotencyKey,
        contact_name: formData.name.trim(),
        company_name: formData.company.trim() ? formData.company.trim() : null,
        phone: formData.phone.trim() ? formData.phone.trim() : null,
        email: formData.email.trim() ? formData.email.trim() : null,
        request_description: formData.message.trim(),
        request_type: request_type ?? undefined,
        captcha_token: captchaToken,
        website_extra_field: '', // honeypot
      };

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (res.ok) {
        setSubmitStatus('success');
        setTimeout(() => onClose(), 2000);
        return;
      }

      if (res.status === 422) {
        setErrorMessage(
          language === 'en'
            ? data?.detail || 'Validation error. Please check your input.'
            : language === 'kz'
              ? 'Жарамсыз деректер. Өтінеміз, енгізуді тексеріңіз.'
              : data?.detail || 'Ошибка валидации. Проверьте поля формы.'
        );
      } else if (res.status === 400) {
        setErrorMessage(
          language === 'en'
            ? data?.detail || 'Captcha validation failed.'
            : language === 'kz'
              ? 'Captcha жарамсыз.'
              : data?.detail || 'Ошибка CAPTCHA.'
        );
      } else if (res.status === 429) {
        setErrorMessage(
          language === 'en'
            ? 'Too many requests. Please try again later.'
            : language === 'kz'
              ? 'Тым көп сұраныс. Кейінірек қайталап көріңіз.'
              : 'Слишком много запросов. Попробуйте позже.'
        );
      } else {
        setErrorMessage(
          language === 'en'
            ? data?.detail || `Request failed (${res.status}).`
            : language === 'kz'
              ? `Сұрау орындалмады (${res.status}).`
              : data?.detail || `Запрос не удался (${res.status}).`
        );
      }

      setSubmitStatus('error');
    } catch (err) {
      console.error('Contact form submit error:', err);
      setSubmitStatus('error');
      setErrorMessage(
        language === 'en'
          ? 'Failed to submit. Please try again later.'
          : language === 'kz'
            ? 'Жіберу мүмкін болмады. Кейінірек қайталап көріңіз.'
            : 'Не удалось отправить сообщение. Попробуйте позже.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{t.title}</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
              disabled={isSubmitting}
            >
              <X size={24} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'en' ? 'Captcha' : language === 'kz' ? 'Captcha' : 'CAPTCHA'}
                </label>
                {!isRecaptchaConfigured ? (
                  <p className="mt-2 text-xs text-red-600">
                    {language === 'en'
                      ? 'Captcha is not configured. Add VITE_RECAPTCHA_V3_SITE_KEY and restart dev server.'
                      : language === 'kz'
                        ? 'Captcha бапталмаған. VITE_RECAPTCHA_V3_SITE_KEY қосып, dev серверді қайта іске қосыңыз.'
                        : 'Captcha не настроена. Добавьте VITE_RECAPTCHA_V3_SITE_KEY и перезапустите dev-сервер.'}
                  </p>
                ) : null}
              </div>
              <div>
                <label htmlFor="requestType" className="block text-sm font-medium text-gray-700 mb-1">
                  {t.requestTypeLabel}
                </label>
                <select
                  id="requestType"
                  name="requestType"
                  value={formData.requestType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={isSubmitting}
                >
                  <option value="general">{t.requestTypes.general}</option>
                  <option value="product">{t.requestTypes.product}</option>
                  <option value="technical">{t.requestTypes.technical}</option>
                  <option value="partnership">{t.requestTypes.partnership}</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  {t.nameLabel}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  {t.emailLabel}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  {t.phoneLabel}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  {t.companyLabel}
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  {t.messageLabel}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={isSubmitting}
                ></textarea>
              </div>
            </div>
            
            {submitStatus === 'error' && (
              <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                {errorMessage}
              </div>
            )}
            
            {submitStatus === 'success' && (
              <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
                {t.successMessage}
              </div>
            )}
            
            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md mr-4 transition-colors duration-300 hover:bg-gray-300"
                disabled={isSubmitting}
              >
                {t.cancelButton}
              </button>
              <button
                type="submit"
                className={`bg-blue-600 text-white px-6 py-2 rounded-md transition-all duration-300 ${
                  isSubmitting 
                    ? 'opacity-75 cursor-not-allowed' 
                    : 'hover:bg-blue-700'
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : t.submitButton}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};