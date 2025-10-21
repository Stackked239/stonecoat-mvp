/**
 * Badge Component
 * Status badge component for displaying quote, order, and job statuses
 * Uses color configurations from lib/utils/constants.ts
 */

import { cn } from '@/lib/utils/cn';
import {
  QUOTE_STATUS_COLORS,
  ORDER_STATUS_COLORS,
  JOB_STATUS_COLORS,
  QuoteStatusKey,
  OrderStatusKey,
  JobStatusKey,
} from '@/lib/utils/constants';

export interface BadgeProps {
  /**
   * Quote status variant
   */
  quoteStatus?: QuoteStatusKey;

  /**
   * Order status variant
   */
  orderStatus?: OrderStatusKey;

  /**
   * Job status variant
   */
  jobStatus?: JobStatusKey;

  /**
   * Custom badge text (for non-status badges)
   */
  label?: string;

  /**
   * Custom variant (when not using predefined statuses)
   */
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'neutral';

  /**
   * Badge size
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Badge component for status indicators and labels
 *
 * @example
 * ```tsx
 * // Quote status badge
 * <Badge quoteStatus="accepted" />
 *
 * // Order status badge
 * <Badge orderStatus="shipped" size="lg" />
 *
 * // Custom badge
 * <Badge label="Premium" variant="primary" size="sm" />
 * ```
 */
export function Badge({
  quoteStatus,
  orderStatus,
  jobStatus,
  label,
  variant = 'neutral',
  size = 'md',
  className,
}: BadgeProps) {
  // Determine badge configuration based on status type
  let badgeConfig: {
    bg: string;
    text: string;
    border: string;
    label: string;
  } | null = null;

  if (quoteStatus) {
    badgeConfig = QUOTE_STATUS_COLORS[quoteStatus];
  } else if (orderStatus) {
    badgeConfig = ORDER_STATUS_COLORS[orderStatus];
  } else if (jobStatus) {
    badgeConfig = JOB_STATUS_COLORS[jobStatus];
  }

  // Custom variant styling (Light Theme)
  const variantStyles = {
    primary: 'bg-primary-50 text-primary-700 border-primary-200',
    success: 'bg-green-50 text-green-700 border-green-200',
    warning: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    error: 'bg-red-50 text-red-700 border-red-200',
    neutral: 'bg-gray-100 text-gray-700 border-gray-300',
  };

  // Size-specific styles
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-base',
  };

  // Base badge styles
  const baseStyles = cn(
    'inline-flex items-center gap-1.5',
    'rounded-full font-medium',
    'border',
    'transition-colors duration-200',
    sizeStyles[size]
  );

  // Apply either status config or custom variant
  const colorStyles = badgeConfig
    ? cn(badgeConfig.bg, badgeConfig.text, badgeConfig.border)
    : variantStyles[variant];

  // Determine display text
  const displayText = badgeConfig ? badgeConfig.label : label;

  return (
    <span className={cn(baseStyles, colorStyles, className)}>
      {/* Status indicator dot */}
      <span
        className={cn(
          'inline-block rounded-full',
          size === 'sm' ? 'w-1.5 h-1.5' : size === 'md' ? 'w-2 h-2' : 'w-2.5 h-2.5',
          badgeConfig ? badgeConfig.text : variantStyles[variant].split(' ')[1]
        )}
        aria-hidden="true"
      />
      {displayText}
    </span>
  );
}

/**
 * Badge variants for common use cases
 */
export const BadgeVariants = {
  /**
   * Quote status badge
   */
  Quote: ({ status, ...props }: Omit<BadgeProps, 'quoteStatus'> & { status: QuoteStatusKey }) => (
    <Badge quoteStatus={status} {...props} />
  ),

  /**
   * Order status badge
   */
  Order: ({ status, ...props }: Omit<BadgeProps, 'orderStatus'> & { status: OrderStatusKey }) => (
    <Badge orderStatus={status} {...props} />
  ),

  /**
   * Job status badge
   */
  Job: ({ status, ...props }: Omit<BadgeProps, 'jobStatus'> & { status: JobStatusKey }) => (
    <Badge jobStatus={status} {...props} />
  ),
};
