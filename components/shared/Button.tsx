/**
 * Button Component
 * Reusable button component with multiple variants, sizes, and states
 * Used throughout all three portals (customer, pro, admin)
 */

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button visual style variant
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

  /**
   * Button size
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Loading state - shows spinner and disables interaction
   */
  isLoading?: boolean;

  /**
   * Button content
   */
  children: ReactNode;

  /**
   * Full width button
   */
  fullWidth?: boolean;
}

/**
 * Button component with accessible states and smooth transitions
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md" onClick={handleSubmit}>
 *   Submit Quote
 * </Button>
 *
 * <Button variant="outline" size="sm" isLoading>
 *   Saving...
 * </Button>
 * ```
 */
export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  disabled,
  fullWidth = false,
  className,
  ...props
}: ButtonProps) {
  // Base styles applied to all buttons
  const baseStyles = cn(
    'inline-flex items-center justify-center gap-2',
    'font-medium rounded-lg',
    'transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:cursor-not-allowed',
    'active:scale-95',
    fullWidth && 'w-full'
  );

  // Variant-specific styles (Dark Theme)
  const variantStyles = {
    primary: cn(
      'bg-primary-600 text-white',
      'hover:bg-primary-700',
      'focus:ring-primary-500',
      'shadow-sm hover:shadow-md',
      'disabled:bg-gray-400 disabled:text-white disabled:opacity-100'
    ),
    secondary: cn(
      'bg-transparent text-gray-900 border-2',
      'border-gray-300 hover:border-[#545454]',
      'hover:bg-white',
      'focus:ring-primary-600',
      'disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-300 disabled:opacity-100'
    ),
    outline: cn(
      'border-2 border-primary-600 text-primary-600 bg-white',
      'hover:bg-primary-50 hover:border-primary-700',
      'focus:ring-primary-500',
      'disabled:border-gray-300 disabled:text-gray-400 disabled:bg-gray-50 disabled:opacity-100'
    ),
    ghost: cn(
      'text-gray-900 bg-transparent',
      'hover:bg-gray-200',
      'focus:ring-primary-600',
      'disabled:text-gray-400 disabled:opacity-100'
    ),
    danger: cn(
      'bg-error-600 text-white',
      'hover:bg-error-700',
      'focus:ring-error-500',
      'shadow-sm hover:shadow-md',
      'disabled:bg-gray-400 disabled:text-white disabled:opacity-100'
    ),
  };

  // Size-specific styles
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
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
      {children}
    </button>
  );
}
