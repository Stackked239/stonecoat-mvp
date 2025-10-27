'use client';

/**
 * Stone Coat Countertops - Button Component
 *
 * Branded button component following Stone Coat design guidelines
 */

import React from 'react';
import { colors } from '@/lib/design-tokens';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const baseStyles = `
  inline-flex items-center justify-center
  font-semibold font-montserrat
  rounded-md
  transition-all duration-200
  focus:outline-none focus:ring-2 focus:ring-offset-2
  active:scale-95
  disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
`;

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-brand-orange hover:bg-brand-orange/90
    text-white
    focus:ring-brand-orange
    shadow-sm hover:shadow-md
  `,
  secondary: `
    bg-accent-blue hover:bg-accent-blue/90
    text-white
    focus:ring-accent-blue
    shadow-sm hover:shadow-md
  `,
  outline: `
    border-2 border-brand-orange
    text-brand-orange hover:bg-brand-orange hover:text-white
    focus:ring-brand-orange
  `,
  text: `
    text-brand-orange hover:underline
    focus:ring-brand-orange
  `,
  ghost: `
    text-brand-black hover:bg-gray-100
    focus:ring-gray-300
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm gap-2',
  md: 'px-6 py-3 text-base gap-2',
  lg: 'px-8 py-4 text-lg gap-3',
  xl: 'px-10 py-5 text-xl gap-3',
};

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  disabled,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const styles = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth ? 'w-full' : '',
    className,
  ].join(' ').replace(/\s+/g, ' ').trim();

  return (
    <button
      className={styles}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!loading && leftIcon && <span>{leftIcon}</span>}
      <span>{children}</span>
      {!loading && rightIcon && <span>{rightIcon}</span>}
    </button>
  );
}

// Convenience components for common button types

export function PrimaryButton(props: Omit<ButtonProps, 'variant'>) {
  return <Button variant="primary" {...props} />;
}

export function SecondaryButton(props: Omit<ButtonProps, 'variant'>) {
  return <Button variant="secondary" {...props} />;
}

export function OutlineButton(props: Omit<ButtonProps, 'variant'>) {
  return <Button variant="outline" {...props} />;
}

export function TextButton(props: Omit<ButtonProps, 'variant'>) {
  return <Button variant="text" {...props} />;
}

export function GhostButton(props: Omit<ButtonProps, 'variant'>) {
  return <Button variant="ghost" {...props} />;
}

// Common CTA buttons with pre-configured props

export function GetStartedButton(props: Partial<ButtonProps>) {
  return (
    <Button variant="primary" size="lg" {...props}>
      Get Started Now
    </Button>
  );
}

export function LearnMoreButton(props: Partial<ButtonProps>) {
  return (
    <Button variant="outline" size="md" {...props}>
      Learn More
    </Button>
  );
}

export function WatchNowButton(props: Partial<ButtonProps>) {
  return (
    <Button 
      variant="primary" 
      size="lg" 
      leftIcon={
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
        </svg>
      }
      {...props}
    >
      Watch Now
    </Button>
  );
}

export function BuyNowButton(props: Partial<ButtonProps>) {
  return (
    <Button 
      variant="primary" 
      size="lg"
      rightIcon={
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      }
      {...props}
    >
      Buy Now
    </Button>
  );
}

// Button Group component for multiple buttons side by side
interface ButtonGroupProps {
  children: React.ReactNode;
  className?: string;
}

export function ButtonGroup({ children, className = '' }: ButtonGroupProps) {
  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      {children}
    </div>
  );
}
