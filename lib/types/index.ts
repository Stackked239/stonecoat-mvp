/**
 * Stonecoat MVP - Core Type Definitions
 * All TypeScript interfaces and types used throughout the application
 */

// ========================================
// EXPORT MODULAR TYPE FILES
// ========================================

export * from './common';
export * from './quote';
export * from './pro';
export * from './product';
export * from './order';

// ========================================
// ADDITIONAL TYPES (Job, Validation)
// ========================================

/**
 * Job status throughout work lifecycle
 */
export type JobStatus =
  | 'quote-sent'
  | 'materials-ordered'
  | 'scheduled'
  | 'in-progress'
  | 'completed'
  | 'cancelled';

/**
 * Job tracking entity
 */
export interface Job {
  id: string;
  quoteId: string;
  proId: string;
  customer: Customer;
  project: ProjectDetails;
  status: JobStatus;
  scheduledDate?: Date;
  completionDate?: Date;
  notes?: string;
}

/**
 * Validation error structure
 */
export interface ValidationErrors {
  [key: string]: string;
}

/**
 * Validation result structure
 */
export interface ValidationResult {
  valid: boolean;
  errors: ValidationErrors;
}

/**
 * Dashboard statistics
 */
export interface DashboardStats {
  activeQuotes: number;
  pendingOrders: number;
  completedJobs: number;
  totalRevenue: number;
}

/**
 * Admin system metrics
 */
export interface AdminMetrics {
  totalPros: number;
  totalQuotes: number;
  totalOrders: number;
  systemRevenue: number;
  avgQuoteValue: number;
  conversionRate: number;
}

/**
 * Pricing calculation result
 */
export interface PricingCalculation {
  materialsTotal: number;
  laborTotal: number;
  subtotal: number;
  tax: number;
  total: number;
  perSquareFootRate: number;
}

/**
 * Import Customer and ProjectDetails for Job interface
 */
import type { Customer } from './quote';
import type { ProjectDetails } from './quote';
