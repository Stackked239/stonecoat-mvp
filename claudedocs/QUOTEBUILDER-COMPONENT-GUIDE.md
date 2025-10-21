# QuoteBuilder Component Visual Guide

**Component**: `/app/(pro)/quotes/new/page.tsx`
**Route**: `/pro/quotes/new`
**Access**: Pro portal (authenticated contractors only)

---

## Page Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                         Page Header                              │
│  "Create New Quote"                                              │
│  "Build a detailed quote with materials and pricing..."          │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  SECTION 1: CUSTOMER INFORMATION                                 │
│  ┌──────────────────┬──────────────────┐                        │
│  │ Customer Name    │ Email Address    │                        │
│  ├──────────────────┼──────────────────┤                        │
│  │ Phone Number     │ ZIP Code         │                        │
│  ├──────────────────────────────────────┤                        │
│  │ Street Address (full width)         │                        │
│  ├──────────────────┬──────────────────┤                        │
│  │ City (disabled)  │ State (disabled) │                        │
│  └──────────────────┴──────────────────┘                        │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  SECTION 2: PROJECT DETAILS                                      │
│  ┌──────────────────┬──────────────────┐                        │
│  │ Project Type ▼   │ Square Footage   │                        │
│  ├──────────────────┼──────────────────┤                        │
│  │ Timeline ▼       │                  │                        │
│  ├──────────────────────────────────────┤                        │
│  │ Project Description (textarea)      │                        │
│  │                                      │                        │
│  │                                      │                        │
│  └──────────────────────────────────────┘                        │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  SECTION 3: MATERIALS                      [+ Add Material]      │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ 🧪 Countertop FX Poxy          Qty: [3]  $269.97  [🗑️]   │ │
│  │    SC-BASE-001 | $89.99 per gallon                         │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ 🧪 Industrial Floor Pro       Qty: [2]  $191.98  [🗑️]   │ │
│  │    SC-BASE-002 | $95.99 per gallon                         │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ─────────────────────────────────────────────────────────────  │
│                                Materials Subtotal:    $461.95    │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  SECTION 4: PRICING                                              │
│                                                                  │
│  Labor Rate (per square foot): [3.50]                           │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ 💡 Suggested rates for Tampa (33602):                     │  │
│  │ [Min: $2.75/sqft] [Recommended: $3.50/sqft] [Max: $4.50]  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────┬──────────────────┐                        │
│  │ Adjustment Reason│ Adjustment Amount│                        │
│  │ (Optional)       │ [0.00]           │                        │
│  └──────────────────┴──────────────────┘                        │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ Materials Subtotal                             $461.95    │  │
│  │ Labor (400 sq ft × $3.50/sqft)               $1,400.00   │  │
│  │ ─────────────────────────────────────────────────────────│  │
│  │ Subtotal                                     $1,861.95    │  │
│  │ Tax (7%)                                       $130.34    │  │
│  │ ═════════════════════════════════════════════════════════│  │
│  │ Total                                        $1,992.29    │  │
│  │                                                            │  │
│  │ Rate per square foot: $4.98/sqft                          │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                                                                  │
│              [Cancel]  [Save as Draft]  [Send to Customer]      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Material Selector Modal

**Triggered by**: Clicking "Add Material" button

```
┌───────────────────────────────────────────────────────────────────┐
│  Add Materials                                               [X]   │
│                                                                    │
│  🔍 Search by name, SKU, or description...                        │
│                                                                    │
│  [All] [Base Coats] [Top Coats] [Flakes] [Primers] [Tools]       │
│                                                                    │
│  ┌────────────────────────┬────────────────────────┐             │
│  │ Countertop FX Poxy     │ Industrial Floor Pro   │             │
│  │ SC-BASE-001            │ SC-BASE-002            │             │
│  │                        │                        │             │
│  │ Premium grade epoxy... │ Heavy-duty epoxy...    │             │
│  │                        │                        │             │
│  │ $89.99 per gallon      │ $95.99 per gallon      │             │
│  │                 [Add]  │                 [Add]  │             │
│  └────────────────────────┴────────────────────────┘             │
│                                                                    │
│  ┌────────────────────────┬────────────────────────┐             │
│  │ High-Performance TC    │ Crystal Clear Top Coat │             │
│  │ SC-TOP-001             │ SC-TOP-002             │             │
│  │                        │                        │             │
│  │ Professional grade...  │ Ultra-clear finish...  │             │
│  │                        │                        │             │
│  │ $79.99 per gallon      │ $119.99 per gallon     │             │
│  │                 [Add]  │                 [Add]  │             │
│  └────────────────────────┴────────────────────────┘             │
│                                                                    │
│  ... (more products) ...                                          │
│                                                                    │
│  ──────────────────────────────────────────────────────────────  │
│                            [Close]                                 │
└───────────────────────────────────────────────────────────────────┘
```

---

## Component States

### 1. Initial State (Empty Form)
- All fields empty
- No line items
- No validation errors
- Suggested rates hidden
- "Add Material" button prominent

### 2. Partially Filled State
- Some fields filled
- ZIP code entered → city/state auto-filled
- Suggested rates visible
- No validation errors yet

### 3. With Materials Added
- Line items displayed
- Materials subtotal calculated
- Quantity controls enabled
- Remove buttons visible
- Pricing section active

### 4. Complete & Valid
- All required fields filled
- At least one material added
- Labor rate set
- Total calculated
- Ready to submit

### 5. Validation Error State
- Error messages below invalid fields
- Red border on invalid inputs
- Scroll to first error
- Submit buttons enabled (for retry)

### 6. Submitting State
- Loading spinner on submit button
- All buttons disabled
- Form inputs disabled
- "Sending..." or spinner text

---

## User Interaction Flows

### Flow 1: Complete Quote Creation
```
1. Land on page
   ↓
2. Fill customer information
   ├─ Enter ZIP → City/State auto-fill
   └─ Phone formats on blur
   ↓
3. Fill project details
   ├─ Select project type from dropdown
   ├─ Enter square footage
   └─ Select timeline
   ↓
4. Add materials
   ├─ Click "Add Material"
   ├─ Search/filter products
   ├─ Click "Add" on product
   └─ Modal closes, product added
   ↓
5. Adjust quantities (optional)
   ├─ Change quantity in line item
   └─ Totals update instantly
   ↓
6. Set labor rate
   ├─ Suggested rates appear (from ZIP)
   └─ Click suggested rate or enter custom
   ↓
7. Review pricing
   ├─ See materials + labor + tax
   └─ See total and rate per sqft
   ↓
8. Submit quote
   ├─ Click "Send to Customer"
   ├─ Form validates
   └─ Navigate to quotes list
```

### Flow 2: Material Selector
```
1. Click "Add Material"
   ↓
2. Modal opens
   ├─ Shows all products
   └─ Focus on search input
   ↓
3. Search/Filter (optional)
   ├─ Type search term
   ├─ Click category filter
   └─ Products filter instantly
   ↓
4. Select product
   ├─ Click "Add" button, OR
   └─ Click product card
   ↓
5. Modal closes
   ├─ Product added to line items
   └─ Totals update
```

### Flow 3: Error Recovery
```
1. Click "Send to Customer" (invalid form)
   ↓
2. Validation runs
   ├─ Errors collected
   └─ No navigation
   ↓
3. Errors displayed
   ├─ Red text below fields
   ├─ Red borders on inputs
   └─ Scroll to first error
   ↓
4. User fixes errors
   ├─ Enter valid data
   └─ Errors clear progressively
   ↓
5. Click submit again
   ├─ Validation passes
   └─ Form submits
```

---

## Responsive Breakpoints

### Mobile (<640px)
```
┌─────────────────────┐
│  Customer Name      │
├─────────────────────┤
│  Email Address      │
├─────────────────────┤
│  Phone Number       │
├─────────────────────┤
│  ZIP Code           │
├─────────────────────┤
│  Street Address     │
├─────────────────────┤
│  City (disabled)    │
├─────────────────────┤
│  State (disabled)   │
└─────────────────────┘
```
- Single column layout
- Full-width inputs
- Stacked sections
- Touch-friendly buttons

### Tablet (≥768px)
```
┌────────────┬────────────┐
│ Customer   │ Email      │
│ Name       │ Address    │
├────────────┼────────────┤
│ Phone      │ ZIP Code   │
│ Number     │            │
├────────────┴────────────┤
│ Street Address          │
├────────────┬────────────┤
│ City       │ State      │
│ (disabled) │ (disabled) │
└────────────┴────────────┘
```
- Two-column grid
- Better space utilization
- Grouped related fields

### Desktop (≥1024px)
```
┌─────────────────────────────────────┐
│ ┌─────────┬─────────┐               │
│ │ Name    │ Email   │  (max-width)  │
│ ├─────────┼─────────┤               │
│ │ Phone   │ ZIP     │               │
│ └─────────┴─────────┘               │
└─────────────────────────────────────┘
```
- Maintains two-column layout
- Max-width container (7xl)
- Comfortable padding
- No wasted horizontal space

---

## Color Coding & Visual Hierarchy

### Section Headers
- Icon: Primary blue (#2563eb)
- Title: Large, bold text
- Clear visual separation

### Input Fields
- **Normal**: Gray border (#d1d5db)
- **Focus**: Blue border + ring (#2563eb)
- **Error**: Red border (#dc2626)
- **Disabled**: Gray background (#f3f4f6)

### Buttons
- **Primary**: Blue (#2563eb) - "Send to Customer"
- **Secondary**: Gray (#6b7280) - "Save as Draft"
- **Outline**: White with blue border - "Add Material", "Cancel"
- **Danger**: Red (#dc2626) - Delete icons

### Pricing Section
- **Background**: Light gray (#f9fafb)
- **Borders**: Gray dividers
- **Total**: Bold, large font, dark text
- **Subtotals**: Medium weight, gray text

### Suggested Rates
- **Background**: Light blue (#dbeafe)
- **Border**: Blue (#bfdbfe)
- **Buttons**: Colored badges (gray, green, yellow)
- **Hover**: Darker shade

---

## Accessibility Features

### Keyboard Navigation
```
Tab Order:
1. Customer Name
2. Email Address
3. Phone Number
4. ZIP Code
5. Street Address
6. Project Type (dropdown)
7. Square Footage
8. Timeline (dropdown)
9. Description (textarea)
10. Add Material (button)
11. Line Item Quantities
12. Remove Buttons
13. Labor Rate
14. Adjustment Reason
15. Adjustment Amount
16. Cancel (button)
17. Save as Draft (button)
18. Send to Customer (button)
```

### Screen Reader Announcements
- "Customer Name, required" (label + required indicator)
- "Invalid email address" (error message with role="alert")
- "Loading, please wait" (submit button aria-busy)
- "Materials Subtotal: $461.95" (pricing section)

### Focus Management
- Modal traps focus (can't tab out)
- First error receives focus on validation
- Escape key closes modal
- Focus returns to trigger after modal close

---

## Performance Optimizations

### Memoization
```typescript
// Pricing calculations
const pricing = useMemo(() => {
  // ... calculations
}, [formState.lineItems, formState.squareFootage, formState.laborRate, formState.adjustmentAmount]);

// Filtered materials
const filteredMaterials = useMemo(() => {
  // ... filtering
}, [materialSearch, selectedCategory]);
```

### Debouncing (Not Needed)
- Form inputs use controlled components
- No external API calls
- All calculations are instant (<100ms)

### Rendering Strategy
- Single component (not over-componentized)
- Minimal re-renders due to memoization
- No unnecessary useEffect dependencies

---

## Error Messages Reference

### Customer Information
| Field | Error | Condition |
|-------|-------|-----------|
| Customer Name | "This field is required" | Empty |
| Email Address | "This field is required" | Empty |
| Email Address | "Please enter a valid email address" | Invalid format |
| Phone Number | "This field is required" | Empty |
| Phone Number | "Please enter a valid 10-digit phone number" | Not 10 digits |
| Street Address | "This field is required" | Empty |
| ZIP Code | "This field is required" | Empty |
| ZIP Code | "Please enter a valid 5-digit ZIP code" | Not 5 digits |
| ZIP Code | "ZIP code not found in service area" | Not in mockZipCodeData |

### Project Details
| Field | Error | Condition |
|-------|-------|-----------|
| Project Type | "Please select a project type" | Not selected |
| Square Footage | "This field is required" | Empty |
| Square Footage | "Square footage must be between 1 and 100,000" | Out of range |
| Timeline | "Please select a timeline" | Not selected |
| Description | "This field is required" | Empty |

### Materials & Pricing
| Field | Error | Condition |
|-------|-------|-----------|
| Line Items | "Please add at least one material" | No items |
| Labor Rate | "This field is required" | Empty |
| Labor Rate | "Labor rate must be greater than 0" | Zero or negative |

---

## File References

### Component File
- **Location**: `/app/(pro)/quotes/new/page.tsx`
- **Lines**: ~1,000
- **Type**: Client component ('use client')

### Related Files
- **Types**: `/lib/types/quote.ts`, `/lib/types/product.ts`
- **Utils**: `/lib/utils/pricing.ts`, `/lib/utils/validation.ts`, `/lib/utils/formatting.ts`
- **Data**: `/lib/data/mockInventory.ts`, `/lib/data/mockZipCodeData.ts`
- **Components**: `/components/shared/Input.tsx`, `/components/shared/Button.tsx`, etc.

### Documentation
- **Testing**: `/claudedocs/QUOTEBUILDER-TESTING-CHECKLIST.md`
- **Summary**: `/claudedocs/QUOTEBUILDER-IMPLEMENTATION-SUMMARY.md`
- **Guide**: `/claudedocs/QUOTEBUILDER-COMPONENT-GUIDE.md` (this file)

---

## Quick Start for Developers

### Running Locally
```bash
cd /Users/austinwarren/Stone-Coat\ MVP/stonecoat-mvp
npm run dev
```

### Accessing the Page
1. Navigate to http://localhost:3000/pro/login
2. Login with any pro email from mockPros.ts
3. Click "Quotes" in navigation
4. Click "Create Quote" or navigate to /pro/quotes/new

### Making Changes
```bash
# Edit the component
code app/(pro)/quotes/new/page.tsx

# Check TypeScript errors
npx tsc --noEmit

# Check linting
npm run lint

# Build for production
npm run build
```

---

## Conclusion

This visual guide provides a comprehensive overview of the QuoteBuilder component structure, user flows, and technical details. Use this as a reference for:

- **Understanding layout and structure**
- **Debugging UI issues**
- **Training new developers**
- **Planning enhancements**
- **Board demo preparation**

For detailed testing procedures, see: `/claudedocs/QUOTEBUILDER-TESTING-CHECKLIST.md`

For implementation details, see: `/claudedocs/QUOTEBUILDER-IMPLEMENTATION-SUMMARY.md`
