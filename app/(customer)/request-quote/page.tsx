/**
 * Customer Portal - Request Quote Page
 * Form for customers to submit quote requests
 * Validates input and navigates to confirmation page with matched pros
 */

'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';
import { Card } from '@/components/shared/Card';
import { validateQuoteData } from '@/lib/utils/validation';
import { getZipCodeData } from '@/lib/data/mockZipCodeData';
import { PROJECT_TYPE_CONFIG, TIMELINE_OPTIONS } from '@/lib/utils/constants';
import type { ValidationErrors, ProjectType } from '@/lib/types';

export default function RequestQuotePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: 'FL',
    zipCode: '',
    projectType: '' as ProjectType | '',
    squareFootage: '',
    timeline: '1-2-weeks',
    description: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    // Validate form data
    const validation = validateQuoteData({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      zipCode: formData.zipCode,
      projectType: formData.projectType as ProjectType,
      squareFootage: parseFloat(formData.squareFootage) || 0,
      description: formData.description,
    });

    if (!validation.valid) {
      setErrors(validation.errors);
      setLoading(false);
      return;
    }

    // Validate ZIP code exists in our data
    const zipData = getZipCodeData(formData.zipCode);
    if (!zipData) {
      setErrors({ zipCode: 'This ZIP code is not currently served. Please try a nearby ZIP code.' });
      setLoading(false);
      return;
    }

    // Auto-fill city and state from ZIP code data
    const updatedFormData = {
      ...formData,
      city: zipData.city,
      state: zipData.state,
    };

    // Navigate to confirmation page with form data
    // Store in sessionStorage to pass data between pages
    sessionStorage.setItem('quoteRequest', JSON.stringify(updatedFormData));
    router.push('/confirmation');
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">
          Request a Free Quote
        </h1>
        <p className="text-lg text-gray-600">
          Tell us about your project and get matched with certified contractors
        </p>
      </div>

      <Card padding="lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact Information Section */}
          <div>
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Contact Information
            </h2>
            <div className="space-y-4">
                <Input
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  required
                  fullWidth
                  placeholder="John Smith"
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    required
                    fullWidth
                    placeholder="john@example.com"
                  />

                  <Input
                    label="Phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    required
                    fullWidth
                    placeholder="(813) 555-1234"
                  />
                </div>
              </div>
          </div>

          {/* Project Location Section */}
          <div className="pt-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Project Location
            </h2>
            <div className="space-y-4">
                <Input
                  label="Street Address"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  error={errors.street}
                  fullWidth
                  placeholder="123 Main Street"
                />

                <div className="grid gap-4 md:grid-cols-3">
                  <Input
                    label="ZIP Code"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    error={errors.zipCode}
                    required
                    fullWidth
                    placeholder="33602"
                    helperText="We serve Florida ZIP codes"
                  />

                  <Input
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    fullWidth
                    placeholder="Auto-filled from ZIP"
                    disabled
                  />

                  <Input
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    fullWidth
                    disabled
                  />
                </div>
              </div>
          </div>

          {/* Project Details Section */}
          <div className="pt-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Project Details
            </h2>
            <div className="space-y-4">
                <div>
                  <label
                    htmlFor="projectType"
                    className="mb-1 block text-sm font-medium text-gray-600"
                  >
                    Project Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-900 transition-colors focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600"
                  >
                    <option value="">Select a project type</option>
                    {Object.entries(PROJECT_TYPE_CONFIG).map(([key, config]) => (
                      <option key={key} value={key}>
                        {config.label} - {config.description}
                      </option>
                    ))}
                  </select>
                  {errors.projectType && (
                    <p className="mt-1 text-sm text-red-600">{errors.projectType}</p>
                  )}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Input
                    label="Square Footage"
                    type="number"
                    name="squareFootage"
                    value={formData.squareFootage}
                    onChange={handleChange}
                    error={errors.squareFootage}
                    required
                    fullWidth
                    placeholder="400"
                    helperText="Approximate area to be coated"
                  />

                  <div>
                    <label
                      htmlFor="timeline"
                      className="mb-1 block text-sm font-medium text-gray-600"
                    >
                      Timeline
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-900 transition-colors focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600"
                    >
                      {TIMELINE_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label} - {option.description}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="mb-1 block text-sm font-medium text-gray-600"
                  >
                    Project Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-900 placeholder-gray-400 transition-colors focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600"
                    placeholder="Tell us more about your project, any specific requirements, or questions you have..."
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                  )}
                  <p className="mt-1 text-sm text-gray-500">
                    Optional: Provide additional details about your project
                  </p>
                </div>
              </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/')}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="lg" isLoading={loading}>
              Get Free Quotes
            </Button>
          </div>
        </form>
      </Card>

      {/* Trust Indicators */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          By submitting this form, you agree to be contacted by certified contractors.
          <br />
          Your information is secure and will never be sold.
        </p>
      </div>
    </div>
  );
}
