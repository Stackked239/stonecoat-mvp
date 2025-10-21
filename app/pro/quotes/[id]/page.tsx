/**
 * Pro Portal - Quote Detail Page
 * Displays detailed view of a single quote with all information
 * Actions vary based on quote status and ownership
 */

'use client';

import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/shared/Card';
import { Badge } from '@/components/shared/Badge';
import { Button } from '@/components/shared/Button';
import { DataTable, DataTableColumn } from '@/components/shared/DataTable';
import { mockQuotes } from '@/lib/data/mockQuotes';
import { mockInventory } from '@/lib/data/mockInventory';
import { Quote, QuoteLineItem } from '@/lib/types/quote';
import {
  formatCurrency,
  formatDate,
  formatDateTime,
  formatSquareFootage,
  formatProjectType,
  formatPhoneNumber,
  formatAddress,
  formatTimeline,
} from '@/lib/utils/formatting';
import {
  ArrowLeftIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  DocumentTextIcon,
  UserIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

/**
 * Simulated authentication
 */
function getLoggedInProId(): string {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('proId') || 'PRO-001';
  }
  return 'PRO-001';
}

interface QuoteDetailPageProps {
  params: {
    id: string;
  };
}

export default function QuoteDetailPage({ params }: QuoteDetailPageProps) {
  const router = useRouter();
  const proId = getLoggedInProId();
  const quote = mockQuotes.find((q) => q.id === params.id);

  // Verify quote exists
  if (!quote) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card padding="lg">
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              Quote not found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              The quote you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <div className="mt-6">
              <Button onClick={() => router.push('/pro/quotes')}>
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Back to Quotes
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Verify authorization - pro must be involved with this quote
  const isAuthorized =
    quote.proId === proId ||
    (quote.type === 'customer-initiated' &&
      quote.matchedPros?.some((pro) => pro.id === proId));

  if (!isAuthorized) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card padding="lg">
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              Access Denied
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              You don&apos;t have permission to view this quote.
            </p>
            <div className="mt-6">
              <Button onClick={() => router.push('/pro/quotes')}>
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Back to Quotes
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Prepare line items data if pricing exists
  const lineItems: QuoteLineItem[] = quote.pricing
    ? mockInventory
        .filter((material) => Math.random() > 0.7) // Mock: randomly select materials
        .slice(0, 3)
        .map((material, index) => ({
          productId: material.id,
          quantity: index === 0 ? 2 : 1,
          unitPrice: material.proCost,
          totalPrice: material.proCost * (index === 0 ? 2 : 1),
        }))
    : [];

  // Line items table columns
  const lineItemColumns: DataTableColumn<QuoteLineItem & { productName?: string }>[] = [
    {
      key: 'productName',
      label: 'Material',
      render: (_, item) => {
        const product = mockInventory.find((m) => m.id === item.productId);
        return (
          <div>
            <div className="font-medium text-gray-900">{product?.name}</div>
            <div className="text-sm text-gray-500">{product?.category}</div>
          </div>
        );
      },
    },
    {
      key: 'quantity',
      label: 'Quantity',
      align: 'center',
      render: (value) => <span className="font-medium">{value}</span>,
    },
    {
      key: 'unitPrice',
      label: 'Unit Price',
      align: 'right',
      render: (value) => formatCurrency(value),
    },
    {
      key: 'totalPrice',
      label: 'Total',
      align: 'right',
      render: (value) => (
        <span className="font-semibold">{formatCurrency(value)}</span>
      ),
    },
  ];

  // Calculate subtotal and tax if pricing exists
  const materialsTotal = quote.pricing?.materials || 0;
  const laborTotal = quote.pricing?.labor || 0;
  const subtotal = materialsTotal + laborTotal;
  const taxRate = 0.07;
  const tax = subtotal * taxRate;
  const total = quote.pricing?.total || 0;

  // Determine available actions based on status
  const canCreateQuote = quote.status === 'requested';
  const canEdit = quote.status === 'sent' && quote.proId === proId;
  const canMarkAccepted = quote.status === 'sent' && quote.proId === proId;
  const canViewJob = quote.status === 'accepted';

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title={`Quote ${quote.id}`}
        breadcrumbs={[
          { label: 'Quotes', href: '/pro/quotes' },
          { label: quote.id },
        ]}
        actions={
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => router.push('/pro/quotes')}
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back to Quotes
            </Button>

            {canCreateQuote && (
              <Button
                variant="primary"
                onClick={() =>
                  router.push(`/pro/quotes/new?requestId=${quote.id}`)
                }
              >
                <DocumentTextIcon className="h-5 w-5 mr-2" />
                Create Quote
              </Button>
            )}

            {canEdit && (
              <Button
                variant="outline"
                onClick={() => router.push(`/pro/quotes/new?quoteId=${quote.id}`)}
              >
                <PencilIcon className="h-5 w-5 mr-2" />
                Edit Quote
              </Button>
            )}

            {canViewJob && (
              <Button
                variant="primary"
                onClick={() => router.push('/pro/jobs')}
              >
                View Job
              </Button>
            )}
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Left Column (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Information */}
          <Card>
            <Card.Header className="mb-6">
              <Card.Title>Customer Information</Card.Title>
            </Card.Header>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <UserIcon className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-gray-500">Name</div>
                  <div className="mt-1 text-base text-gray-900">
                    {quote.customer.name}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg
                  className="h-5 w-5 text-gray-500 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <div>
                  <div className="text-sm font-medium text-gray-500">Email</div>
                  <div className="mt-1 text-base text-gray-900">
                    <a
                      href={`mailto:${quote.customer.email}`}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      {quote.customer.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg
                  className="h-5 w-5 text-gray-500 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <div>
                  <div className="text-sm font-medium text-gray-500">Phone</div>
                  <div className="mt-1 text-base text-gray-900">
                    <a
                      href={`tel:${quote.customer.phone}`}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      {formatPhoneNumber(quote.customer.phone)}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPinIcon className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-gray-500">
                    Address
                  </div>
                  <div className="mt-1 text-base text-gray-900">
                    {formatAddress(quote.customer.address)}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Project Details */}
          <Card>
            <Card.Header className="mb-6">
              <Card.Title>Project Details</Card.Title>
            </Card.Header>

            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm font-medium text-gray-500">
                    Project Type
                  </div>
                  <div className="mt-1 text-base text-gray-900">
                    {formatProjectType(quote.project.type)}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-500">
                    Square Footage
                  </div>
                  <div className="mt-1 text-base text-gray-900">
                    {formatSquareFootage(quote.project.squareFootage)}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-500">
                    Timeline
                  </div>
                  <div className="mt-1 text-base text-gray-900 flex items-center gap-2">
                    <ClockIcon className="h-5 w-5 text-gray-500" />
                    {formatTimeline(quote.project.timeline)}
                  </div>
                </div>

                {quote.project.preferredFinish && (
                  <div>
                    <div className="text-sm font-medium text-gray-500">
                      Preferred Finish
                    </div>
                    <div className="mt-1 text-base text-gray-900">
                      {quote.project.preferredFinish}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <div className="text-sm font-medium text-gray-500 mb-2">
                  Description
                </div>
                <div className="text-base text-gray-900 bg-gray-50 rounded-lg p-4">
                  {quote.project.description}
                </div>
              </div>
            </div>
          </Card>

          {/* Quote Pricing (if exists) */}
          {quote.pricing && (
            <Card>
              <Card.Header className="mb-6">
                <Card.Title>Quote Pricing</Card.Title>
              </Card.Header>

              <div className="space-y-6">
                {/* Line Items */}
                <div>
                  <h4 className="text-sm font-medium text-gray-600 mb-4">
                    Materials
                  </h4>
                  <DataTable
                    columns={lineItemColumns}
                    data={lineItems}
                    keyExtractor={(item) => item.productId}
                  />
                </div>

                {/* Pricing Summary */}
                <div className="border-t border-gray-200 pt-6">
                  <dl className="space-y-3">
                    <div className="flex justify-between text-base">
                      <dt className="text-gray-600">Materials Subtotal</dt>
                      <dd className="font-medium text-gray-900">
                        {formatCurrency(materialsTotal)}
                      </dd>
                    </div>
                    <div className="flex justify-between text-base">
                      <dt className="text-gray-600">Labor</dt>
                      <dd className="font-medium text-gray-900">
                        {formatCurrency(laborTotal)}
                      </dd>
                    </div>
                    <div className="flex justify-between text-base border-t border-gray-200 pt-3">
                      <dt className="text-gray-600">Subtotal</dt>
                      <dd className="font-medium text-gray-900">
                        {formatCurrency(subtotal)}
                      </dd>
                    </div>
                    <div className="flex justify-between text-base">
                      <dt className="text-gray-600">Tax (7%)</dt>
                      <dd className="font-medium text-gray-900">
                        {formatCurrency(tax)}
                      </dd>
                    </div>
                    <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-3">
                      <dt className="text-gray-900">Total</dt>
                      <dd className="text-blue-600">{formatCurrency(total)}</dd>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <dt>Rate per Square Foot</dt>
                      <dd>
                        {formatCurrency(quote.pricing.calculatedRate)}/sq ft
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Adjustments */}
                {quote.pricing.adjustments.length > 0 && (
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h5 className="text-sm font-medium text-blue-900 mb-2">
                      Pricing Adjustments
                    </h5>
                    <ul className="space-y-1">
                      {quote.pricing.adjustments.map((adj, index) => (
                        <li
                          key={index}
                          className="text-sm text-blue-700 flex items-center gap-2"
                        >
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600" />
                          {adj.reason}:{' '}
                          {adj.type === 'percentage'
                            ? `${adj.value > 0 ? '+' : ''}${adj.value}%`
                            : formatCurrency(adj.value)}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar - Right Column (1/3) */}
        <div className="space-y-6">
          {/* Status Card */}
          <Card>
            <Card.Header className="mb-4">
              <Card.Title>Status</Card.Title>
            </Card.Header>

            <div className="space-y-4">
              <div>
                <Badge quoteStatus={quote.status} size="lg" />
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex items-start gap-2">
                  <CalendarIcon className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">Created</div>
                    <div className="text-sm font-medium text-gray-900">
                      {formatDate(quote.createdAt)}
                    </div>
                  </div>
                </div>

                {quote.expiresAt && (
                  <div className="flex items-start gap-2">
                    <ClockIcon className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-500">Expires</div>
                      <div className="text-sm font-medium text-gray-900">
                        {formatDate(quote.expiresAt)}
                      </div>
                    </div>
                  </div>
                )}

                {quote.updatedAt !== quote.createdAt && (
                  <div className="flex items-start gap-2">
                    <svg
                      className="h-5 w-5 text-gray-500 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    <div>
                      <div className="text-sm text-gray-500">Last Updated</div>
                      <div className="text-sm font-medium text-gray-900">
                        {formatDate(quote.updatedAt)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Actions Card */}
          {(canMarkAccepted || canEdit || canCreateQuote) && (
            <Card>
              <Card.Header className="mb-4">
                <Card.Title>Actions</Card.Title>
              </Card.Header>

              <div className="space-y-3">
                {canCreateQuote && (
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={() =>
                      router.push(`/pro/quotes/new?requestId=${quote.id}`)
                    }
                  >
                    <DocumentTextIcon className="h-5 w-5 mr-2" />
                    Create Quote
                  </Button>
                )}

                {canEdit && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() =>
                      router.push(`/pro/quotes/new?quoteId=${quote.id}`)
                    }
                  >
                    <PencilIcon className="h-5 w-5 mr-2" />
                    Edit Quote
                  </Button>
                )}

                {canMarkAccepted && (
                  <>
                    <Button
                      variant="primary"
                      className="w-full"
                      onClick={() => {
                        // In production: API call to update status
                        alert('Quote marked as accepted (demo)');
                      }}
                    >
                      <CheckIcon className="h-5 w-5 mr-2" />
                      Mark as Accepted
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full text-red-600 hover:text-red-700 hover:border-red-300"
                      onClick={() => {
                        // In production: API call to update status
                        alert('Quote marked as declined (demo)');
                      }}
                    >
                      <XMarkIcon className="h-5 w-5 mr-2" />
                      Mark as Declined
                    </Button>
                  </>
                )}
              </div>
            </Card>
          )}

          {/* Quote Type Info */}
          <Card variant="flat">
            <div className="text-sm text-gray-600">
              <div className="font-medium text-gray-900 mb-1">Quote Type</div>
              <div>
                {quote.type === 'customer-initiated'
                  ? 'Customer Request'
                  : 'Pro-Created Quote'}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
