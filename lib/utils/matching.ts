/**
 * Pro matching algorithm - Lead routing with normalized scoring
 */

import { Pro, Quote } from '@/lib/types';
import { calculateDistance, Coordinates } from './distance';

/**
 * Calculate pro score for matching using normalized scoring
 * All components normalized to 0-100 scale for fair weighting
 *
 * Formula:
 * - Rating component (40%): (customerRating / 5) * 100 → normalized to 0-100
 * - Win rate component (30%): winRate (already 0-100)
 * - Distance component (30%): max(0, 100 - distance * 2) → normalized to 0-100
 *
 * @param pro - Pro profile
 * @param customerCoords - Customer location coordinates
 * @param projectType - Type of project (for specialty matching)
 * @returns Match score (0-100 scale)
 */
function calculateProScore(
  pro: Pro,
  customerCoords: Coordinates,
  projectType: string
): number {
  // Calculate distance
  const proCoords: Coordinates = {
    lat: pro.location.lat || 0,
    lng: pro.location.lng || 0,
  };
  const distance = calculateDistance(customerCoords, proCoords);

  // Normalized scoring components (all 0-100 scale)
  const normalizedRating = (pro.metrics.customerRating / 5) * 100; // 0-100
  const normalizedWinRate = pro.metrics.winRate; // Already 0-100
  const normalizedDistance = Math.max(0, 100 - distance * 2); // 0-100 (penalize 2 points per mile)

  // Weighted final score
  let finalScore =
    normalizedRating * 0.4 + normalizedWinRate * 0.3 + normalizedDistance * 0.3;

  // Specialty match bonus (10 points)
  if (pro.specialties?.includes(projectType)) {
    finalScore += 10;
  }

  // Certification level bonus
  if (pro.certificationLevel === 'master') {
    finalScore += 5;
  } else if (pro.certificationLevel === 'advanced') {
    finalScore += 3;
  }

  return Math.round(finalScore * 10) / 10; // Round to 1 decimal
}

/**
 * Match pros to customer request using normalized scoring
 * Filters by service radius, calculates scores, and returns top matches
 *
 * @param request - Customer quote request
 * @param allPros - Array of all available pros
 * @param maxResults - Maximum number of pros to return (default 4)
 * @returns Array of matched pros sorted by score (highest first)
 * @throws Error if customer coordinates are missing
 */
export function matchProsToRequest(
  request: Quote,
  allPros: Pro[],
  maxResults: number = 4
): Pro[] {
  // Extract customer coordinates
  const customerCoords: Coordinates | undefined = request.customer.address.lat &&
    request.customer.address.lng
    ? {
        lat: request.customer.address.lat,
        lng: request.customer.address.lng,
      }
    : undefined;

  if (!customerCoords) {
    throw new Error('Customer coordinates required for matching');
  }

  const projectType = request.project.type;

  // Filter and score pros
  const scoredPros = allPros
    .map((pro) => {
      const proCoords: Coordinates = {
        lat: pro.location.lat || 0,
        lng: pro.location.lng || 0,
      };

      // Calculate distance
      const distance = calculateDistance(customerCoords, proCoords);

      // Skip if outside service radius
      if (distance > pro.serviceRadius) {
        return null;
      }

      // Calculate match score
      const score = calculateProScore(pro, customerCoords, projectType);

      return {
        ...pro,
        matchScore: score,
        distance,
      };
    })
    .filter((pro): pro is Pro & { matchScore: number; distance: number } => pro !== null);

  // Sort by score (descending)
  scoredPros.sort((a, b) => b.matchScore - a.matchScore);

  // Return top matches
  return scoredPros.slice(0, maxResults);
}

/**
 * Get pro match explanation (for displaying why a pro was matched)
 *
 * @param pro - Pro with match score
 * @returns Array of reasons for the match
 */
export function getMatchExplanation(
  pro: Pro & { matchScore?: number; distance?: number }
): string[] {
  const reasons: string[] = [];

  if (pro.distance !== undefined && pro.distance < 10) {
    reasons.push(`Very close to you (${pro.distance.toFixed(1)} miles)`);
  }

  if (pro.metrics.customerRating >= 4.8) {
    reasons.push(`Excellent rating (${pro.metrics.customerRating}★)`);
  }

  if (pro.metrics.winRate >= 70) {
    reasons.push(`High success rate (${pro.metrics.winRate}% jobs won)`);
  }

  if (pro.certificationLevel === 'master') {
    reasons.push('Stonecoat Master Certified');
  }

  // Calculate years in business from join date
  const yearsInBusiness = new Date().getFullYear() - new Date(pro.joinedDate).getFullYear();
  if (yearsInBusiness >= 8) {
    reasons.push(`${yearsInBusiness} years experience`);
  }

  return reasons;
}
