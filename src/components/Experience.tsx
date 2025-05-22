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
              Flow Assurance Service covers the entire production system — from reservoir perforation, through wellbores, flowlines, and pipelines, all the way to processing facilities and storage tanks. It ensures the continuous and safe flow of hydrocarbons by identifying and managing risks such as hydrates, wax, asphaltenes, corrosion, scale, and slugging. Using advanced stimulation, monitoring, and chemical strategies, we help optimize production, reduce downtime, and maintain system integrity across the full value chain.
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
              A technique used to enhance oil and gas recovery by injecting acid (typically hydrochloric acid) into the reservoir. The acid dissolves carbonate rock, creating channels that improve fluid flow from the reservoir to the wellbore. This service increases well productivity, reduces formation damage, and is tailored to reservoir conditions for maximum effectiveness.
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
              Well Integrity Chemical Treatment is designed to prevent pipe failures by using targeted chemical solutions to control corrosion, scale, and other degradation processes. These treatments protect downhole and surface piping, extend equipment life, and reduce unplanned shutdowns — ensuring continuous, safe, and efficient well operation.
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