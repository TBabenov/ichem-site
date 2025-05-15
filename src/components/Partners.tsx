import React from 'react';
import { translations } from '../data/translations';

interface PartnersProps {
  language: 'en' | 'ru';
}

export const Partners: React.FC<PartnersProps> = ({ language }) => {
  const t = translations[language].partners;
  const langCode = language === 'en' ? 'eng' : 'rus';
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            {t.certificationsTitle}
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We maintain the highest standards of quality and safety in all our operations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            <h4 className="text-xl font-semibold mb-4 text-gray-900">ISO 9001</h4>
            <p className="text-gray-600 mb-6">
              Certified quality management system ensuring consistent quality in chemical production, supply, and field service operations.
            </p>
            <a 
              href={`/images/Certificates/ISO_9001_Certificate_${langCode}.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="aspect-[3/4] mb-4 rounded-lg overflow-hidden relative">
                <img 
                  src={`/images/Certificates/ISO_9001_Certificate_${langCode}.png`}
                  alt="ISO 9001 Certificate"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
              </div>
              <span className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                Download Certificate
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </span>
            </a>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            <h4 className="text-xl font-semibold mb-4 text-gray-900">ISO 14001</h4>
            <p className="text-gray-600 mb-6">
              Certified environmental management system supporting sustainable practices in production and well treatment processes.
            </p>
            <a 
              href={`/images/Certificates/ISO_14001_Certificate_${langCode}.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="aspect-[3/4] mb-4 rounded-lg overflow-hidden relative">
                <img 
                  src={`/images/Certificates/ISO_14001_Certificate_${langCode}.png`}
                  alt="ISO 14001 Certificate"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
              </div>
              <span className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                Download Certificate
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </span>
            </a>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            <h4 className="text-xl font-semibold mb-4 text-gray-900">ISO 45001</h4>
            <p className="text-gray-600 mb-6">
              Certified occupational health and safety management system for safe working conditions in manufacturing and field environments.
            </p>
            <a 
              href={`/images/Certificates/ISO_45001_Certificate_${langCode}.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="aspect-[3/4] mb-4 rounded-lg overflow-hidden relative">
                <img 
                  src={`/images/Certificates/ISO_45001_Certificate_${langCode}.png`}
                  alt="ISO 45001 Certificate"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
              </div>
              <span className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                Download Certificate
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};