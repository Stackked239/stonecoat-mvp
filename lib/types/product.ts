/**
 * Product catalog and inventory types
 */

/**
 * Product category classifications
 */
export type ProductCategory =
  | 'base-coats'
  | 'top-coats'
  | 'flakes'
  | 'metallic'
  | 'primers'
  | 'tools'
  | 'accessories';

/**
 * Units of measurement for products
 */
export type ProductUnit =
  | 'gallon'
  | 'lb'
  | 'sqft'
  | 'kit'
  | 'each';

/**
 * Product technical specifications
 */
export interface ProductSpecs {
  coverage?: string;
  cureTime?: string;
  mixRatio?: string;
  [key: string]: any;
}

/**
 * Complete product entity with pricing and inventory
 */
export interface Product {
  id: string;
  sku: string;
  name: string;
  category: ProductCategory;
  description: string;
  images: string[];

  // Pricing
  proCost: number;
  retailPrice: number;

  // Inventory
  stockLevel: number;
  unit: ProductUnit;
  reorderLevel: number;

  // Specifications
  specs: ProductSpecs;

  // Categories for filtering
  tags: string[];

  // Metadata
  featured?: boolean;
  newProduct?: boolean;
}

/**
 * Shopping cart line item
 */
export interface CartItem {
  product: Product;
  quantity: number;
  subtotal: number;
}
