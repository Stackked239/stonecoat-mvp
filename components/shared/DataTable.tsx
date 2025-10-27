'use client';

/**
 * DataTable Component
 * Advanced table component with sorting, pagination, loading states, and row actions
 * Generic TypeScript implementation works with any data type
 * Used across pro and admin portals for data-heavy interfaces
 */

'use client';

import { ReactNode, useState, useMemo } from 'react';
import { cn } from '@/lib/utils/cn';
import { Button } from './Button';

/**
 * Column configuration for DataTable
 */
export interface DataTableColumn<T> {
  /**
   * Unique key for the column (maps to data property)
   */
  key: string;

  /**
   * Display label for column header
   */
  label: string;

  /**
   * Enable sorting for this column
   */
  sortable?: boolean;

  /**
   * Fixed width for column (CSS width value)
   */
  width?: string;

  /**
   * Text alignment in column cells
   */
  align?: 'left' | 'center' | 'right';

  /**
   * Custom render function for cell content
   * @param value - The cell value
   * @param item - The full row data object
   * @param index - Row index
   */
  render?: (value: any, item: T, index: number) => ReactNode;
}

/**
 * Row action configuration
 */
export interface DataTableAction<T> {
  /**
   * Action button label
   */
  label: string;

  /**
   * Action handler function
   * @param item - The row data object
   */
  onClick: (item: T) => void;

  /**
   * Button variant styling
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

  /**
   * Optional icon to display in button
   */
  icon?: ReactNode;
}

/**
 * DataTable component props
 */
export interface DataTableProps<T> {
  /**
   * Column definitions
   */
  columns: DataTableColumn<T>[];

  /**
   * Table data array
   */
  data: T[];

  /**
   * Function to extract unique key from each row
   */
  keyExtractor: (item: T) => string | number;

  /**
   * Optional row actions (rendered in last column)
   */
  actions?: DataTableAction<T>[];

  /**
   * Custom empty state component
   */
  emptyState?: ReactNode;

  /**
   * Loading state - shows spinner
   */
  loading?: boolean;

  /**
   * Pagination configuration
   */
  pagination?: {
    enabled: boolean;
    pageSize?: number;
    currentPage?: number;
    onPageChange?: (page: number) => void;
  };

  /**
   * Enable sorting functionality
   */
  sortable?: boolean;

  /**
   * Sort change handler (for server-side sorting)
   */
  onSort?: (key: string, direction: 'asc' | 'desc') => void;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * DataTable component with sorting, pagination, and actions
 *
 * @example
 * ```tsx
 * <DataTable
 *   columns={[
 *     { key: 'name', label: 'Name', sortable: true },
 *     { key: 'status', label: 'Status', render: (value) => <Badge>{value}</Badge> }
 *   ]}
 *   data={quotes}
 *   keyExtractor={(item) => item.id}
 *   actions={[
 *     { label: 'View', onClick: (item) => router.push(`/quotes/${item.id}`) }
 *   ]}
 *   pagination={{ enabled: true, pageSize: 10 }}
 *   sortable
 * />
 * ```
 */
export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  keyExtractor,
  actions,
  emptyState,
  loading = false,
  pagination,
  sortable = true,
  onSort,
  className,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(
    pagination?.currentPage || 1
  );

  // Pagination configuration
  const pageSize = pagination?.pageSize || 10;
  const paginationEnabled = pagination?.enabled || false;

  // Sorting logic
  const sortedData = useMemo(() => {
    if (!sortKey || !sortable) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (aValue === bValue) return 0;

      let comparison = 0;
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        comparison = aValue.localeCompare(bValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        comparison = aValue - bValue;
      } else {
        comparison = String(aValue).localeCompare(String(bValue));
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [data, sortKey, sortDirection, sortable]);

  // Pagination logic
  const paginatedData = useMemo(() => {
    if (!paginationEnabled) return sortedData;

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, pageSize, paginationEnabled]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  // Handle sort
  const handleSort = (key: string) => {
    if (!sortable) return;

    const column = columns.find((col) => col.key === key);
    if (!column?.sortable) return;

    const newDirection =
      sortKey === key && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortKey(key);
    setSortDirection(newDirection);

    if (onSort) {
      onSort(key, newDirection);
    }
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (pagination?.onPageChange) {
      pagination.onPageChange(page);
    }
  };

  // Render loading state (Dark Theme)
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <svg
            className="animate-spin h-8 w-8 text-primary-600 mx-auto mb-4"
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
          <p className="text-gray-500">Loading data...</p>
        </div>
      </div>
    );
  }

  // Render empty state (Dark Theme)
  if (data.length === 0) {
    if (emptyState) {
      return <div className="py-12">{emptyState}</div>;
    }
    return (
      <div className="text-center py-12">
        <svg
          className="mx-auto h-12 w-12 text-[#666666]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No data</h3>
        <p className="mt-1 text-sm text-gray-500">
          No records to display at this time.
        </p>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col', className)}>
      {/* Table container - responsive horizontal scroll - Dark Theme */}
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden shadow-lg ring-1 ring-gray-300 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              {/* Table head - Dark Theme */}
              <thead className="bg-white">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      scope="col"
                      className={cn(
                        'px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider',
                        column.align === 'center' && 'text-center',
                        column.align === 'right' && 'text-right',
                        !column.align && 'text-left',
                        column.sortable && sortable && 'cursor-pointer select-none hover:bg-gray-100 transition-colors'
                      )}
                      style={{ width: column.width }}
                      onClick={() =>
                        column.sortable && handleSort(column.key)
                      }
                    >
                      <div
                        className={cn(
                          'flex items-center gap-2',
                          column.align === 'center' && 'justify-center',
                          column.align === 'right' && 'justify-end'
                        )}
                      >
                        <span>{column.label}</span>
                        {column.sortable && sortable && (
                          <span className="text-gray-500">
                            {sortKey === column.key ? (
                              sortDirection === 'asc' ? (
                                <svg
                                  className="w-4 h-4"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  className="w-4 h-4"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )
                            ) : (
                              <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
                              </svg>
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                  {actions && Array.isArray(actions) && actions.length > 0 && (
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  )}
                </tr>
              </thead>

              {/* Table body - Dark Theme */}
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedData.map((item, index) => (
                  <tr
                    key={keyExtractor(item)}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={cn(
                          'px-6 py-4 whitespace-nowrap text-sm text-gray-900',
                          column.align === 'center' && 'text-center',
                          column.align === 'right' && 'text-right'
                        )}
                      >
                        {column.render
                          ? column.render(item[column.key], item, index)
                          : item[column.key]}
                      </td>
                    ))}
                    {actions && Array.isArray(actions) && actions.length > 0 && (
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          {actions.map((action, actionIndex) => (
                            <Button
                              key={actionIndex}
                              variant={action.variant || 'ghost'}
                              size="sm"
                              onClick={() => action.onClick(item)}
                            >
                              {action.icon && (
                                <span className="mr-1">{action.icon}</span>
                              )}
                              {action.label}
                            </Button>
                          ))}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination - Dark Theme */}
      {paginationEnabled && totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4 rounded-lg">
          <div className="flex flex-1 justify-between sm:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-600">
                Showing{' '}
                <span className="font-medium text-gray-900">
                  {(currentPage - 1) * pageSize + 1}
                </span>{' '}
                to{' '}
                <span className="font-medium text-gray-900">
                  {Math.min(currentPage * pageSize, sortedData.length)}
                </span>{' '}
                of <span className="font-medium text-gray-900">{sortedData.length}</span>{' '}
                results
              </p>
            </div>
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={cn(
                    'relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0 transition-colors bg-white',
                    currentPage === 1 && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {/* Page numbers - Dark Theme */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => {
                    // Show first, last, current, and adjacent pages
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={cn(
                            'relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0 transition-colors',
                            page === currentPage
                              ? 'z-10 bg-primary-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600'
                              : 'text-gray-900 bg-white'
                          )}
                        >
                          {page}
                        </button>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return (
                        <span
                          key={page}
                          className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-500 ring-1 ring-inset ring-gray-300 bg-white"
                        >
                          ...
                        </span>
                      );
                    }
                    return null;
                  }
                )}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={cn(
                    'relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0 transition-colors bg-white',
                    currentPage === totalPages &&
                      'opacity-50 cursor-not-allowed'
                  )}
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
