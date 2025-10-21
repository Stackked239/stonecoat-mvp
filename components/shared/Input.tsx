/**
 * Input Component
 * Form input component with label, error messages, and validation states
 * Supports text, email, number, and tel input types
 */

import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Input label text
   */
  label?: string;

  /**
   * Error message to display below input
   */
  error?: string;

  /**
   * Helper text to display below input (shown when no error)
   */
  helperText?: string;

  /**
   * Icon to display at the start of input
   */
  startIcon?: ReactNode;

  /**
   * Icon to display at the end of input
   */
  endIcon?: ReactNode;

  /**
   * Full width input
   */
  fullWidth?: boolean;
}

/**
 * Accessible input component with validation states
 *
 * @example
 * ```tsx
 * <Input
 *   label="Email Address"
 *   type="email"
 *   placeholder="you@example.com"
 *   error={errors.email}
 *   required
 * />
 *
 * <Input
 *   label="Square Footage"
 *   type="number"
 *   helperText="Enter total area to be coated"
 *   min={50}
 *   max={50000}
 * />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      startIcon,
      endIcon,
      fullWidth = true,
      className,
      id,
      required,
      disabled,
      type = 'text',
      ...props
    },
    ref
  ) => {
    // Generate unique ID if not provided
    const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    // Base input styles (Dark Theme)
    const inputStyles = cn(
      'px-4 py-3 rounded-md border',
      'text-base text-gray-900 placeholder:text-gray-500',
      'bg-white',
      'transition-colors duration-200',
      'focus:outline-none focus:ring-2',
      'disabled:bg-white disabled:cursor-not-allowed disabled:text-gray-500',
      // Add padding for icons
      startIcon && 'pl-10',
      endIcon && 'pr-10',
      // Error state styling
      error
        ? 'border-error-500 focus:border-error-500 focus:ring-error-500'
        : 'border-gray-300 focus:border-primary-600 focus:ring-primary-600 focus:ring-opacity-50',
      fullWidth ? 'w-full' : 'w-auto',
      className
    );

    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-gray-900"
          >
            {label}
            {required && (
              <span className="text-error-500 ml-1" aria-label="required">
                *
              </span>
            )}
          </label>
        )}

        {/* Input wrapper for icons */}
        <div className="relative">
          {/* Start icon */}
          {startIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
              {startIcon}
            </div>
          )}

          {/* Input field */}
          <input
            ref={ref}
            id={inputId}
            type={type}
            className={inputStyles}
            disabled={disabled}
            required={required}
            aria-invalid={!!error}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            {...props}
          />

          {/* End icon */}
          {endIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
              {endIcon}
            </div>
          )}
        </div>

        {/* Error message */}
        {error && (
          <p
            id={errorId}
            className="text-sm text-error-500 flex items-center gap-1"
            role="alert"
          >
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}

        {/* Helper text (only shown when no error) */}
        {!error && helperText && (
          <p id={helperId} className="text-sm text-gray-600">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
