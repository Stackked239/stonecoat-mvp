'use client';

/**
 * Stone Coat Countertops - Logo Component
 * 
 * IMPORTANT: Replace the SVG content with your actual logo files:
 * - Place logo files in /public/logo/
 * - stone-coat-logo-full.svg (full logo with mountain icon + text + orange bar)
 * - stone-coat-logo-horizontal.svg (horizontal variant)
 * - stone-coat-icon.svg (icon only)
 * 
 * Then update the src paths below to use Image component from next/image
 */

import React from 'react';
import { colors } from '@/lib/design-tokens';

type LogoVariant = 'full' | 'horizontal' | 'icon' | 'black-and-white';
type LogoSize = 'sm' | 'md' | 'lg' | 'xl';

interface LogoProps {
  variant?: LogoVariant;
  size?: LogoSize;
  className?: string;
  onClick?: () => void;
}

// Size mappings
const sizeMap = {
  sm: { width: 120, height: 60 },
  md: { width: 180, height: 90 },
  lg: { width: 240, height: 120 },
  xl: { width: 320, height: 160 },
};

export function Logo({ 
  variant = 'full', 
  size = 'md',
  className = '',
  onClick 
}: LogoProps) {
  const dimensions = sizeMap[size];
  
  // TODO: Replace with actual logo image files
  // Example when you have the files:
  // return (
  //   <Image
  //     src={`/logo/stone-coat-logo-${variant}.svg`}
  //     alt="Stone Coat Countertops"
  //     width={dimensions.width}
  //     height={dimensions.height}
  //     className={className}
  //     onClick={onClick}
  //   />
  // );
  
  // Placeholder SVG Logo (replace with actual logo files)
  if (variant === 'full') {
    return (
      <div 
        className={`inline-block ${className}`}
        style={{ width: dimensions.width, height: dimensions.height }}
        onClick={onClick}
      >
        <svg
          viewBox="0 0 300 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Mountain Icon (simplified) */}
          <path
            d="M150 30 L120 70 L100 70 L150 10 L200 70 L180 70 Z M150 10 L170 45 L130 45 Z"
            fill={colors.brand.black}
            stroke={colors.brand.black}
            strokeWidth="2"
            strokeLinejoin="miter"
          />
          
          {/* STONE COAT Text */}
          <text
            x="150"
            y="100"
            fontSize="32"
            fontWeight="bold"
            fontFamily="Arial, sans-serif"
            textAnchor="middle"
            fill={colors.brand.black}
          >
            STONE COAT
          </text>
          
          {/* Trademark */}
          <text
            x="270"
            y="90"
            fontSize="10"
            fontFamily="Arial, sans-serif"
            fill={colors.brand.black}
          >
            ™
          </text>
          
          {/* Orange Bar with COUNTERTOPS */}
          <rect
            x="50"
            y="110"
            width="200"
            height="30"
            fill={colors.brand.orange}
            rx="2"
          />
          <text
            x="150"
            y="132"
            fontSize="16"
            fontWeight="bold"
            fontFamily="Arial, sans-serif"
            textAnchor="middle"
            fill={colors.brand.white}
            letterSpacing="2"
          >
            COUNTERTOPS
          </text>
        </svg>
      </div>
    );
  }
  
  if (variant === 'horizontal') {
    return (
      <div 
        className={`inline-block ${className}`}
        style={{ width: dimensions.width, height: dimensions.height / 1.5 }}
        onClick={onClick}
      >
        <svg
          viewBox="0 0 400 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Horizontal layout - adjust as needed */}
          <path
            d="M40 10 L20 40 L10 40 L40 5 L70 40 L60 40 Z"
            fill={colors.brand.black}
            stroke={colors.brand.black}
            strokeWidth="1.5"
          />
          <text
            x="90"
            y="45"
            fontSize="28"
            fontWeight="bold"
            fontFamily="Arial, sans-serif"
            fill={colors.brand.black}
          >
            STONE COAT
          </text>
          <text
            x="260"
            y="38"
            fontSize="8"
            fontFamily="Arial, sans-serif"
            fill={colors.brand.black}
          >
            ™
          </text>
          <rect
            x="90"
            y="50"
            width="180"
            height="20"
            fill={colors.brand.orange}
            rx="2"
          />
          <text
            x="180"
            y="65"
            fontSize="12"
            fontWeight="bold"
            fontFamily="Arial, sans-serif"
            textAnchor="middle"
            fill={colors.brand.white}
            letterSpacing="2"
          >
            COUNTERTOPS
          </text>
        </svg>
      </div>
    );
  }
  
  if (variant === 'icon') {
    return (
      <div 
        className={`inline-block ${className}`}
        style={{ width: dimensions.width / 2, height: dimensions.height / 2 }}
        onClick={onClick}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Just the mountain icon */}
          <path
            d="M50 20 L30 60 L20 60 L50 10 L80 60 L70 60 Z M50 10 L65 45 L35 45 Z"
            fill={colors.brand.black}
            stroke={colors.brand.black}
            strokeWidth="2"
          />
        </svg>
      </div>
    );
  }
  
  if (variant === 'black-and-white') {
    return (
      <div 
        className={`inline-block ${className}`}
        style={{ width: dimensions.width, height: dimensions.height }}
        onClick={onClick}
      >
        <svg
          viewBox="0 0 300 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <path
            d="M150 30 L120 70 L100 70 L150 10 L200 70 L180 70 Z M150 10 L170 45 L130 45 Z"
            fill={colors.brand.black}
            stroke={colors.brand.black}
            strokeWidth="2"
          />
          <text
            x="150"
            y="100"
            fontSize="32"
            fontWeight="bold"
            fontFamily="Arial, sans-serif"
            textAnchor="middle"
            fill={colors.brand.black}
          >
            STONE COAT
          </text>
          <text
            x="270"
            y="90"
            fontSize="10"
            fontFamily="Arial, sans-serif"
            fill={colors.brand.black}
          >
            ™
          </text>
          <rect
            x="50"
            y="110"
            width="200"
            height="30"
            fill={colors.brand.black}
            rx="2"
          />
          <text
            x="150"
            y="132"
            fontSize="16"
            fontWeight="bold"
            fontFamily="Arial, sans-serif"
            textAnchor="middle"
            fill={colors.brand.white}
            letterSpacing="2"
          >
            COUNTERTOPS
          </text>
        </svg>
      </div>
    );
  }
  
  return null;
}

// Convenience components for common use cases
export function LogoFull(props: Omit<LogoProps, 'variant'>) {
  return <Logo variant="full" {...props} />;
}

export function LogoHorizontal(props: Omit<LogoProps, 'variant'>) {
  return <Logo variant="horizontal" {...props} />;
}

export function LogoIcon(props: Omit<LogoProps, 'variant'>) {
  return <Logo variant="icon" {...props} />;
}

// Usage in navigation
export function NavLogo() {
  return (
    <Logo 
      variant="horizontal" 
      size="sm"
      className="cursor-pointer hover:opacity-80 transition-opacity"
    />
  );
}

// Usage in footer
export function FooterLogo() {
  return (
    <Logo 
      variant="full" 
      size="md"
      className="mx-auto"
    />
  );
}

// Usage in hero section
export function HeroLogo() {
  return (
    <Logo 
      variant="full" 
      size="xl"
      className="mx-auto mb-8"
    />
  );
}
