import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { translations } from '../data/translations';
import { ContactForm } from './ContactForm';

interface FooterProps {
  language: 'en' | 'ru';
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = translations[language].footer;
  const [showContactForm, setShowContactForm] = useState(false);
  
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <Link to="/" className="flex items-center mb-6">
              <img 
                src="/images/icons/logol.png" 
                alt="Logo" 
                className="h-12 w-auto mr-3"
              />
              <span className="text-xl font-bold text-white">
                Innovative Chemicals
              </span>
            </Link>
            <p className="mb-6 text-blue-100">
              {t.aboutDescription}
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-white hover:text-blue-200 transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="text-white hover:text-blue-200 transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="#" 
                className="text-white hover:text-blue-200 transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                className="text-white hover:text-blue-200 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6">{t.quickLinksTitle}</h3>
            <ul className="space-y-3">
              {t.quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.url} 
                    className="text-blue-100 hover:text-white transition-colors duration-300 block"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6">{t.servicesTitle}</h3>
            <ul className="space-y-3">
              {t.services.map((service, index) => (
                <li key={index}>
                  <Link 
                    to={service.url} 
                    className="text-blue-100 hover:text-white transition-colors duration-300 block"
                  >
                    {service.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Us Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setShowContactForm(true)}
            className="bg-white text-blue-900 px-8 py-3 rounded-md font-semibold transition-all duration-300 hover:bg-blue-50 hover:scale-105 shadow-lg"
          >
            Contact Us Now
          </button>
        </div>
      </div>
      
      <div className="bg-blue-950 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-blue-100 text-sm text-center md:text-left">
              {t.copyright}
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-6">
              {t.footerLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.url} 
                  className="text-blue-100 hover:text-white text-sm transition-colors duration-300"
                >
                  {link.text}
                </a>
              ))}
            </div>
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
    </footer>
  );
};