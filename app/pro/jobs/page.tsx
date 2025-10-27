'use client';

/**
 * Pro Portal - Jobs Pipeline Page
 * Kanban-style job tracking by status with filtering and stats
 * Authentication required - displays jobs for logged-in pro
 */

'use client';

import { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/shared/Card';
import { StatusBadge } from '@/components/shared/Badge';
import { Button } from '@/components/shared/Button';
import { mockJobs } from '@/lib/data/mockJobs';
import { PROJECT_TYPE_CONFIG } from '@/lib/utils/constants';
import { Job, JobStatus } from '@/lib/types';
import { format, isThisWeek, isThisMonth, startOfMonth } from 'date-fns';
import {
  CalendarIcon,
  MapPinIcon,
  Square3Stack3DIcon,
} from '@heroicons/react/24/outline';

// Filter type definition
type FilterType = 'all' | 'this-week' | 'this-month' | 'completed';

// Simulated authentication - in production this would come from NextAuth.js
const LOGGED_IN_PRO_ID = 'PRO-001';

export default function JobsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  // Filter jobs by logged-in pro
  const proJobs = useMemo(
    () => {
      if (!mockJobs || !Array.isArray(mockJobs)) return [];
      return mockJobs.filter((job) => job.proId === LOGGED_IN_PRO_ID);
    },
    []
  );

  // Apply date/status filters
  const filteredJobs = useMemo(() => {
    switch (activeFilter) {
      case 'this-week':
        return proJobs.filter((job) => {
          if (!job.scheduledDate) return false;
          return isThisWeek(job.scheduledDate, { weekStartsOn: 0 });
        });
      case 'this-month':
        return proJobs.filter((job) => {
          if (!job.scheduledDate) return false;
          return isThisMonth(job.scheduledDate);
        });
      case 'completed':
        return proJobs.filter((job) => job.status === 'completed');
      case 'all':
      default:
        return proJobs;
    }
  }, [proJobs, activeFilter]);

  // Group jobs by status
  const jobsByStatus = useMemo(() => {
    const groups: Record<JobStatus, Job[]> = {
      'quote-sent': [],
      'materials-ordered': [],
      scheduled: [],
      'in-progress': [],
      completed: [],
      cancelled: [],
    };

    filteredJobs.forEach((job) => {
      groups[job.status].push(job);
    });

    // Sort jobs within each group by date
    Object.keys(groups).forEach((status) => {
      groups[status as JobStatus].sort((a, b) => {
        const dateA = a.scheduledDate || a.completionDate || new Date(0);
        const dateB = b.scheduledDate || b.completionDate || new Date(0);
        return dateB.getTime() - dateA.getTime();
      });
    });

    return groups;
  }, [filteredJobs]);

  // Calculate summary stats
  const stats = useMemo(() => {
    const activeStatuses: JobStatus[] = ['scheduled', 'in-progress', 'materials-ordered'];
    const activeJobs = proJobs.filter((job) => activeStatuses.includes(job.status));

    const scheduledThisWeek = proJobs.filter(
      (job) =>
        job.scheduledDate &&
        isThisWeek(job.scheduledDate, { weekStartsOn: 0 }) &&
        ['scheduled', 'in-progress'].includes(job.status)
    );

    const completedThisMonth = proJobs.filter(
      (job) =>
        job.status === 'completed' &&
        job.completionDate &&
        isThisMonth(job.completionDate)
    );

    return {
      totalActive: activeJobs.length,
      scheduledThisWeek: scheduledThisWeek.length,
      completedThisMonth: completedThisMonth.length,
    };
  }, [proJobs]);

  // Kanban columns configuration - show main job pipeline statuses
  const kanbanColumns: { status: JobStatus; label: string; color: string }[] = [
    { status: 'quote-sent', label: 'Quote Sent', color: 'border-accent-blue bg-accent-blue/10' },
    { status: 'materials-ordered', label: 'Materials Ordered', color: 'border-brand-orange bg-brand-orange/10' },
    { status: 'scheduled', label: 'Scheduled', color: 'border-accent-gold bg-accent-gold/10' },
    { status: 'in-progress', label: 'In Progress', color: 'border-brand-orange bg-brand-orange/20' },
    { status: 'completed', label: 'Completed', color: 'border-accent-green bg-accent-green/10' },
  ];

  // Cancelled jobs displayed separately
  const cancelledJobs = jobsByStatus['cancelled'];

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-brand-black">Job Pipeline</h1>
          <p className="text-brand-black/70">
            Track your jobs from scheduling to completion
          </p>
        </div>

        {/* Summary Stats */}
        <div className="mb-8 grid gap-6 sm:grid-cols-3">
          <Card>
            <div>
              <p className="text-sm font-medium text-brand-black/60">Total Active Jobs</p>
              <p className="mt-2 text-3xl font-bold text-brand-black">{stats.totalActive}</p>
            </div>
          </Card>
          <Card>
            <div>
              <p className="text-sm font-medium text-brand-black/60">Scheduled This Week</p>
              <p className="mt-2 text-3xl font-bold text-accent-blue">{stats.scheduledThisWeek}</p>
            </div>
          </Card>
          <Card>
            <div>
              <p className="text-sm font-medium text-brand-black/60">Completed This Month</p>
              <p className="mt-2 text-3xl font-bold text-accent-green">{stats.completedThisMonth}</p>
            </div>
          </Card>
        </div>

        {/* Filter Buttons */}
        <div className="mb-6 flex flex-wrap gap-2">
          <Button
            variant={activeFilter === 'all' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter('all')}
          >
            All Jobs ({proJobs.length})
          </Button>
          <Button
            variant={activeFilter === 'this-week' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter('this-week')}
          >
            This Week
          </Button>
          <Button
            variant={activeFilter === 'this-month' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter('this-month')}
          >
            This Month
          </Button>
          <Button
            variant={activeFilter === 'completed' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter('completed')}
          >
            Completed
          </Button>
        </div>

        {/* Kanban Board */}
        <div className="overflow-x-auto pb-4">
          <div className="inline-flex gap-6 min-w-full lg:grid lg:grid-cols-5">
            {kanbanColumns.map((column) => (
              <div key={column.status} className="flex flex-col min-w-[300px] lg:min-w-0">
                {/* Column Header */}
                <div
                  className={`mb-4 rounded-t-lg border-2 ${column.color} p-4`}
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-brand-black">
                      {column.label}
                    </h2>
                    <span className="rounded-full bg-white px-2.5 py-0.5 text-sm font-medium text-brand-black shadow-sm">
                      {jobsByStatus[column.status].length}
                    </span>
                  </div>
                </div>

                {/* Job Cards */}
                <div className="space-y-4">
                  {jobsByStatus[column.status].length === 0 ? (
                    <Card padding="lg" variant="outlined">
                      <p className="text-center text-sm text-gray-500">
                        No jobs
                      </p>
                    </Card>
                  ) : (
                    jobsByStatus[column.status].map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cancelled Jobs Section */}
        {cancelledJobs.length > 0 && activeFilter === 'all' && (
          <div className="mt-8">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Cancelled Jobs ({cancelledJobs.length})
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cancelledJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredJobs.length === 0 && (
          <Card padding="lg" className="mt-8">
            <div className="text-center">
              <Square3Stack3DIcon className="mx-auto h-12 w-12 text-gray-500" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                No jobs found
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                {activeFilter === 'all'
                  ? 'You don\'t have any jobs yet. Create a quote to get started.'
                  : 'No jobs match the selected filter.'}
              </p>
              {activeFilter !== 'all' && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => setActiveFilter('all')}
                >
                  View All Jobs
                </Button>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

/**
 * Individual job card component
 */
function JobCard({ job }: { job: Job }) {
  const projectTypeConfig = PROJECT_TYPE_CONFIG[job.project.type];

  return (
    <Card hover padding="md">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-brand-black">{job.customer.name}</h3>
            <p className="text-sm text-brand-black/70">{projectTypeConfig.label}</p>
          </div>
          <StatusBadge status={job.status} />
        </div>

        {/* Project Details */}
        <div className="space-y-2 border-t border-gray-100 pt-3">
          <div className="flex items-center gap-2 text-sm text-brand-black/70">
            <Square3Stack3DIcon className="h-4 w-4" />
            <span>{job.project.squareFootage.toLocaleString()} sq ft</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-brand-black/70">
            <MapPinIcon className="h-4 w-4" />
            <span>
              {job.customer.address.city}, {job.customer.address.state}
            </span>
          </div>
          {(job.scheduledDate || job.completionDate) && (
            <div className="flex items-center gap-2 text-sm text-brand-black/70">
              <CalendarIcon className="h-4 w-4" />
              <span>
                {job.status === 'completed' && job.completionDate
                  ? `Completed ${format(job.completionDate, 'MMM dd, yyyy')}`
                  : job.scheduledDate
                  ? `Scheduled ${format(job.scheduledDate, 'MMM dd, yyyy')}`
                  : 'Date TBD'}
              </span>
            </div>
          )}
        </div>

        {/* Notes */}
        {job.notes && (
          <div className="border-t border-gray-100 pt-3">
            <p className="text-xs text-brand-black/60 line-clamp-2">{job.notes}</p>
          </div>
        )}

        {/* Actions */}
        <div className="border-t border-gray-100 pt-3">
          <Button variant="outline" size="sm" className="w-full">
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
}
