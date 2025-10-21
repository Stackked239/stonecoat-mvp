/**
 * Stonecoat MVP - Application Constants
 * Centralized constants for UI, business logic, and configuration
 */

import {
  HomeIcon,
  DocumentTextIcon,
  ShoppingCartIcon,
  BriefcaseIcon,
  ChartBarIcon,
  UserGroupIcon,
  CubeIcon,
  BeakerIcon,
  SparklesIcon,
  WrenchScrewdriverIcon,
  PuzzlePieceIcon,
  TagIcon,
} from '@heroicons/react/24/outline';

// ========================================
// STATUS BADGE COLORS
// ========================================

/**
 * Quote status badge styling (Dark Theme)
 * Maps quote statuses to Tailwind CSS classes
 */
export const QUOTE_STATUS_COLORS = {
  requested: {
    bg: 'bg-blue-700/20',
    text: 'text-blue-400',
    border: 'border-blue-700',
    label: 'Requested',
  },
  sent: {
    bg: 'bg-purple-700/20',
    text: 'text-purple-400',
    border: 'border-purple-700',
    label: 'Sent',
  },
  accepted: {
    bg: 'bg-green-700/20',
    text: 'text-green-500',
    border: 'border-green-700',
    label: 'Accepted',
  },
  declined: {
    bg: 'bg-red-700/20',
    text: 'text-red-400',
    border: 'border-red-700',
    label: 'Declined',
  },
  expired: {
    bg: 'bg-gray-700/20',
    text: 'text-gray-400',
    border: 'border-gray-700',
    label: 'Expired',
  },
} as const;

/**
 * Order status badge styling (Dark Theme)
 * Maps order statuses to Tailwind CSS classes
 */
export const ORDER_STATUS_COLORS = {
  pending: {
    bg: 'bg-yellow-700/20',
    text: 'text-yellow-400',
    border: 'border-yellow-700',
    label: 'Pending',
  },
  processing: {
    bg: 'bg-blue-700/20',
    text: 'text-blue-400',
    border: 'border-blue-700',
    label: 'Processing',
  },
  shipped: {
    bg: 'bg-purple-700/20',
    text: 'text-purple-400',
    border: 'border-purple-700',
    label: 'Shipped',
  },
  delivered: {
    bg: 'bg-green-700/20',
    text: 'text-green-500',
    border: 'border-green-700',
    label: 'Delivered',
  },
  cancelled: {
    bg: 'bg-red-700/20',
    text: 'text-red-400',
    border: 'border-red-700',
    label: 'Cancelled',
  },
} as const;

/**
 * Job status badge styling (Dark Theme)
 * Maps job statuses to Tailwind CSS classes
 */
export const JOB_STATUS_COLORS = {
  'quote-sent': {
    bg: 'bg-blue-700/20',
    text: 'text-blue-400',
    border: 'border-blue-700',
    label: 'Quote Sent',
  },
  'materials-ordered': {
    bg: 'bg-purple-700/20',
    text: 'text-purple-400',
    border: 'border-purple-700',
    label: 'Materials Ordered',
  },
  scheduled: {
    bg: 'bg-cyan-700/20',
    text: 'text-cyan-400',
    border: 'border-cyan-700',
    label: 'Scheduled',
  },
  'in-progress': {
    bg: 'bg-yellow-700/20',
    text: 'text-yellow-400',
    border: 'border-yellow-700',
    label: 'In Progress',
  },
  completed: {
    bg: 'bg-green-700/20',
    text: 'text-green-500',
    border: 'border-green-700',
    label: 'Completed',
  },
  cancelled: {
    bg: 'bg-red-700/20',
    text: 'text-red-400',
    border: 'border-red-700',
    label: 'Cancelled',
  },
} as const;

// ========================================
// PROJECT TYPE LABELS
// ========================================

/**
 * Project type display configuration
 * Includes user-facing labels and descriptions
 */
export const PROJECT_TYPE_CONFIG = {
  'garage-floor': {
    label: 'Garage Floor',
    description: 'Residential garage epoxy flooring',
    category: 'residential',
  },
  'basement-floor': {
    label: 'Basement Floor',
    description: 'Basement epoxy flooring and waterproofing',
    category: 'residential',
  },
  patio: {
    label: 'Patio',
    description: 'Outdoor patio epoxy coating',
    category: 'residential',
  },
  'commercial-floor': {
    label: 'Commercial Floor',
    description: 'Commercial and industrial flooring',
    category: 'commercial',
  },
  countertop: {
    label: 'Countertop',
    description: 'Epoxy countertop resurfacing',
    category: 'residential',
  },
  driveway: {
    label: 'Driveway',
    description: 'Driveway epoxy coating',
    category: 'residential',
  },
  'pool-deck': {
    label: 'Pool Deck',
    description: 'Pool deck epoxy coating',
    category: 'residential',
  },
  other: {
    label: 'Other',
    description: 'Custom epoxy project',
    category: 'custom',
  },
} as const;

/**
 * Project category groupings
 */
export const PROJECT_CATEGORIES = {
  residential: {
    label: 'Residential',
    description: 'Home improvement and residential projects',
  },
  commercial: {
    label: 'Commercial',
    description: 'Commercial and industrial applications',
  },
  custom: {
    label: 'Custom',
    description: 'Specialized or custom projects',
  },
} as const;

// ========================================
// PRODUCT CATEGORIES
// ========================================

/**
 * Product category configuration
 * Includes icons, colors, and metadata for catalog organization
 */
export const PRODUCT_CATEGORY_CONFIG = {
  'base-coats': {
    label: 'Base Coats',
    description: 'Foundation epoxy coatings',
    icon: BeakerIcon,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  'top-coats': {
    label: 'Top Coats',
    description: 'Protective finish coatings',
    icon: SparklesIcon,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  flakes: {
    label: 'Decorative Flakes',
    description: 'Color flakes and chips',
    icon: PuzzlePieceIcon,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
  },
  metallic: {
    label: 'Metallic Pigments',
    description: 'Metallic color additives',
    icon: SparklesIcon,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
  },
  primers: {
    label: 'Primers',
    description: 'Surface preparation products',
    icon: TagIcon,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  tools: {
    label: 'Tools',
    description: 'Application tools and equipment',
    icon: WrenchScrewdriverIcon,
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
  },
  accessories: {
    label: 'Accessories',
    description: 'Additional supplies and accessories',
    icon: CubeIcon,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
  },
} as const;

// ========================================
// TIMELINE OPTIONS
// ========================================

/**
 * Standard project timeline options
 * Available in quote request forms
 */
export const TIMELINE_OPTIONS = [
  {
    value: '1-3-days',
    label: '1-3 Days',
    description: 'Urgent - immediate start needed',
  },
  {
    value: '4-7-days',
    label: '4-7 Days',
    description: 'Quick turnaround',
  },
  {
    value: '1-2-weeks',
    label: '1-2 Weeks',
    description: 'Standard timeline',
  },
  {
    value: '2-4-weeks',
    label: '2-4 Weeks',
    description: 'Flexible scheduling',
  },
  {
    value: 'flexible',
    label: 'Flexible',
    description: 'No specific deadline',
  },
] as const;

// ========================================
// BUSINESS CONSTANTS
// ========================================

/**
 * Stonecoat business model constants
 */
export const BUSINESS_CONSTANTS = {
  /**
   * Lead fee charged per quote sent to customer
   * Revenue Model: Customer quotes generate $15/quote
   */
  LEAD_FEE_PER_QUOTE: 15,

  /**
   * Material markup margin (as percentage)
   * Pro Cost → Retail Price (40% margin)
   */
  MATERIAL_MARGIN_PERCENT: 40,

  /**
   * Florida sales tax rate (as percentage)
   */
  SALES_TAX_RATE_PERCENT: 6,

  /**
   * Maximum service radius for contractor matching (miles)
   */
  MAX_SERVICE_RADIUS_MILES: 50,

  /**
   * Minimum quote validity period (days)
   */
  QUOTE_VALIDITY_DAYS: 30,

  /**
   * Minimum number of pros to match per customer request
   */
  MIN_PROS_PER_QUOTE: 3,

  /**
   * Maximum number of pros to match per customer request
   */
  MAX_PROS_PER_QUOTE: 4,

  /**
   * Pro discount on material orders (as percentage)
   * Wholesale pricing for certified contractors
   */
  PRO_DISCOUNT_PERCENT: 35,

  /**
   * Minimum order value for free shipping (dollars)
   */
  FREE_SHIPPING_THRESHOLD: 500,

  /**
   * Standard shipping cost (dollars)
   */
  STANDARD_SHIPPING_COST: 25,
} as const;

// ========================================
// NAVIGATION LINKS
// ========================================

/**
 * Customer portal navigation
 * Public-facing pages (no authentication)
 */
export const CUSTOMER_NAV_LINKS = [
  {
    label: 'Home',
    href: '/',
    icon: HomeIcon,
  },
  {
    label: 'Request Quote',
    href: '/request-quote',
    icon: DocumentTextIcon,
  },
] as const;

/**
 * Pro portal navigation
 * Authenticated contractor dashboard
 */
export const PRO_NAV_LINKS = [
  {
    label: 'Dashboard',
    href: '/pro/dashboard',
    icon: HomeIcon,
  },
  {
    label: 'Quotes',
    href: '/pro/quotes',
    icon: DocumentTextIcon,
  },
  {
    label: 'Jobs',
    href: '/pro/jobs',
    icon: BriefcaseIcon,
  },
  {
    label: 'Inventory',
    href: '/pro/inventory',
    icon: CubeIcon,
  },
  {
    label: 'Orders',
    href: '/pro/orders',
    icon: ShoppingCartIcon,
  },
] as const;

/**
 * Admin portal navigation
 * Stonecoat master dashboard
 */
export const ADMIN_NAV_LINKS = [
  {
    label: 'Dashboard',
    href: '/admin/dashboard',
    icon: ChartBarIcon,
  },
  {
    label: 'Quotes',
    href: '/admin/quotes',
    icon: DocumentTextIcon,
  },
  {
    label: 'Contractors',
    href: '/admin/pros',
    icon: UserGroupIcon,
  },
  {
    label: 'Inventory',
    href: '/admin/inventory',
    icon: CubeIcon,
  },
] as const;

// ========================================
// PRICING CONSTANTS
// ========================================

/**
 * Labor rate calculation brackets (per square foot)
 * Based on zip code median income
 */
export const LABOR_RATE_BRACKETS = [
  {
    minIncome: 0,
    maxIncome: 40000,
    baseRate: 2.0,
    label: 'Budget Market',
  },
  {
    minIncome: 40001,
    maxIncome: 60000,
    baseRate: 3.0,
    label: 'Standard Market',
  },
  {
    minIncome: 60001,
    maxIncome: 80000,
    baseRate: 4.5,
    label: 'Mid-Tier Market',
  },
  {
    minIncome: 80001,
    maxIncome: 100000,
    baseRate: 5.5,
    label: 'Premium Market',
  },
  {
    minIncome: 100001,
    maxIncome: Infinity,
    baseRate: 7.0,
    label: 'Luxury Market',
  },
] as const;

/**
 * Project complexity multipliers
 * Applied to base labor rates
 */
export const COMPLEXITY_MULTIPLIERS = {
  simple: {
    multiplier: 1.0,
    label: 'Simple',
    description: 'Standard garage floor, minimal prep',
  },
  moderate: {
    multiplier: 1.2,
    label: 'Moderate',
    description: 'Some repairs, custom colors',
  },
  complex: {
    multiplier: 1.5,
    label: 'Complex',
    description: 'Extensive prep, metallic finishes',
  },
  premium: {
    multiplier: 2.0,
    label: 'Premium',
    description: 'High-end finishes, multiple coats',
  },
} as const;

// ========================================
// FORM VALIDATION CONSTANTS
// ========================================

/**
 * Input field validation limits
 */
export const VALIDATION_LIMITS = {
  MIN_SQUARE_FOOTAGE: 50,
  MAX_SQUARE_FOOTAGE: 50000,
  MIN_DESCRIPTION_LENGTH: 10,
  MAX_DESCRIPTION_LENGTH: 1000,
  MIN_PHONE_LENGTH: 10,
  MAX_PHONE_LENGTH: 15,
  MIN_ZIP_CODE_LENGTH: 5,
  MAX_ZIP_CODE_LENGTH: 10,
} as const;

/**
 * Regex patterns for validation
 */
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[\d\s\-\(\)]+$/,
  ZIP_CODE: /^\d{5}(-\d{4})?$/,
  DECIMAL: /^\d+(\.\d{1,2})?$/,
} as const;

// ========================================
// DISPLAY FORMATS
// ========================================

/**
 * Number formatting configurations
 */
export const FORMAT_CONFIG = {
  CURRENCY: {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  PERCENTAGE: {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  },
  DECIMAL: {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  },
} as const;

/**
 * Date formatting configurations
 */
export const DATE_FORMATS = {
  SHORT: 'MM/dd/yyyy',
  LONG: 'MMMM dd, yyyy',
  WITH_TIME: 'MM/dd/yyyy h:mm a',
  ISO: 'yyyy-MM-dd',
} as const;

// ========================================
// TYPE EXPORTS
// ========================================

/**
 * Inferred types from constants for type safety
 */
export type QuoteStatusKey = keyof typeof QUOTE_STATUS_COLORS;
export type OrderStatusKey = keyof typeof ORDER_STATUS_COLORS;
export type JobStatusKey = keyof typeof JOB_STATUS_COLORS;
export type ProjectTypeKey = keyof typeof PROJECT_TYPE_CONFIG;
export type ProductCategoryKey = keyof typeof PRODUCT_CATEGORY_CONFIG;
export type TimelineValue = (typeof TIMELINE_OPTIONS)[number]['value'];
export type ComplexityLevel = keyof typeof COMPLEXITY_MULTIPLIERS;
