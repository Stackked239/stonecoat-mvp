'use client';

/**
 * Admin Inventory Management Page
 * Stock management dashboard with filters, search, and stock alerts
 */

'use client';

import { useState, useMemo } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/shared/Card';
import { DataTable, DataTableColumn } from '@/components/shared/DataTable';
import { Badge } from '@/components/shared/Badge';
import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';
import { mockInventory } from '@/lib/data/mockInventory';
import { Product, ProductCategory } from '@/lib/types/product';
import { formatCurrency } from '@/lib/utils/formatting';

/**
 * Stock status type
 */
type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock';

/**
 * Determine stock status based on current stock and reorder level
 */
function getStockStatus(product: Product): StockStatus {
  if (product.stockLevel === 0) return 'out-of-stock';
  if (product.stockLevel <= product.reorderLevel) return 'low-stock';
  return 'in-stock';
}

/**
 * Get stock status badge variant
 */
function getStockStatusBadge(status: StockStatus): {
  label: string;
  variant: 'success' | 'warning' | 'error';
} {
  const statusMap = {
    'in-stock': { label: 'In Stock', variant: 'success' as const },
    'low-stock': { label: 'Low Stock', variant: 'warning' as const },
    'out-of-stock': { label: 'Out of Stock', variant: 'error' as const },
  };
  return statusMap[status];
}

/**
 * Category display names
 */
const CATEGORY_NAMES: Record<ProductCategory, string> = {
  'base-coats': 'Base Coats',
  'top-coats': 'Top Coats',
  flakes: 'Flakes',
  metallic: 'Metallic',
  primers: 'Primers',
  tools: 'Tools',
  accessories: 'Accessories',
};

export default function AdminInventoryPage() {
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [selectedStockStatus, setSelectedStockStatus] = useState<StockStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate summary metrics
  const summaryMetrics = useMemo(() => {
    const totalProducts = mockInventory.length;
    const totalInventoryValue = mockInventory.reduce(
      (sum, product) => sum + product.proCost * product.stockLevel,
      0
    );
    const lowStockItems = mockInventory.filter(
      (product) => getStockStatus(product) === 'low-stock'
    ).length;
    const outOfStockItems = mockInventory.filter(
      (product) => getStockStatus(product) === 'out-of-stock'
    ).length;

    return {
      totalProducts,
      totalInventoryValue,
      lowStockItems,
      outOfStockItems,
    };
  }, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    return mockInventory.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Stock status filter
      if (selectedStockStatus !== 'all') {
        const productStatus = getStockStatus(product);
        if (productStatus !== selectedStockStatus) {
          return false;
        }
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          product.name.toLowerCase().includes(query) ||
          product.sku.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [selectedCategory, selectedStockStatus, searchQuery]);

  // Get low stock products for alert section
  const lowStockProducts = useMemo(() => {
    return mockInventory.filter(
      (product) =>
        getStockStatus(product) === 'low-stock' || getStockStatus(product) === 'out-of-stock'
    );
  }, []);

  // Calculate profit margin percentage
  const calculateMargin = (product: Product): number => {
    return ((product.retailPrice - product.proCost) / product.retailPrice) * 100;
  };

  // DataTable columns
  const columns: DataTableColumn<Product>[] = [
    {
      key: 'name',
      label: 'Product Name',
      sortable: true,
      render: (value, product) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">{product.name}</span>
          <span className="text-sm text-gray-500">{product.sku}</span>
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      sortable: true,
      render: (value) => (
        <span className="text-sm text-gray-600">
          {CATEGORY_NAMES[value as ProductCategory]}
        </span>
      ),
    },
    {
      key: 'proCost',
      label: 'Pro Cost',
      sortable: true,
      align: 'right',
      render: (value) => (
        <span className="font-medium text-gray-900">{formatCurrency(value)}</span>
      ),
    },
    {
      key: 'retailPrice',
      label: 'Retail Price',
      sortable: true,
      align: 'right',
      render: (value) => (
        <span className="text-gray-600">{formatCurrency(value)}</span>
      ),
    },
    {
      key: 'margin',
      label: 'Margin',
      sortable: true,
      align: 'right',
      render: (_, product) => {
        const margin = calculateMargin(product);
        return <span className="text-gray-600">{margin.toFixed(1)}%</span>;
      },
    },
    {
      key: 'stockLevel',
      label: 'Current Stock',
      sortable: true,
      align: 'right',
      render: (value, product) => (
        <span className="font-medium text-gray-900">
          {value} {product.unit}
        </span>
      ),
    },
    {
      key: 'reorderLevel',
      label: 'Reorder Point',
      sortable: true,
      align: 'right',
      render: (value, product) => (
        <span className="text-gray-600">
          {value} {product.unit}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Stock Status',
      sortable: false,
      align: 'center',
      render: (_, product) => {
        const status = getStockStatus(product);
        const badgeConfig = getStockStatusBadge(status);
        return (
          <Badge
            label={badgeConfig.label}
            variant={badgeConfig.variant}
            size="sm"
          />
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Inventory Management"
        description="Monitor stock levels, manage products, and track inventory value"
        actions={
          <>
            <Button variant="outline" size="md">
              Export Inventory
            </Button>
            <Button variant="primary" size="md">
              Add New Product
            </Button>
          </>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-gray-600">Total Products</p>
            <p className="text-3xl font-bold text-gray-900">
              {summaryMetrics.totalProducts}
            </p>
            <p className="text-xs text-gray-500">Across all categories</p>
          </div>
        </Card>

        <Card>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-gray-600">Total Inventory Value</p>
            <p className="text-3xl font-bold text-gray-900">
              {formatCurrency(summaryMetrics.totalInventoryValue)}
            </p>
            <p className="text-xs text-gray-500">At pro cost pricing</p>
          </div>
        </Card>

        <Card>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
            <p className="text-3xl font-bold text-warning-600">
              {summaryMetrics.lowStockItems}
            </p>
            <p className="text-xs text-gray-500">At or below reorder level</p>
          </div>
        </Card>

        <Card>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-gray-600">Out of Stock</p>
            <p className="text-3xl font-bold text-error-600">
              {summaryMetrics.outOfStockItems}
            </p>
            <p className="text-xs text-gray-500">Immediate attention needed</p>
          </div>
        </Card>
      </div>

      {/* Low Stock Alert Section */}
      {lowStockProducts.length > 0 && (
        <Card variant="outlined">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-warning-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  Low Stock Alert
                </h3>
                <p className="text-sm text-gray-600">
                  {lowStockProducts.length} product{lowStockProducts.length !== 1 ? 's' : ''}{' '}
                  need reordering
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {lowStockProducts.slice(0, 6).map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between rounded-lg border border-gray-200 p-3"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-500">{product.sku}</p>
                  </div>
                  <div className="flex-shrink-0 ml-3 text-right">
                    <p className="text-sm font-semibold text-gray-900">
                      {product.stockLevel} {product.unit}
                    </p>
                    <p className="text-xs text-gray-500">
                      Min: {product.reorderLevel}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {lowStockProducts.length > 6 && (
              <button
                onClick={() => setSelectedStockStatus('low-stock')}
                className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
              >
                View all {lowStockProducts.length} low stock items →
              </button>
            )}
          </div>
        </Card>
      )}

      {/* Filters Section */}
      <Card>
        <div className="flex flex-col gap-4 md:flex-row md:items-end">
          {/* Search Input */}
          <div className="flex-1">
            <Input
              label="Search Products"
              placeholder="Search by name, SKU, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              startIcon={
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              }
            />
          </div>

          {/* Category Filter */}
          <div className="w-full md:w-48">
            <label
              htmlFor="category-filter"
              className="block text-sm font-medium text-gray-600 mb-1.5"
            >
              Category
            </label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as ProductCategory | 'all')}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
            >
              <option value="all">All Categories</option>
              {Object.entries(CATEGORY_NAMES).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Stock Status Filter */}
          <div className="w-full md:w-48">
            <label
              htmlFor="status-filter"
              className="block text-sm font-medium text-gray-600 mb-1.5"
            >
              Stock Status
            </label>
            <select
              id="status-filter"
              value={selectedStockStatus}
              onChange={(e) => setSelectedStockStatus(e.target.value as StockStatus | 'all')}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
            >
              <option value="all">All Status</option>
              <option value="in-stock">In Stock</option>
              <option value="low-stock">Low Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>

          {/* Clear Filters Button */}
          {(selectedCategory !== 'all' ||
            selectedStockStatus !== 'all' ||
            searchQuery.trim()) && (
            <Button
              variant="ghost"
              size="md"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedStockStatus('all');
                setSearchQuery('');
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>
      </Card>

      {/* Products DataTable */}
      <Card padding="none">
        <DataTable
          columns={columns}
          data={filteredProducts}
          keyExtractor={(product) => product.id}
          actions={[
            {
              label: 'Update Stock',
              variant: 'outline',
              onClick: (product) => {
                // Placeholder for stock update modal
                console.log('Update stock for:', product.name);
              },
            },
          ]}
          pagination={{
            enabled: true,
            pageSize: 20,
          }}
          sortable
          emptyState={
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your filters or search query
              </p>
            </div>
          }
        />
      </Card>
    </div>
  );
}
