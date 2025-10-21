/**
 * Form validation utilities
 */

import { ValidationErrors } from '@/lib/types';

/**
 * Validate email address using regex
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number (US 10-digit format)
 * Accepts various formats: (813) 555-1234, 813-555-1234, 8135551234
 */
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 10;
}

/**
 * Validate zip code (US 5-digit format)
 */
export function isValidZipCode(zipCode: string): boolean {
  return /^\d{5}$/.test(zipCode);
}

/**
 * Validate square footage
 * Updated limit: 1-100,000 sqft (increased from 50k for commercial projects)
 */
export function isValidSquareFootage(sqft: number): boolean {
  return sqft > 0 && sqft <= 100000;
}

/**
 * Validate required field
 */
export function isRequired(value: string | number | null | undefined): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  return true;
}

/**
 * Validate minimum length
 */
export function hasMinLength(value: string, minLength: number): boolean {
  return value.trim().length >= minLength;
}

/**
 * Validate maximum length
 */
export function hasMaxLength(value: string, maxLength: number): boolean {
  return value.trim().length <= maxLength;
}

/**
 * Validate number range
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * Validate URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * User-friendly error messages
 */
export const ERROR_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid 10-digit phone number',
  INVALID_ZIP: 'Please enter a valid 5-digit ZIP code',
  INVALID_SQUARE_FOOTAGE: 'Square footage must be between 1 and 100,000',
  MIN_LENGTH: (min: number) => `Must be at least ${min} characters`,
  MAX_LENGTH: (max: number) => `Must be no more than ${max} characters`,
  NO_PROS_FOUND: 'No certified pros available in your area. Please try a nearby ZIP code.',
};

/**
 * Validate quote request data
 */
export function validateQuoteData(data: {
  name: string;
  email: string;
  phone: string;
  zipCode: string;
  projectType: string;
  squareFootage: number;
  description?: string;
}): { valid: boolean; errors: ValidationErrors } {
  const errors: ValidationErrors = {};

  // Name validation
  if (!isRequired(data.name)) {
    errors.name = ERROR_MESSAGES.REQUIRED;
  } else if (!hasMinLength(data.name, 2)) {
    errors.name = ERROR_MESSAGES.MIN_LENGTH(2);
  }

  // Email validation
  if (!isRequired(data.email)) {
    errors.email = ERROR_MESSAGES.REQUIRED;
  } else if (!isValidEmail(data.email)) {
    errors.email = ERROR_MESSAGES.INVALID_EMAIL;
  }

  // Phone validation
  if (!isRequired(data.phone)) {
    errors.phone = ERROR_MESSAGES.REQUIRED;
  } else if (!isValidPhone(data.phone)) {
    errors.phone = ERROR_MESSAGES.INVALID_PHONE;
  }

  // ZIP code validation
  if (!isRequired(data.zipCode)) {
    errors.zipCode = ERROR_MESSAGES.REQUIRED;
  } else if (!isValidZipCode(data.zipCode)) {
    errors.zipCode = ERROR_MESSAGES.INVALID_ZIP;
  }

  // Project type validation
  if (!isRequired(data.projectType)) {
    errors.projectType = 'Please select a project type';
  }

  // Square footage validation
  if (!isRequired(data.squareFootage)) {
    errors.squareFootage = ERROR_MESSAGES.REQUIRED;
  } else if (!isValidSquareFootage(data.squareFootage)) {
    errors.squareFootage = ERROR_MESSAGES.INVALID_SQUARE_FOOTAGE;
  }

  // Description validation (optional but has max length)
  if (data.description && !hasMaxLength(data.description, 1000)) {
    errors.description = ERROR_MESSAGES.MAX_LENGTH(1000);
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validate pro login data
 */
export function validateProLogin(data: {
  email: string;
  password: string;
}): { valid: boolean; errors: ValidationErrors } {
  const errors: ValidationErrors = {};

  if (!isRequired(data.email)) {
    errors.email = ERROR_MESSAGES.REQUIRED;
  } else if (!isValidEmail(data.email)) {
    errors.email = ERROR_MESSAGES.INVALID_EMAIL;
  }

  if (!isRequired(data.password)) {
    errors.password = ERROR_MESSAGES.REQUIRED;
  } else if (!hasMinLength(data.password, 6)) {
    errors.password = ERROR_MESSAGES.MIN_LENGTH(6);
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validate contact information
 */
export function validateContactInfo(data: {
  name: string;
  email: string;
  phone: string;
}): { valid: boolean; errors: ValidationErrors } {
  const errors: ValidationErrors = {};

  if (!isRequired(data.name)) {
    errors.name = ERROR_MESSAGES.REQUIRED;
  }

  if (!isRequired(data.email)) {
    errors.email = ERROR_MESSAGES.REQUIRED;
  } else if (!isValidEmail(data.email)) {
    errors.email = ERROR_MESSAGES.INVALID_EMAIL;
  }

  if (!isRequired(data.phone)) {
    errors.phone = ERROR_MESSAGES.REQUIRED;
  } else if (!isValidPhone(data.phone)) {
    errors.phone = ERROR_MESSAGES.INVALID_PHONE;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
