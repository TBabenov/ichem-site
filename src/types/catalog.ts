export type CatalogItemType = 'product' | 'service';

export type CatalogItem = {
  id: number;
  type: CatalogItemType;
  name: string;
  category: string | null;
  description: string | null;

  // Stable key (English) for anchors/grouping
  category_en: string | null;

  // Files (may be null until filled)
  photo: string | null;
  pdf_url: string | null;
};

