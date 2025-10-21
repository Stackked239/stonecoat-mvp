/**
 * Pro Portal - Quotes List Page
 * Displays customer requests and pro-created quotes
 * Two sections: Customer Requests (requested status) and My Quotes (all other statuses)
 */

'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable, DataTableColumn, DataTableAction } from '@/components/shared/DataTable';
import { Badge } from '@/components/shared/Badge';
import { Button } from '@/components/shared/Button';
import { Card } from '@/components/shared/Card';
import { mockQuotes } from '@/lib/data/mockQuotes';
import { Quote, QuoteStatus } from '@/lib/types/quote';
import { formatDate, formatSquareFootage, formatProjectType } from '@/lib/utils/formatting';
import { PlusIcon, FunnelIcon } from '@heroicons/react/24/outline';

/**
 * Simulated authentication - get logged-in pro ID from localStorage
 * Production: Replace with NextAuth session
 */
function getLoggedInProId(): string {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('proId') || 'PRO-001';
  }
  return 'PRO-001';
}

export default function QuotesPage() {
  const router = useRouter();
  const proId = getLoggedInProId();

  // Filter state
  const [statusFilter, setStatusFilter] = useState<QuoteStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter quotes by logged-in pro
  const proQuotes = useMemo(() => {
    return mockQuotes.filter(quote => {
      // Include customer-initiated quotes that matched this pro
      if (quote.type === 'customer-initiated') {
        return quote.matchedPros?.some(pro => pro.id === proId);
      }
      // Include pro-created quotes by this pro
      return quote.proId === proId;
    });
  }, [proId]);

  // Separate into two categories
  const customerRequests = useMemo(() => {
    return proQuotes.filter(quote =>
      quote.type === 'customer-initiated' && quote.status === 'requested'
    );
  }, [proQuotes]);

  const myQuotes = useMemo(() => {
    let quotes = proQuotes.filter(quote =>
      quote.type === 'pro-created' || quote.status !== 'requested'
    );

    // Apply status filter
    if (statusFilter !== 'all') {
      quotes = quotes.filter(quote => quote.status === statusFilter);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      quotes = quotes.filter(quote =>
        quote.customer.name.toLowerCase().includes(query) ||
        quote.id.toLowerCase().includes(query) ||
        formatProjectType(quote.project.type).toLowerCase().includes(query)
      );
    }

    // Sort by date (newest first)
    return quotes.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [proQuotes, statusFilter, searchQuery]);

  // Customer Requests table columns
  const requestColumns: DataTableColumn<Quote>[] = [
    {
      key: 'id',
      label: 'Quote ID',
      sortable: true,
      width: '120px',
    },
    {
      key: 'customer',
      label: 'Customer',
      sortable: true,
      render: (_, quote) => (
        <div>
          <div className="font-medium text-gray-900">{quote.customer.name}</div>
          <div className="text-sm text-gray-500">{quote.customer.email}</div>
        </div>
      ),
    },
    {
      key: 'project',
      label: 'Project',
      render: (_, quote) => (
        <div>
          <div className="font-medium text-gray-900">
            {formatProjectType(quote.project.type)}
          </div>
          <div className="text-sm text-gray-500">
            {formatSquareFootage(quote.project.squareFootage)}
          </div>
        </div>
      ),
    },
    {
      key: 'location',
      label: 'Location',
      render: (_, quote) => (
        <div className="text-sm">
          {quote.customer.address.city}, {quote.customer.address.state}
        </div>
      ),
    },
    {
      key: 'createdAt',
      label: 'Requested',
      sortable: true,
      render: (_, quote) => (
        <div className="text-sm text-gray-600">
          {formatDate(quote.createdAt)}
        </div>
      ),
    },
  ];

  // My Quotes table columns
  const myQuotesColumns: DataTableColumn<Quote>[] = [
    {
      key: 'id',
      label: 'Quote ID',
      sortable: true,
      width: '120px',
    },
    {
      key: 'customer',
      label: 'Customer',
      sortable: true,
      render: (_, quote) => (
        <div>
          <div className="font-medium text-gray-900">{quote.customer.name}</div>
          <div className="text-sm text-gray-500">{quote.customer.email}</div>
        </div>
      ),
    },
    {
      key: 'project',
      label: 'Project',
      render: (_, quote) => (
        <div>
          <div className="font-medium text-gray-900">
            {formatProjectType(quote.project.type)}
          </div>
          <div className="text-sm text-gray-500">
            {formatSquareFootage(quote.project.squareFootage)}
          </div>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (_, quote) => <Badge quoteStatus={quote.status} />,
    },
    {
      key: 'createdAt',
      label: 'Date',
      sortable: true,
      render: (_, quote) => (
        <div className="text-sm text-gray-600">
          {formatDate(quote.createdAt)}
        </div>
      ),
    },
  ];

  // Table actions
  const requestActions: DataTableAction<Quote>[] = [
    {
      label: 'View Details',
      onClick: (quote) => router.push(`/pro/quotes/${quote.id}`),
      variant: 'outline',
    },
    {
      label: 'Create Quote',
      onClick: (quote) => router.push(`/pro/quotes/new?requestId=${quote.id}`),
      variant: 'primary',
    },
  ];

  const myQuotesActions: DataTableAction<Quote>[] = [
    {
      label: 'View Details',
      onClick: (quote) => router.push(`/pro/quotes/${quote.id}`),
      variant: 'outline',
    },
  ];

  // Status filter options
  const statusOptions: { value: QuoteStatus | 'all'; label: string }[] = [
    { value: 'all', label: 'All Statuses' },
    { value: 'sent', label: 'Sent' },
    { value: 'accepted', label: 'Accepted' },
    { value: 'declined', label: 'Declined' },
    { value: 'expired', label: 'Expired' },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <PageHeader
        title="Quotes"
        description="Manage customer requests and track your submitted quotes"
        actions={
          <Button
            variant="primary"
            onClick={() => router.push('/pro/quotes/new')}
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Create New Quote
          </Button>
        }
      />

      {/* Customer Requests Section */}
      <section>
        <Card>
          <Card.Header className="mb-6">
            <div>
              <Card.Title>Customer Requests</Card.Title>
              <Card.Description>
                New quote requests from customers that need your response
              </Card.Description>
            </div>
            <Badge variant="primary" label={`${customerRequests.length}`} size="lg" />
          </Card.Header>

          <DataTable
            columns={requestColumns}
            data={customerRequests}
            keyExtractor={(quote) => quote.id}
            actions={requestActions}
            sortable
            emptyState={
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
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No customer requests
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  You&apos;ll see new quote requests from customers here.
                </p>
              </div>
            }
          />
        </Card>
      </section>

      {/* My Quotes Section */}
      <section>
        <Card>
          <Card.Header className="mb-6">
            <div>
              <Card.Title>My Quotes</Card.Title>
              <Card.Description>
                Track all quotes you&apos;ve created and their status
              </Card.Description>
            </div>
          </Card.Header>

          {/* Filters */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <label htmlFor="search" className="sr-only">
                Search quotes
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-500"
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
                </div>
                <input
                  id="search"
                  type="text"
                  placeholder="Search by customer name or quote ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <FunnelIcon className="h-5 w-5 text-gray-500" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as QuoteStatus | 'all')}
                className="block pl-3 pr-10 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Table */}
          <DataTable
            columns={myQuotesColumns}
            data={myQuotes}
            keyExtractor={(quote) => quote.id}
            actions={myQuotesActions}
            sortable
            pagination={{
              enabled: true,
              pageSize: 10,
            }}
            emptyState={
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
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No quotes found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchQuery || statusFilter !== 'all'
                    ? 'Try adjusting your search or filter.'
                    : 'Get started by creating a new quote.'}
                </p>
                {!searchQuery && statusFilter === 'all' && (
                  <div className="mt-6">
                    <Button
                      variant="primary"
                      onClick={() => router.push('/pro/quotes/new')}
                    >
                      <PlusIcon className="h-5 w-5 mr-2" />
                      Create Your First Quote
                    </Button>
                  </div>
                )}
              </div>
            }
          />
        </Card>
      </section>
    </div>
  );
}
