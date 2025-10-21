/**
 * Component Showcase
 * Visual test page for all base shared components
 * NOT for production - development/testing only
 */

'use client';

import { useState } from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { Badge } from './Badge';
import { Card } from './Card';
import { EnvelopeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export function ComponentShowcase() {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');

  const handleLoadingDemo = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.length > 0 && value.length < 3) {
      setInputError('Must be at least 3 characters');
    } else {
      setInputError('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Component Showcase</h1>
        <p className="text-gray-600">Base shared components for Stonecoat MVP</p>
      </div>

      {/* Button Component */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Button Component</h2>

        <div className="space-y-6">
          {/* Variants */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Variants</h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Sizes</h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          {/* States */}
          <div>
            <h3 className="text-lg font-semibold mb-3">States</h3>
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleLoadingDemo} isLoading={isLoading}>
                {isLoading ? 'Loading...' : 'Click to Load'}
              </Button>
              <Button disabled>Disabled</Button>
              <Button fullWidth>Full Width</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Input Component */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Input Component</h2>

        <div className="space-y-6 max-w-2xl">
          {/* Basic Input */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Basic</h3>
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* With Helper Text */}
          <div>
            <h3 className="text-lg font-semibold mb-3">With Helper Text</h3>
            <Input
              label="Square Footage"
              type="number"
              helperText="Enter the total area to be coated"
              min={50}
              max={50000}
            />
          </div>

          {/* With Error */}
          <div>
            <h3 className="text-lg font-semibold mb-3">With Error Validation</h3>
            <Input
              label="Username"
              value={inputValue}
              onChange={handleInputChange}
              error={inputError}
              placeholder="Type at least 3 characters"
            />
          </div>

          {/* With Icons */}
          <div>
            <h3 className="text-lg font-semibold mb-3">With Icons</h3>
            <div className="space-y-3">
              <Input
                label="Email"
                type="email"
                startIcon={<EnvelopeIcon className="w-5 h-5" />}
                placeholder="With start icon"
              />
              <Input
                label="Search"
                type="text"
                endIcon={<MagnifyingGlassIcon className="w-5 h-5" />}
                placeholder="With end icon"
              />
            </div>
          </div>

          {/* Disabled */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Disabled</h3>
            <Input
              label="Disabled Input"
              value="Cannot edit"
              disabled
            />
          </div>
        </div>
      </section>

      {/* Badge Component */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Badge Component</h2>

        <div className="space-y-6">
          {/* Quote Statuses */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quote Statuses</h3>
            <div className="flex flex-wrap gap-3">
              <Badge quoteStatus="requested" />
              <Badge quoteStatus="sent" />
              <Badge quoteStatus="accepted" />
              <Badge quoteStatus="declined" />
              <Badge quoteStatus="expired" />
            </div>
          </div>

          {/* Order Statuses */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Order Statuses</h3>
            <div className="flex flex-wrap gap-3">
              <Badge orderStatus="pending" />
              <Badge orderStatus="processing" />
              <Badge orderStatus="shipped" />
              <Badge orderStatus="delivered" />
              <Badge orderStatus="cancelled" />
            </div>
          </div>

          {/* Job Statuses */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Job Statuses</h3>
            <div className="flex flex-wrap gap-3">
              <Badge jobStatus="quote-sent" />
              <Badge jobStatus="materials-ordered" />
              <Badge jobStatus="scheduled" />
              <Badge jobStatus="in-progress" />
              <Badge jobStatus="completed" />
              <Badge jobStatus="cancelled" />
            </div>
          </div>

          {/* Custom Badges */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Custom Badges</h3>
            <div className="flex flex-wrap gap-3">
              <Badge label="Premium" variant="primary" />
              <Badge label="Success" variant="success" />
              <Badge label="Warning" variant="warning" />
              <Badge label="Error" variant="error" />
              <Badge label="Neutral" variant="neutral" />
            </div>
          </div>

          {/* Sizes */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Sizes</h3>
            <div className="flex flex-wrap items-center gap-3">
              <Badge label="Small" size="sm" />
              <Badge label="Medium" size="md" />
              <Badge label="Large" size="lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Card Component */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Card Component</h2>

        <div className="space-y-6">
          {/* Simple Card */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Simple Card</h3>
            <Card>
              <p>This is a simple card with default settings.</p>
            </Card>
          </div>

          {/* Card with Header and Footer */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Card with Header and Footer</h3>
            <Card
              header={
                <div className="flex items-center justify-between">
                  <h4 className="text-xl font-semibold">Quote #1234</h4>
                  <Badge quoteStatus="accepted" />
                </div>
              }
              footer={
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Cancel</Button>
                  <Button variant="primary" size="sm">View Details</Button>
                </div>
              }
            >
              <p className="text-gray-600">
                This card demonstrates the header and footer props with custom content.
              </p>
            </Card>
          </div>

          {/* Variants */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Variants</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card variant="default">
                <p className="text-sm font-medium">Default</p>
                <p className="text-sm text-gray-600">Shadow-sm styling</p>
              </Card>
              <Card variant="outlined">
                <p className="text-sm font-medium">Outlined</p>
                <p className="text-sm text-gray-600">Border styling</p>
              </Card>
              <Card variant="elevated">
                <p className="text-sm font-medium">Elevated</p>
                <p className="text-sm text-gray-600">Shadow-lg styling</p>
              </Card>
              <Card variant="flat">
                <p className="text-sm font-medium">Flat</p>
                <p className="text-sm text-gray-600">Gray background</p>
              </Card>
            </div>
          </div>

          {/* Hoverable Cards */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Hoverable Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card variant="default" hoverable>
                <p className="text-sm font-medium">Hover Me</p>
                <p className="text-sm text-gray-600">Default hoverable</p>
              </Card>
              <Card variant="outlined" hoverable>
                <p className="text-sm font-medium">Hover Me</p>
                <p className="text-sm text-gray-600">Outlined hoverable</p>
              </Card>
              <Card variant="elevated" hoverable>
                <p className="text-sm font-medium">Hover Me</p>
                <p className="text-sm text-gray-600">Elevated hoverable</p>
              </Card>
            </div>
          </div>

          {/* Compound Components */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Compound Components</h3>
            <Card variant="outlined">
              <Card.Header>
                <Card.Title>Professional Quote</Card.Title>
                <Badge quoteStatus="sent" />
              </Card.Header>
              <Card.Content>
                <Card.Description>
                  This demonstrates the compound component pattern with Card.Header,
                  Card.Title, Card.Content, and Card.Footer.
                </Card.Description>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Customer:</span>
                    <span className="font-medium">John Smith</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total:</span>
                    <span className="font-medium">$4,250.00</span>
                  </div>
                </div>
              </Card.Content>
              <Card.Footer>
                <Button variant="outline" size="sm">Decline</Button>
                <Button variant="primary" size="sm">Accept</Button>
              </Card.Footer>
            </Card>
          </div>

          {/* Padding Options */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Padding Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card padding="none" variant="outlined">
                <p className="text-sm font-medium p-2">None</p>
              </Card>
              <Card padding="sm" variant="outlined">
                <p className="text-sm font-medium">Small</p>
              </Card>
              <Card padding="md" variant="outlined">
                <p className="text-sm font-medium">Medium</p>
              </Card>
              <Card padding="lg" variant="outlined">
                <p className="text-sm font-medium">Large</p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
