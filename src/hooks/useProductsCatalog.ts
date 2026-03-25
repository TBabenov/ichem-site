import { useEffect, useMemo, useState } from 'react';
import { fetchCatalog, type CatalogLang } from '../api/catalog';
import type { CatalogItem } from '../types/catalog';

export type ProductsCatalogState = {
  itemsByStableCategoryEn: Record<string, CatalogItem[]>;
  labelByStableCategoryEn: Record<string, string>;
  status: 'idle' | 'loading' | 'success' | 'error';
};

export function useProductsCatalog(lang: CatalogLang): ProductsCatalogState {
  const [state, setState] = useState<ProductsCatalogState>({
    itemsByStableCategoryEn: {},
    labelByStableCategoryEn: {},
    status: 'idle',
  });

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setState((s) => ({ ...s, status: 'loading' }));
      try {
        const data = await fetchCatalog(lang);
        const products = data.filter((x) => x.type === 'product' && x.category_en);

        const itemsByStableCategoryEn: Record<string, CatalogItem[]> = {};
        const labelByStableCategoryEn: Record<string, string> = {};

        for (const item of products) {
          const stableKey = item.category_en as string;
          if (!itemsByStableCategoryEn[stableKey]) itemsByStableCategoryEn[stableKey] = [];
          itemsByStableCategoryEn[stableKey].push(item);

          if (item.category && !labelByStableCategoryEn[stableKey]) {
            labelByStableCategoryEn[stableKey] = item.category;
          }
        }

        for (const stableKey of Object.keys(itemsByStableCategoryEn)) {
          itemsByStableCategoryEn[stableKey] = itemsByStableCategoryEn[stableKey].sort((a, b) => a.id - b.id);
        }

        if (!cancelled) {
          setState({
            itemsByStableCategoryEn,
            labelByStableCategoryEn,
            status: 'success',
          });
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

