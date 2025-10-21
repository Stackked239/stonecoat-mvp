/**
 * Pricing calculations and utilities
 */

import { QuoteLineItem } from '@/lib/types';

/**
 * Pricing brackets based on median income analysis
 */
interface LaborRateSuggestion {
  min: number;
  recommended: number;
  max: number;
}

/**
 * Get suggested labor rate based on zip code median income
 * Uses validated pricing brackets from market analysis
 *
 * @param medianIncome - Median household income for the zip code
 * @returns Labor rate suggestions (min, recommended, max) per square foot
 */
export function getSuggestedLaborRate(medianIncome: number): LaborRateSuggestion {
  // Boundary validation - handle edge cases
  if (medianIncome < 20000) {
    return { min: 2.0, recommended: 2.5, max: 3.0 };
  }
  if (medianIncome > 200000) {
    return { min: 5.0, recommended: 6.0, max: 8.0 };
  }

  // Income brackets with validated pricing
  if (medianIncome < 40000) {
    // Lower income area
    return { min: 2.0, recommended: 2.75, max: 3.5 };
  } else if (medianIncome >= 40000 && medianIncome < 60000) {
    // Middle income area
    return { min: 2.5, recommended: 3.5, max: 4.5 };
  } else if (medianIncome >= 60000 && medianIncome < 100000) {
    // Upper-middle income
    return { min: 3.0, recommended: 4.0, max: 5.5 };
  } else {
    // High income area
    return { min: 4.0, recommended: 5.0, max: 7.0 };
  }
}

/**
 * Calculate line item total with proper rounding
 *
 * @param quantity - Number of units
 * @param unitPrice - Price per unit
 * @returns Total price rounded to 2 decimal places
 */
export function calculateLineItemTotal(quantity: number, unitPrice: number): number {
  const total = quantity * unitPrice;
  return Math.round(total * 100) / 100; // Floating-point rounding fix
}

/**
 * Calculate subtotal from line items
 *
 * @param lineItems - Array of quote line items
 * @returns Subtotal rounded to 2 decimal places
 */
export function calculateSubtotal(lineItems: QuoteLineItem[]): number {
  const subtotal = lineItems.reduce((sum, item) => sum + item.totalPrice, 0);
  return Math.round(subtotal * 100) / 100;
}

/**
 * Calculate sales tax
 *
 * @param subtotal - Subtotal amount
 * @param taxRate - Tax rate (default 0.07 for Florida 7%)
 * @returns Tax amount rounded to 2 decimal places
 */
export function calculateSalesTax(subtotal: number, taxRate: number = 0.07): number {
  const tax = subtotal * taxRate;
  return Math.round(tax * 100) / 100;
}

/**
 * Calculate total with tax and shipping
 *
 * @param subtotal - Subtotal amount
 * @param tax - Tax amount
 * @param shipping - Shipping cost (default 0)
 * @returns Final total rounded to 2 decimal places
 */
export function calculateTotal(subtotal: number, tax: number, shipping: number = 0): number {
  const total = subtotal + tax + shipping;
  return Math.round(total * 100) / 100;
}

/**
 * Calculate price per square foot
 */
export function calculatePricePerSqFt(total: number, squareFootage: number): number {
  if (squareFootage <= 0) return 0;
  const pricePerSqFt = total / squareFootage;
  return Math.round(pricePerSqFt * 100) / 100;
}

/**
 * Calculate labor cost from square footage
 */
export function calculateLaborCost(squareFootage: number, laborRatePerSqFt: number): number {
  const cost = squareFootage * laborRatePerSqFt;
  return Math.round(cost * 100) / 100;
}

/**
 * Calculate material quantity based on coverage
 */
export function calculateMaterialQuantity(squareFootage: number, coveragePerUnit: number): number {
  if (coveragePerUnit <= 0) return 0;
  return Math.ceil(squareFootage / coveragePerUnit);
}

/**
 * Format currency with proper USD formatting
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format currency without cents (for large amounts)
 */
export function formatCurrencyShort(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
