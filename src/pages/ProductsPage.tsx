import React, { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { translations } from '../data/translations';
import { ContactForm } from '../components/ContactForm';

interface ProductsPageProps {
  language: 'en' | 'ru';
}

type ProductsTranslationCategoryId = keyof typeof translations.en.products.categories;

type ApiCatalogItem = {
  id: number;
  type: 'product' | 'service';
  category: string | null;
  description: string | null;
  name: string;

  // stable fields (used for category anchors/ids)
  category_en: string | null;

  // files (may be null while not filled yet)
  photo: string | null;
  pdf_url: string | null;
};

type FallbackStandardProductCard = {
  name: string;
  description: string;
  pdfFile?: string;
};

type FallbackBasicChemGroup = {
  name: string;
  description: string;
  items: string[];
};

type StandardProductCard = {
  name: string;
  description: string;
  pdfUrl: string | null;
};

type BasicChemGroup = {
  name: string;
  description: string;
  items: string[];
};

function parseBulletsFromDescription(description: string): { paragraph: string; items: string[] } {
  const lines = description
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  const paragraph = lines[0] ?? '';

  const items = lines
    .slice(1)
    .map((l) => l.replace(/^-+\s?/, '').trim())
    .filter(Boolean);

  return { paragraph, items };
}

const productCategories = [
  {
    translationId: 'oilfieldChemicals' as const,
    stableCategoryEn: 'Oilfield Chemicals',
    icon: '/home/images/icons/Production Chemicals.png',
    image: '/home/images/Film-Forming Corrosion Inhibitor.png',
  },
  {
    translationId: 'acidStimulation' as const,
    stableCategoryEn: 'Acid Stimulation Fluid Systems',
    icon: '/home/images/icons/Acid Stimulation.png',
    image: '/home/images/Acid Stimulation Fluid Systems.png',
  },
  {
    translationId: 'fracturingFluids' as const,
    stableCategoryEn: 'Hydraulic Fracturing Fluid Systems',
    icon: '/home/images/icons/Hydraulic Fracturing.png',
    image: '/home/images/Hydraulic Fracturing.png',
  },
  {
    translationId: 'refineryReagents' as const,
    stableCategoryEn: 'Refinery Reagents',
    icon: '/home/images/icons/Downstream Chemicals.png',
    image: '/home/images/Downstream Chemicals.png',
  },
  {
    translationId: 'basicChemicals' as const,
    stableCategoryEn: 'Basic Chemical Supply',
    icon: '/home/images/icons/Basic Chemical.png',
    image: '/home/images/Basic Chemical Supply.png',
  },
];

export const ProductsPage: React.FC<ProductsPageProps> = ({ language }) => {
  const [activeCategory, setActiveCategory] = useState(productCategories[0].stableCategoryEn);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const t = translations[language].products;
  const fallbackProductData = translations[language].products.products;

  // API data (used for product texts only; layout + icons/images preserved)
  const [apiProductItemsByStableKey, setApiProductItemsByStableKey] = useState<Record<string, ApiCatalogItem[]>>({});
  const [apiCategoryLabelsByStableKey, setApiCategoryLabelsByStableKey] = useState<Record<string, string>>({});

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

  const apiBaseUrl =
    import.meta.env.VITE_CATALOG_API_BASE_URL ??
    (import.meta.env.DEV ? 'http://127.0.0.1:8080' : '');

  const resolveCategoryLabel = (stableKey: string, translationId: ProductsTranslationCategoryId) => {
    return apiCategoryLabelsByStableKey[stableKey] ?? t.categories[translationId];
  };

  const resolveBasicChemGroups = (stableKey: string, translationId: ProductsTranslationCategoryId): BasicChemGroup[] => {
    const apiItems = apiProductItemsByStableKey[stableKey];
    if (apiItems && apiItems.length) {
      return apiItems.map((item) => {
        const rawDesc = item.description ?? '';
        const { paragraph, items } = parseBulletsFromDescription(rawDesc);
        return { name: item.name, description: paragraph, items };
      });
    }

    return (fallbackProductData[translationId] as unknown as FallbackBasicChemGroup[]) ?? [];
  };

  const resolveStandardProducts = (
    stableKey: string,
    translationId: ProductsTranslationCategoryId
  ): StandardProductCard[] => {
    const apiItems = apiProductItemsByStableKey[stableKey];
    if (apiItems && apiItems.length) {
      const fallbackByName = new Map<string, string | null>(
        (fallbackProductData[translationId] as unknown as FallbackStandardProductCard[] | undefined)?.map((item) => [
          item.name,
          item.pdfFile ? `/home/PDF/${item.pdfFile}` : null,
        ]) ?? []
      );

      return apiItems.map((item) => ({
        name: item.name,
        description: item.description ?? '',
        // Preserve existing appearance while backend files are still empty.
        pdfUrl: item.pdf_url ?? fallbackByName.get(item.name) ?? null,
      }));
    }

    return (fallbackProductData[translationId] as unknown as FallbackStandardProductCard[]).map((item) => ({
      name: item.name,
      description: item.description,
      pdfUrl: item.pdfFile ? `/home/PDF/${item.pdfFile}` : null,
    }));
  };

  useEffect(() => {
    let cancelled = false;

    const fetchCatalog = async () => {
      try {
        const apiBase = apiBaseUrl.replace(/\/$/, '');
        const url = apiBase ? `${apiBase}/api/catalog?lang=${language}` : `/api/catalog?lang=${language}`;

        const res = await fetch(url, { headers: { Accept: 'application/json' } });
        if (!res.ok) return;

        const data: ApiCatalogItem[] = (await res.json()) as ApiCatalogItem[];
        const productItems = data.filter((x) => x.type === 'product' && x.category_en);

        const nextItemsByStableKey: Record<string, ApiCatalogItem[]> = {};
        const nextLabelsByStableKey: Record<string, string> = {};

        for (const item of productItems) {
          const stableKey = item.category_en as string;
          if (!nextItemsByStableKey[stableKey]) nextItemsByStableKey[stableKey] = [];
          nextItemsByStableKey[stableKey].push(item);

          if (item.category && !nextLabelsByStableKey[stableKey]) {
            nextLabelsByStableKey[stableKey] = item.category;
          }
        }

        for (const stableKey of Object.keys(nextItemsByStableKey)) {
          nextItemsByStableKey[stableKey] = nextItemsByStableKey[stableKey].sort((a, b) => a.id - b.id);
        }

        if (!cancelled) {
          setApiProductItemsByStableKey(nextItemsByStableKey);
          setApiCategoryLabelsByStableKey(nextLabelsByStableKey);
        }
      } catch {
        // Keep fallback if API fails.
      }
    };

    fetchCatalog();

    return () => {
      cancelled = true;
    };
  }, [apiBaseUrl, language]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Navigation */}
      <div className="sticky top-16 z-40 bg-white shadow-md">
        <div className="container mx-auto px-4">
          <nav className="overflow-x-auto">
            <div className="flex space-x-1 py-4">
              {productCategories.map((category) => (
                <button
                  key={category.stableCategoryEn}
                  onClick={() => scrollToCategory(category.stableCategoryEn)}
                  className={`flex items-center px-4 py-2 rounded-md whitespace-nowrap transition-all duration-300 ${
                    activeCategory === category.stableCategoryEn
                      ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  aria-label={resolveCategoryLabel(category.stableCategoryEn, category.translationId)}
                >
                  <img
                    src={category.icon}
                    alt={resolveCategoryLabel(category.stableCategoryEn, category.translationId)}
                    className="w-6 h-6 object-contain mr-2"
                  />
                  <span className="font-medium">
                    {resolveCategoryLabel(category.stableCategoryEn, category.translationId)}
                  </span>
                </button>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* Product Categories */}
      <div className="container mx-auto px-4 py-12">
        {productCategories.map((category) => (
          <section
            key={category.stableCategoryEn}
            id={category.stableCategoryEn}
            className="mb-20 scroll-mt-32"
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Category Header */}
              <div className="relative h-64 md:h-96">
                <img
                  src={category.image}
                  alt={resolveCategoryLabel(category.stableCategoryEn, category.translationId)}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                  <div className="p-8">
                    <h2 className="text-3xl font-bold text-white mb-4">
                      {resolveCategoryLabel(category.stableCategoryEn, category.translationId)}
                    </h2>
                    <p className="text-gray-200 max-w-3xl text-lg">
                      {t.categoryDescriptions[category.translationId]}
                    </p>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.translationId === 'basicChemicals' ? (
                    // Special layout for Basic Chemicals
                    resolveBasicChemGroups(category.stableCategoryEn, category.translationId).map((item) => (
                      <div
                        key={item.name}
                        className="bg-gray-50 rounded-lg p-6 transition-all duration-300 hover:shadow-lg"
                      >
                        <h3 className="text-xl font-semibold mb-3 text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-gray-600 mb-4">{item.description}</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                          {item.items.map((subitem) => (
                            <li key={subitem} className="text-sm">{subitem}</li>
                          ))}
                        </ul>
                      </div>
                    ))
                  ) : (
                    // Standard layout for other categories
                    resolveStandardProducts(category.stableCategoryEn, category.translationId).map((item) => (
                      <div
                        key={item.name}
                        className="bg-gray-900 rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                      >
                        <h3 className="text-xl font-semibold mb-3 text-white">
                          {item.name}
                        </h3>
                        <p className="text-gray-400 mb-4">{item.description}</p>
                        {item.pdfUrl && (
                          <a
                            href={item.pdfUrl}
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
                        {translations[language].products.contact.interested.replace(
                          "{categoryName}",
                          resolveCategoryLabel(category.stableCategoryEn, category.translationId)
                        )}
                      </h3>
                      <p className="text-gray-600">
                        {translations[language].products.contact.description}
                      </p>
                    </div>
                    <button
                      onClick={() => setShowContactForm(true)}
                      className="bg-blue-600 text-white px-8 py-3 rounded-md transition-all duration-300 hover:bg-blue-700 hover:scale-105"
                    >
                      {translations[language].products.contact.button}
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
