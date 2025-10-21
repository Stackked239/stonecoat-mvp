/**
 * Quote system types for customer requests and pro-created quotes
 */

import { Address } from './common';
import { Pro } from './pro';

/**
 * Quote origin type
 */
export type QuoteType = 'customer-initiated' | 'pro-created';

/**
 * Quote lifecycle status
 */
export type QuoteStatus =
  | 'requested'
  | 'sent'
  | 'accepted'
  | 'declined'
  | 'expired';

/**
 * Supported project types
 */
export type ProjectType =
  | 'garage-floor'
  | 'basement-floor'
  | 'patio'
  | 'commercial-floor'
  | 'countertop'
  | 'driveway'
  | 'pool-deck'
  | 'other';

/**
 * Customer contact information
 */
export interface Customer {
  name: string;
  email: string;
  phone: string;
  address: Address;
}

/**
 * Detailed project specifications
 */
export interface ProjectDetails {
  type: ProjectType;
  squareFootage: number;
  description: string;
  photos?: string[];
  timeline: string;
  preferredFinish?: string;
}

/**
 * Quote line item for material pricing
 */
export interface QuoteLineItem {
  productId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

/**
 * Pricing adjustment for custom pricing
 */
export interface PricingAdjustment {
  reason: string;
  type: 'percentage' | 'fixed';
  value: number;
}

/**
 * Quote pricing breakdown
 */
export interface QuotePricing {
  materials: number;
  labor: number;
  total: number;
  calculatedRate: number; // per sqft
  adjustments: PricingAdjustment[];
}

/**
 * Complete quote entity supporting dual-type quotes
 */
export interface Quote {
  id: string;
  type: QuoteType;
  status: QuoteStatus;

  // Customer information
  customer: Customer;

  // Project details
  project: ProjectDetails;

  // Pricing (if quote has been created)
  pricing?: QuotePricing;

  // If customer-initiated
  matchedPros?: Pro[];

  // If pro-created
  proId?: string;
  proName?: string;

  // Metadata
  createdAt: Date;
  updatedAt: Date;
  expiresAt?: Date;
}

/**
 * Quote form submission data
 */
export interface QuoteFormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  projectType: ProjectType;
  squareFootage: number;
  description: string;
  timeline: string;
  preferredFinish?: string;
}
