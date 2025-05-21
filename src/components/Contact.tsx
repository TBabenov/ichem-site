import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { translations } from '../data/translations';
import { ContactForm } from './ContactForm';

interface ContactProps {
  language: 'en' | 'ru';
  onContactClick: () => void;
}

export const Contact: React.FC<ContactProps> = ({ language, onContactClick }) => {
  const t = translations[language].contact;
  const [showContactForm, setShowContactForm] = useState(false);
  
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            {t.title}
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-6 text-gray-900">Office Address</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="p-2 bg-blue-100 rounded-full mr-4">
                  <MapPin size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Production Base</p>
                  <p className="text-gray-600">Aktau city, Industrial Zone No. 3, ICHEM Industrial Base</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-6 text-gray-900">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="p-2 bg-blue-100 rounded-full mr-4">
                  <Mail size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Operations Director</p>
                  <p className="text-gray-600">Abylaikhan Sissenov</p>
                  <a href="mailto:Asissenov@ichem.kz" className="text-blue-600 hover:text-blue-800">Asissenov@ichem.kz</a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="p-2 bg-blue-100 rounded-full mr-4">
                  <Mail size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Director</p>
                  <p className="text-gray-600">Almas Istayev</p>
                  <a href="mailto:almas.istayev@ichem.kz" className="text-blue-600 hover:text-blue-800">almas.istayev@ichem.kz</a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="p-2 bg-blue-100 rounded-full mr-4">
                  <Clock size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Working Hours</p>
                  <p className="text-gray-600">Mon – Fri: 9:00 AM to 6:00 PM</p>
                  <p className="text-gray-600">Sat – Sun: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-sm mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2 text-gray-900">
                {t.contactFormTitle}
              </h3>
              <p className="text-gray-600">
                {t.contactFormDescription}
              </p>
            </div>
            <button 
              onClick={() => setShowContactForm(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-md transition-colors duration-300 hover:bg-blue-700"
            >
              {t.contactFormButton}
            </button>
          </div>
        </div>
        
        <div className="rounded-lg overflow-hidden shadow-md">
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <a 
              href="https://yandex.kz/maps/org/innovative_chemical/65109311870/?utm_medium=mapframe&utm_source=maps" 
              style={{ color: '#eee', fontSize: '12px', position: 'absolute', top: '0px' }}
            >
              Innovative Chemicals
            </a>
            <a 
              href="https://yandex.kz/maps/29414/mangystau-district/category/industrial_chemistry/184107024/?utm_medium=mapframe&utm_source=maps" 
              style={{ color: '#eee', fontSize: '12px', position: 'absolute', top: '14px' }}
            >
              Промышленная химия в Мангистауской области
            </a>
            <a 
              href="https://yandex.kz/maps/29414/mangystau-district/category/warehouse/160816688334/?utm_medium=mapframe&utm_source=maps" 
              style={{ color: '#eee', fontSize: '12px', position: 'absolute', top: '28px' }}
            >
              Склад в Мангистауской области
            </a>
            <iframe 
              src="https://yandex.kz/map-widget/v1/org/innovative_chemical/65109311870/?ll=51.207141%2C43.674320&z=17" 
              width="100%" 
              height="450" 
              frameBorder="1" 
              allowFullScreen={true} 
              style={{ position: 'relative' }}
              title="Innovative Chemicals Location"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <ContactForm 
          language={language}
          onClose={() => setShowContactForm(false)}
        />
      )}
    </section>
  );
};