import React, { useState } from 'react';
import { translations } from '../data/translations';

interface ProductsProps {
  language: 'en' | 'ru';
}

export const Products: React.FC<ProductsProps> = ({ language }) => {
  const t = translations[language].products;
  const [activeCategory, setActiveCategory] = useState('oilfieldChemicals');
  
  const categories = [
    {
      id: 'oilfieldChemicals',
      name: t.categories.oilfieldChemicals,
      icon: '/images/icons/Production Chemicals.png',
      image: '/images/Film-Forming Corrosion Inhibitor.png',
      description: t.categoryDescriptions.oilfieldChemicals
    }
    // Other categories...
  ];

  return (
    <section id="products" className="py-20 bg-white">
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.products.oilfieldChemicals.map((product, index) => (
            <div 
              key={index} 
              className="bg-gray-900 rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold mb-3 text-white">
                {product.name}
              </h3>
              <p className="text-gray-400 mb-4">
                {product.description}
              </p>
              <a 
                href={`/images/PDF/${language === 'ru' ? product.pdfFileRu : product.pdfFile}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-blue-400 font-medium hover:text-blue-300 transition-colors duration-300"
                download
              >
                {t.viewDetailsButton} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};