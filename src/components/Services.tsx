import React, { useState, useEffect, useMemo } from 'react';
import { ChevronUp } from 'lucide-react';
import { translations } from '../data/translations';
import { ContactForm } from './ContactForm';
import { assetUrl } from '../utils/assets';
import { useServicesCatalog } from '../hooks/useServicesCatalog';
import type { CatalogLang } from '../api/catalog';

interface ServicesProps {
  language: 'en' | 'ru';
}

const GROUP_ORDER = [
  'Consulting Services',
  'Acid Stimulation Implementation Support',
  'Blending & Tolling Chemical Development',
  'Technical Training',
] as const;


export const Services: React.FC<ServicesProps> = ({ language }) => {
  const fallbackServiceData = translations[language].services.items;
  const serviceContact = translations[language].services.contact;

  type Feature = { title: string; description: string };
  type ServiceUI = {
    key: string;
    domId: string;
    name: string;
    description: string;
    categoryEn: string;
    categoryLabel: string;
    features: Feature[];
  };

  const legacyServiceIdToCategoryEn = (legacyId: string): string => {
    switch (legacyId) {
      case 'consulting':
        return 'Consulting Services';
      case 'acid-stimulation':
        return 'Acid Stimulation Implementation Support';
      case 'blending':
        return 'Blending & Tolling Chemical Development';
      case 'technical-training':
        return 'Technical Training';
      default:
        return '';
    }
  };

  const normalizeLegacyServices = (items: typeof fallbackServiceData): ServiceUI[] => {
    return items.map((s) => ({
      key: s.id,
      domId: `service-${s.id}`,
      name: s.name,
      description: s.description,
      categoryEn: legacyServiceIdToCategoryEn(s.id),
      categoryLabel: s.name,
      features: (s.features || []) as Feature[],
    }));
  };

  const api = useServicesCatalog(language as CatalogLang);

  const legacyServicesForUI = useMemo(
    () => normalizeLegacyServices(fallbackServiceData),
    // fallbackServiceData is derived from language prop
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [language]
  );

  const apiServicesForUI = useMemo<ServiceUI[]>(
    () =>
      api.items.map((s) => ({
        key: String(s.id),
        domId: `service-${s.id}`,
        name: s.name,
        description: s.description ?? '',
        categoryEn: s.category_en ?? '',
        categoryLabel: s.category ?? s.category_en ?? '',
        features: s.features ?? [],
      })),
    [api.items]
  );

  const servicesForUI: ServiceUI[] =
    api.status === 'success' && api.items.length ? apiServicesForUI : legacyServicesForUI;

  const groupedByCategory = useMemo(() => {
    const map: Record<string, { label: string; services: ServiceUI[] }> = {};
    for (const s of servicesForUI) {
      const key = s.categoryEn || '';
      if (!map[key]) map[key] = { label: s.categoryLabel, services: [] };
      map[key].services.push(s);
      // prefer existing label (should be identical within group)
      if (!map[key].label) map[key].label = s.categoryLabel;
    }
    return map;
  }, [servicesForUI]);

  const firstGroupKey = GROUP_ORDER.find((k) => groupedByCategory[k]?.services?.length) ?? GROUP_ORDER[0];
  const [activeGroupKey, setActiveGroupKey] = useState<string>(firstGroupKey);

  useEffect(() => {
    if (!GROUP_ORDER.some((k) => k === activeGroupKey && groupedByCategory[k]?.services?.length)) {
      const next = GROUP_ORDER.find((k) => groupedByCategory[k]?.services?.length) ?? GROUP_ORDER[0];
      setActiveGroupKey(next);
    }
  }, [groupedByCategory, activeGroupKey]);

  const servicesInActiveGroup = groupedByCategory[activeGroupKey]?.services ?? [];
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

  const scrollToService = (service: ServiceUI) => {
    const element = document.getElementById(service.domId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToFirstServiceInGroup = (groupKey: string) => {
    const first = groupedByCategory[groupKey]?.services?.[0];
    if (first) scrollToService(first);
  };

  const getServiceIcon = (categoryEn: string) => {
    switch (categoryEn) {
      case 'Consulting Services':
        return assetUrl('images/icons/consulting.png');
      case 'Acid Stimulation Implementation Support':
        return assetUrl('images/icons/Acid Stimulation.png');
      case 'Blending & Tolling Chemical Development':
        return assetUrl('images/icons/Blending.png');
      case 'Technical Training':
        return assetUrl('images/icons/training.png');
      default:
        return assetUrl('images/icons/consulting.png');
    }
  };

  const getServiceHero = (categoryEn: string) => {
    switch (categoryEn) {
      case 'Consulting Services':
        return assetUrl('images/Consulting.png');
      case 'Acid Stimulation Implementation Support':
        return assetUrl('images/Acid Stimulation Fluid Systems.png');
      case 'Blending & Tolling Chemical Development':
        return assetUrl('images/Blending.png');
      case 'Technical Training':
        return assetUrl('images/Training.png');
      default:
        return assetUrl('images/Consulting.png');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Service Navigation */}
      <div className="sticky top-16 z-40 bg-white shadow-md">
        <div className="container mx-auto px-4">
          <nav className="overflow-x-auto">
            <div className="flex space-x-1 py-4">
              {GROUP_ORDER.map((groupKey) => (
                <button
                  key={groupKey}
                  onClick={() => {
                    setActiveGroupKey(groupKey);
                    if (groupKey === 'Blending & Tolling Chemical Development') {
                      setShowContactForm(true);
                    }
                    scrollToFirstServiceInGroup(groupKey);
                  }}
                  className={`flex items-center px-4 py-2 rounded-md whitespace-nowrap transition-all duration-300 ${
                    activeGroupKey === groupKey
                      ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <img
                    src={getServiceIcon(groupKey)}
                    alt={groupedByCategory[groupKey]?.label ?? groupKey}
                    className="w-6 h-6 object-contain mr-2"
                  />
                  <span className="font-medium">{groupedByCategory[groupKey]?.label ?? groupKey}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* Service Sections */}
      <div className="container mx-auto px-4 py-12">
        {servicesInActiveGroup.map((service) => (
          <section
            key={service.key}
            id={service.domId}
            className="mb-20 scroll-mt-32"
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Service Header */}
              <div className="relative h-64 md:h-96">
                <img
                  src={getServiceHero(service.categoryEn)}
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
                  {service.features.map((feature) => (
                    <div
                      key={feature.title}
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
                        {serviceContact.interested.replace("{serviceName}", service.name)}
                      </h3>
                      <p className="text-gray-600">
                        Contact our team to discuss your specific requirements.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowContactForm(true)}
                      className="bg-blue-600 text-white px-8 py-3 rounded-md transition-all duration-300 hover:bg-blue-700 hover:scale-105"
                    >
                      {serviceContact.button}
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