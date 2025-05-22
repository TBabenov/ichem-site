import React, { useState } from 'react';
import { translations } from '../data/translations';

interface ProductsProps {
  language: 'en' | 'ru';
}

export const Products: React.FC<ProductsProps> = ({ language }) => {
  const t = translations[language].products;
  const [activeCategory, setActiveCategory] = useState(0);
  
  const categories = [
    {
      name: 'OILFIELD CHEMICALS',
      icon: '/home/images/icons/Production Chemicals.png',
      products: [
        {
          name: 'Scale Inhibitors',
          description: 'Prevent mineral scale formation in production equipment and pipelines.'
        },
        {
          name: 'Corrosion Inhibitors',
          description: 'Protect metal surfaces from corrosion in harsh operating environments.'
        },
        {
          name: 'Demulsifiers',
          description: 'Efficiently separate oil and water emulsions to improve production quality.'
        }
      ]
    },
    {
      name: 'Acid Stimulation Fluid Systems',
      icon: '/home/images/icons/Acid Stimulation.png',
      products: [
        {
          name: 'Matrix Acidizing',
          description: 'Enhanced formulations for effective matrix acidizing treatments.'
        },
        {
          name: 'Acid Corrosion Inhibitors',
          description: 'Specialized inhibitors for protecting equipment during acid treatments.'
        },
        {
          name: 'Acid Additives',
          description: 'Comprehensive range of additives to optimize acid stimulation performance.'
        }
      ]
    },
    {
      name: 'Hydraulic Fracturing Fluid Systems',
      icon: '/home/images/icons/Hydraulic Fracturing.png',
      products: [
        {
          name: 'Gelling Agents',
          description: 'Advanced polymers for optimal viscosity control in fracturing fluids.'
        },
        {
          name: 'Friction Reducers',
          description: 'High-performance friction reduction for efficient fluid pumping.'
        },
        {
          name: 'Crosslinkers',
          description: 'Specialized chemicals for enhanced fluid stability and proppant transport.'
        }
      ]
    },
    {
      name: 'Refinery Reagents',
      icon: '/home/images/icons/Downstream Chemicals.png',
      products: [
        {
          name: 'Process Additives',
          description: 'Specialized chemicals for refining and petrochemical processes.'
        },
        {
          name: 'Water Treatment',
          description: 'Solutions for industrial water treatment and management.'
        },
        {
          name: 'Performance Chemicals',
          description: 'Enhanced chemicals for downstream processing efficiency.'
        }
      ]
    },
    {
      name: 'Basic Chemical Supply',
      icon: '/home/images/icons/Basic Chemical.png',
      products: [
        {
          name: 'Industrial Acids',
          description: 'High-quality acids for various industrial applications.'
        },
        {
          name: 'Solvents',
          description: 'Pure and blended solvents for industrial processes.'
        },
        {
          name: 'Base Chemicals',
          description: 'Essential chemicals for industrial operations.'
        }
      ]
    }
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
        
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeCategory === index 
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setActiveCategory(index)}
              >
                <img 
                  src={category.icon} 
                  alt={category.name} 
                  className="w-6 h-6 object-contain"
                />
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories[activeCategory].products.map((product, index) => (
            <div 
              key={index} 
              className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {product.description}
                </p>
                <div className="flex justify-between items-center mt-6">
                  <a 
                    href="#"
                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                  >
                    {t.viewDetailsButton}
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </a>
                  <a 
                    href="#"
                    className="text-gray-600 hover:text-gray-800 font-medium flex items-center"
                  >
                    {t.downloadPDFButton}
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="#"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md transition-colors duration-300 hover:bg-blue-700"
          >
            {t.viewAllProductsButton}
          </a>
        </div>
      </div>
    </section>
  );
};