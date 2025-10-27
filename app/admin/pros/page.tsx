'use client';

/**
 * Admin Contractors Management Page
 * List and manage all certified contractors on the platform
 * View performance metrics and access detailed contractor profiles
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
import { mockPros } from '@/lib/data/mockPros';
import { Pro } from '@/lib/types';
import { formatCurrency, formatPercentage } from '@/lib/utils/formatting';
import { MagnifyingGlassIcon, FunnelIcon, StarIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

export default function AdminContractorsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [certificationFilter, setCertificationFilter] = useState<'all' | 'certified' | 'master'>('all');
  const [sortBy, setSortBy] = useState<'revenue' | 'rating' | 'winRate'>('revenue');

  // Filter and sort contractors
  const filteredPros = useMemo(() => {
    let filtered = mockPros;

    // Certification filter
    if (certificationFilter !== 'all') {
      filtered = filtered.filter((p) => p.certificationLevel === certificationFilter);
    }

    // Search filter (business name or email)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.businessName.toLowerCase().includes(query) ||
          p.email.toLowerCase().includes(query) ||
          p.ownerName.toLowerCase().includes(query)
      );
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === 'revenue') {
        return b.metrics.totalRevenue - a.metrics.totalRevenue;
      } else if (sortBy === 'rating') {
        return b.metrics.customerRating - a.metrics.customerRating;
      } else if (sortBy === 'winRate') {
        return b.metrics.winRate - a.metrics.winRate;
      }
      return 0;
    });

    return filtered;
  }, [searchQuery, certificationFilter, sortBy]);

  // Rating stars component
  const RatingStars = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star}>
            {star <= Math.round(rating) ? (
              <StarIconSolid className="w-4 h-4 text-yellow-400" />
            ) : (
              <StarIcon className="w-4 h-4 text-gray-300" />
            )}
          </span>
        ))}
        <span className="ml-1 text-sm font-medium text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  // DataTable columns
  const columns: DataTableColumn<Pro>[] = [
    {
      key: 'businessName',
      label: 'Business Name',
      sortable: true,
      render: (value, pro) => (
        <div>
          <button
            onClick={() => router.push(`/admin/pros/${pro.id}`)}
            className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
          >
            {value}
          </button>
          <div className="text-sm text-gray-500">{pro.ownerName}</div>
        </div>
      ),
    },
    {
      key: 'email',
      label: 'Contact',
      sortable: true,
      render: (value, pro) => (
        <div className="text-sm">
          <div className="text-gray-900">{value}</div>
          <div className="text-gray-500">{pro.phone}</div>
        </div>
      ),
    },
    {
      key: 'certificationLevel',
      label: 'Certification',
      sortable: true,
      width: '140px',
      render: (value) => (
        <Badge
          label={value === 'master' ? 'Master' : 'Certified'}
          variant={value === 'master' ? 'primary' : 'success'}
          size="sm"
        />
      ),
    },
    {
      key: 'customerRating',
      label: 'Rating',
      sortable: true,
      width: '150px',
      render: (value, pro) => <RatingStars rating={pro.metrics.customerRating} />,
    },
    {
      key: 'totalQuotes',
      label: 'Quotes',
      sortable: true,
      align: 'center',
      width: '100px',
      render: (value, pro) => (
        <div className="text-center">
          <div className="text-sm font-semibold text-gray-900">
            {pro.metrics.totalQuotes}
          </div>
          <div className="text-xs text-gray-500">
            {pro.metrics.wonQuotes} won
          </div>
        </div>
      ),
    },
    {
      key: 'winRate',
      label: 'Win Rate',
      sortable: true,
      align: 'right',
      width: '100px',
      render: (value, pro) => (
        <span className="text-sm font-medium text-gray-900">
          {formatPercentage(pro.metrics.winRate)}
        </span>
      ),
    },
    {
      key: 'totalRevenue',
      label: 'Revenue',
      sortable: true,
      align: 'right',
      width: '130px',
      render: (value, pro) => (
        <div className="text-right">
          <div className="text-sm font-semibold text-gray-900">
            {formatCurrency(pro.metrics.totalRevenue)}
          </div>
          <div className="text-xs text-gray-500">
            {formatCurrency(pro.metrics.avgJobValue)} avg
          </div>
        </div>
      ),
    },
    {
      key: 'serviceZipCodes',
      label: 'Coverage',
      align: 'center',
      width: '100px',
      render: (value, pro) => (
        <div className="text-center text-sm text-gray-600">
          {pro.serviceZipCodes.length} zips
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      width: '100px',
      render: (value) => (
        <Badge
          label={value === 'active' ? 'Active' : 'Inactive'}
          variant={value === 'active' ? 'success' : 'neutral'}
          size="sm"
        />
      ),
    },
  ];

  // Calculate statistics
  const stats = useMemo(() => {
    const activePros = mockPros.filter((p) => p.accountStatus === 'active').length;
    const masterPros = mockPros.filter((p) => p.certificationLevel === 'master').length;
    const totalRevenue = mockPros.reduce((sum, p) => sum + p.metrics.totalRevenue, 0);
    const avgRating =
      mockPros.reduce((sum, p) => sum + p.metrics.customerRating, 0) / mockPros.length;

    return { activePros, masterPros, totalRevenue, avgRating };
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <PageHeader
        title="Contractor Management"
        description="Monitor performance and manage certified contractors"
        breadcrumbs={[
          { label: 'Admin', href: '/admin/dashboard' },
          { label: 'Contractors' },
        ]}
        actions={
          <Button variant="primary" size="sm">
            <UserPlusIcon className="w-4 h-4 mr-2" />
            Add Contractor
          </Button>
        }
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-gray-600">Active Contractors</p>
            <p className="text-3xl font-bold text-brand-black">{stats.activePros}</p>
            <p className="text-xs text-gray-500">Certified pros</p>
          </div>
        </Card>

        <Card>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-gray-600">Master Certified</p>
            <p className="text-3xl font-bold text-brand-orange">{stats.masterPros}</p>
            <p className="text-xs text-gray-500">Elite tier</p>
          </div>
        </Card>

        <Card>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-gray-600">Total Revenue</p>
            <p className="text-3xl font-bold text-brand-black">{formatCurrency(stats.totalRevenue)}</p>
            <p className="text-xs text-gray-500">Network lifetime</p>
          </div>
        </Card>

        <Card>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-gray-600">Avg Rating</p>
            <p className="text-3xl font-bold text-accent-gold">{stats.avgRating.toFixed(2)}</p>
            <p className="text-xs text-gray-500">⭐⭐⭐⭐⭐</p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex-1 max-w-md">
            <Input
              type="text"
              placeholder="Search by business name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              startIcon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>

          <div className="flex items-center gap-3">
            <FunnelIcon className="h-5 w-5 text-gray-500" />
            <select
              value={certificationFilter}
              onChange={(e) => setCertificationFilter(e.target.value as 'all' | 'certified' | 'master')}
              className="block rounded-md border-gray-200 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
            >
              <option value="all">All Certifications</option>
              <option value="certified">Certified</option>
              <option value="master">Master</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'revenue' | 'rating' | 'winRate')}
              className="block rounded-md border-gray-200 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
            >
              <option value="revenue">Sort by Revenue</option>
              <option value="rating">Sort by Rating</option>
              <option value="winRate">Sort by Win Rate</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Contractors Table */}
      <Card padding="none">
        <DataTable
          columns={columns}
          data={filteredPros}
          keyExtractor={(pro) => pro.id}
          actions={[
            {
              label: 'View Details',
              onClick: (pro) => router.push(`/admin/pros/${pro.id}`),
              variant: 'ghost',
            },
          ]}
          pagination={{
            enabled: true,
            pageSize: 15,
          }}
          sortable
        />
      </Card>
    </div>
  );
}
