import React, { useState } from 'react';
import { X } from 'lucide-react';
import { translations } from '../data/translations';
import emailjs from '@emailjs/browser';
// Initialize EmailJS with your User ID (replace 'user_xxxYYYzzz' with your actual User ID from EmailJS)
const EMAILJS_USER_ID = 'Y9NG-L4rcbqvQmAwD';

emailjs.init(EMAILJS_USER_ID);

interface ContactFormProps {
  language: 'en' | 'ru' | 'kz';
  onClose: () => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ language, onClose }) => {
  const t = translations[language].contactForm;
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

    // 3) Send via EmailJS
    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      message: formData.message,
      requestType: formData.requestType,
      language,
      timestamp: new Date().toISOString()
    };

    try {
      console.log('> EmailJS: отправляем данные', templateParams);
      await emailjs.send(
        'service_ichem_mail',       // <-- Your Service ID from EmailJS
        'template_ichem_email',   // <-- Your Template ID from EmailJS
        templateParams
      );
      console.log('> EmailJS: вызов emailjs.send завершён успешно');
      setSubmitStatus('success');
      setTimeout(() => onClose(), 2000);
    } catch (err) {
      console.error('EmailJS send error:', err);
      setSubmitStatus('error');
      setErrorMessage('Не удалось отправить сообщение. Попробуйте позже.');
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