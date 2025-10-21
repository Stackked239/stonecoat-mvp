/**
 * Geographic distance and location utilities
 */

export interface Coordinates {
  lat: number;
  lng: number;
}

/**
 * Convert degrees to radians
 */
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Validate coordinates
 */
function validateCoordinates(coord: Coordinates): boolean {
  return (
    coord.lat >= -90 &&
    coord.lat <= 90 &&
    coord.lng >= -180 &&
    coord.lng <= 180
  );
}

/**
 * Calculate straight-line distance between two coordinates using Haversine formula
 * Returns distance in miles, rounded to 1 decimal place
 *
 * @param coord1 - First coordinate (latitude/longitude)
 * @param coord2 - Second coordinate (latitude/longitude)
 * @returns Distance in miles
 * @throws Error if coordinates are invalid
 */
export function calculateDistance(
  coord1: Coordinates,
  coord2: Coordinates
): number {
  // Validate coordinates
  if (!validateCoordinates(coord1) || !validateCoordinates(coord2)) {
    throw new Error('Invalid coordinates provided');
  }

  const R = 3959; // Earth's radius in miles
  const dLat = toRadians(coord2.lat - coord1.lat);
  const dLon = toRadians(coord2.lng - coord1.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(coord1.lat)) *
      Math.cos(toRadians(coord2.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 10) / 10; // Round to 1 decimal
}

/**
 * Check if coordinates are within service radius
 *
 * @param coord1 - First coordinate
 * @param coord2 - Second coordinate
 * @param radiusMiles - Service radius in miles
 * @returns True if within radius, false otherwise
 */
export function isWithinRadius(
  coord1: Coordinates,
  coord2: Coordinates,
  radiusMiles: number
): boolean {
  try {
    const distance = calculateDistance(coord1, coord2);
    return distance <= radiusMiles;
  } catch {
    return false;
  }
}

/**
 * Format distance for display
 */
export function formatDistance(miles: number): string {
  if (miles < 1) {
    return '< 1 mile away';
  }
  return `${miles.toFixed(1)} miles away`;
}
