/**
 * Order management and fulfillment types
 */

import { Address } from './common';
import { Product } from './product';

/**
 * Order lifecycle status
 */
export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

/**
 * Order line item with product details
 */
export interface OrderItem {
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

/**
 * Order pricing breakdown
 */
export interface OrderPricing {
  subtotal: number;
  proDiscount: number;
  shipping: number;
  tax: number;
  total: number;
}

/**
 * Shipping details and tracking
 */
export interface ShippingInfo {
  address: Address;
  method: string;
  estimatedDelivery: Date;
  trackingNumber?: string;
}

/**
 * Complete order entity
 */
export interface Order {
  id: string;
  proId: string;
  proName: string;
  projectId?: string; // Link to quote if applicable

  items: OrderItem[];
  pricing: OrderPricing;
  shipping: ShippingInfo;

  status: OrderStatus;

  // Payment (simulated for MVP)
  paymentMethod?: string;

  // Metadata
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;

  // Notes
  notes?: string;
}

/**
 * Order form submission data
 */
export interface OrderFormData {
  shippingStreet: string;
  shippingCity: string;
  shippingState: string;
  shippingZipCode: string;
  shippingMethod: string;
  notes?: string;
}
