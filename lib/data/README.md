# Stonecoat MVP Mock Data

This directory contains all hardcoded data for the MVP demo. Data is structured to maintain referential integrity and realistic business scenarios.

## Files Overview

### mockZipCodeData.ts
- **Records**: 60+ Florida ZIP codes
- **Purpose**: Location data for distance calculations and pricing algorithms
- **Coverage**: Tampa Bay, Orlando, Miami, Jacksonville areas
- **Data**: City, state, median income, coordinates

### mockPros.ts
- **Records**: 12 certified contractors
- **Purpose**: Service provider profiles with performance metrics
- **Location**: Distributed across Tampa Bay area
- **Metrics**: Win rates, revenue, ratings (all calculated correctly)

### mockCustomers.ts ✅ NEW
- **Records**: 10 customer profiles
- **Purpose**: Homeowners/business owners requesting quotes
- **Validation**: All addresses reference valid ZIP codes from mockZipCodeData
- **Coverage**: Tampa, Brandon, Clearwater, St. Petersburg, Lutz, Lakeland, Largo, Dunedin

### mockInventory.ts ✅ NEW
- **Records**: 70 products across 6 categories
- **Purpose**: Complete product catalog with pro/retail pricing
- **Categories**:
  - Base Coats: 10 products
  - Top Coats: 15 products
  - Decorative Flakes: 20 products
  - Metallic Pigments: 10 products
  - Primers/Prep: 5 products
  - Tools/Equipment: 10 products
- **Validation**: All SKUs unique, pricing logic validated, stock levels realistic
- **Total Inventory Value**:
  - Pro Cost: ~$350,000
  - Retail: ~$600,000
  - Profit Margin: ~$250,000

## Data Integrity

All mock data files include:
1. **Helper Functions**: getById, getByCategory, search, etc.
2. **Validation Functions**: Ensure referential integrity and calculated metrics
3. **Type Safety**: Full TypeScript strict mode compliance
4. **Comments**: Helpful documentation for complex data

## Usage Examples

```typescript
// Import customers
import { mockCustomers, getCustomerByEmail } from '@/lib/data/mockCustomers';

// Import inventory
import { 
  mockInventory, 
  getProductsByCategory, 
  getLowStockProducts 
} from '@/lib/data/mockInventory';

// Get all base coats
const baseCoats = getProductsByCategory('base-coats');

// Find customer
const customer = getCustomerByEmail('john.mitchell@gmail.com');

// Check low stock
const needsReorder = getLowStockProducts();
```

## Validation

Run validation checks before committing data changes:

```bash
# Type check
npx tsc --noEmit

# Manual validation (once app is built)
npm run validate-data
```

## Next Steps

Still need to create:
- [ ] mockQuotes.ts - Quote data (customer-initiated + pro-created)
- [ ] mockOrders.ts - Material orders from pros
- [ ] mockJobs.ts - Job pipeline tracking

Refer to `/Get Started/04-DATA-FILES.md` for complete specifications.
