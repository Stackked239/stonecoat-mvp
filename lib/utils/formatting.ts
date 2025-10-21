/**
 * Data formatting utilities
 */

import { format, formatDistanceToNow, parseISO, isValid } from 'date-fns';
import { Address } from '@/lib/types';

/**
 * Format currency using USD formatting
 *
 * @param amount - Numeric amount to format
 * @returns Formatted currency string (e.g., "$1,234.56")
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
 * Format phone number to US format
 * Converts 10-digit number to (XXX) XXX-XXXX format
 *
 * @param phone - Phone number string (any format)
 * @returns Formatted phone string or original if invalid
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');

  if (cleaned.length !== 10) {
    return phone; // Return original if not 10 digits
  }

  return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
}

/**
 * Format date to readable string
 * Default format: "MMM d, yyyy" (e.g., "Jan 15, 2025")
 *
 * @param date - Date string or Date object
 * @param formatString - Optional custom format string (date-fns format)
 * @returns Formatted date string
 */
export function formatDate(date: string | Date, formatString: string = 'MMM d, yyyy'): string {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return 'Invalid date';
    return format(dateObj, formatString);
  } catch {
    return 'Invalid date';
  }
}

/**
 * Format date with time
 */
export function formatDateTime(date: string | Date): string {
  return formatDate(date, 'MMM d, yyyy h:mm a');
}

/**
 * Format relative time (e.g., "2 days ago")
 */
export function formatRelativeTime(date: string | Date): string {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return 'Invalid date';
    return formatDistanceToNow(dateObj, { addSuffix: true });
  } catch {
    return 'Invalid date';
  }
}

/**
 * Format square footage
 */
export function formatSquareFootage(sqft: number): string {
  return `${sqft.toLocaleString()} sq ft`;
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format number with commas
 */
export function formatNumber(value: number): string {
  return value.toLocaleString();
}

/**
 * Truncate text with ellipsis at word boundary
 * Ensures words are not cut in the middle
 *
 * @param text - Text to truncate
 * @param maxLength - Maximum length including ellipsis
 * @returns Truncated text
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;

  // Find last space before maxLength
  const truncated = text.slice(0, maxLength - 3);
  const lastSpace = truncated.lastIndexOf(' ');

  // If there's a space, truncate at word boundary
  if (lastSpace > 0) {
    return truncated.slice(0, lastSpace) + '...';
  }

  // Otherwise, just truncate at character limit
  return truncated + '...';
}

/**
 * Convert snake_case or kebab-case to Title Case
 */
export function toTitleCase(str: string): string {
  return str
    .replace(/[_-]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Format project type for display
 */
export function formatProjectType(type: string): string {
  const typeMap: Record<string, string> = {
    'garage-floor': 'Garage Floor',
    basement: 'Basement',
    patio: 'Patio',
    'pool-deck': 'Pool Deck',
    'commercial-showroom': 'Commercial Showroom',
    industrial: 'Industrial',
    residential: 'Residential',
  };

  return typeMap[type] || toTitleCase(type);
}

/**
 * Format timeline option for display
 */
export function formatTimeline(timeline: string): string {
  const timelineMap: Record<string, string> = {
    urgent: 'Urgent (ASAP)',
    'within-2-weeks': 'Within 2 Weeks',
    'within-month': 'Within a Month',
    'within-4-weeks': 'Within 4 Weeks',
    flexible: 'Flexible',
  };

  return timelineMap[timeline] || timeline;
}

/**
 * Get initials from name
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Format address to single line
 */
export function formatAddress(address: Address): string {
  const parts = [];

  if (address.street) parts.push(address.street);
  parts.push(`${address.city}, ${address.state} ${address.zipCode}`);

  return parts.join(', ');
}

/**
 * Format certification level for display
 */
export function formatCertificationLevel(level: string): string {
  const levelMap: Record<string, string> = {
    basic: 'Basic Certified',
    advanced: 'Advanced Certified',
    master: 'Master Certified',
  };

  return levelMap[level] || toTitleCase(level);
}

/**
 * Format status badge text
 */
export function formatStatus(status: string): string {
  return toTitleCase(status);
}
