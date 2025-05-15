import React from 'react';
import { translations } from '../data/translations';

interface AboutProps {
  language: 'en' | 'ru';
}

export const About: React.FC<AboutProps> = ({ language }) => {
  const t = translations[language].about;
  
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            {t.title}
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative rounded-lg overflow-hidden shadow-xl">
            <video 
              className="w-full aspect-video object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="/images/background_main.jpg"
            >
              <source src="/images/about.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          
          <div>
            <p className="text-lg text-gray-600 mb-8">
              We are an oilfield service company that develops and manufactures production chemical solutions and acid stimulation fluid systems. We support our products with pumping services at the worksite.
              Our innovative chemical solutions significantly enhance well productivity and reduce operational costs at all stages of oil and gas extraction, processing, and transportation. We are committed to increasing value for our clients by delivering efficient, reliable, and advanced technologies.
            </p>
            
            <div className="space-y-6">
              {t.cards.map((card, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    {card.title}
                  </h3>
                  <p className="text-gray-600">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};