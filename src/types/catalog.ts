export type CatalogItemType = 'product' | 'service';

export type CatalogItem = {
  id: number;
  type: CatalogItemType;
  name: string;
  category: string | null;
  description: string | null;

  // Stable key (English) for anchors/grouping
  category_en: string | null;

  // Stable key for grouping service positions (from `catalog_items.category`).
  // For services this is the group key; for products it can still be present but category_description is typically null.
  category_key: string | null;

  // Localized description of the service group (may be null for products).
  category_description: string | null;

  // Files (may be null until filled)
  photo: string | null;
  pdf_url: string | null;
};

