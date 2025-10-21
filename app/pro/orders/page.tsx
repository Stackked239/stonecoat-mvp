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
  const allOrders = getOrdersByPro(LOGGED_IN_PRO_ID);

  // Filter orders by status
  const filteredOrders = useMemo(() => {
    if (statusFilter === 'all') return allOrders;
    return allOrders.filter((order) => order.status === statusFilter);
  }, [allOrders, statusFilter]);

  // Table columns
  const columns = [
    {
      key: 'id',
      label: 'Order ID',
      sortable: true,
      render: (order: Order) => (
        <div className="font-medium text-gray-900">{order.id}</div>
      ),
    },
    {
      key: 'createdAt',
      label: 'Date',
      sortable: true,
      render: (order: Order) => (
        <div className="text-sm text-gray-900">
          {formatDate(order.createdAt)}
        </div>
      ),
    },
    {
      key: 'items',
      label: 'Items',
      render: (order: Order) => (
        <div className="text-sm text-gray-600">
          {order.items.length} item{order.items.length !== 1 ? 's' : ''}
        </div>
      ),
    },
    {
      key: 'total',
      label: 'Total',
      sortable: true,
      render: (order: Order) => (
        <div className="text-sm font-medium text-gray-900">
          {formatCurrency(order.pricing.total)}
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (order: Order) => {
        const statusConfig = ORDER_STATUS_COLORS[order.status];
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
          <Link href={`/pro/orders/${order.id}`}>
            <Button
              variant="outline"
              size="sm"
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
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-500 mb-1">Total Orders</div>
            <div className="text-3xl font-bold text-gray-900">{stats.totalOrders}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-500 mb-1">Total Spent</div>
            <div className="text-3xl font-bold text-gray-900">
              {formatCurrency(stats.totalRevenue)}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-500 mb-1">Pending</div>
            <div className="text-3xl font-bold text-yellow-600">{stats.pendingOrders}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-500 mb-1">Delivered</div>
            <div className="text-3xl font-bold text-green-600">{stats.deliveredOrders}</div>
          </div>
        </div>

        {/* Status Filter */}
        <div className="mb-6 flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">Filter by status:</span>
          <div className="flex gap-2 flex-wrap">
            {STATUS_FILTERS.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setStatusFilter(filter.value)}
                className={`
                  px-4 py-2 rounded-md text-sm font-medium transition-colors
                  ${
                    statusFilter === filter.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
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
