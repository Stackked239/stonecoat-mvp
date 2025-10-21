/**
 * Authentication Utilities
 * MVP implementation using localStorage for session management
 * Production: Replace with NextAuth.js + JWT
 */

import { mockPros } from '@/lib/data/mockPros';

/**
 * Pro session data stored in localStorage
 */
export interface ProSession {
  proId: string;
  email: string;
  businessName: string;
  isAuthenticated: true;
}

/**
 * Session storage key
 */
const SESSION_KEY = 'stonecoat_pro_session';

/**
 * Get current pro session from localStorage
 * @returns ProSession if authenticated, null otherwise
 */
export function getProSession(): ProSession | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const sessionData = localStorage.getItem(SESSION_KEY);
    if (!sessionData) {
      return null;
    }

    const session = JSON.parse(sessionData) as ProSession;

    // Validate session has required fields
    if (
      session.proId &&
      session.email &&
      session.businessName &&
      session.isAuthenticated === true
    ) {
      return session;
    }

    // Invalid session data, clear it
    clearProSession();
    return null;
  } catch (error) {
    console.error('Error reading pro session:', error);
    clearProSession();
    return null;
  }
}

/**
 * Store pro session in localStorage
 * @param proId - Pro ID from mockPros
 */
export function setProSession(proId: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  const pro = mockPros.find(p => p.id === proId);
  if (!pro) {
    throw new Error('Pro not found');
  }

  const session: ProSession = {
    proId: pro.id,
    email: pro.email,
    businessName: pro.businessName,
    isAuthenticated: true,
  };

  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch (error) {
    console.error('Error storing pro session:', error);
    throw new Error('Failed to store session');
  }
}

/**
 * Clear pro session (logout)
 */
export function clearProSession(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (error) {
    console.error('Error clearing pro session:', error);
  }
}

/**
 * Check if pro is authenticated
 * @returns true if valid session exists
 */
export function isProAuthenticated(): boolean {
  return getProSession() !== null;
}

/**
 * Validate pro login credentials
 * MVP: Any email from mockPros + password "demo"
 * Production: Replace with real authentication
 *
 * @param email - Pro email address
 * @param password - Password (must be "demo" for MVP)
 * @returns Pro ID if valid, null otherwise
 */
export function validateProLogin(email: string, password: string): string | null {
  // MVP password validation
  if (password !== 'demo') {
    return null;
  }

  // Find pro by email
  const pro = mockPros.find(p => p.email.toLowerCase() === email.toLowerCase());

  return pro ? pro.id : null;
}

/**
 * Get pro data from session
 * @returns Pro object if authenticated, null otherwise
 */
export function getSessionPro() {
  const session = getProSession();
  if (!session) {
    return null;
  }

  return mockPros.find(p => p.id === session.proId) || null;
}

/**
 * Admin session data stored in localStorage
 */
export interface AdminSession {
  email: string;
  isAuthenticated: true;
}

/**
 * Admin session storage key
 */
const ADMIN_SESSION_KEY = 'stonecoat_admin_session';

/**
 * Admin credentials for MVP
 */
const ADMIN_EMAIL = 'admin@stonecoat.com';
const ADMIN_PASSWORD = 'admin123';

/**
 * Get current admin session from localStorage
 * @returns AdminSession if authenticated, null otherwise
 */
export function getAdminSession(): AdminSession | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const sessionData = localStorage.getItem(ADMIN_SESSION_KEY);
    if (!sessionData) {
      return null;
    }

    const session = JSON.parse(sessionData) as AdminSession;

    // Validate session has required fields
    if (session.email && session.isAuthenticated === true) {
      return session;
    }

    // Invalid session data, clear it
    clearAdminSession();
    return null;
  } catch (error) {
    console.error('Error reading admin session:', error);
    clearAdminSession();
    return null;
  }
}

/**
 * Store admin session in localStorage
 */
export function setAdminSession(): void {
  if (typeof window === 'undefined') {
    return;
  }

  const session: AdminSession = {
    email: ADMIN_EMAIL,
    isAuthenticated: true,
  };

  try {
    localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
  } catch (error) {
    console.error('Error storing admin session:', error);
    throw new Error('Failed to store session');
  }
}

/**
 * Clear admin session (logout)
 */
export function clearAdminSession(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.removeItem(ADMIN_SESSION_KEY);
  } catch (error) {
    console.error('Error clearing admin session:', error);
  }
}

/**
 * Check if admin is authenticated
 * @returns true if valid session exists
 */
export function isAdminAuthenticated(): boolean {
  return getAdminSession() !== null;
}

/**
 * Validate admin login credentials
 * MVP: Hardcoded admin credentials
 * Production: Replace with real authentication
 *
 * @param email - Admin email address
 * @param password - Password
 * @returns true if valid, false otherwise
 */
export function validateAdminLogin(email: string, password: string): boolean {
  return (
    email.toLowerCase() === ADMIN_EMAIL.toLowerCase() &&
    password === ADMIN_PASSWORD
  );
}
