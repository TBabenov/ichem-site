import type { CatalogItem } from '../types/catalog';
import { getJson } from './http';

export type CatalogLang = 'en' | 'ru' | 'kz' | 'kk' | 'kaz';

export async function fetchCatalog(lang: CatalogLang): Promise<CatalogItem[]> {
  return await getJson<CatalogItem[]>(`/api/catalog?lang=${encodeURIComponent(lang)}`);
}

