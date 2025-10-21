/**
 * Card Component
 * Content container component with header, body, and footer sections
 * Used for displaying grouped content across all portals
 */

import { ReactNode, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Card header content (title, actions, etc.)
   */
  header?: ReactNode;

  /**
   * Card body content (main content area)
   */
  children: ReactNode;

  /**
   * Card footer content (actions, metadata, etc.)
   */
  footer?: ReactNode;

  /**
   * Visual style variant
   */
  variant?: 'default' | 'outlined' | 'elevated' | 'flat';

  /**
   * Add hover effect (lift and shadow)
   */
  hoverable?: boolean;

  /**
   * Add padding to card sections
   */
  padding?: 'none' | 'sm' | 'md' | 'lg';

  /**
   * Divide header/body/footer with borders
   */
  divided?: boolean;
}

/**
 * Flexible card component for content grouping
 *
 * @example
 * ```tsx
 * <Card
 *   header={<h3 className="text-xl font-semibold">Quote Details</h3>}
 *   footer={
 *     <div className="flex gap-2">
 *       <Button variant="outline">Cancel</Button>
 *       <Button variant="primary">Submit</Button>
 *     </div>
 *   }
 * >
 *   <p>Card content goes here...</p>
 * </Card>
 *
 * // Hoverable card
 * <Card variant="elevated" hoverable>
 *   <h4>Clickable Card</h4>
 * </Card>
 * ```
 */
export function Card({
  header,
  children,
  footer,
  variant = 'default',
  hoverable = false,
  padding = 'md',
  divided = false,
  className,
  ...props
}: CardProps) {
  // Base card styles
  const baseStyles = cn(
    'rounded-lg',
    'transition-all duration-300'
  );

  // Variant-specific styles (Dark Theme)
  const variantStyles = {
    default: cn(
      'bg-white',
      'border border-gray-200',
      'shadow-sm',
      hoverable && 'hover:border-gray-300 hover:shadow-md'
    ),
    outlined: cn(
      'bg-white',
      'border border-gray-200',
      hoverable && 'hover:border-gray-300 hover:shadow-sm'
    ),
    elevated: cn(
      'bg-gray-100',
      'border border-gray-300',
      'shadow-lg',
      hoverable && 'hover:shadow-xl hover:-translate-y-1'
    ),
    flat: cn(
      'bg-white',
      hoverable && 'hover:bg-white'
    ),
  };

  // Padding styles for sections
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  // Divider styles (Dark Theme)
  const dividerStyles = divided ? 'border-t border-gray-200' : '';

  return (
    <div
      className={cn(
        baseStyles,
        variantStyles[variant],
        hoverable && 'cursor-pointer',
        className
      )}
      {...props}
    >
      {/* Header section */}
      {header && (
        <div
          className={cn(
            paddingStyles[padding],
            divided && children && 'border-b border-gray-200'
          )}
        >
          {header}
        </div>
      )}

      {/* Body section */}
      <div className={cn(paddingStyles[padding])}>
        {children}
      </div>

      {/* Footer section */}
      {footer && (
        <div
          className={cn(
            paddingStyles[padding],
            dividerStyles
          )}
        >
          {footer}
        </div>
      )}
    </div>
  );
}

/**
 * Card subcomponents for flexible composition
 */
export const CardHeader = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex items-center justify-between', className)} {...props}>
    {children}
  </div>
);

export const CardTitle = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn('text-xl font-semibold text-gray-900', className)} {...props}>
    {children}
  </h3>
);

export const CardDescription = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn('text-sm text-gray-600 mt-1', className)} {...props}>
    {children}
  </p>
);

export const CardContent = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('space-y-4', className)} {...props}>
    {children}
  </div>
);

export const CardFooter = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex items-center gap-3', className)} {...props}>
    {children}
  </div>
);

/**
 * Compound Card component with subcomponents
 */
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;
