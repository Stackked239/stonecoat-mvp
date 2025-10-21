# Admin Inventory Management - Feature Reference

## Page Structure Overview

```
┌─────────────────────────────────────────────────────────────┐
│ ADMIN INVENTORY MANAGEMENT                                  │
│ Monitor stock levels, manage products, and track value     │
│                    [Export Inventory] [Add New Product]     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │  Total   │  │  Total   │  │   Low    │  │   Out    │  │
│  │Products  │  │Inventory │  │  Stock   │  │of Stock  │  │
│  │   70     │  │ Value    │  │  Items   │  │  Items   │  │
│  │          │  │ $180,324 │  │    8     │  │    2     │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  ⚠️  LOW STOCK ALERT                                       │
│  8 products need reordering                                 │
│                                                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐         │
│  │UV-Resistant │ │Moisture     │ │Anti-Static  │         │
│  │SC-BASE-004  │ │SC-PRM-002   │ │SC-BASE-010  │         │
│  │67 gal       │ │89 gal       │ │28 gal       │         │
│  │Min: 30      │ │Min: 40      │ │Min: 15      │         │
│  └─────────────┘ └─────────────┘ └─────────────┘         │
│                                                             │
│  View all 8 low stock items →                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  🔍 Search Products                    Category ▼  Status ▼│
│  [Search by name, SKU, or desc...]  [All Categories] [All] │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  PRODUCTS TABLE                                             │
│  ┌──────┬────┬────┬────┬────┬────┬────┬────┬────────┐    │
│  │Name  │Cat │Pro │Ret │Mar%│Stk │Min │Stat│Actions │    │
│  │      │    │Cost│Pri │    │    │    │    │        │    │
│  ├──────┼────┼────┼────┼────┼────┼────┼────┼────────┤    │
│  │Ctrtop│Base│$90 │$150│40% │156 │50  │✓In │Update  │    │
│  │FX Pxy│Coat│    │    │    │gal │    │Stck│Stock   │    │
│  │SC001 │    │    │    │    │    │    │    │        │    │
│  ├──────┼────┼────┼────┼────┼────┼────┼────┼────────┤    │
│  │Indust│Base│$96 │$160│40% │98  │40  │✓In │Update  │    │
│  │Floor │Coat│    │    │    │gal │    │Stck│Stock   │    │
│  │SC002 │    │    │    │    │    │    │    │        │    │
│  └──────┴────┴────┴────┴────┴────┴────┴────┴────────┘    │
│                                                             │
│  Showing 1 to 20 of 70 results      ◄  1 2 3 4  ►         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Key Features Breakdown

### 1. Summary Cards (Top Row)

**Total Products**
- Count: 70 products
- Description: "Across all categories"
- Color: Gray/neutral

**Total Inventory Value**
- Amount: $180,324 (calculated dynamically)
- Description: "At pro cost pricing"
- Color: Gray/neutral
- Formula: `sum(proCost × stockLevel)` for all products

**Low Stock Items**
- Count: 8 items (calculated dynamically)
- Description: "At or below reorder level"
- Color: Yellow/warning
- Logic: `stockLevel <= reorderLevel && stockLevel > 0`

**Out of Stock Items**
- Count: 2 items (calculated dynamically)
- Description: "Immediate attention needed"
- Color: Red/error
- Logic: `stockLevel === 0`

### 2. Low Stock Alert Section

**Trigger Condition**
```typescript
lowStockProducts.length > 0
```

**Display Logic**
- Shows top 6 low stock products in grid
- Each card shows: Name, SKU, Current Stock, Min Reorder
- Yellow warning icon
- "View all X items" button if more than 6
- Clicking button filters table by low-stock status
- Auto-hides if no low stock items

**Product Card Format**
```
┌─────────────────────┐
│ UV-Resistant Epoxy  │  ← Product name
│ SC-BASE-004         │  ← SKU
│              67 gal │  ← Current stock (bold)
│             Min: 30 │  ← Reorder threshold
└─────────────────────┘
```

### 3. Filter Controls

**Search Input**
- Full-text search across:
  - Product name
  - SKU
  - Description
- Search icon on left
- Placeholder: "Search by name, SKU, or description..."
- Real-time filtering (no submit button)

**Category Filter**
- Dropdown select
- Options:
  - All Categories (default)
  - Base Coats (10 items)
  - Top Coats (15 items)
  - Flakes (20 items)
  - Metallic (10 items)
  - Primers (5 items)
  - Tools (10 items)
  - Accessories (0 items - future)

**Stock Status Filter**
- Dropdown select
- Options:
  - All Status (default)
  - In Stock (green badge)
  - Low Stock (yellow badge)
  - Out of Stock (red badge)

**Clear Filters Button**
- Only shows when filters active
- Ghost variant (subtle)
- Resets all three filters at once

### 4. Product DataTable

**Column Details**

| Column | Width | Alignment | Sortable | Format |
|--------|-------|-----------|----------|--------|
| Product Name | Auto | Left | Yes | Name (bold)<br>SKU (gray) |
| Category | Medium | Left | Yes | Display name |
| Pro Cost | Narrow | Right | Yes | $XX.XX |
| Retail Price | Narrow | Right | Yes | $XX.XX |
| Margin | Narrow | Right | Yes | XX.X% |
| Current Stock | Medium | Right | Yes | XXX unit |
| Reorder Point | Medium | Right | Yes | XXX unit |
| Stock Status | Medium | Center | No | Badge |
| Actions | Narrow | Right | - | Button |

**Stock Status Badges**

```typescript
In Stock (Green)
  - Condition: stockLevel > reorderLevel
  - Badge: "In Stock" with green dot

Low Stock (Yellow)
  - Condition: 0 < stockLevel <= reorderLevel
  - Badge: "Low Stock" with yellow dot

Out of Stock (Red)
  - Condition: stockLevel === 0
  - Badge: "Out of Stock" with red dot
```

**Margin Calculation**
```typescript
margin = ((retailPrice - proCost) / retailPrice) × 100

Examples:
$89.99 pro → $149.99 retail = 40.0% margin
$12.50 pro → $24.99 retail = 50.0% margin
$119.99 pro → $199.99 retail = 40.0% margin
```

### 5. Pagination Controls

**Configuration**
- Items per page: 20
- Total items: 70 (or filtered count)
- Total pages: 4 (at 20/page)

**Desktop Controls**
```
Showing 1 to 20 of 70 results

[◄] [1] [2] [3] [4] [►]
     ^^^
  Current page (blue)
```

**Mobile Controls**
```
[Previous]  Page 1 of 4  [Next]
```

### 6. Empty States

**No Products Found**
```
        📦
   No products found
Try adjusting your filters
  or search query
```

**Triggers**
- Search returns no results
- Filter combination has no matches
- Category has no products

### 7. Action Buttons (Placeholders)

**Add New Product**
- Location: Page header
- Variant: Primary (blue)
- Action: `console.log('Add product')`
- Future: Opens modal/form

**Export Inventory**
- Location: Page header
- Variant: Outline
- Action: `console.log('Export')`
- Future: Downloads CSV/PDF

**Update Stock** (per product)
- Location: Table row
- Variant: Outline
- Action: `console.log('Update', product)`
- Future: Opens stock update modal

## Responsive Breakpoints

**Mobile (< 640px)**
- Cards stack vertically (1 column)
- Filters stack vertically
- Table scrolls horizontally
- Pagination shows prev/next only

**Tablet (640px - 1024px)**
- Cards in 2 columns
- Filters in row
- Table visible with scroll
- Full pagination

**Desktop (> 1024px)**
- Cards in 4 columns
- All filters in single row
- Full table width
- Full pagination with numbers

## Performance Characteristics

**Data Processing**
- Initial load: All 70 products from mockInventory
- Filtering: Client-side (instant)
- Sorting: Client-side (instant)
- Calculations: Memoized with useMemo

**Re-render Optimization**
```typescript
useMemo(() => {
  // Summary metrics calculation
  // Only recalculates when mockInventory changes
}, [])

useMemo(() => {
  // Filtered products
  // Recalculates on filter/search changes
}, [selectedCategory, selectedStockStatus, searchQuery])

useMemo(() => {
  // Low stock products
  // Only calculates once on mount
}, [])
```

## Color Palette Used

**Stock Status Colors**
```
In Stock:     bg-green-100  text-green-800  border-green-200
Low Stock:    bg-yellow-100 text-yellow-800 border-yellow-200
Out of Stock: bg-red-100    text-red-800    border-red-200
```

**UI Elements**
```
Primary:   bg-primary-600 (blue)
Success:   bg-green-600
Warning:   bg-yellow-600  (used for low stock metrics)
Error:     bg-red-600     (used for out of stock metrics)
Gray:      bg-gray-100/900 (text and borders)
```

## Sample Data Examples

**Base Coat Example**
```
Name: Countertop FX Poxy
SKU: SC-BASE-001
Category: Base Coats
Pro Cost: $89.99
Retail Price: $149.99
Margin: 40.0%
Current Stock: 156 gallon
Reorder Point: 50 gallon
Status: In Stock (green)
```

**Low Stock Example**
```
Name: UV-Resistant Outdoor Epoxy
SKU: SC-BASE-004
Category: Base Coats
Pro Cost: $95.99
Retail Price: $165.99
Margin: 42.2%
Current Stock: 67 gallon
Reorder Point: 30 gallon
Status: Low Stock (yellow)
```

**Out of Stock Example**
```
Name: [Product with 0 stock]
SKU: SC-XXXX-XXX
Category: [Category]
Pro Cost: $XX.XX
Retail Price: $XX.XX
Margin: XX.X%
Current Stock: 0 [unit]
Reorder Point: [threshold]
Status: Out of Stock (red)
```

## Integration Points

**Authentication**
- Requires admin login
- Uses admin portal layout
- Accesses admin-only data

**Navigation**
- Listed in admin sidebar
- Breadcrumb: Admin > Inventory
- Direct URL: /admin/inventory

**Data Sources**
- mockInventory (lib/data/mockInventory.ts)
- All calculations derived from this data
- No API calls (MVP hardcoded data)

**Component Dependencies**
```
AdminInventoryPage
├── @/components/shared/PageHeader
├── @/components/shared/Card
├── @/components/shared/DataTable
├── @/components/shared/Badge
├── @/components/shared/Button
├── @/components/shared/Input
├── @/lib/data/mockInventory
├── @/lib/types/product
└── @/lib/utils/formatting
```

## Future Enhancement Hooks

**Stock Update Modal**
- Triggered by "Update Stock" button
- Fields: New stock level, reason, notes
- Saves to database (post-MVP)
- Creates audit log entry

**Product Form**
- Triggered by "Add New Product"
- Full product CRUD
- Image upload
- Spec editor

**Export Feature**
- Triggered by "Export Inventory"
- Formats: CSV, PDF, Excel
- Includes all filtered data
- Optional summary page

**Reorder Automation**
- Monitor low stock daily
- Auto-generate purchase orders
- Email notifications to admins
- Supplier integration

---

**Last Updated**: October 21, 2025
**Status**: Phase 4 Complete
**Next Phase**: Analytics Dashboard or Final Testing
