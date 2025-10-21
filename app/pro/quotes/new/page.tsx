'use client';

/**
 * QuoteBuilder Page - Most Critical Component in Phase 3
 * Multi-section form for creating professional quotes with real-time pricing calculations
 *
 * Features:
 * - Customer information with ZIP validation and auto-fill
 * - Project details with type selection and square footage
 * - Material line items with search and quantity management
 * - Real-time pricing calculations with labor rate suggestions
 * - Draft and send quote functionality
 */

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  UserIcon,
  DocumentTextIcon,
  CubeIcon,
  CurrencyDollarIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

// Components
import { Input } from '@/components/shared/Input';
import { Button } from '@/components/shared/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/shared/Card';
import { Badge } from '@/components/shared/Badge';
import { cn } from '@/lib/utils/cn';

// Types
import {
  ProjectType,
  QuoteLineItem,
  ValidationErrors,
  Product
} from '@/lib/types';

// Utils
import {
  getSuggestedLaborRate,
  calculateLineItemTotal,
  calculateLaborCost,
  formatCurrency,
  calculatePricePerSqFt
} from '@/lib/utils/pricing';
import {
  isValidEmail,
  isValidPhone,
  isValidZipCode,
  isValidSquareFootage,
  isRequired,
  ERROR_MESSAGES
} from '@/lib/utils/validation';
import { formatPhoneNumber } from '@/lib/utils/formatting';

// Data
import { mockInventory } from '@/lib/data/mockInventory';
import { zipCodeData } from '@/lib/data/mockZipCodeData';
import { PROJECT_TYPE_CONFIG, TIMELINE_OPTIONS } from '@/lib/utils/constants';

/**
 * Form state interface
 */
interface QuoteFormState {
  // Customer Information
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;

  // Project Details
  projectType: ProjectType | '';
  squareFootage: string;
  timeline: string;
  description: string;

  // Line Items
  lineItems: QuoteLineItem[];

  // Pricing
  laborRate: string;
  adjustmentReason: string;
  adjustmentAmount: string;
}


export default function QuoteBuilderPage() {
  const router = useRouter();

  // Form state
  const [formState, setFormState] = useState<QuoteFormState>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    street: '',
    city: '',
    state: 'FL',
    zipCode: '',
    projectType: '',
    squareFootage: '',
    timeline: '',
    description: '',
    lineItems: [],
    laborRate: '',
    adjustmentReason: '',
    adjustmentAmount: '0',
  });

  // UI state
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMaterialSelector, setShowMaterialSelector] = useState(false);
  const [materialSearch, setMaterialSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Suggested labor rate based on ZIP code
  const [suggestedRate, setSuggestedRate] = useState<{
    min: number;
    recommended: number;
    max: number;
  } | null>(null);

  /**
   * Handle ZIP code change - auto-fill city/state and suggest labor rate
   */
  useEffect(() => {
    if (formState.zipCode.length === 5) {
      const zipData = zipCodeData[formState.zipCode];

      if (zipData) {
        // Auto-fill city and state
        setFormState(prev => ({
          ...prev,
          city: zipData.city,
          state: zipData.state,
        }));

        // Calculate suggested labor rate
        const rate = getSuggestedLaborRate(zipData.medianIncome);
        setSuggestedRate(rate);

        // Auto-fill labor rate with recommended rate if not set
        if (!formState.laborRate) {
          setFormState(prev => ({
            ...prev,
            laborRate: rate.recommended.toString(),
          }));
        }

        // Clear ZIP error if valid
        if (errors.zipCode) {
          const newErrors = { ...errors };
          delete newErrors.zipCode;
          setErrors(newErrors);
        }
      } else {
        // Invalid ZIP code
        setErrors(prev => ({
          ...prev,
          zipCode: 'ZIP code not found in service area',
        }));
        setSuggestedRate(null);
      }
    } else {
      // Reset city/state if ZIP is incomplete
      if (formState.city || formState.state !== 'FL') {
        setFormState(prev => ({
          ...prev,
          city: '',
          state: 'FL',
        }));
      }
      setSuggestedRate(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState.zipCode]);

  /**
   * Filtered materials for selector
   */
  const filteredMaterials = useMemo(() => {
    let materials = mockInventory;

    // Filter by category
    if (selectedCategory !== 'all') {
      materials = materials.filter(m => m.category === selectedCategory);
    }

    // Filter by search term
    if (materialSearch) {
      const search = materialSearch.toLowerCase();
      materials = materials.filter(m =>
        m.name.toLowerCase().includes(search) ||
        m.description.toLowerCase().includes(search) ||
        m.sku.toLowerCase().includes(search)
      );
    }

    return materials;
  }, [materialSearch, selectedCategory]);

  /**
   * Pricing calculations (real-time)
   */
  const pricing = useMemo(() => {
    // Materials subtotal
    const materialsSubtotal = formState.lineItems.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );

    // Labor cost
    const sqft = parseFloat(formState.squareFootage) || 0;
    const rate = parseFloat(formState.laborRate) || 0;
    const laborCost = calculateLaborCost(sqft, rate);

    // Adjustments
    const adjustment = parseFloat(formState.adjustmentAmount) || 0;

    // Subtotal (before tax)
    const subtotal = materialsSubtotal + laborCost + adjustment;

    // Tax (7% Florida sales tax)
    const tax = Math.round(subtotal * 0.07 * 100) / 100;

    // Total
    const total = subtotal + tax;

    // Rate per square foot
    const perSqFtRate = sqft > 0 ? calculatePricePerSqFt(total, sqft) : 0;

    return {
      materialsSubtotal,
      laborCost,
      adjustment,
      subtotal,
      tax,
      total,
      perSqFtRate,
    };
  }, [formState.lineItems, formState.squareFootage, formState.laborRate, formState.adjustmentAmount]);

  /**
   * Add material to line items
   */
  const handleAddMaterial = (product: Product, quantity: number = 1) => {
    const existingIndex = formState.lineItems.findIndex(
      item => item.productId === product.id
    );

    if (existingIndex >= 0) {
      // Update quantity if already exists
      const newLineItems = [...formState.lineItems];
      const newQuantity = newLineItems[existingIndex].quantity + quantity;
      newLineItems[existingIndex] = {
        ...newLineItems[existingIndex],
        quantity: newQuantity,
        totalPrice: calculateLineItemTotal(newQuantity, product.proCost),
      };

      setFormState(prev => ({
        ...prev,
        lineItems: newLineItems,
      }));
    } else {
      // Add new line item
      const lineItem: QuoteLineItem = {
        productId: product.id,
        quantity,
        unitPrice: product.proCost,
        totalPrice: calculateLineItemTotal(quantity, product.proCost),
      };

      setFormState(prev => ({
        ...prev,
        lineItems: [...prev.lineItems, lineItem],
      }));
    }

    setShowMaterialSelector(false);
    setMaterialSearch('');
  };

  /**
   * Update line item quantity
   */
  const handleUpdateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveLineItem(index);
      return;
    }

    const newLineItems = [...formState.lineItems];
    const item = newLineItems[index];
    newLineItems[index] = {
      ...item,
      quantity,
      totalPrice: calculateLineItemTotal(quantity, item.unitPrice),
    };

    setFormState(prev => ({
      ...prev,
      lineItems: newLineItems,
    }));
  };

  /**
   * Remove line item
   */
  const handleRemoveLineItem = (index: number) => {
    setFormState(prev => ({
      ...prev,
      lineItems: prev.lineItems.filter((_, i) => i !== index),
    }));
  };

  /**
   * Apply suggested labor rate
   */
  const handleApplySuggestedRate = (rate: number) => {
    setFormState(prev => ({
      ...prev,
      laborRate: rate.toString(),
    }));
  };

  /**
   * Validate form
   */
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Customer Information
    if (!isRequired(formState.customerName)) {
      newErrors.customerName = ERROR_MESSAGES.REQUIRED;
    }

    if (!isRequired(formState.customerEmail)) {
      newErrors.customerEmail = ERROR_MESSAGES.REQUIRED;
    } else if (!isValidEmail(formState.customerEmail)) {
      newErrors.customerEmail = ERROR_MESSAGES.INVALID_EMAIL;
    }

    if (!isRequired(formState.customerPhone)) {
      newErrors.customerPhone = ERROR_MESSAGES.REQUIRED;
    } else if (!isValidPhone(formState.customerPhone)) {
      newErrors.customerPhone = ERROR_MESSAGES.INVALID_PHONE;
    }

    if (!isRequired(formState.street)) {
      newErrors.street = ERROR_MESSAGES.REQUIRED;
    }

    if (!isRequired(formState.zipCode)) {
      newErrors.zipCode = ERROR_MESSAGES.REQUIRED;
    } else if (!isValidZipCode(formState.zipCode)) {
      newErrors.zipCode = ERROR_MESSAGES.INVALID_ZIP;
    } else if (!zipCodeData[formState.zipCode]) {
      newErrors.zipCode = 'ZIP code not found in service area';
    }

    // Project Details
    if (!isRequired(formState.projectType)) {
      newErrors.projectType = 'Please select a project type';
    }

    const sqft = parseFloat(formState.squareFootage);
    if (!isRequired(formState.squareFootage)) {
      newErrors.squareFootage = ERROR_MESSAGES.REQUIRED;
    } else if (isNaN(sqft) || !isValidSquareFootage(sqft)) {
      newErrors.squareFootage = ERROR_MESSAGES.INVALID_SQUARE_FOOTAGE;
    }

    if (!isRequired(formState.timeline)) {
      newErrors.timeline = 'Please select a timeline';
    }

    if (!isRequired(formState.description)) {
      newErrors.description = ERROR_MESSAGES.REQUIRED;
    }

    // Line Items
    if (formState.lineItems.length === 0) {
      newErrors.lineItems = 'Please add at least one material';
    }

    // Labor Rate
    const rate = parseFloat(formState.laborRate);
    if (!isRequired(formState.laborRate)) {
      newErrors.laborRate = ERROR_MESSAGES.REQUIRED;
    } else if (isNaN(rate) || rate <= 0) {
      newErrors.laborRate = 'Labor rate must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (status: 'draft' | 'sent') => {
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorElement = document.querySelector('[aria-invalid="true"]');
      firstErrorElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // TODO: Save quote to mock data
      console.log('Saving quote with status:', status);
      console.log('Form data:', formState);
      console.log('Pricing:', pricing);

      // Redirect to quotes list
      router.push('/pro/quotes');
    } catch (error) {
      console.error('Error saving quote:', error);
      alert('Failed to save quote. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Get product details for line item display
   */
  const getProductDetails = (productId: string): Product | undefined => {
    return mockInventory.find(p => p.id === productId);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create New Quote</h1>
        <p className="mt-2 text-sm text-gray-600">
          Build a detailed quote with materials and pricing for your customer
        </p>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
        {/* Section 1: Customer Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <UserIcon className="w-6 h-6 text-primary-600" />
              <CardTitle>Customer Information</CardTitle>
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Customer Name"
                value={formState.customerName}
                onChange={(e) => setFormState(prev => ({ ...prev, customerName: e.target.value }))}
                error={errors.customerName}
                placeholder="John Smith"
                required
              />

              <Input
                label="Email Address"
                type="email"
                value={formState.customerEmail}
                onChange={(e) => setFormState(prev => ({ ...prev, customerEmail: e.target.value }))}
                error={errors.customerEmail}
                placeholder="john@example.com"
                required
              />

              <Input
                label="Phone Number"
                type="tel"
                value={formState.customerPhone}
                onChange={(e) => setFormState(prev => ({ ...prev, customerPhone: e.target.value }))}
                onBlur={(e) => {
                  const formatted = formatPhoneNumber(e.target.value);
                  setFormState(prev => ({ ...prev, customerPhone: formatted }));
                }}
                error={errors.customerPhone}
                placeholder="(813) 555-1234"
                required
              />

              <Input
                label="ZIP Code"
                value={formState.zipCode}
                onChange={(e) => setFormState(prev => ({ ...prev, zipCode: e.target.value }))}
                error={errors.zipCode}
                placeholder="33602"
                maxLength={5}
                required
              />

              <Input
                label="Street Address"
                value={formState.street}
                onChange={(e) => setFormState(prev => ({ ...prev, street: e.target.value }))}
                error={errors.street}
                placeholder="123 Main Street"
                required
                className="md:col-span-2"
              />

              <Input
                label="City"
                value={formState.city}
                onChange={(e) => setFormState(prev => ({ ...prev, city: e.target.value }))}
                placeholder="Tampa"
                disabled
              />

              <Input
                label="State"
                value={formState.state}
                onChange={(e) => setFormState(prev => ({ ...prev, state: e.target.value }))}
                placeholder="FL"
                disabled
              />
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Project Details */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <DocumentTextIcon className="w-6 h-6 text-primary-600" />
              <CardTitle>Project Details</CardTitle>
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-600">
                  Project Type <span className="text-error-600">*</span>
                </label>
                <select
                  value={formState.projectType}
                  onChange={(e) => setFormState(prev => ({ ...prev, projectType: e.target.value as ProjectType }))}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select project type</option>
                  {Object.entries(PROJECT_TYPE_CONFIG).map(([key, config]) => (
                    <option key={key} value={key}>
                      {config.label}
                    </option>
                  ))}
                </select>
                {errors.projectType && (
                  <p className="text-sm text-error-600">{errors.projectType}</p>
                )}
              </div>

              <Input
                label="Square Footage"
                type="number"
                value={formState.squareFootage}
                onChange={(e) => setFormState(prev => ({ ...prev, squareFootage: e.target.value }))}
                error={errors.squareFootage}
                placeholder="400"
                min="1"
                max="100000"
                required
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-600">
                  Timeline <span className="text-error-600">*</span>
                </label>
                <select
                  value={formState.timeline}
                  onChange={(e) => setFormState(prev => ({ ...prev, timeline: e.target.value }))}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select timeline</option>
                  {TIMELINE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.timeline && (
                  <p className="text-sm text-error-600">{errors.timeline}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-sm font-medium text-gray-600">
                  Project Description <span className="text-error-600">*</span>
                </label>
                <textarea
                  value={formState.description}
                  onChange={(e) => setFormState(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Describe the project scope, customer requirements, and any special considerations..."
                />
                {errors.description && (
                  <p className="text-sm text-error-600">{errors.description}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Materials/Line Items */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CubeIcon className="w-6 h-6 text-primary-600" />
                <CardTitle>Materials</CardTitle>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowMaterialSelector(true)}
              >
                <PlusIcon className="w-4 h-4" />
                Add Material
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            {/* Line Items List */}
            {formState.lineItems.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                <CubeIcon className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No materials added yet</p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setShowMaterialSelector(true)}
                >
                  Add Your First Material
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {formState.lineItems.map((item, index) => {
                  const product = getProductDetails(item.productId);
                  if (!product) return null;

                  return (
                    <div
                      key={`${item.productId}-${index}`}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900">{product.name}</h4>
                        <p className="text-sm text-gray-600">{product.sku}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {formatCurrency(item.unitPrice)} per {product.unit}
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <label className="text-sm text-gray-600">Qty:</label>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleUpdateQuantity(index, parseInt(e.target.value) || 0)}
                            className="w-20 px-3 py-1.5 rounded border border-gray-200 text-center"
                          />
                        </div>

                        <div className="text-right min-w-[100px]">
                          <p className="font-semibold text-gray-900">
                            {formatCurrency(item.totalPrice)}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveLineItem(index)}
                          className="p-2 text-error-600 hover:bg-error-50 rounded-lg transition-colors"
                          aria-label="Remove item"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* Materials Subtotal */}
                <div className="flex justify-end pt-4 border-t border-gray-200">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Materials Subtotal</p>
                    <p className="text-xl font-bold text-gray-900">
                      {formatCurrency(pricing.materialsSubtotal)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {errors.lineItems && (
              <p className="text-sm text-error-600 mt-2">{errors.lineItems}</p>
            )}
          </CardContent>
        </Card>

        {/* Section 4: Pricing */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <CurrencyDollarIcon className="w-6 h-6 text-primary-600" />
              <CardTitle>Pricing</CardTitle>
            </div>
          </CardHeader>

          <CardContent>
            <div className="space-y-6">
              {/* Labor Rate */}
              <div>
                <Input
                  label="Labor Rate (per square foot)"
                  type="number"
                  step="0.01"
                  value={formState.laborRate}
                  onChange={(e) => setFormState(prev => ({ ...prev, laborRate: e.target.value }))}
                  error={errors.laborRate}
                  placeholder="3.50"
                  required
                />

                {/* Suggested Rates */}
                {suggestedRate && (
                  <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm font-medium text-blue-900 mb-2">
                      Suggested rates for {formState.city} ({formState.zipCode}):
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={() => handleApplySuggestedRate(suggestedRate.min)}
                        className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-900 border border-gray-200 hover:bg-blue-200 transition-colors cursor-pointer"
                      >
                        Min: ${suggestedRate.min}/sqft
                      </button>
                      <button
                        type="button"
                        onClick={() => handleApplySuggestedRate(suggestedRate.recommended)}
                        className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200 hover:bg-green-200 transition-colors cursor-pointer"
                      >
                        Recommended: ${suggestedRate.recommended}/sqft
                      </button>
                      <button
                        type="button"
                        onClick={() => handleApplySuggestedRate(suggestedRate.max)}
                        className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 border border-yellow-200 hover:bg-yellow-200 transition-colors cursor-pointer"
                      >
                        Max: ${suggestedRate.max}/sqft
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Adjustments (Optional) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Adjustment Reason (Optional)"
                  value={formState.adjustmentReason}
                  onChange={(e) => setFormState(prev => ({ ...prev, adjustmentReason: e.target.value }))}
                  placeholder="e.g., Discount, Additional charges"
                />

                <Input
                  label="Adjustment Amount"
                  type="number"
                  step="0.01"
                  value={formState.adjustmentAmount}
                  onChange={(e) => setFormState(prev => ({ ...prev, adjustmentAmount: e.target.value }))}
                  placeholder="0.00"
                  helperText="Use negative values for discounts"
                />
              </div>

              {/* Pricing Summary */}
              <div className="bg-gray-50 p-6 rounded-lg space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Materials Subtotal</span>
                  <span className="font-medium">{formatCurrency(pricing.materialsSubtotal)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Labor ({formState.squareFootage || 0} sq ft × ${formState.laborRate || 0}/sqft)</span>
                  <span className="font-medium">{formatCurrency(pricing.laborCost)}</span>
                </div>

                {pricing.adjustment !== 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Adjustment {formState.adjustmentReason && `(${formState.adjustmentReason})`}</span>
                    <span className="font-medium">
                      {pricing.adjustment > 0 ? '+' : ''}
                      {formatCurrency(pricing.adjustment)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-gray-600 pt-3 border-t border-gray-200">
                  <span>Subtotal</span>
                  <span className="font-medium">{formatCurrency(pricing.subtotal)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Tax (7%)</span>
                  <span className="font-medium">{formatCurrency(pricing.tax)}</span>
                </div>

                <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t-2 border-gray-400">
                  <span>Total</span>
                  <span>{formatCurrency(pricing.total)}</span>
                </div>

                <div className="text-center pt-2">
                  <p className="text-sm text-gray-600">
                    Rate per square foot: <span className="font-semibold text-gray-900">
                      {formatCurrency(pricing.perSqFtRate)}/sqft
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => router.push('/pro/quotes')}
            disabled={isSubmitting}
          >
            Cancel
          </Button>

          <Button
            variant="secondary"
            onClick={() => handleSubmit('draft')}
            isLoading={isSubmitting}
          >
            Save as Draft
          </Button>

          <Button
            variant="primary"
            onClick={() => handleSubmit('sent')}
            isLoading={isSubmitting}
          >
            Send to Customer
          </Button>
        </div>
      </form>

      {/* Material Selector Modal */}
      {showMaterialSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Add Materials</h2>

              {/* Search and Filter */}
              <div className="mt-4 space-y-4">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    value={materialSearch}
                    onChange={(e) => setMaterialSearch(e.target.value)}
                    placeholder="Search by name, SKU, or description..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div className="flex gap-2 flex-wrap">
                  {[
                    { id: 'all', label: 'All' },
                    { id: 'base-coats', label: 'Base Coats' },
                    { id: 'top-coats', label: 'Top Coats' },
                    { id: 'flakes', label: 'Flakes' },
                    { id: 'primers', label: 'Primers' },
                    { id: 'tools', label: 'Tools' },
                  ].map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setSelectedCategory(category.id)}
                      className={cn(
                        'px-3 py-1 rounded-full text-sm font-medium border transition-colors cursor-pointer',
                        selectedCategory === category.id
                          ? 'bg-primary-100 text-primary-800 border-primary-200'
                          : 'bg-gray-100 text-gray-900 border-gray-200 hover:bg-gray-200'
                      )}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Body - Materials List */}
            <div className="flex-1 overflow-y-auto p-6">
              {filteredMaterials.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600">No materials found matching your search</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredMaterials.map((product) => (
                    <div
                      key={product.id}
                      className="p-4 border border-gray-200 rounded-lg hover:border-primary-500 transition-colors cursor-pointer"
                      onClick={() => handleAddMaterial(product)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{product.name}</h3>
                          <p className="text-sm text-gray-600">{product.sku}</p>
                        </div>
                        <Badge label={product.category} variant="neutral" size="sm" />
                      </div>

                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-lg font-bold text-primary-600">
                            {formatCurrency(product.proCost)}
                          </p>
                          <p className="text-xs text-gray-500">per {product.unit}</p>
                        </div>

                        <Button
                          variant="primary"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddMaterial(product);
                          }}
                        >
                          Add
                        </Button>
                      </div>

                      {product.stockLevel <= product.reorderLevel && (
                        <p className="text-xs text-warning-600 mt-2">
                          Low stock: {product.stockLevel} {product.unit}s remaining
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={() => {
                  setShowMaterialSelector(false);
                  setMaterialSearch('');
                  setSelectedCategory('all');
                }}
                fullWidth
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
