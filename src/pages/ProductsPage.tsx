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
    icon: '/images/icons/Production Chemicals.png',
    image: '/images/Film-Forming Corrosion Inhibitor.png',
    products: [
      {
        name: 'Demulsifier (ICD)',
        description: 'Highly effective reagents for rapid and thorough water and oil separation. Ensures stable performance at all stages of oil treatment by breaking persistent emulsions and improving dehydration.',
        pdf: '/images/PDF/Demulsifier (ICD).pdf'
      },
      {
        name: 'Wax Inhibitor (IC Wax)',
        description: 'Reliable protection of equipment and pipelines from paraffin deposits. Effective at low dosages and particularly suitable for crude oil from the western regions of Kazakhstan.',
        pdf: '/images/PDF/Wax Inhibitor (IC Wax).pdf'
      },
      {
        name: 'Corrosion Inhibitor (ICC)',
        description: 'Comprehensive protection against all types of corrosion, including acid corrosion. Enhances reliability and extends the service life of pipeline and processing systems.',
        pdf: '/images/PDF/Corrosion Inhibitor (ICC).pdf'
      },
      {
        name: 'Hydrate Formation Inhibitor (IC Git)',
        description: 'Prevents the formation of hydrates in gas and oil pipelines. Ensures uninterrupted transportation of hydrocarbons even at low temperatures.',
        pdf: '/images/PDF/Hydrate Formation Inhibitor (IC Git).pdf'
      },
      {
        name: 'Biocide (ICB)',
        description: 'Alternative formula based on THPS, glutaraldehyde, and QAC. Quickly suppresses bacterial activity, including SRB, ensuring sanitary safety of systems.',
        pdf: '/images/PDF/Biocide (ICB).pdf'
      },
      {
        name: 'Hydrogen Sulfide Scavenger (ICH)',
        description: 'Effective solution for neutralizing H₂S in liquids and gas. Protects personnel, equipment, and the environment from toxic effects.',
        pdf: '/images/PDF/Hydrogen Sulfide Scavenger (ICH)_empty.pdf'
      },
      {
        name: 'Scale Inhibitor (ICS)',
        description: 'Prevents the formation of carbonates, sulfates, and other mineral deposits. Maintains equipment cleanliness and process efficiency.',
        pdf: '/images/PDF/Scale Inhibitor (ICS).pdf'
      },
      {
        name: 'Flocculant (ICF)',
        description: 'Optimizes the settling of mechanical impurities in formation water. Improves filtration and purification performance.',
        pdf: '/images/PDF/Flocculant (ICF).pdf'
      },
      {
        name: 'Drag Reducing Agent (IC DRA)',
        description: 'Reduces hydraulic resistance and increases pipeline throughput. We also offer pumping equipment and technical support.',
        pdf: '/images/PDF/Drag Reducing Agent (IC DRA).pdf'
      },
      {
        name: 'Defoamer (IC Foam)',
        description: 'Reliable solution against foaming at all stages of oil refining. Effective at minimal dosages.',
        pdf: '/images/PDF/Defoamer (IC Foam).pdf'
      },
      {
        name: 'Pour Point Depressant (IC Depr)',
        description: 'Lowers pour point and viscosity of crude oil. Ensures stable pumping even in harsh climatic conditions.',
        pdf: '/images/PDF/Pour Point Depressant (IC Depr)_empty.pdf'
      },
      {
        name: 'Oxygen Scavenger (ICO)',
        description: 'Removes dissolved oxygen from water and process fluids, preventing oxidation and corrosion of equipment.',
        pdf: '/images/PDF/Oxygen Scavenger (ICO).pdf'
      },
      {
        name: 'Coagulant (IC Coagulant)',
        description: 'Ensures effective clarification and treatment of production water at oil fields. Ideal for preparing water for reuse.',
        pdf: '/images/PDF/Coagulant (IC Coagulant).pdf'
      }
    ]
  },
  {
    id: 'acidStimulation',
    name: 'Acid Stimulation Fluid Systems',
    icon: '/images/icons/Acid Stimulation.png',
    image: '/images/Acid Stimulation Fluid Systems.png',
    products: [
      {
        name: 'Acid Corrosion Inhibitor (CorroX)',
        description: 'Provides equipment protection from acid corrosion under low and medium temperature conditions.'
      },
      {
        name: 'Acid Corrosion Inhibitor (CorroX HT)',
        description: 'Protects equipment from acid corrosion under high-temperature conditions.'
      },
      {
        name: 'Iron Stabilizer (IronFix)',
        description: 'Maintains iron ions in dissolved form, preventing contamination of oil and water with iron sediments and blocking of pore throats.'
      },
      {
        name: 'Demulsifier (SurfPro)',
        description: 'Prevents formation of stable emulsions during interaction of acid solutions with reservoir fluids in the near-wellbore zone.'
      },
      {
        name: 'Anti-Sludge (Surfactant Dispersant) (SludgeX)',
        description: 'Prevents deposition of heavy oil fractions, minimizes the risk of formation damage, and enhances acid penetration into rock matrix.'
      },
      {
        name: 'Hydrogen Sulfide Scavenger (SulfurX)',
        description: 'Neutralizes H₂S, forming safe compounds and creating a protective film on metal surfaces; prevents corrosion and improves safety during acid treatments.'
      },
      {
        name: 'Chelating Agent (CA Agent)',
        description: 'Binds and removes metal ions (Ca²⁺, Mg²⁺, Fe³⁺), preventing scale and corrosion; maintains chemical stability of treatment fluids.'
      },
      {
        name: 'Chemical Diverter (IC-VES)',
        description: 'Viscoelastic surfactant-based diverter, effectively controls acid loss in high-permeability interbeds.'
      },
      {
        name: 'Retarded Acid (Retarded Acid)',
        description: 'Slows acid reaction rate in high-temperature wells, reducing corrosion and maintaining optimal rock dissolution.'
      },
      {
        name: 'Asphaltene/Wax Solvent (IC Solvent)',
        description: 'Selects optimal solvent for specific asphaltene/paraffin compositions, improving viscosity and flowback.'
      }
    ]
  },
  {
    id: 'fracturingFluids',
    name: 'Hydraulic Fracturing Fluid Systems',
    icon: '/images/icons/Hydraulic Fracturing.png',
    image: '/images/Hydraulic Fracturing.png',
    products: [
      {
        name: 'Gelling Agent (ICG)',
        description: 'Forms a strong, stable gel base for proppant transport.'
      },
      {
        name: 'Clay Stabilizer (IC Clay)',
        description: 'Prevents swelling and dispersion of clay minerals, protecting formation permeability.'
      },
      {
        name: 'Demulsifier (ICD-40)',
        description: 'Prevents stable emulsion formation between fracturing fluid and formation fluids.'
      },
      {
        name: 'Biocide (ICB-40G)',
        description: 'Rapidly disinfects system by inhibiting anaerobic and sulfate-reducing bacteria.'
      },
      {
        name: 'Crosslinker (Fast) (CLF-1)',
        description: 'Water-soluble agent that quickly creates a three-dimensional gel structure.'
      },
      {
        name: 'Crosslinker (Delayed) (CLD-2)',
        description: 'Suspension that delays gelation for controlled proppant transport.'
      },
      {
        name: 'Breaker (Oxidative) (BO-1)',
        description: 'Oxidative agent that reduces gel viscosity post-treatment.'
      },
      {
        name: 'Breaker (Enzymatic) (BE-2)',
        description: 'Biodegradable enzyme that gently degrades gel for flowback.'
      }
    ]
  },
  {
    id: 'refineryReagents',
    name: 'Refinery Reagents',
    icon: '/images/icons/Downstream Chemicals.png',
    image: '/images/Downstream Chemicals.png',
    products: [
      {
        name: 'Film-Forming Corrosion Inhibitor (IC-REF-Cor)',
        description: 'Forms a durable protective film on atmospheric distillation equipment.'
      },
      {
        name: 'Neutralizing Amines (IC-REF-Amine)',
        description: 'Neutralizes acidic components (HCl, H₂S) in refining columns.'
      },
      {
        name: 'Cold Flow Improver Additive (IC-REF-Flow)',
        description: 'Lowers pour point and improves diesel flowability at low temperatures.'
      },
      {
        name: 'Lubricity Additive (IC-REF-Lube)',
        description: 'Enhances lubricity of fuel systems, reducing wear.'
      },
      {
        name: 'Demulsifier (IC-REF-Dem)',
        description: 'Ensures efficient separation of water-oil emulsions during crude processing.'
      },
      {
        name: 'Defoamer (IC-REF-Defoam)',
        description: 'Suppresses foam in refinery process streams.'
      },
      {
        name: 'Amine System Defoamer (IC-REF-DefoamA)',
        description: 'Prevents foam in amine gas treatment units under CO₂/H₂S.'
      },
      {
        name: 'Coke Inhibitor (IC-REF-Coke)',
        description: 'Inhibits coke formation on internal refinery surfaces.'
      }
    ]
  },
  {
    id: 'basicChemicals',
    name: 'Basic Chemical Supply',
    icon: '/images/icons/Basic Chemical.png',
    image: '/images/Basic Chemical Supply.png',
    products: [
      {
        name: 'Glycols',
        description: 'MEG, DEG, TEG, and PEG for various applications including gas dehydration and antifreeze.',
        items: ['Monoethylene Glycol (MEG)', 'Diethylene Glycol (DEG)', 'Triethylene Glycol (TEG)', 'Polyethylene Glycol (PEG)']
      },
      {
        name: 'Amines',
        description: 'Various amines for gas treatment and acid neutralization.',
        items: ['Monoethanolamine (MEA)', 'Diethanolamine (DEA)', 'Triethanolamine (TEA)']
      },
      {
        name: 'Acids',
        description: 'High-quality acids for various industrial applications.',
        items: ['Citric Acid', 'Hydrochloric Acid (up to 15%)', 'Hydrofluoric Acid (HF)', 'Formic Acid', 'Acetic Acid']
      },
      {
        name: 'Scale & Corrosion Inhibitors',
        description: 'Specialized chemicals for scale prevention and corrosion protection.',
        items: ['NTA (Nitrilotriacetic Acid)', 'HEDP', 'Imidazolines']
      },
      {
        name: 'Solvents',
        description: 'Various solvents for cleaning and process applications.',
        items: ['Toluene', 'Xylene', 'Nefras']
      },
      {
        name: 'Biocides',
        description: 'Effective solutions for bacterial control.',
        items: ['Glutaraldehyde 50%', 'THPS', 'Formalin/Formaldehyde']
      },
      {
        name: 'Specialty Chemicals',
        description: 'Additional chemicals for specific applications.',
        items: ['Triazine', 'ABS Acid', 'Neonol', 'Polyethers']
      }
    ]
  }
];

export const ProductsPage: React.FC<ProductsPageProps> = ({ language }) => {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const t = translations[language].products;

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
                    category.products.map((group, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 rounded-lg p-6 transition-all duration-300 hover:shadow-lg"
                      >
                        <h3 className="text-xl font-semibold mb-3 text-gray-900">
                          {group.name}
                        </h3>
                        <p className="text-gray-600 mb-4">{group.description}</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                          {group.items.map((item, idx) => (
                            <li key={idx} className="text-sm">{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))
                  ) : (
                    // Standard layout for other categories
                    category.products.map((product, index) => (
                      <div
                        key={index}
                        className="bg-gray-900 rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                      >
                        <h3 className="text-xl font-semibold mb-3 text-white">
                          {product.name}
                        </h3>
                        <p className="text-gray-400 mb-4">{product.description}</p>
                        <a 
                          href={product.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block text-blue-400 font-medium hover:text-blue-300 transition-colors duration-300"
                        >
                          {t.viewDetailsButton} →
                        </a>
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
