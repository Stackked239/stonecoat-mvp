/**
 * Mock Customer Data
 * Customer profiles with contact information and quote request history
 * All addresses reference valid zip codes from mockZipCodeData.ts
 */

import { Customer } from '../types/quote';

/**
 * Sample customers who have requested quotes
 * Each customer represents a realistic Florida homeowner or business owner
 */
export const mockCustomers: Customer[] = [
  {
    name: 'John Mitchell',
    email: 'john.mitchell@gmail.com',
    phone: '813-555-0123',
    address: {
      street: '4521 Bay Vista Drive',
      city: 'Tampa',
      state: 'FL',
      zipCode: '33610',
      lat: 27.9767,
      lng: -82.4370
    }
  },
  {
    name: 'Sarah Thompson',
    email: 'sarah.t@outlook.com',
    phone: '813-555-0456',
    address: {
      street: '892 Riverside Lane',
      city: 'Tampa',
      state: 'FL',
      zipCode: '33612',
      lat: 28.0275,
      lng: -82.4526
    }
  },
  {
    name: 'Michael Rodriguez',
    email: 'm.rodriguez@yahoo.com',
    phone: '813-555-0789',
    address: {
      street: '2156 Palm Court',
      city: 'Brandon',
      state: 'FL',
      zipCode: '33511',
      lat: 27.9378,
      lng: -82.2859
    }
  },
  {
    name: 'Emily Chen',
    email: 'emily.chen@gmail.com',
    phone: '727-555-0234',
    address: {
      street: '7834 Oak Grove Boulevard',
      city: 'Clearwater',
      state: 'FL',
      zipCode: '33765',
      lat: 27.9659,
      lng: -82.8001
    }
  },
  {
    name: 'David Patterson',
    email: 'dpatterson@hotmail.com',
    phone: '727-555-0567',
    address: {
      street: '3421 Sunset Ridge Drive',
      city: 'St. Petersburg',
      state: 'FL',
      zipCode: '33707',
      lat: 27.7676,
      lng: -82.6403
    }
  },
  {
    name: 'Jennifer Williams',
    email: 'jen.williams@gmail.com',
    phone: '813-555-0891',
    address: {
      street: '1567 Highland Park Avenue',
      city: 'Tampa',
      state: 'FL',
      zipCode: '33606',
      lat: 27.9419,
      lng: -82.5133
    }
  },
  {
    name: 'Robert Anderson',
    email: 'robert.anderson@yahoo.com',
    phone: '813-555-0345',
    address: {
      street: '8923 Lakewood Circle',
      city: 'Lutz',
      state: 'FL',
      zipCode: '33549',
      lat: 28.1539,
      lng: -82.4612
    }
  },
  {
    name: 'Lisa Garcia',
    email: 'lisa.garcia@outlook.com',
    phone: '863-555-0678',
    address: {
      street: '4532 Maple Street',
      city: 'Lakeland',
      state: 'FL',
      zipCode: '33803',
      lat: 28.0656,
      lng: -81.9292
    }
  },
  {
    name: 'James Cooper',
    email: 'james.cooper@gmail.com',
    phone: '727-555-0912',
    address: {
      street: '6789 Beach Boulevard',
      city: 'Largo',
      state: 'FL',
      zipCode: '33770',
      lat: 27.9095,
      lng: -82.7873
    }
  },
  {
    name: 'Amanda Taylor',
    email: 'amanda.taylor@hotmail.com',
    phone: '727-555-0445',
    address: {
      street: '2341 Harbor View Drive',
      city: 'Dunedin',
      state: 'FL',
      zipCode: '34698',
      lat: 28.0200,
      lng: -82.7718
    }
  }
];

/**
 * Helper function to get customer by email
 */
export const getCustomerByEmail = (email: string): Customer | undefined => {
  return mockCustomers.find(c => c.email.toLowerCase() === email.toLowerCase());
};

/**
 * Helper function to get customers by city
 */
export const getCustomersByCity = (city: string): Customer[] => {
  return mockCustomers.filter(c => c.address.city.toLowerCase() === city.toLowerCase());
};

/**
 * Helper function to get customers by zip code
 */
export const getCustomersByZip = (zipCode: string): Customer[] => {
  return mockCustomers.filter(c => c.address.zipCode === zipCode);
};

/**
 * Validate all customer addresses reference valid zip codes
 */
export const validateCustomerAddresses = (): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Import zip code data for validation
  const { zipCodeData } = require('./mockZipCodeData');

  mockCustomers.forEach((customer, index) => {
    const zipData = zipCodeData[customer.address.zipCode];

    if (!zipData) {
      errors.push(`Customer ${index + 1} (${customer.name}): Invalid zip code ${customer.address.zipCode}`);
    } else {
      // Validate city matches zip code data
      if (zipData.city !== customer.address.city) {
        errors.push(
          `Customer ${index + 1} (${customer.name}): City mismatch. ` +
          `Expected ${zipData.city}, got ${customer.address.city}`
        );
      }

      // Validate coordinates match zip code data
      if (customer.address.lat && customer.address.lng) {
        if (zipData.coordinates.lat !== customer.address.lat ||
            zipData.coordinates.lng !== customer.address.lng) {
          errors.push(
            `Customer ${index + 1} (${customer.name}): Coordinates mismatch for zip ${customer.address.zipCode}`
          );
        }
      }
    }
  });

  return {
    valid: errors.length === 0,
    errors
  };
};
