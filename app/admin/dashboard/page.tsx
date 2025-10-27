'use client';

/**
 * Admin Dashboard Page
 * Master oversight dashboard with metrics, charts, and recent activity
 *
 * Features:
 * - Summary metrics (4 cards)
 * - Revenue chart (line chart - 6 months)
 * - Quote status distribution (pie chart)
 * - Top performing pros (bar chart - top 5 by revenue)
 * - Conversion funnel (bar chart)
 * - Recent activity feed (latest quotes and orders)
 * - Quick actions
 */

'use client';

import { useMemo } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardHeader, CardTitle, CardContent, StatCard } from '@/components/shared/Card';
import { Badge } from '@/components/shared/Badge';
import { Button } from '@/components/shared/Button';
import { mockQuotes } from '@/lib/data/mockQuotes';
import { mockOrders, getRecentOrders } from '@/lib/data/mockOrders';
import { mockPros } from '@/lib/data/mockPros';
import { colors } from '@/lib/design-tokens';
import Link from 'next/link';
import {
  CurrencyDollarIcon,
  DocumentTextIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { format } from 'date-fns';

export default function AdminDashboardPage() {
  // Calculate summary metrics
  const metrics = useMemo(() => {
    // Total Revenue: Sum of all accepted quote totals + all delivered order totals
    const acceptedQuotes = mockQuotes.filter(q => q.status === 'accepted');
    const deliveredOrders = mockOrders.filter(o => o.status === 'delivered');

    const quoteRevenue = acceptedQuotes.reduce((sum, q) => sum + (q.pricing?.total || 0), 0);
    const orderRevenue = deliveredOrders.reduce((sum, o) => sum + o.pricing.total, 0);
    const totalRevenue = quoteRevenue + orderRevenue;

    // Total Quotes
    const totalQuotes = mockQuotes.length;

    // Active Contractors
    const activeContractors = mockPros.filter(p => p.accountStatus === 'active').length;

    // Customer Satisfaction (average rating across all pros)
    const avgRating = mockPros.reduce((sum, p) => sum + p.metrics.customerRating, 0) / mockPros.length;

    return {
      totalRevenue,
      totalQuotes,
      activeContractors,
      avgRating,
    };
  }, []);

  // Prepare data for Revenue Chart (last 6 months)
  const revenueData = useMemo(() => {
    const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
    const monthlyData = months.map((month, index) => {
      // Simulate monthly revenue growth (for demo purposes)
      const baseRevenue = 45000;
      const growth = index * 12000;
      const revenue = baseRevenue + growth + Math.random() * 8000;

      return {
        month,
        revenue: Math.round(revenue),
        quotes: Math.round(30 + index * 5 + Math.random() * 10),
      };
    });

    return monthlyData;
  }, []);

  // Prepare data for Quote Status Distribution
  const quoteStatusData = useMemo(() => {
    const statusCounts = {
      requested: 0,
      sent: 0,
      accepted: 0,
      declined: 0,
      expired: 0,
    };

    mockQuotes.forEach(q => {
      statusCounts[q.status]++;
    });

    return [
      { name: 'Requested', value: statusCounts.requested, color: colors.accent.blue },
      { name: 'Sent', value: statusCounts.sent, color: colors.brand.orange },
      { name: 'Accepted', value: statusCounts.accepted, color: colors.accent.green },
      { name: 'Declined', value: statusCounts.declined, color: colors.semantic.error },
      { name: 'Expired', value: statusCounts.expired, color: '#6B7280' },
    ];
  }, []);

  // Prepare data for Top Performing Pros (top 5 by revenue)
  const topProsData = useMemo(() => {
    const prosWithRevenue = mockPros
      .map(pro => ({
        name: pro.businessName,
        revenue: pro.metrics.totalRevenue,
        winRate: pro.metrics.winRate,
      }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    return prosWithRevenue;
  }, []);

  // Prepare data for Conversion Funnel
  const conversionData = useMemo(() => {
    const requested = mockQuotes.filter(q => q.status === 'requested').length;
    const sent = mockQuotes.filter(q => q.status === 'sent' || q.status === 'accepted' || q.status === 'declined').length;
    const accepted = mockQuotes.filter(q => q.status === 'accepted').length;

    return [
      { stage: 'Requested', count: requested, percentage: 100 },
      { stage: 'Sent', count: sent + accepted, percentage: Math.round(((sent + accepted) / requested) * 100) },
      { stage: 'Accepted', count: accepted, percentage: Math.round((accepted / requested) * 100) },
    ];
  }, []);

  // Get recent activity (last 10 quotes and 5 orders)
  const recentQuotes = useMemo(() => {
    return [...mockQuotes]
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 10);
  }, []);

  const recentOrders = useMemo(() => {
    return getRecentOrders(5);
  }, []);

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <PageHeader
          title="Admin Dashboard"
          subtitle="Stonecoat Master Overview"
          description="Monitor system performance, contractor activity, and revenue metrics"
          actions={
            <Button variant="primary" size="md">
              <DocumentTextIcon className="w-5 h-5" />
              Generate Report
            </Button>
          }
        />

        {/* Summary Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            label="Total Revenue"
            value={formatCurrency(metrics.totalRevenue)}
            change="+12.5% from last month"
            trend="up"
            icon="💰"
          />
          <StatCard
            label="Total Quotes"
            value={metrics.totalQuotes.toString()}
            change="+8.3% from last month"
            trend="up"
            icon="📝"
          />
          <StatCard
            label="Active Contractors"
            value={metrics.activeContractors.toString()}
            change="All active"
            trend="neutral"
            icon="👥"
          />
          <StatCard
            label="Customer Satisfaction"
            value={metrics.avgRating.toFixed(1)}
            change={`${[...Array(5)].map((_, i) => i < Math.round(metrics.avgRating) ? '⭐' : '☆').join('')}`}
            trend="up"
            icon="⭐"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <Card variant="default" padding="md">
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis
                      dataKey="month"
                      stroke="#6B7280"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis
                      stroke="#6B7280"
                      style={{ fontSize: '12px' }}
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                      formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px' }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke={colors.accent.green}
                      strokeWidth={3}
                      dot={{ fill: colors.accent.green, r: 4 }}
                      activeDot={{ r: 6 }}
                      name="Revenue"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Quote Status Distribution */}
          <Card variant="default" padding="md">
            <CardHeader>
              <CardTitle>Quote Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={quoteStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(props: { name: string; percent: number }) =>
                        `${props.name} ${(props.percent * 100).toFixed(0)}%`
                      }
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {quoteStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [value, 'Quotes']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Top Performing Pros */}
          <Card variant="default" padding="md">
            <CardHeader>
              <CardTitle>Top Performing Contractors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topProsData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis
                      type="number"
                      stroke="#6B7280"
                      style={{ fontSize: '12px' }}
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      stroke="#6B7280"
                      style={{ fontSize: '11px' }}
                      width={150}
                    />
                    <Tooltip
                      formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px' }}
                    />
                    <Bar dataKey="revenue" fill={colors.brand.orange} radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Conversion Funnel */}
          <Card variant="default" padding="md">
            <CardHeader>
              <CardTitle>Conversion Funnel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={conversionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis
                      dataKey="stage"
                      stroke="#6B7280"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis
                      stroke="#6B7280"
                      style={{ fontSize: '12px' }}
                    />
                    <Tooltip
                      formatter={(value: number, name: string) => {
                        if (name === 'count') return [value, 'Quotes'];
                        return [`${value}%`, 'Conversion Rate'];
                      }}
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px' }}
                    />
                    <Legend />
                    <Bar dataKey="count" fill={colors.accent.blue} radius={[8, 8, 0, 0]} name="Quotes" />
                    <Bar dataKey="percentage" fill={colors.accent.green} radius={[8, 8, 0, 0]} name="Conversion %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity Feed */}
          <Card variant="default" padding="md" className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Recent Quotes */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-600 mb-3">Latest Quotes</h4>
                  <div className="space-y-3">
                    {recentQuotes.map((quote) => (
                      <div
                        key={quote.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900 text-sm">{quote.customer.name}</span>
                            <Badge quoteStatus={quote.status} size="sm" />
                          </div>
                          <p className="text-xs text-gray-600 mt-1">
                            {quote.project.type} • {quote.project.squareFootage} sqft
                            {quote.proName && ` • ${quote.proName}`}
                          </p>
                        </div>
                        <div className="text-right ml-4">
                          {quote.pricing && (
                            <p className="font-semibold text-sm text-gray-900">
                              {formatCurrency(quote.pricing.total)}
                            </p>
                          )}
                          <p className="text-xs text-gray-500">
                            {format(quote.createdAt, 'MMM d, h:mm a')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-600 mb-3">Latest Orders</h4>
                  <div className="space-y-3">
                    {recentOrders.map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900 text-sm">{order.proName}</span>
                            <Badge orderStatus={order.status} size="sm" />
                          </div>
                          <p className="text-xs text-gray-600 mt-1">
                            {order.items.length} items • {order.id}
                          </p>
                        </div>
                        <div className="text-right ml-4">
                          <p className="font-semibold text-sm text-gray-900">
                            {formatCurrency(order.pricing.total)}
                          </p>
                          <p className="text-xs text-gray-500">
                            {format(order.createdAt, 'MMM d, h:mm a')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card variant="default" padding="md">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Link href="/admin/quotes" className="block">
                  <Button variant="outline" fullWidth size="md">
                    <DocumentTextIcon className="w-5 h-5" />
                    View All Quotes
                  </Button>
                </Link>
                <Link href="/admin/pros" className="block">
                  <Button variant="outline" fullWidth size="md">
                    <UserGroupIcon className="w-5 h-5" />
                    Manage Contractors
                  </Button>
                </Link>
                <Link href="/admin/inventory" className="block">
                  <Button variant="outline" fullWidth size="md">
                    <CurrencyDollarIcon className="w-5 h-5" />
                    Inventory Management
                  </Button>
                </Link>
              </div>

              {/* System Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-600 mb-3">System Stats</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Avg Quote Value</span>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(
                        mockQuotes
                          .filter(q => q.pricing)
                          .reduce((sum, q) => sum + (q.pricing?.total || 0), 0) /
                        mockQuotes.filter(q => q.pricing).length
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Acceptance Rate</span>
                    <span className="font-semibold text-gray-900">
                      {Math.round(
                        (mockQuotes.filter(q => q.status === 'accepted').length /
                        mockQuotes.filter(q => q.status !== 'requested').length) * 100
                      )}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Orders</span>
                    <span className="font-semibold text-gray-900">{mockOrders.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Avg Order Value</span>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(
                        mockOrders.reduce((sum, o) => sum + o.pricing.total, 0) / mockOrders.length
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
