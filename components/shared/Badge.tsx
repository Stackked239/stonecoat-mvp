'use client';

/**
 * Stone Coat Countertops - Badge & Utility Components
 * 
 * Badges, dividers, and other small UI elements
 */

import React from 'react';

// ============================================
// BADGE COMPONENT
// ============================================

type BadgeVariant = 'orange' | 'blue' | 'green' | 'gold' | 'gray' | 'outline';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  rounded?: boolean;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  orange: 'bg-brand-orange/10 text-brand-orange',
  blue: 'bg-accent-blue/10 text-accent-blue',
  green: 'bg-accent-green/10 text-accent-green',
  gold: 'bg-accent-gold/10 text-accent-gold',
  gray: 'bg-gray-100 text-gray-700',
  outline: 'border-2 border-brand-orange text-brand-orange bg-transparent',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
};

export function Badge({ 
  children, 
  variant = 'orange', 
  size = 'md',
  rounded = true,
  className = '' 
}: BadgeProps) {
  return (
    <span 
      className={`
        inline-flex items-center font-semibold
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${rounded ? 'rounded-full' : 'rounded-md'}
        ${className}
      `}
    >
      {children}
    </span>
  );
}

// Status badges for common use cases
export function StatusBadge({ status }: { status: string }) {
  const statusConfig: Record<string, { variant: BadgeVariant; label: string }> = {
    // Quote statuses
    active: { variant: 'green', label: 'Active' },
    pending: { variant: 'gold', label: 'Pending' },
    requested: { variant: 'gold', label: 'Requested' },
    sent: { variant: 'blue', label: 'Sent' },
    accepted: { variant: 'green', label: 'Accepted' },
    declined: { variant: 'gray', label: 'Declined' },
    expired: { variant: 'gray', label: 'Expired' },

    // Job statuses
    'quote-sent': { variant: 'blue', label: 'Quote Sent' },
    'materials-ordered': { variant: 'gold', label: 'Materials Ordered' },
    'scheduled': { variant: 'orange', label: 'Scheduled' },
    'in-progress': { variant: 'blue', label: 'In Progress' },
    'completed': { variant: 'green', label: 'Completed' },
    'cancelled': { variant: 'gray', label: 'Cancelled' },
    'on-hold': { variant: 'gold', label: 'On Hold' },
  };

  // Fallback for unknown statuses
  const config = statusConfig[status] || {
    variant: 'gray' as BadgeVariant,
    label: status.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  };

  return (
    <Badge variant={config.variant}>
      {config.label}
    </Badge>
  );
}

// ============================================
// DIVIDER COMPONENT
// ============================================

interface DividerProps {
  text?: string;
  className?: string;
}

export function Divider({ text, className = '' }: DividerProps) {
  if (text) {
    return (
      <div className={`relative flex items-center my-8 ${className}`}>
        <div className="flex-grow border-t-2 border-brand-orange/20"></div>
        <span className="flex-shrink mx-4 text-brand-black/60 font-medium">
          {text}
        </span>
        <div className="flex-grow border-t-2 border-brand-orange/20"></div>
      </div>
    );
  }

  return (
    <div className={`border-t-2 border-brand-orange/20 my-8 ${className}`} />
  );
}

// ============================================
// SECTION HEADER COMPONENT
// ============================================

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({ 
  title, 
  subtitle, 
  centered = false,
  className = '' 
}: SectionHeaderProps) {
  return (
    <div className={`mb-8 ${centered ? 'text-center max-w-3xl mx-auto' : ''} ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-xl text-brand-black/70">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ============================================
// PRO TIP CALLOUT
// ============================================

interface ProTipProps {
  children: React.ReactNode;
  className?: string;
}

export function ProTip({ children, className = '' }: ProTipProps) {
  return (
    <div className={`bg-accent-gold/10 border-l-4 border-accent-gold p-6 rounded-r-lg ${className}`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <svg 
            className="w-8 h-8 text-accent-gold" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-accent-gold text-lg mb-2">PRO TIP</h4>
          <div className="text-brand-black/80">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// ICON FEATURE (for product features)
// ============================================

interface IconFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  size?: 'md' | 'lg';
  className?: string;
}

export function IconFeature({ 
  icon, 
  title, 
  description, 
  size = 'md',
  className = '' 
}: IconFeatureProps) {
  const iconSize = size === 'lg' ? 'w-20 h-20 text-3xl' : 'w-16 h-16 text-2xl';

  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <div className={`${iconSize} bg-brand-orange rounded-full flex items-center justify-center text-white shadow-brand mb-4`}>
        {icon}
      </div>
      <h3 className="font-semibold text-lg md:text-xl text-brand-black mb-2">
        {title}
      </h3>
      <p className="text-brand-black/70">
        {description}
      </p>
    </div>
  );
}

// ============================================
// ALERT COMPONENT
// ============================================

type AlertVariant = 'info' | 'success' | 'warning' | 'error';

interface AlertProps {
  children: React.ReactNode;
  variant?: AlertVariant;
  title?: string;
  onClose?: () => void;
  className?: string;
}

const alertStyles: Record<AlertVariant, { bg: string; border: string; text: string; icon: React.ReactNode }> = {
  info: {
    bg: 'bg-accent-blue/10',
    border: 'border-accent-blue',
    text: 'text-accent-blue',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    ),
  },
  success: {
    bg: 'bg-accent-green/10',
    border: 'border-accent-green',
    text: 'text-accent-green',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
  },
  warning: {
    bg: 'bg-accent-gold/10',
    border: 'border-accent-gold',
    text: 'text-accent-gold',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
  },
  error: {
    bg: 'bg-brand-orange/10',
    border: 'border-brand-orange',
    text: 'text-brand-orange',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    ),
  },
};

export function Alert({ 
  children, 
  variant = 'info', 
  title,
  onClose,
  className = '' 
}: AlertProps) {
  const styles = alertStyles[variant];

  return (
    <div className={`${styles.bg} border-l-4 ${styles.border} p-4 rounded-r-lg ${className}`}>
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 ${styles.text}`}>
          {styles.icon}
        </div>
        <div className="flex-1">
          {title && (
            <h4 className={`font-semibold ${styles.text} mb-1`}>
              {title}
            </h4>
          )}
          <div className="text-brand-black/80 text-sm">
            {children}
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className={`flex-shrink-0 ${styles.text} hover:opacity-70 transition-opacity`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

// ============================================
// SPINNER / LOADER
// ============================================

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'orange' | 'white' | 'black';
  className?: string;
}

export function Spinner({ size = 'md', color = 'orange', className = '' }: SpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const colorClasses = {
    orange: 'text-brand-orange',
    white: 'text-white',
    black: 'text-brand-black',
  };

  return (
    <svg
      className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
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
  );
}

// Loading overlay for full-page loads
export function LoadingOverlay({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 flex flex-col items-center gap-4">
        <Spinner size="lg" />
        <p className="text-brand-black font-medium">{message}</p>
      </div>
    </div>
  );
}
