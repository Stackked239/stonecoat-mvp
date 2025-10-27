'use client';

/**
 * Pro Dashboard Page
 * Main dashboard for contractors showing key metrics, recent activity, and quick actions
 */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, StatCard } from '@/components/shared/Card';
import { StatusBadge } from '@/components/shared/Badge';
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange mx-auto mb-4"></div>
          <p className="text-brand-black/60">Loading dashboard...</p>
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
        <StatCard
          label="Total Quotes"
          value={dashboardData.totalQuotes.toString()}
          icon="📝"
          trend="neutral"
        />

        <StatCard
          label="Active Jobs"
          value={dashboardData.activeJobs.toString()}
          icon="🔨"
          trend="neutral"
        />

        <StatCard
          label="Total Revenue"
          value={formatCurrency(dashboardData.totalRevenue)}
          icon="💰"
          trend="up"
        />

        <StatCard
          label="Win Rate"
          value={formatPercentage(dashboardData.winRate)}
          icon="📊"
          trend="up"
        />
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Quotes */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-brand-black">Recent Quotes</h3>
            <Link href="/quotes" className="text-sm text-brand-orange hover:text-brand-orange/80 font-medium">
              View All
            </Link>
          </div>

          {dashboardData.recentQuotes.length === 0 ? (
            <p className="text-brand-black/60 text-center py-8">No quotes yet</p>
          ) : (
            <div className="space-y-4">
              {dashboardData.recentQuotes.map((quote) => (
                <Link
                  key={quote.id}
                  href={`/quotes/${quote.id}`}
                  className="block p-4 rounded-lg border border-gray-200 hover:border-brand-orange hover:shadow-brand-sm transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-brand-black truncate">
                        {quote.customer.name}
                      </p>
                      <p className="text-xs text-brand-black/60 mt-1">
                        {quote.project.type.replace(/-/g, ' ')} • {quote.project.squareFootage} sq ft
                      </p>
                    </div>
                    <StatusBadge status={quote.status} />
                  </div>
                  {quote.pricing && (
                    <p className="text-sm font-semibold text-brand-black">
                      {formatCurrency(quote.pricing.total)}
                    </p>
                  )}
                  <p className="text-xs text-brand-black/60 mt-1">
                    {formatDate(quote.createdAt)}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </Card>

        {/* Recent Jobs */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-brand-black">Recent Jobs</h3>
            <Link href="/jobs" className="text-sm text-brand-orange hover:text-brand-orange/80 font-medium">
              View All
            </Link>
          </div>

          {dashboardData.recentJobs.length === 0 ? (
            <p className="text-brand-black/60 text-center py-8">No jobs yet</p>
          ) : (
            <div className="space-y-4">
              {dashboardData.recentJobs.map((job) => (
                <Link
                  key={job.id}
                  href={`/jobs/${job.id}`}
                  className="block p-4 rounded-lg border border-gray-200 hover:border-brand-orange hover:shadow-brand-sm transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-brand-black truncate">
                        {job.customer.name}
                      </p>
                      <p className="text-xs text-brand-black/60 mt-1">
                        {job.project.type.replace(/-/g, ' ')} • {job.project.squareFootage} sq ft
                      </p>
                    </div>
                    <StatusBadge status={job.status} />
                  </div>
                  {job.scheduledDate && (
                    <p className="text-xs text-brand-black/60 mt-1">
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
      <Card>
        <h3 className="text-lg font-semibold text-brand-black mb-6">Quick Actions</h3>

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
