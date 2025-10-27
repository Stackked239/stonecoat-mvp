'use client';

/**
 * Admin Contractor Detail Page
 * Detailed contractor profile with performance metrics, quotes, and jobs
 * Complete oversight of individual contractor activity
 */

'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/shared/Card';
import { Badge } from '@/components/shared/Badge';
import { Button } from '@/components/shared/Button';
import { DataTable, DataTableColumn } from '@/components/shared/DataTable';
import { getProById } from '@/lib/data/mockPros';
import { getQuotesByPro } from '@/lib/data/mockQuotes';
import { formatCurrency, formatDate, formatPhoneNumber, formatPercentage, formatProjectType } from '@/lib/utils/formatting';
import { Quote, QuoteStatus } from '@/lib/types';
import {
  ArrowLeftIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

interface ContractorDetailPageProps {
  params: {
    id: string;
  };
}

export default function ContractorDetailPage({ params }: ContractorDetailPageProps) {
  const router = useRouter();
  const pro = getProById(params.id);

  // Get quotes for this pro
  const proQuotes = useMemo(() => {
    return getQuotesByPro(params.id).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [params.id]);

  // Recent quotes (last 10)
  const recentQuotes = useMemo(() => proQuotes.slice(0, 10), [proQuotes]);

  // Accepted quotes (for jobs list)
  const acceptedQuotes = useMemo(
    () => proQuotes.filter((q) => q.status === 'accepted').slice(0, 10),
    [proQuotes]
  );

  if (!pro) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900">Contractor not found</h2>
          <p className="mt-2 text-gray-600">The contractor you&apos;re looking for doesn&apos;t exist.</p>
          <Button onClick={() => router.push('/admin/pros')} className="mt-4">
            Back to Contractors
          </Button>
        </div>
      </div>
    );
  }

  // Rating stars component
  const RatingStars = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star}>
            {star <= Math.round(rating) ? (
              <StarIconSolid className="w-5 h-5 text-yellow-400" />
            ) : (
              <StarIcon className="w-5 h-5 text-gray-300" />
            )}
          </span>
        ))}
        <span className="ml-2 text-lg font-semibold text-gray-900">{rating.toFixed(1)}</span>
      </div>
    );
  };

  // Quote columns for recent quotes table
  const quoteColumns: DataTableColumn<Quote>[] = [
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
      key: 'project',
      label: 'Project',
      sortable: true,
      render: (value, quote) => (
        <div>
          <div className="text-sm font-medium text-gray-900">
            {formatProjectType(quote.project.type)}
          </div>
          <div className="text-sm text-gray-500">
            {quote.project.squareFootage.toLocaleString()} sq ft
          </div>
        </div>
      ),
    },
    {
      key: 'pricing',
      label: 'Amount',
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
      width: '120px',
      render: (value) => <Badge quoteStatus={value as QuoteStatus} size="sm" />,
    },
    {
      key: 'createdAt',
      label: 'Date',
      sortable: true,
      width: '110px',
      render: (value) => (
        <span className="text-sm text-gray-600">{formatDate(value)}</span>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <PageHeader
        title={pro.businessName}
        subtitle={`${pro.certificationLevel === 'master' ? 'Master' : ''} Certified Contractor`}
        breadcrumbs={[
          { label: 'Admin', href: '/admin/dashboard' },
          { label: 'Contractors', href: '/admin/pros' },
          { label: pro.businessName },
        ]}
        actions={
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={() => router.push('/admin/pros')}>
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button variant="outline" size="sm">
              Edit Profile
            </Button>
            <Button variant="danger" size="sm">
              Deactivate
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Business Information */}
        <div className="lg:col-span-1 space-y-6">
          {/* Contact Information */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">
                    Contact Person
                  </div>
                  <div className="text-base text-gray-900">{pro.ownerName}</div>
                </div>

                <div className="flex items-center gap-3">
                  <EnvelopeIcon className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="text-sm font-medium text-gray-500">Email</div>
                    <a
                      href={`mailto:${pro.email}`}
                      className="text-base text-blue-600 hover:text-blue-800"
                    >
                      {pro.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <PhoneIcon className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="text-sm font-medium text-gray-500">Phone</div>
                    <a
                      href={`tel:${pro.phone}`}
                      className="text-base text-blue-600 hover:text-blue-800"
                    >
                      {formatPhoneNumber(pro.phone)}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPinIcon className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-gray-500">Address</div>
                    <div className="text-base text-gray-900">
                      {pro.location.street}
                      <br />
                      {pro.location.city}, {pro.location.state}{' '}
                      {pro.location.zipCode}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Certifications */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Certification & Specialties
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-2">
                    Certification Level
                  </div>
                  <Badge
                    label={pro.certificationLevel === 'master' ? 'Master Certified' : 'Certified'}
                    variant={pro.certificationLevel === 'master' ? 'primary' : 'success'}
                  />
                  <div className="text-sm text-gray-500 mt-1">
                    Since {formatDate(pro.certificationDate)}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-500 mb-2">Specialties</div>
                  <div className="flex flex-wrap gap-2">
                    {pro.specialties?.map((specialty) => (
                      <Badge
                        key={specialty}
                        label={formatProjectType(specialty)}
                        variant="neutral"
                        size="sm"
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-500 mb-2">Service Area</div>
                  <div className="text-base text-gray-900">
                    {pro.serviceRadius} mile radius
                  </div>
                  <div className="text-sm text-gray-500">
                    {pro.serviceZipCodes.length} zip codes covered
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-500 mb-2">Status</div>
                  <Badge
                    label={pro.accountStatus === 'active' ? 'Active' : 'Inactive'}
                    variant={pro.accountStatus === 'active' ? 'success' : 'neutral'}
                  />
                  <div className="text-sm text-gray-500 mt-1">
                    Last active: {formatDate(pro.lastActive)}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - Performance Metrics */}
        <div className="lg:col-span-2 space-y-6">
          {/* Performance Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-600">Customer Rating</p>
                  <span className="text-2xl">⭐</span>
                </div>
                <div className="mt-1">
                  <RatingStars rating={pro.metrics.customerRating} />
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <span className="text-2xl">💰</span>
                </div>
                <p className="text-2xl font-bold text-brand-black">
                  {formatCurrency(pro.metrics.totalRevenue)}
                </p>
              </div>
            </Card>

            <Card>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-600">Quotes & Win Rate</p>
                  <span className="text-2xl">📊</span>
                </div>
                <p className="text-2xl font-bold text-brand-black">
                  {pro.metrics.wonQuotes}/{pro.metrics.totalQuotes}
                </p>
                <p className="text-sm text-gray-600">
                  {formatPercentage(pro.metrics.winRate)} win rate
                </p>
              </div>
            </Card>

            <Card>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-600">Avg Job Value</p>
                  <span className="text-2xl">🏆</span>
                </div>
                <p className="text-2xl font-bold text-brand-black">
                  {formatCurrency(pro.metrics.avgJobValue)}
                </p>
                <p className="text-sm text-gray-600">
                  {pro.metrics.jobsCompletedLast30} last 30 days
                </p>
              </div>
            </Card>
          </div>

          {/* Recent Quotes */}
          <Card>
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Quotes ({proQuotes.length} total)
              </h3>
            </div>
            <div className="p-6">
              <DataTable
                columns={quoteColumns}
                data={recentQuotes}
                keyExtractor={(quote) => quote.id}
                actions={[
                  {
                    label: 'View',
                    onClick: (quote) => router.push(`/admin/quotes/${quote.id}`),
                    variant: 'ghost',
                  },
                ]}
                emptyState={
                  <div className="text-center py-8">
                    <p className="text-gray-500">No quotes found for this contractor.</p>
                  </div>
                }
              />
            </div>
          </Card>

          {/* Recent Jobs (Accepted Quotes) */}
          <Card>
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Jobs ({acceptedQuotes.length} total)
              </h3>
            </div>
            <div className="p-6">
              <DataTable
                columns={quoteColumns}
                data={acceptedQuotes}
                keyExtractor={(quote) => quote.id}
                actions={[
                  {
                    label: 'View',
                    onClick: (quote) => router.push(`/admin/quotes/${quote.id}`),
                    variant: 'ghost',
                  },
                ]}
                emptyState={
                  <div className="text-center py-8">
                    <p className="text-gray-500">No completed jobs found for this contractor.</p>
                  </div>
                }
              />
            </div>
          </Card>

          {/* Service Area Map (Zip Codes List for MVP) */}
          <Card>
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Service Area</h3>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  Coverage: {pro.serviceRadius} mile radius from{' '}
                  {pro.location.city}, {pro.location.state}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-600 mb-3">
                  Covered Zip Codes ({pro.serviceZipCodes.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {pro.serviceZipCodes.map((zip) => (
                    <span
                      key={zip}
                      className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-900"
                    >
                      {zip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
