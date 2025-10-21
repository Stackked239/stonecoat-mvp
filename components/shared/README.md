# Shared Components - Usage Guide

## Modal Component

A fully-featured modal dialog with backdrop overlay, close button, ESC key support, and focus management.

### Features
- Backdrop overlay with click-to-close
- ESC key to close
- Prevents body scroll when open
- Accessible with ARIA attributes
- 4 size variants (sm, md, lg, xl)
- Optional title with close button

### Usage

```tsx
import { useState } from 'react';
import Modal from '@/components/shared/Modal';
import Button from '@/components/shared/Button';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Create New Quote"
        size="lg"
      >
        <div>
          <p>Modal content goes here...</p>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </div>
      </Modal>
    </>
  );
}
```

---

## Navbar Component

A responsive navigation bar with mobile hamburger menu, active route highlighting, and optional user menu.

### Features
- Mobile-responsive with hamburger menu
- Active route highlighting using Next.js usePathname
- Customizable brand/logo
- Flexible navigation links array
- Optional user menu section
- Smooth transitions and accessibility

### Usage

```tsx
import Navbar from '@/components/shared/Navbar';
import Button from '@/components/shared/Button';

function Layout({ children }) {
  const navLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/quotes', label: 'Quotes' },
    { href: '/orders', label: 'Orders' },
    { href: '/jobs', label: 'Jobs' }
  ];

  const userMenu = (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-700">John Doe</span>
      <Button size="sm" variant="outline">Logout</Button>
    </div>
  );

  return (
    <>
      <Navbar
        brandName="Stonecoat Pro"
        brandHref="/dashboard"
        links={navLinks}
        userMenu={userMenu}
      />
      <main>{children}</main>
    </>
  );
}
```

---

## Footer Component

A comprehensive site footer with company info, links, optional social media, and copyright notice.

### Features
- 3-column responsive grid layout
- Company branding section
- Customizable link array
- Optional social media links with icons
- Automatic copyright year
- Mobile-friendly stacked layout

### Usage

```tsx
import Footer from '@/components/shared/Footer';

// Basic usage with defaults
function BasicLayout({ children }) {
  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  );
}

// Advanced usage with custom links and social media
function AdvancedLayout({ children }) {
  const customLinks = [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/support', label: 'Support' }
  ];

  const socialLinks = [
    {
      href: 'https://facebook.com/stonecoat',
      label: 'Facebook',
      icon: <FacebookIcon className="w-6 h-6" />
    },
    {
      href: 'https://twitter.com/stonecoat',
      label: 'Twitter',
      icon: <TwitterIcon className="w-6 h-6" />
    },
    {
      href: 'https://linkedin.com/company/stonecoat',
      label: 'LinkedIn',
      icon: <LinkedInIcon className="w-6 h-6" />
    }
  ];

  return (
    <>
      <main>{children}</main>
      <Footer
        companyName="Stonecoat Pro"
        tagline="Premium epoxy flooring solutions for contractors"
        links={customLinks}
        socialLinks={socialLinks}
      />
    </>
  );
}
```

---

## Component Props Reference

### Modal Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| isOpen | boolean | required | Controls modal visibility |
| onClose | () => void | required | Callback when modal closes |
| children | ReactNode | required | Modal content |
| title | string | undefined | Optional modal title |
| size | 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | Modal width size |

### Navbar Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| brandName | string | required | Brand/logo text |
| brandHref | string | '/' | Brand link destination |
| links | NavLink[] | required | Navigation links array |
| userMenu | ReactNode | undefined | Optional user menu content |
| className | string | undefined | Additional CSS classes |

### Footer Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| companyName | string | 'Stonecoat' | Company name |
| tagline | string | 'Professional epoxy...' | Company tagline |
| links | FooterLink[] | Default links | Footer navigation links |
| socialLinks | SocialLink[] | undefined | Optional social media links |
| className | string | undefined | Additional CSS classes |

---

## Accessibility Features

All three components include:
- Proper ARIA attributes
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- Semantic HTML structure

## Mobile Responsiveness

- **Modal**: Full-width on mobile with proper padding
- **Navbar**: Hamburger menu on mobile (< md breakpoint)
- **Footer**: Stacked layout on mobile, grid layout on desktop

---

## DataTable Component

An advanced table component with sorting, pagination, loading states, and row actions. Fully generic TypeScript implementation.

### Features
- Client-side or server-side sorting
- Built-in pagination with page controls
- Custom cell rendering with render functions
- Row action buttons
- Loading spinner state
- Empty state handling
- Mobile-responsive (horizontal scroll)
- Fully accessible (WCAG 2.1 AA)
- Generic TypeScript support

### Usage

```tsx
import { DataTable, Badge } from '@/components/shared';
import { formatCurrency } from '@/lib/utils/formatting';

interface Quote {
  id: string;
  customer: string;
  amount: number;
  status: string;
}

function QuotesPage() {
  const quotes: Quote[] = [
    { id: '1', customer: 'John Doe', amount: 5000, status: 'sent' },
    { id: '2', customer: 'Jane Smith', amount: 7500, status: 'accepted' },
  ];

  return (
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
        }
      ]}
      data={quotes}
      keyExtractor={(item) => item.id}
      actions={[
        {
          label: 'View',
          variant: 'outline',
          onClick: (item) => router.push(`/quotes/${item.id}`)
        }
      ]}
      pagination={{ enabled: true, pageSize: 10 }}
      sortable
    />
  );
}
```

### DataTable Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| columns | DataTableColumn[] | required | Column definitions |
| data | T[] | required | Table data array |
| keyExtractor | (item: T) => string \| number | required | Function to extract unique key |
| actions | DataTableAction[] | undefined | Optional row actions |
| emptyState | ReactNode | undefined | Custom empty state |
| loading | boolean | false | Loading state |
| pagination | object | undefined | Pagination config |
| sortable | boolean | true | Enable sorting |
| onSort | function | undefined | Sort handler |
| className | string | undefined | Additional CSS classes |

---

## PageHeader Component

A reusable page header with title, breadcrumbs, description, and action buttons.

### Features
- Main title and optional subtitle
- Breadcrumb navigation
- Description text
- Action button area (right-aligned)
- Responsive layout (stacks on mobile)
- Consistent with Stonecoat theme

### Usage

```tsx
import { PageHeader, Button } from '@/components/shared';

function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back, John"
        description="Track your performance metrics and recent activity"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Dashboard' }
        ]}
        actions={
          <>
            <Button variant="outline">Export</Button>
            <Button variant="primary">Create Quote</Button>
          </>
        }
      />

      {/* Page content */}
    </div>
  );
}
```

### PageHeader Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | string | required | Main page title |
| subtitle | string | undefined | Optional subtitle |
| description | string | undefined | Optional description |
| breadcrumbs | BreadcrumbItem[] | undefined | Optional breadcrumbs |
| actions | ReactNode | undefined | Optional action buttons |

---

## Additional Examples

For comprehensive usage examples including:
- Table with custom rendering
- Pagination patterns
- Loading and empty states
- Combined component usage

See `COMPONENT_EXAMPLES.md` in this directory.
