# QuoteBuilder Testing Checklist

**Component**: `/app/(pro)/quotes/new/page.tsx`
**Priority**: CRITICAL - Most important component in Phase 3
**Date Created**: 2025-10-21

## Overview

This checklist ensures the QuoteBuilder component meets all requirements for the board demo. The QuoteBuilder is the most complex component with 12+ state fields and real-time calculations.

---

## Section 1: Customer Information

### Basic Validation
- [ ] **Customer Name** - Required field validation works
- [ ] **Customer Name** - Shows error message when empty
- [ ] **Email Address** - Required field validation works
- [ ] **Email Address** - Format validation (valid email format)
- [ ] **Phone Number** - Required field validation works
- [ ] **Phone Number** - Formats to (XXX) XXX-XXXX on blur
- [ ] **Phone Number** - Only accepts 10-digit numbers

### Address Handling
- [ ] **ZIP Code** - Required field validation works
- [ ] **ZIP Code** - Must be exactly 5 digits
- [ ] **ZIP Code** - Auto-fills city when valid ZIP entered (e.g., 33602 → Tampa)
- [ ] **ZIP Code** - Auto-fills state to FL when valid ZIP entered
- [ ] **ZIP Code** - Shows error "ZIP code not found" for invalid/unknown ZIP
- [ ] **ZIP Code** - Clears error when valid ZIP is entered
- [ ] **Street Address** - Required field validation works
- [ ] **City** - Field is disabled (auto-filled from ZIP)
- [ ] **State** - Field is disabled (auto-filled from ZIP)

---

## Section 2: Project Details

### Project Type Selection
- [ ] **Project Type** - Dropdown shows all 8 types from PROJECT_TYPE_CONFIG
- [ ] **Project Type** - Required field validation works
- [ ] **Project Type** - Shows correct labels (e.g., "Garage Floor", "Pool Deck")

### Square Footage
- [ ] **Square Footage** - Required field validation works
- [ ] **Square Footage** - Only accepts positive numbers
- [ ] **Square Footage** - Validates range (1 to 100,000)
- [ ] **Square Footage** - Shows error for values outside range
- [ ] **Square Footage** - Updates pricing calculations in real-time

### Timeline & Description
- [ ] **Timeline** - Dropdown shows all options from TIMELINE_OPTIONS
- [ ] **Timeline** - Required field validation works
- [ ] **Description** - Textarea accepts multi-line text
- [ ] **Description** - Required field validation works
- [ ] **Description** - No character limit issues (1000 char max)

---

## Section 3: Materials/Line Items

### Empty State
- [ ] **Empty State** - Shows "No materials added yet" message with icon
- [ ] **Empty State** - Shows "Add Your First Material" button
- [ ] **Empty State** - Clicking button opens material selector modal

### Adding Materials
- [ ] **Add Material Button** - Opens material selector modal
- [ ] **Material Selector** - Shows all products from mockInventory
- [ ] **Material Selector** - Search box filters by name, SKU, or description
- [ ] **Material Selector** - Category filters work (All, Base Coats, Top Coats, etc.)
- [ ] **Material Selector** - Clicking category button highlights selected category
- [ ] **Material Selector** - Shows product details (name, SKU, description, price, unit)
- [ ] **Material Selector** - Shows "Low stock" warning when stock ≤ reorderLevel
- [ ] **Material Selector** - Clicking "Add" button adds product to line items
- [ ] **Material Selector** - Clicking product card adds product to line items
- [ ] **Material Selector** - Close button closes modal without adding

### Line Item Management
- [ ] **Line Items** - Added materials appear in list
- [ ] **Line Items** - Each item shows: name, SKU, unit price, quantity, total
- [ ] **Line Items** - Quantity input allows changing quantity
- [ ] **Line Items** - Quantity change updates line total in real-time
- [ ] **Line Items** - Quantity change updates materials subtotal in real-time
- [ ] **Line Items** - Remove button (trash icon) removes line item
- [ ] **Line Items** - Setting quantity to 0 removes line item
- [ ] **Line Items** - Materials subtotal calculates correctly (sum of all line totals)
- [ ] **Line Items** - Subtotal displays at bottom of line items section

### Duplicate Materials
- [ ] **Duplicates** - Adding same material twice increments quantity
- [ ] **Duplicates** - Does not create duplicate line items

### Validation
- [ ] **Validation** - Shows error if no materials added when submitting
- [ ] **Validation** - Error message: "Please add at least one material"

---

## Section 4: Pricing

### Labor Rate Input
- [ ] **Labor Rate** - Required field validation works
- [ ] **Labor Rate** - Only accepts positive numbers
- [ ] **Labor Rate** - Accepts decimal values (e.g., 3.50)
- [ ] **Labor Rate** - Shows error if 0 or negative

### Suggested Labor Rates
- [ ] **Suggested Rates** - Appears when valid ZIP code entered
- [ ] **Suggested Rates** - Shows city and ZIP code in label
- [ ] **Suggested Rates** - Shows 3 buttons: Min, Recommended, Max
- [ ] **Suggested Rates** - Min rate uses correct income bracket (e.g., $2/sqft for low income)
- [ ] **Suggested Rates** - Recommended rate uses correct income bracket
- [ ] **Suggested Rates** - Max rate uses correct income bracket
- [ ] **Suggested Rates** - Clicking button auto-fills labor rate field
- [ ] **Suggested Rates** - Auto-fills with recommended rate when ZIP first entered

### Adjustments (Optional)
- [ ] **Adjustment Reason** - Optional text field accepts input
- [ ] **Adjustment Amount** - Defaults to 0
- [ ] **Adjustment Amount** - Accepts positive values (additional charges)
- [ ] **Adjustment Amount** - Accepts negative values (discounts)
- [ ] **Adjustment Amount** - Helper text indicates negative for discounts

### Pricing Summary Display
- [ ] **Materials Subtotal** - Shows sum of all line items
- [ ] **Labor Cost** - Calculates as: squareFootage × laborRate
- [ ] **Labor Cost** - Updates when square footage changes
- [ ] **Labor Cost** - Updates when labor rate changes
- [ ] **Labor Cost** - Shows formula in label (e.g., "400 sq ft × $3.50/sqft")
- [ ] **Adjustment** - Shows only if adjustment amount ≠ 0
- [ ] **Adjustment** - Shows reason in label if provided
- [ ] **Adjustment** - Shows + sign for positive, - sign for negative
- [ ] **Subtotal** - Calculates as: materials + labor + adjustments
- [ ] **Tax** - Calculates as: subtotal × 7%
- [ ] **Tax** - Labeled as "Tax (7%)"
- [ ] **Total** - Calculates as: subtotal + tax
- [ ] **Total** - Displayed prominently with larger font
- [ ] **Rate per sqft** - Calculates as: total ÷ squareFootage
- [ ] **Rate per sqft** - Displays below total with label

---

## Section 5: Real-Time Calculations

### Calculation Accuracy
- [ ] **Line Item Total** - quantity × unitPrice (rounded to 2 decimals)
- [ ] **Materials Subtotal** - Sum of all line item totals (rounded to 2 decimals)
- [ ] **Labor Cost** - squareFootage × laborRate (rounded to 2 decimals)
- [ ] **Tax** - subtotal × 0.07 (rounded to 2 decimals)
- [ ] **Total** - subtotal + tax (rounded to 2 decimals)
- [ ] **Rate per sqft** - total ÷ squareFootage (rounded to 2 decimals)

### Real-Time Updates
- [ ] **Updates** - Adding material updates materials subtotal immediately
- [ ] **Updates** - Removing material updates materials subtotal immediately
- [ ] **Updates** - Changing quantity updates line total immediately
- [ ] **Updates** - Changing quantity updates materials subtotal immediately
- [ ] **Updates** - Changing square footage updates labor cost immediately
- [ ] **Updates** - Changing labor rate updates labor cost immediately
- [ ] **Updates** - All changes update total immediately
- [ ] **Updates** - All changes update rate per sqft immediately
- [ ] **Updates** - No delayed calculations or lag

### Edge Cases
- [ ] **Edge Case** - Division by zero: rate per sqft = 0 when squareFootage = 0
- [ ] **Edge Case** - Empty line items: materials subtotal = 0
- [ ] **Edge Case** - Zero labor rate: labor cost = 0
- [ ] **Edge Case** - Negative adjustment: subtracts from subtotal
- [ ] **Edge Case** - Large numbers: handles 100,000 sqft without overflow
- [ ] **Edge Case** - Decimal precision: no floating point errors (e.g., 0.1 + 0.2 = 0.3)

---

## Section 6: Form Actions

### Cancel Button
- [ ] **Cancel** - Button labeled "Cancel"
- [ ] **Cancel** - Navigates to /pro/quotes on click
- [ ] **Cancel** - Does not validate form
- [ ] **Cancel** - Does not save data

### Save as Draft Button
- [ ] **Save Draft** - Button labeled "Save as Draft"
- [ ] **Save Draft** - Validates form before saving
- [ ] **Save Draft** - Shows validation errors if invalid
- [ ] **Save Draft** - Scrolls to first error if validation fails
- [ ] **Save Draft** - Shows loading state (spinner) during save
- [ ] **Save Draft** - Disables button during save
- [ ] **Save Draft** - Logs form data with status: 'draft'
- [ ] **Save Draft** - Navigates to /pro/quotes on success

### Send to Customer Button
- [ ] **Send Quote** - Button labeled "Send to Customer"
- [ ] **Send Quote** - Validates form before sending
- [ ] **Send Quote** - Shows validation errors if invalid
- [ ] **Send Quote** - Scrolls to first error if validation fails
- [ ] **Send Quote** - Shows loading state (spinner) during send
- [ ] **Send Quote** - Disables button during send
- [ ] **Send Quote** - Logs form data with status: 'sent'
- [ ] **Send Quote** - Navigates to /pro/quotes on success

### Button States
- [ ] **Disabled** - All buttons disabled during submission
- [ ] **Disabled** - Save Draft shows "Saving..." text
- [ ] **Disabled** - Send Quote shows spinner icon

---

## Section 7: Validation Flow

### Validation Trigger
- [ ] **Trigger** - Validation runs on Save Draft click
- [ ] **Trigger** - Validation runs on Send Quote click
- [ ] **Trigger** - Validation does not run on Cancel click

### Error Display
- [ ] **Error Display** - Each field shows error message below input
- [ ] **Error Display** - Error messages are red text
- [ ] **Error Display** - Error icon appears next to message
- [ ] **Error Display** - Input borders turn red when error
- [ ] **Error Display** - aria-invalid="true" set on invalid inputs

### Error Scrolling
- [ ] **Scrolling** - Page scrolls to first error on validation failure
- [ ] **Scrolling** - Smooth scroll animation
- [ ] **Scrolling** - Error is centered in viewport

### Field-Specific Errors
- [ ] **Customer Name** - "This field is required"
- [ ] **Email** - "Please enter a valid email address"
- [ ] **Phone** - "Please enter a valid 10-digit phone number"
- [ ] **ZIP Code** - "Please enter a valid 5-digit ZIP code"
- [ ] **ZIP Code** - "ZIP code not found in service area" (invalid ZIP)
- [ ] **Street** - "This field is required"
- [ ] **Project Type** - "Please select a project type"
- [ ] **Square Footage** - "Square footage must be between 1 and 100,000"
- [ ] **Timeline** - "Please select a timeline"
- [ ] **Description** - "This field is required"
- [ ] **Line Items** - "Please add at least one material"
- [ ] **Labor Rate** - "Labor rate must be greater than 0"

---

## Section 8: Mobile Responsiveness

### Layout Breakpoints
- [ ] **Mobile** - Form fields stack vertically on small screens (<640px)
- [ ] **Mobile** - Material selector modal fits mobile screen
- [ ] **Mobile** - Line items display properly on mobile
- [ ] **Tablet** - Two-column grid on medium screens (≥768px)
- [ ] **Desktop** - Maintains two-column layout on large screens (≥1024px)

### Touch Interactions
- [ ] **Touch** - All buttons have adequate touch targets (≥44px)
- [ ] **Touch** - Material selector scrollable on mobile
- [ ] **Touch** - Form inputs work with mobile keyboards
- [ ] **Touch** - Number inputs show numeric keyboard on mobile

### Visual Adjustments
- [ ] **Visual** - Text remains readable at all screen sizes
- [ ] **Visual** - No horizontal scrolling on mobile
- [ ] **Visual** - Modals are centered and sized appropriately
- [ ] **Visual** - Line item cards don't overflow on mobile

---

## Section 9: Accessibility

### Keyboard Navigation
- [ ] **Keyboard** - Tab order follows logical flow
- [ ] **Keyboard** - All interactive elements focusable
- [ ] **Keyboard** - Focus indicators visible
- [ ] **Keyboard** - Modal traps focus (can't tab out)
- [ ] **Keyboard** - Escape key closes modal

### Screen Reader Support
- [ ] **Screen Reader** - Labels associated with inputs (htmlFor)
- [ ] **Screen Reader** - Required fields announced
- [ ] **Screen Reader** - Error messages announced (aria-describedby)
- [ ] **Screen Reader** - Invalid state announced (aria-invalid)
- [ ] **Screen Reader** - Loading state announced (aria-busy)

### ARIA Attributes
- [ ] **ARIA** - Required fields marked with aria-required
- [ ] **ARIA** - Error messages have role="alert"
- [ ] **ARIA** - Modal has role="dialog"
- [ ] **ARIA** - Buttons have descriptive labels

---

## Section 10: Performance

### Rendering Performance
- [ ] **Performance** - No lag when typing in fields
- [ ] **Performance** - Calculations update within 100ms
- [ ] **Performance** - Material search filters instantly
- [ ] **Performance** - Adding/removing line items is instant
- [ ] **Performance** - Page loads within 2 seconds

### Memory Management
- [ ] **Memory** - No memory leaks on component unmount
- [ ] **Memory** - Material selector releases resources on close
- [ ] **Memory** - Form state clears properly

---

## Section 11: Integration

### Data Flow
- [ ] **Data** - Uses correct types from lib/types
- [ ] **Data** - Reads from mockInventory correctly
- [ ] **Data** - Reads from mockZipCodeData correctly
- [ ] **Data** - Uses PROJECT_TYPE_CONFIG correctly
- [ ] **Data** - Uses TIMELINE_OPTIONS correctly

### Navigation
- [ ] **Navigation** - Router.push works from Cancel button
- [ ] **Navigation** - Router.push works after successful save
- [ ] **Navigation** - No navigation errors in console

### Console Logs
- [ ] **Console** - Form data logged on submit (for debugging)
- [ ] **Console** - Pricing data logged on submit (for debugging)
- [ ] **Console** - No errors in browser console
- [ ] **Console** - No warnings in browser console

---

## Critical Test Scenarios

### Scenario 1: Complete Happy Path
1. Enter customer info: John Smith, john@example.com, (813) 555-1234
2. Enter ZIP: 33602 (should auto-fill Tampa, FL)
3. Enter street: 123 Main St
4. Select project type: Garage Floor
5. Enter square footage: 400
6. Select timeline: 1-2 Weeks
7. Enter description: "Two-car garage with oil stains"
8. Add material: Countertop FX Poxy (2 gallons)
9. Add material: Industrial Floor Pro (1 gallon)
10. Verify materials subtotal is correct
11. Verify labor rate auto-filled with recommended rate
12. Click "Send to Customer"
13. Verify redirects to /pro/quotes

**Expected Result**: All calculations accurate, no errors, successful submission

### Scenario 2: Validation Error Flow
1. Click "Send to Customer" with empty form
2. Verify all required fields show errors
3. Verify page scrolls to customer name (first error)
4. Fill customer name only
5. Click "Send to Customer" again
6. Verify customer name error cleared
7. Verify next field (email) shows error

**Expected Result**: Progressive validation, clear error messages

### Scenario 3: Pricing Calculation Test
1. Add material: Countertop FX Poxy @ $89.99 × 3 = $269.97
2. Add material: Industrial Floor Pro @ $95.99 × 2 = $191.98
3. Materials subtotal should be: $461.95
4. Enter square footage: 500
5. Enter labor rate: $3.50
6. Labor cost should be: 500 × $3.50 = $1,750.00
7. Subtotal should be: $461.95 + $1,750.00 = $2,211.95
8. Tax should be: $2,211.95 × 0.07 = $154.84
9. Total should be: $2,211.95 + $154.84 = $2,366.79
10. Rate per sqft should be: $2,366.79 ÷ 500 = $4.73/sqft

**Expected Result**: All calculations match exactly, no rounding errors

### Scenario 4: Material Selector Flow
1. Click "Add Material"
2. Type "epoxy" in search
3. Verify only products with "epoxy" in name/description show
4. Click "Base Coats" filter
5. Verify only base coat products show
6. Click "All" filter
7. Verify all products show again
8. Click on a product card
9. Verify modal closes
10. Verify product added to line items

**Expected Result**: Search and filters work correctly, product added

### Scenario 5: Suggested Labor Rate
1. Enter ZIP: 33606 (high income area: $82,500)
2. Verify suggested rates appear
3. Verify recommended rate is $4.00/sqft (high income bracket)
4. Verify labor rate field auto-filled with $4.00
5. Click Min rate button ($3.00)
6. Verify labor rate field updates to $3.00
7. Verify labor cost recalculates immediately

**Expected Result**: Correct income bracket, auto-fill works, buttons work

---

## Pass Criteria

### Must Pass (Critical)
- ✅ All calculations are 100% accurate
- ✅ Validation prevents invalid submissions
- ✅ ZIP code auto-fill works correctly
- ✅ Labor rate suggestions based on income
- ✅ Add/remove line items works without bugs
- ✅ Real-time updates work instantly
- ✅ Mobile responsive (no horizontal scroll)
- ✅ No console errors or warnings

### Should Pass (Important)
- ✅ All accessibility requirements met
- ✅ Keyboard navigation works
- ✅ Error messages are clear and helpful
- ✅ Loading states shown during submission
- ✅ Material selector UX is smooth

### Nice to Have (Optional)
- ✅ Performance optimizations (memoization)
- ✅ Smooth animations and transitions
- ✅ Advanced filtering in material selector

---

## Testing Sign-Off

**Tested By**: _________________
**Date**: _________________
**Build Version**: _________________

**Critical Bugs Found**: _________________
**Blockers**: _________________
**Status**: [ ] PASS [ ] FAIL [ ] NEEDS FIXES

**Notes**:
_______________________________________________________
_______________________________________________________
_______________________________________________________

---

## Post-Testing Actions

### If PASS:
1. Mark Phase 3 Gate complete
2. Proceed to Admin Portal (Phase 4)
3. Document any minor issues for future enhancement

### If FAIL:
1. Document all critical bugs
2. Prioritize fixes by impact
3. Retest after fixes
4. Do not proceed to Phase 4 until fixed

**Remember**: This is the MOST CRITICAL component for the board demo. Every calculation must be perfect, and the user experience must be smooth. Take time to test thoroughly!
