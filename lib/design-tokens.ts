/**
 * Stone Coat Countertops - Design Tokens
 * 
 * Centralized design system values for consistent branding across the app.
 * Import and use these tokens instead of hardcoding values.
 */

// ============================================
// COLORS
// ============================================

export const colors = {
  brand: {
    orange: '#B75533',
    black: '#221F20',
    white: '#FFFFFF',
  },
  accent: {
    blue: '#526D9D',
    gold: '#C8944E',
    green: '#3E6855',
  },
  semantic: {
    success: '#3E6855',
    warning: '#C8944E',
    error: '#B75533',
    info: '#526D9D',
  },
} as const;

// ============================================
// TYPOGRAPHY
// ============================================

export const typography = {
  fontFamily: {
    primary: 'Montserrat, sans-serif',
    display: 'Bebas Neue, cursive',
    script: 'Campfire, cursive',
  },
  fontSize: {
    hero: '3.5rem',      // 56px
    displayLg: '3rem',   // 48px
    display: '2.5rem',   // 40px
    h1: '2rem',          // 32px
    h2: '1.5rem',        // 24px
    h3: '1.25rem',       // 20px
    bodyLg: '1.125rem',  // 18px
    body: '1rem',        // 16px
    bodySm: '0.875rem',  // 14px
    caption: '0.75rem',  // 12px
  },
  fontWeight: {
    thin: 100,
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  lineHeight: {
    tight: 1.1,
    normal: 1.3,
    relaxed: 1.6,
  },
} as const;

// ============================================
// SPACING
// ============================================

export const spacing = {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '3rem',    // 48px
  '3xl': '4rem',    // 64px
  '4xl': '6rem',    // 96px
  section: '5rem',  // 80px - between major sections
} as const;

// ============================================
// BORDER RADIUS
// ============================================

export const borderRadius = {
  sm: '0.375rem',   // 6px
  md: '0.5rem',     // 8px
  lg: '0.75rem',    // 12px
  xl: '1rem',       // 16px
  full: '9999px',   // Fully rounded
} as const;

// ============================================
// SHADOWS
// ============================================

export const shadows = {
  sm: '0 1px 2px 0 rgba(34, 31, 32, 0.05)',
  md: '0 4px 6px -1px rgba(34, 31, 32, 0.1), 0 2px 4px -1px rgba(34, 31, 32, 0.06)',
  lg: '0 10px 15px -3px rgba(34, 31, 32, 0.1), 0 4px 6px -2px rgba(34, 31, 32, 0.05)',
  xl: '0 20px 25px -5px rgba(34, 31, 32, 0.1), 0 10px 10px -5px rgba(34, 31, 32, 0.04)',
  '2xl': '0 25px 50px -12px rgba(34, 31, 32, 0.25)',
} as const;

// ============================================
// BREAKPOINTS
// ============================================

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// ============================================
// CONTAINER MAX WIDTHS
// ============================================

export const containerMaxWidth = {
  narrow: '42rem',   // 672px - for focused content
  content: '65rem',  // 1040px - for main content
  wide: '80rem',     // 1280px - for full width sections
} as const;

// ============================================
// TRANSITIONS
// ============================================

export const transitions = {
  fast: '150ms',
  normal: '200ms',
  slow: '300ms',
  easing: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

// ============================================
// Z-INDEX SCALE
// ============================================

export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modalBackdrop: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
} as const;

// ============================================
// PRODUCT ICONS (Icon Names)
// ============================================

export const productIcons = {
  waterResistant: 'water-resistant',
  heatResistant: 'heat-resistant',
  scratchResistant: 'scratch-resistant',
  affordable: 'affordable',
  renewable: 'renewable',
  lowVoc: 'low-voc',
  easyToUse: 'easy-to-use',
  strongDurable: 'strong-durable',
  cureTime: 'cure-time',
  mixingRatio: 'mixing-ratio',
} as const;

// ============================================
// MARKETING COPY CONSTANTS
// ============================================

export const marketing = {
  tagline: 'Create a space as unique as you',
  ctaPrimary: 'Get Started Now',
  ctaSecondary: 'Learn More',
  ctaWatch: 'Watch Now',
  ctaBuy: 'Buy Now',
  proTipLabel: 'PRO TIP',
} as const;

// ============================================
// PRODUCT FEATURES
// ============================================

export const productFeatures = [
  {
    id: 'water-resistant',
    icon: 'droplet',
    title: 'Water Resistant',
    description: 'Designed to withstand moisture and spills',
    color: colors.accent.blue,
  },
  {
    id: 'heat-resistant',
    icon: 'flame',
    title: 'Heat Resistant',
    description: 'Withstands temperatures up to 425°F',
    color: colors.brand.orange,
  },
  {
    id: 'scratch-resistant',
    icon: 'shield',
    title: 'Scratch Resistant',
    description: 'Super durable and made to withstand years of use',
    color: colors.accent.green,
  },
  {
    id: 'affordable',
    icon: 'dollar',
    title: 'Affordable',
    description: 'Remodel for a fraction of the price of stone and laminate counters',
    color: colors.accent.gold,
  },
  {
    id: 'easy-to-use',
    icon: 'hand',
    title: 'Easy to Use',
    description: 'Designed for the do-it-yourselfer, contractor, & professional',
    color: colors.brand.orange,
  },
  {
    id: 'renewable',
    icon: 'refresh',
    title: 'Renewable',
    description: 'Quickly renew your epoxy project after years of use',
    color: colors.accent.green,
  },
  {
    id: 'low-voc',
    icon: 'leaf',
    title: 'Low VOC',
    description: 'No offensive odor',
    color: colors.accent.green,
  },
  {
    id: 'strong-durable',
    icon: 'star',
    title: 'Strong Durable Gloss Finish',
    description: 'Beautiful, long-lasting glossy finish',
    color: colors.brand.orange,
  },
] as const;

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get color with opacity
 * @param color - Hex color value
 * @param opacity - Opacity value (0-1)
 * @returns RGBA color string
 */
export function colorWithOpacity(color: string, opacity: number): string {
  // Remove # if present
  const hex = color.replace('#', '');
  
  // Parse hex to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/**
 * Get responsive value based on breakpoint
 * @param values - Object with breakpoint keys and values
 * @returns String for CSS media query usage
 */
export function responsive<T>(values: Partial<Record<keyof typeof breakpoints, T>>): string {
  return Object.entries(values)
    .map(([bp, val]) => `@media (min-width: ${breakpoints[bp as keyof typeof breakpoints]}) { ${val} }`)
    .join(' ');
}

/**
 * Apply transition with easing
 * @param property - CSS property to transition
 * @param duration - Duration key from transitions
 * @param easing - Easing key from transitions.easing
 * @returns Transition CSS string
 */
export function transition(
  property: string = 'all',
  duration: keyof typeof transitions = 'normal',
  easing: keyof typeof transitions.easing = 'inOut'
): string {
  const durationValue = transitions[duration] || transitions.normal;
  const easingValue = transitions.easing[easing];
  return `${property} ${durationValue} ${easingValue}`;
}

// ============================================
// TYPE EXPORTS
// ============================================

export type Color = typeof colors;
export type Typography = typeof typography;
export type Spacing = typeof spacing;
export type BorderRadius = typeof borderRadius;
export type Shadow = typeof shadows;
export type Breakpoint = typeof breakpoints;
export type ContainerMaxWidth = typeof containerMaxWidth;
export type Transition = typeof transitions;
export type ZIndex = typeof zIndex;
export type ProductIcon = typeof productIcons;
export type ProductFeature = typeof productFeatures[number];
