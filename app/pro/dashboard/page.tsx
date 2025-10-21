'use client';

/**
 * Pro Dashboard Page
 * Main dashboard for contractors showing key metrics, recent activity, and quick actions
 */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/shared/Card';
import { Badge } from '@/components/shared/Badge';
import { Button } from '@/components/shared/Button';
import { getProSession, isProAuthenticated } from '@/lib/utils/auth';
import { getProById } from '@/lib/data/mockPros';
import { getQuotesByPro } from '@/lib/data/mockQuotes';
import { getJobsByPro } from '@/lib/data/mockJobs';
import { formatCurrency, formatDate, formatPercentage } from '@/lib/utils/formatting';
import type { Quote } from '@/lib/types/quote';
import type { Job } from '@/lib/types';

export default function ProDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<{
    businessName: string;
    totalQuotes: number;
    activeJobs: number;
    totalRevenue: number;
    winRate: number;
    recentQuotes: Quote[];
    recentJobs: Job[];
  } | null>(null);

  useEffect(() => {
    // Check authentication
    if (!isProAuthenticated()) {
      router.push('/login');
      return;
    }

    // Load dashboard data
    const session = getProSession();
    if (!session) {
      router.push('/login');
      return;
    }

    const pro = getProById(session.proId);
    if (!pro) {
      router.push('/login');
      return;
    }

    // Get quotes and jobs for this pro
    const quotes = getQuotesByPro(session.proId);
    const jobs = getJobsByPro(session.proId);
    const activeJobs = jobs.filter(job =>
      job.status === 'in-progress' ||
      job.status === 'scheduled' ||
      job.status === 'materials-ordered'
    );

    // Get recent activity (latest 5 quotes, latest 3 jobs)
    const recentQuotes = quotes
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 5);

    const recentJobs = jobs
      .filter(job => job.scheduledDate || job.completionDate)
      .sort((a, b) => {
        const dateA = b.completionDate || b.scheduledDate || new Date(0);
        const dateB = a.completionDate || a.scheduledDate || new Date(0);
        return dateA.getTime() - dateB.getTime();
      })
      .slice(0, 3);

    setDashboardData({
      businessName: pro.businessName,
      totalQuotes: pro.metrics.totalQuotes,
      activeJobs: activeJobs.length,
      totalRevenue: pro.metrics.totalRevenue,
      winRate: pro.metrics.winRate,
      recentQuotes,
      recentJobs,
    });

    setLoading(false);
  }, [router]);

  if (loading || !dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Dashboard"
        subtitle={`Welcome back, ${dashboardData.businessName}`}
        actions={
          <Button
            variant="primary"
            onClick={() => router.push('/quotes/new')}
          >
            Create New Quote
          </Button>
        }
      />

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Quotes */}
        <Card variant="outlined">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Quotes</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {dashboardData.totalQuotes}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </Card>

        {/* Active Jobs */}
        <Card variant="outlined">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Jobs</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {dashboardData.activeJobs}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </Card>

        {/* Total Revenue */}
        <Card variant="outlined">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {formatCurrency(dashboardData.totalRevenue)}
              </p>
            </div>
            <div className="p-3 bg-emerald-100 rounded-lg">
              <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </Card>

        {/* Win Rate */}
        <Card variant="outlined">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Win Rate</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {formatPercentage(dashboardData.winRate)}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Quotes */}
        <Card
          header={
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Quotes</h3>
              <Link href="/quotes" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                View All
              </Link>
            </div>
          }
          divided
        >
          {dashboardData.recentQuotes.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No quotes yet</p>
          ) : (
            <div className="space-y-4">
              {dashboardData.recentQuotes.map((quote) => (
                <Link
                  key={quote.id}
                  href={`/quotes/${quote.id}`}
                  className="block p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {quote.customer.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {quote.project.type.replace(/-/g, ' ')} • {quote.project.squareFootage} sq ft
                      </p>
                    </div>
                    <Badge quoteStatus={quote.status} size="sm" />
                  </div>
                  {quote.pricing && (
                    <p className="text-sm font-semibold text-gray-900">
                      {formatCurrency(quote.pricing.total)}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDate(quote.createdAt)}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </Card>

        {/* Recent Jobs */}
        <Card
          header={
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Jobs</h3>
              <Link href="/jobs" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                View All
              </Link>
            </div>
          }
          divided
        >
          {dashboardData.recentJobs.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No jobs yet</p>
          ) : (
            <div className="space-y-4">
              {dashboardData.recentJobs.map((job) => (
                <Link
                  key={job.id}
                  href={`/jobs/${job.id}`}
                  className="block p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {job.customer.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {job.project.type.replace(/-/g, ' ')} • {job.project.squareFootage} sq ft
                      </p>
                    </div>
                    <Badge jobStatus={job.status} size="sm" />
                  </div>
                  {job.scheduledDate && (
                    <p className="text-xs text-gray-600 mt-1">
                      {job.status === 'completed' && job.completionDate
                        ? `Completed ${formatDate(job.completionDate)}`
                        : `Scheduled for ${formatDate(job.scheduledDate)}`}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Quick Actions */}
      <Card
        header={<h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>}
        divided
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button
            variant="outline"
            fullWidth
            onClick={() => router.push('/quotes/new')}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create New Quote
          </Button>

          <Button
            variant="outline"
            fullWidth
            onClick={() => router.push('/inventory')}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            View Inventory
          </Button>

          <Button
            variant="outline"
            fullWidth
            onClick={() => router.push('/jobs')}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            View All Jobs
          </Button>
        </div>
      </Card>
    </div>
  );
}
