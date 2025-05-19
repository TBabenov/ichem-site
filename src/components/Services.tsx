import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { translations } from '../data/translations';
import { ContactForm } from './ContactForm';

interface ServicesProps {
  language: 'en' | 'ru';
}

const services = [
  {
    id: 'consulting',
    name: 'Consulting Services',
    icon: '/images/icons/consulting.png',
    image: '/images/Consulting.png',
    description: 'Our technical experts provide consultation services to identify and solve complex production challenges.',
    features: [
      {
        title: 'Production System Analysis',
        description: 'Comprehensive analysis of production systems to identify bottlenecks and optimization opportunities.'
      },
      {
        title: 'Challenge Identification',
        description: 'Systematic approach to identifying and troubleshooting production issues.'
      },
      {
        title: 'Technology Selection',
        description: 'Expert guidance in selecting and implementing appropriate technologies.'
      },
      {
        title: 'Performance Monitoring',
        description: 'Continuous monitoring and optimization of production processes.'
      }
    ]
  },
  {
    id: 'acid-stimulation',
    name: 'Acid Stimulation Implementation Support',
    icon: '/images/icons/Acid Stimulation.png',
    image: '/images/Acid Stimulation Fluid Systems.png',
    description: '"Innovative Chemicals" provides production enhancement via acid stimulation technologies, employing safe, data-enabled pumping units. Our in-house lab optimizes acid formulations through core-sample analysis and enforces rigorous QC. Our international team delivers turnkey well-treatment solutions.',
    features: [
      {
        title: 'Wellbore Acid Clean-up',
        description: 'Specialized treatments to remove scale, deposits, and damage from the wellbore area.'
      },
      {
        title: 'Matrix Stimulation',
        description: 'Advanced acid treatments to improve near-wellbore permeability and productivity.'
      },
      {
        title: 'Acid Fracturing',
        description: 'High-pressure acid injection to create conductive channels in carbonate formations.'
      },
      {
        title: 'Quality Control',
        description: 'Rigorous testing and monitoring throughout the treatment process.'
      }
    ]
  },
  {
    id: 'blending',
    name: 'Blending & Tolling Chemical Development',
    icon: '/images/icons/Blending.png',
    image: '/images/Blending.png',
    description: '"Innovative Chemicals" offers contract manufacturing under a tolling scheme in stainless-steel mixing vessels, with strict QC at every stage. Production only begins after lab validation and full regulatory compliance.',
    features: [
      {
        title: 'Storage Capacity',
        description: '150 m³ storage capacity for raw materials and finished products.'
      },
      {
        title: 'Blending Facilities',
        description: 'Two 30 m³/day blending reactors for efficient production.'
      },
      {
        title: 'Loading Infrastructure',
        description: 'On-site rail siding for direct loading and efficient logistics.'
      },
      {
        title: 'Warehousing',
        description: 'Warehouse capacity for up to 200 tons of product with proper storage conditions.'
      }
    ]
  },
  {
    id: 'technical-training',
    name: 'Technical Training',
    icon: '/images/icons/training.png',
    image: '/images/Training.png',
    description: 'Specialized training programs to enhance the technical knowledge and skills of client personnel.',
    features: [
      {
        title: 'Chemical Fundamentals',
        description: 'Core chemical principles for oil and gas applications.'
      },
      {
        title: 'Application Training',
        description: 'Specific training modules for different applications.'
      },
      {
        title: 'Laboratory Workshops',
        description: 'Hands-on laboratory training and practical exercises.'
      },
      {
        title: 'Best Practices',
        description: 'Field application best practices and safety protocols.'
      }
    ]
  }
];

export const Services: React.FC<ServicesProps> = ({ language }) => {
  const [activeService, setActiveService] = useState(services[0].id);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

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

  const scrollToService = (serviceId: string) => {
    const element = document.getElementById(serviceId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveService(serviceId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Service Navigation */}
      <div className="sticky top-16 z-40 bg-white shadow-md">
        <div className="container mx-auto px-4">
          <nav className="overflow-x-auto">
            <div className="flex space-x-1 py-4">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => scrollToService(service.id)}
                  className={`flex items-center px-4 py-2 rounded-md whitespace-nowrap transition-all duration-300 ${
                    activeService === service.id
                      ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <img
                    src={service.icon}
                    alt={service.name}
                    className="w-6 h-6 object-contain mr-2"
                  />
                  <span className="font-medium">{service.name}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* Service Sections */}
      <div className="container mx-auto px-4 py-12">
        {services.map((service) => (
          <section
            key={service.id}
            id={service.id}
            className="mb-20 scroll-mt-32"
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Service Header */}
              <div className="relative h-64 md:h-96">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                  <div className="p-8">
                    <h2 className="text-3xl font-bold text-white mb-4">
                      {service.name}
                    </h2>
                    <p className="text-gray-200 max-w-3xl text-lg">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Features Grid */}
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                  {service.features.map((feature, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    >
                      <h3 className="text-xl font-semibold mb-3 text-gray-900">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>

                {/* Contact Section */}
                <div className="mt-12 bg-blue-50 rounded-lg p-8">
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="mb-6 md:mb-0">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Interested in {service.name}?
                      </h3>
                      <p className="text-gray-600">
                        Contact our team to discuss your specific requirements.
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