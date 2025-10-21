/**
 * Admin Contractors Management Page
 * List and manage all certified contractors on the platform
 * View performance metrics and access detailed contractor profiles
 */

'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/shared/PageHeader';
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
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="rounded-md bg-blue-500 p-3">
                  <svg
                    className="h-6 w-6 text-gray-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Active Contractors
                  </dt>
                  <dd className="text-2xl font-bold text-gray-900">{stats.activePros}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="rounded-md bg-purple-500 p-3">
                  <svg
                    className="h-6 w-6 text-gray-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Master Certified
                  </dt>
                  <dd className="text-2xl font-bold text-gray-900">{stats.masterPros}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="rounded-md bg-green-500 p-3">
                  <svg
                    className="h-6 w-6 text-gray-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Revenue
                  </dt>
                  <dd className="text-2xl font-bold text-gray-900">
                    {formatCurrency(stats.totalRevenue)}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="rounded-md bg-yellow-500 p-3">
                  <StarIconSolid className="h-6 w-6 text-gray-900" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Avg Rating
                  </dt>
                  <dd className="text-2xl font-bold text-gray-900">
                    {stats.avgRating.toFixed(2)}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
              </div>
              <Input
                type="text"
                placeholder="Search by business name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FunnelIcon className="h-5 w-5 text-gray-500" />
            <select
              value={certificationFilter}
              onChange={(e) => setCertificationFilter(e.target.value as 'all' | 'certified' | 'master')}
              className="block rounded-md border-gray-200 shadow-sm focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
            >
              <option value="all">All Certifications</option>
              <option value="certified">Certified</option>
              <option value="master">Master</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'revenue' | 'rating' | 'winRate')}
              className="block rounded-md border-gray-200 shadow-sm focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
            >
              <option value="revenue">Sort by Revenue</option>
              <option value="rating">Sort by Rating</option>
              <option value="winRate">Sort by Win Rate</option>
            </select>
          </div>
        </div>
      </div>

      {/* Contractors Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
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
      </div>
    </div>
  );
}
