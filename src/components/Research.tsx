import React from 'react';
import { Microscope, Lightbulb, Building, Ruler } from 'lucide-react';
import { translations } from '../data/translations';

interface ResearchProps {
  language: 'en' | 'ru';
}

export const Research: React.FC<ResearchProps> = ({ language }) => {
  const t = translations[language].research;
  
  return (
    <section id="research" className="py-20 bg-white">
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-900">
              {t.labTitle}
            </h3>
            <p className="text-gray-600 mb-6">
              {t.labDescription}
            </p>
            
            <div className="space-y-6">
              {t.labFeatures.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="p-2 bg-blue-100 rounded-full mr-4 mt-1">
                    {index === 0 ? (
                      <Microscope size={20} className="text-blue-600" />
                    ) : index === 1 ? (
                      <Lightbulb size={20} className="text-blue-600" />
                    ) : index === 2 ? (
                      <Building size={20} className="text-blue-600" />
                    ) : (
                      <Ruler size={20} className="text-blue-600" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1 text-gray-900">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src="https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Laboratory" 
              className="w-full h-auto"
            />
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              {t.innovationTitle}
            </h3>
            <p className="text-gray-600 max-w-3xl mx-auto">
              {t.innovationDescription}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.innovations.map((innovation, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold mb-3 text-gray-900">
                  {innovation.title}
                </h4>
                <p className="text-gray-600">
                  {innovation.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};