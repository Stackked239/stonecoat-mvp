'use client';

/**
 * Admin Quotes Management Page
 * Display all quotes from all contractors with filtering and search
 * Admin oversight of entire quote pipeline
 */

'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/shared/Card';
import { DataTable, DataTableColumn } from '@/components/shared/DataTable';
import { Badge } from '@/components/shared/Badge';
import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';
import { mockQuotes } from '@/lib/data/mockQuotes';
import { getProById } from '@/lib/data/mockPros';
import { formatCurrency, formatDate, formatProjectType } from '@/lib/utils/formatting';
import { Quote, QuoteStatus } from '@/lib/types';
import { MagnifyingGlassIcon, FunnelIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

export default function AdminQuotesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<QuoteStatus | 'all'>('all');

  // Filter and search quotes
  const filteredQuotes = useMemo(() => {
    let filtered = mockQuotes;

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((q) => q.status === statusFilter);
    }

    // Search filter (customer name or quote ID)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (q) =>
          q.id.toLowerCase().includes(query) ||
          q.customer.name.toLowerCase().includes(query) ||
          (q.proName && q.proName.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [searchQuery, statusFilter]);

  // Get pro name helper
  const getProName = (quote: Quote): string => {
    if (quote.proName) return quote.proName;
    if (quote.proId) {
      const pro = getProById(quote.proId);
      return pro?.businessName || 'Unknown';
    }
    return 'Unassigned';
  };

  // DataTable columns
  const columns: DataTableColumn<Quote>[] = [
    {
      key: 'id',
      label: 'Quote ID',
      sortable: true,
      width: '120px',
      render: (value) => (
        <span className="font-mono text-sm font-medium text-gray-900">{value}</span>
      ),
    },
    {
      key: 'customer',
      label: 'Customer',
      sortable: true,
      render: (value, quote) => (
        <div>
          <div className="font-medium text-gray-900">{quote.customer.name}</div>
          <div className="text-sm text-gray-500">{quote.customer.email}</div>
        </div>
      ),
    },
    {
      key: 'proName',
      label: 'Contractor',
      sortable: true,
      render: (value, quote) => {
        const proName = getProName(quote);
        return (
          <div className="text-sm text-gray-900">
            {quote.proId ? (
              <button
                onClick={() => router.push(`/admin/pros/${quote.proId}`)}
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                {proName}
              </button>
            ) : (
              <span className="text-gray-500">{proName}</span>
            )}
          </div>
        );
      },
    },
    {
      key: 'project',
      label: 'Project Type',
      sortable: true,
      render: (value, quote) => (
        <span className="text-sm text-gray-600">
          {formatProjectType(quote.project.type)}
        </span>
      ),
    },
    {
      key: 'squareFootage',
      label: 'Sq Ft',
      sortable: true,
      align: 'right',
      width: '100px',
      render: (value, quote) => (
        <span className="text-sm font-medium text-gray-900">
          {quote.project.squareFootage.toLocaleString()}
        </span>
      ),
    },
    {
      key: 'pricing',
      label: 'Total Amount',
      sortable: true,
      align: 'right',
      width: '130px',
      render: (value, quote) => (
        <span className="text-sm font-semibold text-gray-900">
          {quote.pricing ? formatCurrency(quote.pricing.total) : '-'}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      width: '130px',
      render: (value) => <Badge quoteStatus={value as QuoteStatus} />,
    },
    {
      key: 'createdAt',
      label: 'Created',
      sortable: true,
      width: '120px',
      render: (value) => (
        <span className="text-sm text-gray-600">{formatDate(value)}</span>
      ),
    },
  ];

  // Calculate statistics
  const stats = useMemo(() => {
    const requested = mockQuotes.filter((q) => q.status === 'requested').length;
    const sent = mockQuotes.filter((q) => q.status === 'sent').length;
    const accepted = mockQuotes.filter((q) => q.status === 'accepted').length;
    const totalValue = mockQuotes
      .filter((q) => q.pricing && q.status === 'accepted')
      .reduce((sum, q) => sum + (q.pricing?.total || 0), 0);

    return { requested, sent, accepted, totalValue };
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <PageHeader
        title="Quote Management"
        description="Monitor and manage all quotes across all contractors"
        breadcrumbs={[
          { label: 'Admin', href: '/admin/dashboard' },
          { label: 'Quotes' },
        ]}
        actions={
          <Button variant="outline" size="sm">
            <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        }
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-gray-600">Requested</p>
            <p className="text-3xl font-bold text-brand-black">{stats.requested}</p>
            <p className="text-xs text-gray-500">Pending assignment</p>
          </div>
        </Card>

        <Card>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-gray-600">Sent</p>
            <p className="text-3xl font-bold text-brand-black">{stats.sent}</p>
            <p className="text-xs text-gray-500">Awaiting response</p>
          </div>
        </Card>

        <Card>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-gray-600">Accepted</p>
            <p className="text-3xl font-bold text-accent-green">{stats.accepted}</p>
            <p className="text-xs text-gray-500">Confirmed jobs</p>
          </div>
        </Card>

        <Card>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-gray-600">Total Value</p>
            <p className="text-3xl font-bold text-brand-black">{formatCurrency(stats.totalValue)}</p>
            <p className="text-xs text-gray-500">Accepted quotes</p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex-1 max-w-md">
            <Input
              type="text"
              placeholder="Search by quote ID, customer, or contractor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              startIcon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>

          <div className="flex items-center gap-3">
            <FunnelIcon className="h-5 w-5 text-gray-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as QuoteStatus | 'all')}
              className="block rounded-md border-gray-200 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
            >
              <option value="all">All Statuses</option>
              <option value="requested">Requested</option>
              <option value="sent">Sent</option>
              <option value="accepted">Accepted</option>
              <option value="declined">Declined</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Quotes Table */}
      <Card padding="none">
        <DataTable
          columns={columns}
          data={filteredQuotes}
          keyExtractor={(quote) => quote.id}
          actions={[
            {
              label: 'View Details',
              onClick: (quote) => router.push(`/admin/quotes/${quote.id}`),
              variant: 'ghost',
            },
          ]}
          pagination={{
            enabled: true,
            pageSize: 20,
          }}
          sortable
        />
      </Card>
    </div>
  );
}
