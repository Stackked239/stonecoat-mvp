'use client';

/**
 * Stone Coat Countertops - Form Components
 *
 * Branded input, textarea, select, and form components
 */

import React, { forwardRef } from 'react';

// ============================================
// INPUT COMPONENT
// ============================================

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label, 
    error, 
    helperText, 
    leftIcon, 
    rightIcon, 
    fullWidth = false,
    className = '',
    id,
    ...props 
  }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    
    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label 
            htmlFor={inputId} 
            className="block text-sm font-semibold text-brand-black mb-2"
          >
            {label}
            {props.required && <span className="text-brand-orange ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId}
            className={`
              w-full px-4 py-2.5 
              ${leftIcon ? 'pl-10' : ''}
              ${rightIcon ? 'pr-10' : ''}
              border ${error ? 'border-brand-orange' : 'border-gray-300'}
              rounded-md
              focus:outline-none focus:ring-2 
              ${error ? 'focus:ring-brand-orange/50' : 'focus:ring-brand-orange'}
              focus:border-transparent
              font-montserrat
              placeholder:text-gray-400
              transition-all duration-200
              disabled:bg-gray-100 disabled:cursor-not-allowed
              ${className}
            `}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>
        
        {error && (
          <p className="text-sm text-brand-orange mt-1 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p className="text-sm text-brand-black/60 mt-1">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// ============================================
// TEXTAREA COMPONENT
// ============================================

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    label, 
    error, 
    helperText, 
    fullWidth = false,
    className = '',
    id,
    rows = 4,
    ...props 
  }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');
    
    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label 
            htmlFor={textareaId} 
            className="block text-sm font-semibold text-brand-black mb-2"
          >
            {label}
            {props.required && <span className="text-brand-orange ml-1">*</span>}
          </label>
        )}
        
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={`
            w-full px-4 py-2.5
            border ${error ? 'border-brand-orange' : 'border-gray-300'}
            rounded-md
            focus:outline-none focus:ring-2 
            ${error ? 'focus:ring-brand-orange/50' : 'focus:ring-brand-orange'}
            focus:border-transparent
            font-montserrat
            placeholder:text-gray-400
            transition-all duration-200
            disabled:bg-gray-100 disabled:cursor-not-allowed
            resize-y
            ${className}
          `}
          {...props}
        />
        
        {error && (
          <p className="text-sm text-brand-orange mt-1 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p className="text-sm text-brand-black/60 mt-1">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

// ============================================
// SELECT COMPONENT
// ============================================

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: { value: string; label: string }[];
  fullWidth?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    label, 
    error, 
    helperText, 
    options,
    fullWidth = false,
    className = '',
    id,
    ...props 
  }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');
    
    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label 
            htmlFor={selectId} 
            className="block text-sm font-semibold text-brand-black mb-2"
          >
            {label}
            {props.required && <span className="text-brand-orange ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={`
              w-full px-4 py-2.5 pr-10
              border ${error ? 'border-brand-orange' : 'border-gray-300'}
              rounded-md
              focus:outline-none focus:ring-2 
              ${error ? 'focus:ring-brand-orange/50' : 'focus:ring-brand-orange'}
              focus:border-transparent
              font-montserrat
              transition-all duration-200
              disabled:bg-gray-100 disabled:cursor-not-allowed
              appearance-none
              bg-white
              cursor-pointer
              ${className}
            `}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        
        {error && (
          <p className="text-sm text-brand-orange mt-1 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p className="text-sm text-brand-black/60 mt-1">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

// ============================================
// CHECKBOX COMPONENT
// ============================================

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const checkboxId = id || label.toLowerCase().replace(/\s+/g, '-');
    
    return (
      <div>
        <div className="flex items-start gap-3">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className={`
              w-5 h-5 mt-0.5
              border-2 border-gray-300
              rounded
              text-brand-orange
              focus:ring-2 focus:ring-brand-orange focus:ring-offset-2
              transition-all duration-200
              cursor-pointer
              disabled:cursor-not-allowed disabled:opacity-50
              ${className}
            `}
            {...props}
          />
          <label 
            htmlFor={checkboxId} 
            className="text-sm text-brand-black cursor-pointer select-none"
          >
            {label}
            {props.required && <span className="text-brand-orange ml-1">*</span>}
          </label>
        </div>
        
        {error && (
          <p className="text-sm text-brand-orange mt-1 ml-8 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

// ============================================
// RADIO COMPONENT
// ============================================

interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const radioId = id || `${props.name}-${props.value}`;
    
    return (
      <div>
        <div className="flex items-start gap-3">
          <input
            ref={ref}
            type="radio"
            id={radioId}
            className={`
              w-5 h-5 mt-0.5
              border-2 border-gray-300
              text-brand-orange
              focus:ring-2 focus:ring-brand-orange focus:ring-offset-2
              transition-all duration-200
              cursor-pointer
              disabled:cursor-not-allowed disabled:opacity-50
              ${className}
            `}
            {...props}
          />
          <label 
            htmlFor={radioId} 
            className="text-sm text-brand-black cursor-pointer select-none"
          >
            {label}
            {props.required && <span className="text-brand-orange ml-1">*</span>}
          </label>
        </div>
        
        {error && (
          <p className="text-sm text-brand-orange mt-1 ml-8">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';

// ============================================
// FORM COMPONENT
// ============================================

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

export function Form({ children, className = '', ...props }: FormProps) {
  return (
    <form className={`space-y-6 ${className}`} {...props}>
      {children}
    </form>
  );
}

// ============================================
// FORM GROUP COMPONENT
// ============================================

interface FormGroupProps {
  children: React.ReactNode;
  className?: string;
}

export function FormGroup({ children, className = '' }: FormGroupProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {children}
    </div>
  );
}

// ============================================
// FORM ROW COMPONENT (for side-by-side inputs)
// ============================================

interface FormRowProps {
  children: React.ReactNode;
  cols?: 2 | 3 | 4;
  className?: string;
}

export function FormRow({ children, cols = 2, className = '' }: FormRowProps) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid ${gridCols[cols]} gap-4 ${className}`}>
      {children}
    </div>
  );
}
