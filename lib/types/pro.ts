/**
 * Professional contractor types and metrics
 */

import { Address } from './common';

/**
 * Certification levels for pros
 */
export type CertificationLevel = 'basic' | 'advanced' | 'master';

/**
 * Professional account status
 */
export type AccountStatus = 'active' | 'suspended' | 'pending';

/**
 * Performance metrics for contractors
 */
export interface ProMetrics {
  totalQuotes: number;
  wonQuotes: number;
  winRate: number;
  avgJobValue: number;
  totalRevenue: number;
  customerRating: number;
  materialOrdersLast30: number;
  jobsCompletedLast30: number;
}

/**
 * Complete professional contractor profile
 */
export interface Pro {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;

  // Location & service area
  location: Address;
  serviceRadius: number; // miles
  serviceZipCodes: string[];

  // Credentials
  certificationDate: Date;
  certificationLevel: CertificationLevel;
  insuranceVerified: boolean;
  licenseNumber?: string;

  // Performance metrics
  metrics: ProMetrics;

  // Account status
  accountStatus: AccountStatus;
  joinedDate: Date;
  lastActive: Date;

  // Optional
  website?: string;
  bio?: string;
  specialties?: string[];
}

/**
 * Pro login credentials
 */
export interface ProLoginData {
  email: string;
  password: string;
}
