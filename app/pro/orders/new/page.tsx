'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';
import { getProductById } from '@/lib/data/mockInventory';
import { Product } from '@/lib/types/product';
import { formatCurrency } from '@/lib/utils/formatting';
import { BUSINESS_CONSTANTS } from '@/lib/utils/constants';
import { TrashIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

interface CartItem {
  productId: string;
  quantity: number;
}

interface CartItemWithProduct extends CartItem {
  product: Product;
  subtotal: number;
}

export default function NewOrderPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartItems(cart);
      setIsLoading(false);
    }
  }, []);

  // Build cart items with product data
  const cartItemsWithProducts: CartItemWithProduct[] = useMemo(() => {
    return cartItems
      .map((item) => {
        const product = getProductById(item.productId);
        if (!product) return null;

        return {
          ...item,
          product,
          subtotal: product.proCost * item.quantity,
        };
      })
      .filter((item): item is CartItemWithProduct => item !== null);
  }, [cartItems]);

  // Calculate totals
  const totals = useMemo(() => {
    const subtotal = cartItemsWithProducts.reduce((sum, item) => sum + item.subtotal, 0);

    // Calculate pro discount (volume-based for demo - simplified)
    let discountPercent = 0;
    if (subtotal > 3000) discountPercent = 6;
    else if (subtotal > 2000) discountPercent = 5;
    else if (subtotal > 1000) discountPercent = 4;
    else if (subtotal > 500) discountPercent = 3;

    const discount = (subtotal * discountPercent) / 100;

    // Shipping calculation
    const shipping =
      subtotal >= BUSINESS_CONSTANTS.FREE_SHIPPING_THRESHOLD
        ? 0
        : BUSINESS_CONSTANTS.STANDARD_SHIPPING_COST;

    // Tax calculation
    const taxableAmount = subtotal - discount + shipping;
    const tax = (taxableAmount * BUSINESS_CONSTANTS.SALES_TAX_RATE_PERCENT) / 100;

    const total = subtotal - discount + shipping + tax;

    return {
      subtotal,
      discount,
      discountPercent,
      shipping,
      tax,
      total,
    };
  }, [cartItemsWithProducts]);

  // Update quantity
  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedCart = cartItems.map((item) =>
      item.productId === productId ? { ...item, quantity: newQuantity } : item
    );

    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Remove item
  const removeItem = (productId: string) => {
    const updatedCart = cartItems.filter((item) => item.productId !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Place order
  const handlePlaceOrder = () => {
    // In a real app, this would create an order via API
    // For MVP, just clear cart and redirect
    if (confirm(`Place order for ${formatCurrency(totals.total)}?`)) {
      localStorage.removeItem('cart');
      alert('Order placed successfully! (Demo mode - no actual order created)');
      router.push('/pro/orders');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading cart...</div>
      </div>
    );
  }

  // Empty cart state
  if (cartItemsWithProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PageHeader
          title="Shopping Cart"
          description="Review and place your material order"
        />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card>
            <div className="text-center py-12">
              <ShoppingBagIcon className="mx-auto h-12 w-12 text-gray-500" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">Your cart is empty</h3>
              <p className="mt-2 text-sm text-gray-500">
                Browse our product inventory to add items to your cart.
              </p>
              <div className="mt-6">
                <Link href="/pro/inventory">
                  <Button variant="primary">
                    Browse Inventory
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Shopping Cart"
        description="Review and place your material order"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItemsWithProducts.map((item) => (
              <Card key={item.productId}>
                <div className="flex items-start gap-4">
                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">{item.product.sku}</p>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {item.product.description}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 rounded-md border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          -
                        </button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 1;
                            updateQuantity(item.productId, val);
                          }}
                          min={1}
                          className="w-16 text-center"
                        />
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="w-8 h-8 rounded-md border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>

                      <Button
                        onClick={() => removeItem(item.productId)}
                        variant="ghost"
                        size="sm"
                      >
                        <TrashIcon className="w-4 h-4" />
                        Remove
                      </Button>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="text-right">
                    <div className="text-sm text-gray-500 mb-1">
                      {formatCurrency(item.product.proCost)} / {item.product.unit}
                    </div>
                    <div className="text-xl font-bold text-gray-900">
                      {formatCurrency(item.subtotal)}
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {/* Continue Shopping */}
            <div className="pt-4">
              <Link href="/pro/inventory">
                <Button variant="outline">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
                {/* Subtotal */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">{formatCurrency(totals.subtotal)}</span>
                </div>

                {/* Discount */}
                {totals.discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">
                      Pro Discount ({totals.discountPercent}%)
                    </span>
                    <span className="text-green-600">
                      -{formatCurrency(totals.discount)}
                    </span>
                  </div>
                )}

                {/* Shipping */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">
                    {totals.shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      formatCurrency(totals.shipping)
                    )}
                  </span>
                </div>

                {/* Shipping threshold message */}
                {totals.shipping > 0 && (
                  <div className="text-xs text-gray-500">
                    Add {formatCurrency(BUSINESS_CONSTANTS.FREE_SHIPPING_THRESHOLD - totals.subtotal)}{' '}
                    more for free shipping
                  </div>
                )}

                {/* Tax */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Tax ({BUSINESS_CONSTANTS.SALES_TAX_RATE_PERCENT}%)
                  </span>
                  <span className="text-gray-900">{formatCurrency(totals.tax)}</span>
                </div>

                {/* Total */}
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between items-baseline">
                    <span className="text-base font-semibold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-gray-900">
                      {formatCurrency(totals.total)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <Button
                onClick={handlePlaceOrder}
                variant="primary"
                size="lg"
                fullWidth
              >
                <ShoppingBagIcon className="w-5 h-5" />
                Place Order
              </Button>

              {/* Payment Info */}
              <div className="mt-4 text-xs text-gray-500 text-center">
                Payment method will be selected during checkout.
                <br />
                Net 30 terms available for approved accounts.
              </div>
            </Card>

            {/* Help Text */}
            <Card className="mt-4">
              <div className="text-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
                <p className="text-gray-600 text-xs">
                  Contact our support team for bulk orders, custom pricing, or technical questions.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
