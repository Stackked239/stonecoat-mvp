'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/shared/DataTable';
import { Button } from '@/components/shared/Button';
import { Badge } from '@/components/shared/Badge';
import { getOrdersByPro } from '@/lib/data/mockOrders';
import { Order, OrderStatus } from '@/lib/types/order';
import { formatCurrency, formatDate } from '@/lib/utils/formatting';
import { ORDER_STATUS_COLORS } from '@/lib/utils/constants';
import { PlusIcon } from '@heroicons/react/24/outline';

// For MVP, hardcode logged-in pro ID
const LOGGED_IN_PRO_ID = 'PRO-001'; // Tampa Premium Coatings

// Status filter options
const STATUS_FILTERS: { value: OrderStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All Orders' },
  { value: 'pending', label: 'Pending' },
  { value: 'processing', label: 'Processing' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
];

export default function ProOrdersPage() {
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');

  // Get orders for logged-in pro
  const allOrders = getOrdersByPro(LOGGED_IN_PRO_ID) || [];

  // Filter orders by status
  const filteredOrders = useMemo(() => {
    if (!allOrders || allOrders.length === 0) return [];
    // Filter out any null/undefined orders and apply status filter
    const validOrders = allOrders.filter((order) => order != null);
    if (statusFilter === 'all') return validOrders;
    return validOrders.filter((order) => order.status === statusFilter);
  }, [allOrders, statusFilter]);

  // Table columns
  const columns = [
    {
      key: 'id',
      label: 'Order ID',
      sortable: true,
      render: (order: Order) => (
        <div className="font-medium text-brand-black">{order.id}</div>
      ),
    },
    {
      key: 'createdAt',
      label: 'Date',
      sortable: true,
      render: (order: Order) => (
        <div className="text-sm text-brand-black">
          {formatDate(order.createdAt)}
        </div>
      ),
    },
    {
      key: 'items',
      label: 'Items',
      render: (order: Order) => {
        const itemCount = order?.items?.length || 0;
        return (
          <div className="text-sm text-brand-black/70">
            {itemCount} item{itemCount !== 1 ? 's' : ''}
          </div>
        );
      },
    },
    {
      key: 'total',
      label: 'Total',
      sortable: true,
      render: (order: Order) => (
        <div className="text-sm font-medium text-brand-orange">
          {formatCurrency(order?.pricing?.total || 0)}
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (order: Order) => {
        if (!order || !order.status) {
          return <Badge variant="warning" label="Unknown" />;
        }
        const statusConfig = ORDER_STATUS_COLORS[order.status];
        if (!statusConfig) {
          return <Badge variant="warning" label={order.status} />;
        }
        return (
          <Badge
            variant={
              order.status === 'delivered'
                ? 'success'
                : order.status === 'cancelled'
                ? 'error'
                : order.status === 'shipped'
                ? 'primary'
                : order.status === 'processing'
                ? 'primary'
                : 'warning'
            }
            label={statusConfig.label}
          />
        );
      },
    },
    {
      key: 'actions',
      label: '',
      render: (order: Order) => (
        <div className="flex justify-end">
          <Link href={`/pro/orders/${order?.id || 'unknown'}`}>
            <Button
              variant="outline"
              size="sm"
              disabled={!order?.id}
            >
              View Details
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  // Order summary stats
  const stats = useMemo(() => {
    if (!allOrders || allOrders.length === 0) {
      return {
        totalOrders: 0,
        totalRevenue: 0,
        pendingOrders: 0,
        deliveredOrders: 0,
      };
    }

    const totalOrders = allOrders.length;
    const totalRevenue = allOrders.reduce((sum, order) => sum + order.pricing.total, 0);
    const pendingOrders = allOrders.filter(
      (o) => o.status === 'pending' || o.status === 'processing'
    ).length;
    const deliveredOrders = allOrders.filter((o) => o.status === 'delivered').length;

    return {
      totalOrders,
      totalRevenue,
      pendingOrders,
      deliveredOrders,
    };
  }, [allOrders]);

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Material Orders"
        description="View your order history and track shipments"
        actions={
          <Link href="/pro/orders/new">
            <Button variant="primary">
              <PlusIcon className="w-5 h-5" />
              Place New Order
            </Button>
          </Link>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-brand-md p-6 border border-brand-orange/20">
            <div className="text-sm font-medium text-brand-black/60 mb-1">Total Orders</div>
            <div className="text-3xl font-bold text-brand-black">{stats.totalOrders}</div>
          </div>
          <div className="bg-white rounded-lg shadow-brand-md p-6 border border-brand-orange/20">
            <div className="text-sm font-medium text-brand-black/60 mb-1">Total Spent</div>
            <div className="text-3xl font-bold text-brand-orange">
              {formatCurrency(stats.totalRevenue)}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-brand-md p-6 border border-brand-orange/20">
            <div className="text-sm font-medium text-brand-black/60 mb-1">Pending</div>
            <div className="text-3xl font-bold text-accent-gold">{stats.pendingOrders}</div>
          </div>
          <div className="bg-white rounded-lg shadow-brand-md p-6 border border-brand-orange/20">
            <div className="text-sm font-medium text-brand-black/60 mb-1">Delivered</div>
            <div className="text-3xl font-bold text-accent-green">{stats.deliveredOrders}</div>
          </div>
        </div>

        {/* Status Filter */}
        <div className="mb-6 flex items-center gap-2">
          <span className="text-sm font-medium text-brand-black/70">Filter by status:</span>
          <div className="flex gap-2 flex-wrap">
            {STATUS_FILTERS.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setStatusFilter(filter.value)}
                className={`
                  px-4 py-2 rounded-md text-sm font-medium transition-colors
                  ${
                    statusFilter === filter.value
                      ? 'bg-brand-orange text-white shadow-brand-sm'
                      : 'bg-white text-brand-black border border-gray-300 hover:bg-brand-orange/10 hover:border-brand-orange/40'
                  }
                `}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <DataTable
          data={filteredOrders}
          columns={columns}
          keyExtractor={(order) => order.id}
          emptyState={
            <div className="text-center py-12">
              <p className="text-gray-500">No orders found matching your filter.</p>
            </div>
          }
        />
      </div>
    </div>
  );
}
