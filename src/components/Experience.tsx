import React from 'react';
import { translations } from '../data/translations';

interface ExperienceProps {
  language: 'en' | 'ru';
}

export const Experience: React.FC<ExperienceProps> = ({ language }) => {
  const t = translations[language].experience;
  
  return (
    <section id="experience" className="py-20 bg-white">
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-blue-50 p-8 rounded-lg border-l-4 border-blue-600 transition-all duration-300 hover:shadow-lg">
            <div className="mb-6">
              <img 
                src="/home/images/icons/Flow_Assurance_transparent.png" 
                alt="Flow Assurance" 
                className="w-12 h-12"
              />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900">
              {t.areas[0].title}
            </h3>
            <p className="text-gray-600">
              {t.areas[0].description}
            </p>
            <a 
              href="#"
              className="mt-6 inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              {t.learnMoreButton}
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </div>
          
          <div className="bg-blue-50 p-8 rounded-lg border-l-4 border-blue-600 transition-all duration-300 hover:shadow-lg">
            <div className="mb-6">
              <img 
                src="/home/images/icons/Carbonate_Reservoir_Acid_Stimulation.png" 
                alt="Carbonate Reservoir Acid Stimulation" 
                className="w-12 h-12"
              />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900">
              {t.areas[1].title}
            </h3>
            <p className="text-gray-600">
              {t.areas[1].description}
            </p>
            <a 
              href="#"
              className="mt-6 inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              {t.learnMoreButton}
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </div>
          
          <div className="bg-blue-50 p-8 rounded-lg border-l-4 border-blue-600 transition-all duration-300 hover:shadow-lg">
            <div className="mb-6">
              <img 
                src="/home/images/icons/Reduce_Well_Failures_transparent.png" 
                alt="Reduce Well Failures" 
                className="w-12 h-12"
              />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900">
              {t.areas[2].title}
            </h3>
            <p className="text-gray-600">
              {t.areas[2].description}
            </p>
            <a 
              href="#"
              className="mt-6 inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              {t.learnMoreButton}
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};