'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';
import { Badge } from '@/components/shared/Badge';
import { mockInventory, getProductsByCategory } from '@/lib/data/mockInventory';
import { Product, ProductCategory } from '@/lib/types/product';
import { formatCurrency } from '@/lib/utils/formatting';
import { ShoppingCartIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// Product category tabs
const CATEGORIES: { value: ProductCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All Products' },
  { value: 'base-coats', label: 'Base Coats' },
  { value: 'top-coats', label: 'Top Coats' },
  { value: 'flakes', label: 'Flakes' },
  { value: 'metallic', label: 'Metallic' },
  { value: 'primers', label: 'Primers' },
  { value: 'tools', label: 'Tools' },
];

// Stock status badge config
const getStockStatus = (product: Product) => {
  if (product.stockLevel === 0) {
    return { label: 'Out of Stock', variant: 'error' as const };
  }
  if (product.stockLevel <= product.reorderLevel) {
    return { label: 'Low Stock', variant: 'warning' as const };
  }
  return { label: 'In Stock', variant: 'success' as const };
};

export default function ProInventoryPage() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);

  // Load cart count from localStorage on mount
  useState(() => {
    if (typeof window !== 'undefined') {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(cart.length);
    }
  });

  // Filter products
  const filteredProducts = useMemo(() => {
    let products = selectedCategory === 'all'
      ? mockInventory
      : getProductsByCategory(selectedCategory);

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.sku.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return products;
  }, [selectedCategory, searchQuery]);

  // Add to cart handler
  const handleAddToCart = (product: Product) => {
    if (typeof window === 'undefined') return;

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    // Check if product already in cart
    const existingIndex = cart.findIndex((item: any) => item.productId === product.id);

    if (existingIndex >= 0) {
      // Increment quantity
      cart[existingIndex].quantity += 1;
    } else {
      // Add new item
      cart.push({
        productId: product.id,
        quantity: 1,
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    setCartCount(cart.length);

    // Show success feedback (could be replaced with toast notification)
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Product Inventory"
        description="Browse and order Stonecoat materials at pro pricing"
        actions={
          <Link href="/pro/orders/new">
            <Button variant="primary">
              <ShoppingCartIcon className="w-5 h-5" />
              View Cart {cartCount > 0 && `(${cartCount})`}
            </Button>
          </Link>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Search products by name, SKU, or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            startIcon={<MagnifyingGlassIcon className="w-5 h-5" />}
          />
        </div>

        {/* Category Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            {CATEGORIES.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                  ${
                    selectedCategory === category.value
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-200'
                  }
                `}
              >
                {category.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Product Count */}
        <div className="mb-4 text-sm text-gray-600">
          Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <p className="text-gray-500">No products found matching your criteria.</p>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const stockStatus = getStockStatus(product);

              return (
                <Card key={product.id} hoverable>
                  <div className="flex flex-col h-full">
                    {/* Product Header */}
                    <div className="mb-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-500">{product.sku}</p>
                        </div>
                        <Badge variant={stockStatus.variant} label={stockStatus.label} />
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {product.description}
                      </p>
                    </div>

                    {/* Product Specs */}
                    {product.specs.coverage && (
                      <div className="mb-4 text-sm">
                        <span className="text-gray-500">Coverage:</span>{' '}
                        <span className="text-gray-900">{product.specs.coverage}</span>
                      </div>
                    )}

                    {/* Tags */}
                    {product.tags.length > 0 && (
                      <div className="mb-4 flex flex-wrap gap-1">
                        {product.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-900"
                          >
                            {tag}
                          </span>
                        ))}
                        {product.tags.length > 3 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-900">
                            +{product.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* Pricing & Action */}
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="text-2xl font-bold text-gray-900">
                            {formatCurrency(product.proCost)}
                          </div>
                          <div className="text-xs text-gray-500">
                            per {product.unit}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500 line-through">
                            {formatCurrency(product.retailPrice)}
                          </div>
                          <div className="text-xs text-green-600 font-medium">
                            Pro Price
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={() => handleAddToCart(product)}
                        variant="primary"
                        size="sm"
                        fullWidth
                        disabled={product.stockLevel === 0}
                      >
                        <ShoppingCartIcon className="w-4 h-4" />
                        {product.stockLevel === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
