export interface ProductSuggestion {
  id: string;
  name: string;
  category: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  products: ProductSuggestion[];
} 