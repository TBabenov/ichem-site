import { useEffect, useMemo, useState } from 'react';
import { fetchCatalog, type CatalogLang } from '../api/catalog';
import type { CatalogItem } from '../types/catalog';

export type ServicesCatalogState = {
  items: CatalogItem[];
  status: 'idle' | 'loading' | 'success' | 'error';
};

const categoryOrder = [
  'Consulting Services',
  'Acid Stimulation Implementation Support',
  'Blending & Tolling Chemical Development',
  'Technical Training',
] as const;

const categoryIndexMap: Record<string, number> = categoryOrder.reduce((acc, value, idx) => {
  acc[value] = idx;
  return acc;
}, {} as Record<string, number>);

function categorySortIndex(categoryEn: string | null) {
  if (!categoryEn) return Number.MAX_SAFE_INTEGER;
  const idx = categoryIndexMap[categoryEn];
  return typeof idx === 'number' ? idx : Number.MAX_SAFE_INTEGER;
}

export function useServicesCatalog(lang: CatalogLang): ServicesCatalogState {
  const [state, setState] = useState<ServicesCatalogState>({
    items: [],
    status: 'idle',
  });

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setState((s) => ({ ...s, status: 'loading' }));
      try {
        const data = await fetchCatalog(lang);
        const services = data.filter((x) => x.type === 'service');

        services.sort((a, b) => {
          const ai = categorySortIndex(a.category_en);
          const bi = categorySortIndex(b.category_en);
          if (ai !== bi) return ai - bi;
          return a.id - b.id;
        });

        if (!cancelled) {
          setState({ items: services, status: 'success' });
        }
      } catch {
        if (!cancelled) {
          setState((s) => ({ ...s, status: 'error' }));
        }
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [lang]);

  return useMemo(() => state, [state]);
}

