/**
 * PageHeader Component
 * Reusable page header with title, breadcrumbs, description, and action buttons
 * Used across all three portals for consistent page layouts
 */

import { ReactNode } from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageHeaderProps {
  /**
   * Main page title
   */
  title: string;

  /**
   * Optional subtitle displayed below title
   */
  subtitle?: string;

  /**
   * Optional description text
   */
  description?: string;

  /**
   * Optional breadcrumb navigation
   */
  breadcrumbs?: BreadcrumbItem[];

  /**
   * Optional action buttons (rendered on the right)
   */
  actions?: ReactNode;
}

/**
 * PageHeader component for consistent page layouts
 *
 * @example
 * ```tsx
 * <PageHeader
 *   title="Dashboard"
 *   subtitle="Welcome back, John"
 *   breadcrumbs={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Dashboard' }
 *   ]}
 *   actions={
 *     <Button variant="primary">Create Quote</Button>
 *   }
 * />
 * ```
 */
export function PageHeader({
  title,
  subtitle,
  description,
  breadcrumbs,
  actions,
}: PageHeaderProps) {
  return (
    <div className="mb-8">
      {/* Breadcrumbs - Dark Theme */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="mb-4" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            {breadcrumbs.map((crumb, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <svg
                    className="w-4 h-4 mx-2 text-[#666666]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {crumb.href ? (
                  <a
                    href={crumb.href}
                    className="hover:text-gray-900 transition-colors"
                  >
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-gray-900 font-medium">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      {/* Header content - Dark Theme */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex-1 min-w-0">
          {/* Title and subtitle */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-1 text-lg text-gray-600">{subtitle}</p>
            )}
          </div>

          {/* Description */}
          {description && (
            <p className="mt-2 text-base text-gray-600 max-w-3xl">
              {description}
            </p>
          )}
        </div>

        {/* Actions */}
        {actions && (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center md:ml-4">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
