import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { translations } from '../data/translations';
import { ContactForm } from '../components/ContactForm';

interface ProductsPageProps {
  language: 'en' | 'ru';
}

const categories = [
  {
    id: 'oilfieldChemicals',
    name: 'OILFIELD CHEMICALS',
    icon: '/home/images/icons/Production Chemicals.png',
    image: '/home/images/Film-Forming Corrosion Inhibitor.png',
  },
  {
    id: 'acidStimulation',
    name: 'Acid Stimulation Fluid Systems',
    icon: '/home/images/icons/Acid Stimulation.png',
    image: '/home/images/Acid Stimulation Fluid Systems.png',
  },
  {
    id: 'fracturingFluids',
    name: 'Hydraulic Fracturing Fluid Systems',
    icon: '/home/images/icons/Hydraulic Fracturing.png',
    image: '/home/images/Hydraulic Fracturing.png',
  },
  {
    id: 'refineryReagents',
    name: 'Refinery Reagents',
    icon: '/home/images/icons/Downstream Chemicals.png',
    image: '/home/images/Downstream Chemicals.png',
  },
  {
    id: 'basicChemicals',
    name: 'Basic Chemical Supply',
    icon: '/home/images/icons/Basic Chemical.png',
    image: '/home/images/Basic Chemical Supply.png',
  }
];

export const ProductsPage: React.FC<ProductsPageProps> = ({ language }) => {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const t = translations[language].products;
  const productData = translations[language].products.products;

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToCategory = (categoryId: string) => {
    const element = document.getElementById(categoryId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveCategory(categoryId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Navigation */}
      <div className="sticky top-16 z-40 bg-white shadow-md">
        <div className="container mx-auto px-4">
          <nav className="overflow-x-auto">
            <div className="flex space-x-1 py-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => scrollToCategory(category.id)}
                  className={`flex items-center px-4 py-2 rounded-md whitespace-nowrap transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  aria-label={t.categories[category.id as keyof typeof t.categories]}
                >
                  <img
                    src={category.icon}
                    alt={t.categories[category.id as keyof typeof t.categories]}
                    className="w-6 h-6 object-contain mr-2"
                  />
                  <span className="font-medium">
                    {t.categories[category.id as keyof typeof t.categories]}
                  </span>
                </button>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* Product Categories */}
      <div className="container mx-auto px-4 py-12">
        {categories.map((category) => (
          <section
            key={category.id}
            id={category.id}
            className="mb-20 scroll-mt-32"
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Category Header */}
              <div className="relative h-64 md:h-96">
                <img
                  src={category.image}
                  alt={t.categories[category.id as keyof typeof t.categories]}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                  <div className="p-8">
                    <h2 className="text-3xl font-bold text-white mb-4">
                      {t.categories[category.id as keyof typeof t.categories]}
                    </h2>
                    <p className="text-gray-200 max-w-3xl text-lg">
                      {t.categoryDescriptions[category.id as keyof typeof t.categoryDescriptions]}
                    </p>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.id === 'basicChemicals' ? (
                    // Special layout for Basic Chemicals
                    (productData[category.id] || []).map((item, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 rounded-lg p-6 transition-all duration-300 hover:shadow-lg"
                      >
                        <h3 className="text-xl font-semibold mb-3 text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-gray-600 mb-4">{item.description}</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                          {(item.items || []).map((subitem: string, idx: number) => (
                            <li key={idx} className="text-sm">{subitem}</li>
                          ))}
                        </ul>
                      </div>
                    ))
                  ) : (
                    // Standard layout for other categories
                    (productData[category.id] || []).map((item: any, index: number) => (
                      <div
                        key={index}
                        className="bg-gray-900 rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                      >
                        <h3 className="text-xl font-semibold mb-3 text-white">
                          {item.name}
                        </h3>
                        <p className="text-gray-400 mb-4">{item.description}</p>
                  {item.pdfFile && (
                      <a
                        href={`/home/PDF/${item.pdfFile.replace('.pdf', language === 'ru' ? '_ru.pdf' : '.pdf')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-blue-400 font-medium hover:text-blue-300 transition-colors duration-300"
                      >
                        {t.downloadPDFButton}
                      </a>
                  )}
                      </div>
                    ))
                  )}
                </div>

                {/* Contact Section */}
                <div className="mt-12 bg-blue-50 rounded-lg p-8">
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="mb-6 md:mb-0">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Interested in {t.categories[category.id as keyof typeof t.categories]}?
                      </h3>
                      <p className="text-gray-600">
                        Contact our team for detailed information and pricing.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowContactForm(true)}
                      className="bg-blue-600 text-white px-8 py-3 rounded-md transition-all duration-300 hover:bg-blue-700 hover:scale-105"
                    >
                      Contact Us
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:bg-blue-700 hover:scale-110"
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} />
        </button>
      )}

      {/* Contact Form */}
      {showContactForm && (
        <ContactForm
          language={language}
          onClose={() => setShowContactForm(false)}
        />
      )}
    </div>
  );
};
