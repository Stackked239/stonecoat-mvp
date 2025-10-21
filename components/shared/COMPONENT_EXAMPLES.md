# Shared Components Usage Examples

## DataTable Component

### Basic Table with Sorting

```tsx
import { DataTable } from '@/components/shared';

interface Quote {
  id: string;
  customer: string;
  amount: number;
  status: string;
  date: string;
}

export default function QuotesPage() {
  const quotes: Quote[] = [
    { id: '1', customer: 'John Doe', amount: 5000, status: 'sent', date: '2024-10-15' },
    { id: '2', customer: 'Jane Smith', amount: 7500, status: 'accepted', date: '2024-10-18' },
  ];

  return (
    <DataTable
      columns={[
        { key: 'customer', label: 'Customer', sortable: true },
        { key: 'amount', label: 'Amount', sortable: true, align: 'right' },
        { key: 'status', label: 'Status', sortable: true },
        { key: 'date', label: 'Date', sortable: true },
      ]}
      data={quotes}
      keyExtractor={(item) => item.id}
      sortable
    />
  );
}
```

### Table with Custom Rendering and Actions

```tsx
import { DataTable, Badge } from '@/components/shared';
import { formatCurrency, formatDate } from '@/lib/utils/formatting';

export default function QuotesTable() {
  const quotes = [
    // ... your data
  ];

  return (
    <DataTable
      columns={[
        {
          key: 'customer',
          label: 'Customer',
          sortable: true,
          width: '30%'
        },
        {
          key: 'amount',
          label: 'Amount',
          sortable: true,
          align: 'right',
          render: (value) => formatCurrency(value)
        },
        {
          key: 'status',
          label: 'Status',
          render: (value) => (
            <Badge quoteStatus={value} />
          )
        },
        {
          key: 'date',
          label: 'Date',
          sortable: true,
          render: (value) => formatDate(value, 'short')
        },
      ]}
      data={quotes}
      keyExtractor={(item) => item.id}
      actions={[
        {
          label: 'View',
          variant: 'outline',
          onClick: (item) => router.push(`/quotes/${item.id}`)
        },
        {
          label: 'Edit',
          variant: 'ghost',
          onClick: (item) => handleEdit(item)
        }
      ]}
      sortable
    />
  );
}
```

### Table with Pagination

```tsx
import { DataTable } from '@/components/shared';
import { useState } from 'react';

export default function PaginatedTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const quotes = []; // ... your large dataset

  return (
    <DataTable
      columns={[
        { key: 'customer', label: 'Customer', sortable: true },
        { key: 'amount', label: 'Amount', sortable: true, align: 'right' },
        { key: 'status', label: 'Status' },
      ]}
      data={quotes}
      keyExtractor={(item) => item.id}
      pagination={{
        enabled: true,
        pageSize: 10,
        currentPage: currentPage,
        onPageChange: setCurrentPage
      }}
      sortable
    />
  );
}
```

### Table with Loading and Empty States

```tsx
import { DataTable } from '@/components/shared';

export default function QuotesWithStates() {
  const { data, isLoading } = useFetchQuotes();

  return (
    <DataTable
      columns={[
        { key: 'customer', label: 'Customer' },
        { key: 'amount', label: 'Amount', align: 'right' },
      ]}
      data={data || []}
      keyExtractor={(item) => item.id}
      loading={isLoading}
      emptyState={
        <div className="text-center py-12">
          <p className="text-gray-500">No quotes found</p>
          <Button onClick={() => router.push('/quotes/new')}>
            Create Your First Quote
          </Button>
        </div>
      }
    />
  );
}
```

## PageHeader Component

### Simple Page Header

```tsx
import { PageHeader } from '@/components/shared';

export default function Dashboard() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="View your performance metrics and recent activity"
      />
      {/* Page content */}
    </>
  );
}
```

### Page Header with Subtitle

```tsx
import { PageHeader } from '@/components/shared';

export default function Profile() {
  return (
    <PageHeader
      title="John Doe"
      subtitle="Professional Epoxy Flooring Contractor"
      description="Serving Tampa Bay Area since 2018"
    />
  );
}
```

### Page Header with Breadcrumbs

```tsx
import { PageHeader } from '@/components/shared';

export default function QuoteDetail() {
  return (
    <PageHeader
      title="Quote #12345"
      breadcrumbs={[
        { label: 'Dashboard', href: '/pro/dashboard' },
        { label: 'Quotes', href: '/pro/quotes' },
        { label: 'Quote #12345' }
      ]}
    />
  );
}
```

### Page Header with Actions

```tsx
import { PageHeader, Button } from '@/components/shared';

export default function QuotesList() {
  return (
    <PageHeader
      title="Quotes"
      description="Manage all your customer quotes"
      actions={
        <>
          <Button variant="outline">
            Export CSV
          </Button>
          <Button variant="primary">
            Create New Quote
          </Button>
        </>
      }
    />
  );
}
```

### Complete Page Header Example

```tsx
import { PageHeader, Button } from '@/components/shared';
import { PlusIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

export default function InventoryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Inventory Management"
        subtitle="Stonecoat Materials"
        description="Browse and order professional-grade epoxy flooring materials with contractor pricing"
        breadcrumbs={[
          { label: 'Dashboard', href: '/pro/dashboard' },
          { label: 'Inventory' }
        ]}
        actions={
          <>
            <Button
              variant="outline"
              onClick={handleExport}
            >
              <ArrowDownTrayIcon className="w-5 h-5" />
              Export
            </Button>
            <Button
              variant="primary"
              onClick={() => router.push('/pro/orders/new')}
            >
              <PlusIcon className="w-5 h-5" />
              New Order
            </Button>
          </>
        }
      />

      {/* Page content */}
    </div>
  );
}
```

## Combining DataTable and PageHeader

```tsx
import { PageHeader, DataTable, Button, Badge } from '@/components/shared';

export default function QuotesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Quotes"
        description="Track and manage all customer quote requests"
        breadcrumbs={[
          { label: 'Dashboard', href: '/pro/dashboard' },
          { label: 'Quotes' }
        ]}
        actions={
          <Button variant="primary">
            Create New Quote
          </Button>
        }
      />

      <DataTable
        columns={[
          { key: 'customer', label: 'Customer', sortable: true },
          {
            key: 'amount',
            label: 'Amount',
            sortable: true,
            align: 'right',
            render: (value) => formatCurrency(value)
          },
          {
            key: 'status',
            label: 'Status',
            render: (value) => <Badge quoteStatus={value} />
          },
        ]}
        data={quotes}
        keyExtractor={(item) => item.id}
        actions={[
          {
            label: 'View Details',
            variant: 'outline',
            onClick: (item) => router.push(`/quotes/${item.id}`)
          }
        ]}
        pagination={{ enabled: true, pageSize: 10 }}
        sortable
      />
    </div>
  );
}
```

## Key Features

### DataTable Features
- **Generic TypeScript**: Works with any data type via generics
- **Sortable Columns**: Click column headers to sort (asc/desc)
- **Pagination**: Optional pagination with configurable page size
- **Custom Rendering**: Render functions for complex cell content
- **Row Actions**: Optional action buttons per row
- **Loading State**: Built-in spinner for async data
- **Empty State**: Customizable empty state UI
- **Mobile Responsive**: Horizontal scroll on small screens
- **Accessibility**: Proper table semantics and ARIA labels

### PageHeader Features
- **Flexible Layout**: Title, subtitle, description, breadcrumbs
- **Action Buttons**: Right-aligned action area
- **Breadcrumb Navigation**: Optional hierarchical navigation
- **Responsive Design**: Stacks on mobile, horizontal on desktop
- **Consistent Styling**: Matches Stonecoat theme

## Accessibility Notes

Both components follow WCAG 2.1 AA standards:

- **DataTable**: Uses semantic `<table>` elements, proper `<th>` scope, sortable indicators
- **PageHeader**: Proper heading hierarchy, breadcrumb navigation with ARIA labels
- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Screen Reader Support**: ARIA labels for icons and interactive elements
