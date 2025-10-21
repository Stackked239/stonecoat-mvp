/**
 * Common types shared across the application
 */

/**
 * Physical address with optional coordinates
 */
export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  lat?: number;
  lng?: number;
}

/**
 * ZIP code demographic and location data
 */
export interface ZipCodeData {
  city: string;
  state: string;
  medianIncome: number;
  lat: number;
  lng: number;
}

/**
 * User roles in the system
 */
export type UserRole = 'customer' | 'pro' | 'admin';

/**
 * Base user entity
 */
export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}
