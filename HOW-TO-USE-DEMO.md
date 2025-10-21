# Stonecoat MVP Demo Guide

**Complete How-To Guide for Prospects and Stakeholders**

This guide walks through all three user experiences in the Stonecoat platform: Customer, Contractor (Pro), and Admin portals.

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Customer Experience](#1-customer-experience)
3. [Contractor (Pro) Portal](#2-contractor-pro-portal)
4. [Admin Portal](#3-admin-portal)
5. [Key Features Summary](#key-features-summary)
6. [Technical Notes](#technical-notes)

---

## Quick Start

### Demo Credentials

#### 🏠 Customer Portal
- **URL:** `/` (homepage)
- **No login required** - Public-facing quote request system

#### 🔧 Contractor Portal
- **URL:** `/pro/login`
- **Email:** `mike@qualityfloors.com`
- **Password:** `demo`
- **Business:** Quality Floors & Coatings

#### 👔 Admin Portal
- **URL:** `/admin/login`
- **Email:** `admin@stonecoat.com`
- **Password:** `admin123`

---

## 1. Customer Experience

### Overview
The customer-facing side allows homeowners and businesses to request quotes for epoxy flooring projects. No login required - simple, streamlined experience.

### 1.1 Homepage (`/`)

**What You'll See:**
- Professional hero section with clear value proposition
- "Get Your Free Quote" call-to-action button
- Features overview (Pro Network, Quality Products, Expert Installation)
- How It Works section (3-step process)
- Stats showcase (500+ Projects, 100+ Pros, 25 Cities)
- Footer with company info

**Actions to Try:**
1. Click "Get Your Free Quote" button
2. Scroll through features and benefits
3. Review the simple 3-step process

### 1.2 Request Quote Page (`/request-quote`)

**What You'll See:**
A comprehensive multi-step quote builder with real-time calculations and intelligent matching.

#### Step 1: Project Details
**Information Collected:**
- Project type (Residential Garage, Commercial, Industrial, etc.)
- Property type (Single Family, Condo, Business, etc.)
- Square footage (validates realistic ranges)
- Current floor condition (Bare Concrete, Old Coating, etc.)
- Desired finish (Solid Color, Decorative Flakes, Metallic, etc.)

**Try This:**
1. Select "Residential Garage" 
2. Choose "Single Family Home"
3. Enter 400-600 sq ft (typical 2-car garage)
4. Select condition and finish type
5. Add any special requests in notes

#### Step 2: Location & Contact
**Information Collected:**
- Full address (validates against 60+ Florida ZIP codes)
- Contact information (name, email, phone)
- Preferred timeline (ASAP, 1-3 months, etc.)
- Best time to contact

**Smart Features:**
- Real-time ZIP code validation
- Automatic contractor matching based on location
- Distance calculations for pricing accuracy

**Try This:**
1. Enter a Tampa Bay area address (e.g., "123 Main St, Tampa, FL 33602")
2. Fill in contact details
3. Select timeline preference

#### Step 3: Review & Submit
**What You'll See:**
- Complete project summary
- **Estimated price range** (dynamically calculated)
- Number of matching contractors in your area
- All entered information for review

**Smart Pricing Algorithm:**
- Base price by project type and size
- Material cost calculations
- Location-based adjustments
- Condition and finish multipliers
- Realistic market pricing

**Try This:**
1. Review all details
2. Note the price estimate
3. Click "Submit Quote Request"

### 1.3 Confirmation Page (`/confirmation`)

**What You'll See:**
- Success confirmation with quote reference number
- Summary of submitted project details
- Next steps timeline
- What to expect from contractors
- Helpful tips for preparation

**Customer Journey Complete!**

---

## 2. Contractor (Pro) Portal

### Overview
The Pro Portal is where certified Stonecoat contractors manage their business: view quotes, submit bids, track jobs, manage inventory, and place material orders.

### 2.1 Login (`/pro/login`)

**Demo Credentials:**
- **Email:** `mike@qualityfloors.com`
- **Password:** `demo`
- **Business:** Quality Floors & Coatings

**Other Available Pro Logins:**
- `john@precisioncoatings.com` (Precision Coatings LLC)
- `sarah@tampabayepoxy.com` (Tampa Bay Epoxy Pros)
- `david@clearwaterfloors.com` (Clearwater Floors)
- All use password: `demo`

**After Login:**
- Automatically redirects to Pro Dashboard
- Session persists using localStorage (MVP)
- Navigation bar appears with all portal sections

### 2.2 Pro Dashboard (`/pro/dashboard`)

**What You'll See:**

#### Key Metrics Cards (Top Row)
1. **Active Quotes** - Quotes you're currently bidding on
2. **Active Jobs** - Projects you've won and are executing
3. **This Month's Revenue** - Real-time earnings tracking
4. **Win Rate** - Your conversion rate on bids

#### Quick Actions (Action Cards)
- **Browse New Quotes** - See available quote requests
- **View Active Jobs** - Manage ongoing projects
- **Create Quote** - Generate custom quote for direct client
- **Order Materials** - Place inventory orders from Stonecoat

#### Recent Activity Feed
- Latest quote assignments
- Job updates and milestones
- Order confirmations
- System notifications

**Try This:**
1. Review your performance metrics
2. Click "Browse New Quotes" to see available work
3. Check recent activity feed

### 2.3 Quotes Page (`/pro/quotes`)

**What You'll See:**

#### Summary Cards
- **Active Bids** - Quotes you're working on
- **Won Quotes** - Converted to jobs
- **Average Bid Value** - Your typical project size

#### Filter & Search
- Filter by status (Pending, Submitted, Won, Lost, Expired)
- Search by customer name or project details
- Sort by date, value, or location

#### Quotes Table
Each quote shows:
- Customer name and location
- Project type and size
- Status badge (color-coded)
- Your bid amount (if submitted)
- Distance from your business
- Days until expiration
- Action buttons

**Try This:**
1. Click on a "Pending" quote to view details
2. Review customer requirements
3. See estimated materials needed
4. View pricing recommendations
5. Submit or pass on the quote

### 2.4 Quote Detail Page (`/pro/quotes/[id]`)

**Comprehensive Quote Information:**

#### Customer Information
- Full name and contact details
- Property address with map link
- Phone and email
- Preferred contact time

#### Project Specifications
- Project type and scope
- Square footage
- Current floor condition
- Desired finish type
- Timeline requirements
- Special requests/notes

#### Smart Quote Builder
- **Materials Calculator** - Automatic material quantity calculations
- **Labor Estimator** - Based on project complexity and size
- **Pricing Recommendations** - Market-based guidance
- **Margin Calculator** - Track your profitability

#### Your Bid Section
- Material costs breakdown
- Labor hours and rates
- Total bid amount
- Profit margin percentage
- Expiration date

**Actions Available:**
- Submit bid with custom pricing
- Pass on quote (won't affect your metrics)
- Save draft bid for later
- Message customer (future feature)

**Try This:**
1. Review all project details
2. Check the recommended materials list
3. Enter your bid amount
4. Note your calculated margin
5. Submit the bid

### 2.5 Create New Quote (`/pro/quotes/new`)

**Use Case:** Direct client who contacted you directly, not through platform

**What You Can Do:**
- Create custom quote for your own clients
- Use same quote builder as platform quotes
- Track all quotes in one place
- Generate professional PDF quotes (future)

**Form Sections:**
1. Customer information input
2. Project specifications
3. Materials selection
4. Pricing and labor
5. Terms and conditions

### 2.6 Jobs Page (`/pro/jobs`)

**What You'll See:**

#### Job Pipeline Overview
- **Scheduled** - Upcoming jobs with start dates
- **In Progress** - Currently active projects
- **Completed** - Finished work
- **Total Job Value** - Pipeline revenue

#### Job Cards Display
Each job shows:
- Customer name and location
- Project type and status
- Start and end dates
- Job value
- Progress percentage
- Next milestone

**Status Tracking:**
- Scheduled → In Progress → Completed
- Material orders linked
- Timeline adherence
- Customer satisfaction

**Try This:**
1. View jobs in different stages
2. Click on an "In Progress" job
3. See project timeline and status
4. Review materials used

### 2.7 Inventory Page (`/pro/inventory`)

**What You'll See:**

#### Your Inventory Overview
- Total items in stock
- Total inventory value
- Low stock alerts
- Recent activity

#### Product Catalog by Category
1. **Base Coats** - Foundation products
2. **Top Coats** - Finishing sealers
3. **Decorative Flakes** - Color chips and blends
4. **Metallic Pigments** - Premium finishes
5. **Primers & Prep** - Surface preparation
6. **Tools & Equipment** - Application tools

#### Product Cards Show:
- Product name and SKU
- Category and brand
- **Pro pricing** (discounted from retail)
- Stock level indicator
- Coverage rate (sq ft per unit)
- Quick "Add to Order" button

**Pricing Structure:**
- **Retail Price** - What customers pay
- **Pro Price** - Your discounted cost (typically 30-40% off)
- **Bulk Discounts** - Available on large orders

**Try This:**
1. Browse different product categories
2. Check pro vs retail pricing
3. Note low stock items
4. Add items to order cart

### 2.8 Orders Page (`/pro/orders`)

**What You'll See:**

#### Order History
- All your material orders
- Status tracking (Pending, Processing, Shipped, Delivered)
- Order totals and dates
- Delivery tracking

#### Order Details Include:
- Order number and date
- Items ordered with quantities
- Unit prices and totals
- Shipping information
- Expected delivery date
- Order status

**Try This:**
1. Review past orders
2. Check order status
3. View order details
4. Track shipments

### 2.9 New Order Page (`/pro/orders/new`)

**Complete Order Management:**

#### Order Builder
1. **Select Products** - Browse inventory catalog
2. **Add Quantities** - Specify amounts needed
3. **Review Cart** - See order summary
4. **Add Shipping Info** - Delivery address
5. **Submit Order** - Place order with Stonecoat

#### Smart Features:
- Running total calculation
- Pro discount pricing
- Minimum order requirements
- Delivery date estimates
- Order notes and special requests

**Try This:**
1. Click "New Order"
2. Add multiple products to cart
3. Enter shipping address
4. Review total with pro discount
5. Submit order

---

## 3. Admin Portal

### Overview
The Admin Portal is the master dashboard where Stonecoat administrators oversee the entire platform: all quotes, contractors, inventory management, and business analytics.

### 3.1 Admin Login (`/admin/login`)

**Demo Credentials:**
- **Email:** `admin@stonecoat.com`
- **Password:** `admin123`

**Security Features:**
- Hardcoded admin credentials (MVP)
- Session management
- Restricted access
- Admin-only navigation

### 3.2 Admin Dashboard (`/admin/dashboard`)

**Comprehensive Business Overview:**

#### Top Metrics Bar
1. **Total Revenue** - Platform lifetime earnings
2. **Active Quotes** - All quotes in system
3. **Active Pros** - Certified contractors
4. **Conversion Rate** - Quote-to-job success rate

#### Revenue Chart
- **Monthly revenue trends** (Last 6 months)
- Visual bar chart with data points
- Growth tracking
- Revenue projections

#### Two-Column Layout:

##### Left Column: Recent Quotes
- Latest quote requests from customers
- Customer name and location
- Project type and size
- Estimated value
- Status indicator
- Quick action buttons
- "View all quotes →" link

##### Right Column: Top Contractors
- Highest performing pros
- Business name and location
- Win rate percentage
- Total revenue generated
- Active jobs count
- Rating score
- "View all pros →" link

**Try This:**
1. Review overall business metrics
2. Check revenue trends over time
3. See recent quote activity
4. Review top performing contractors

### 3.3 Quotes Page (`/admin/quotes`)

**Complete Quote Management:**

#### Summary Statistics
- **Total Quotes** - All time
- **Active** - Currently open
- **Completed** - Converted to jobs
- **Average Value** - Typical project size

#### Advanced Filtering
- **Status:** All, Pending, Matched, Bidding, Won, Lost, Expired
- **Date Range:** Custom date filters
- **Location:** Filter by city/ZIP
- **Value Range:** Min/max pricing
- **Search:** Customer name, address, pro name

#### Comprehensive Quote Table
Columns include:
- Quote ID (clickable)
- Customer name and contact
- Location (city, ZIP)
- Project type
- Square footage
- Status with color-coded badge
- Estimated value
- Matched pros count
- Bids received count
- Created date
- Last updated
- Actions (View, Edit, Archive)

**Status Workflow:**
1. **New** - Just submitted by customer
2. **Matched** - System matched with pros
3. **Bidding** - Pros are submitting bids
4. **Won** - Converted to job
5. **Lost** - Customer declined all bids
6. **Expired** - Time limit exceeded

#### Bulk Actions
- Export quotes to CSV
- Assign to specific pros
- Update multiple statuses
- Send notifications
- Archive old quotes

**Try This:**
1. Filter quotes by status
2. Search for specific customer
3. Click on a quote to view full details
4. Review all bids submitted
5. See quote history and timeline
6. Check contractor interactions

### 3.4 Contractors Page (`/admin/pros`)

**Complete Contractor Management:**

#### Overview Cards
- **Total Contractors** - All certified pros
- **Active This Month** - Currently working
- **Average Rating** - Overall quality score
- **Certification Rate** - Fully certified percentage

#### Contractor Directory Table
Each contractor entry shows:
- Business name and logo
- Owner/contact name
- Email and phone
- Location (city, ZIP)
- Service radius (miles)
- Certification status badge
- Active jobs count
- Completed projects count
- Win rate percentage
- Average rating (1-5 stars)
- Lifetime revenue
- Member since date
- Status (Active, Inactive, Suspended)
- Quick actions

#### Filter & Search Options
- **Status:** Active, Inactive, Pending, Suspended
- **Certification:** Certified, Pending, Expired
- **Location:** By city or service area
- **Performance:** Win rate, rating, revenue tiers
- **Search:** Business name, owner, email

**Performance Metrics Tracked:**
- Total quotes received
- Bids submitted
- Quotes won (conversion rate)
- Jobs completed
- Customer satisfaction ratings
- Average project value
- Revenue generated for platform
- Response time to quotes
- Completion rate on jobs

**Try This:**
1. Browse all contractors
2. Sort by performance metrics
3. Click on a contractor to view detailed profile
4. Review their project history
5. Check customer ratings and reviews

### 3.5 Contractor Detail Page (`/admin/pros/[id]`)

**Deep Dive Into Individual Contractor:**

#### Contractor Profile Header
- Business name and branding
- Owner information
- Contact details
- Address and service area map
- Certification badges
- Status toggles

#### Business Information
- Business license number
- Insurance policy details
- Certifications held
- Years in business
- Specializations
- Service area coverage

#### Performance Dashboard
- **Quote Activity**
  - Total received: 150
  - Bids submitted: 142
  - Win rate: 47%
  - Pass rate: 5%
  
- **Revenue Metrics**
  - Total revenue: $245,000
  - Average project: $4,200
  - Largest project: $12,500
  - This month: $18,500

- **Quality Scores**
  - Customer rating: 4.8/5
  - On-time completion: 94%
  - Response time: 2.3 hours avg
  - Rebooking rate: 68%

#### Recent Activity Timeline
- Quote assignments and responses
- Bids submitted and results
- Jobs started and completed
- Material orders placed
- Customer reviews received
- System interactions

#### Project History
- List of all completed jobs
- Current active projects
- Materials used per project
- Customer feedback per job
- Photos and documentation

#### Admin Actions Available
- Edit contractor profile
- Update certification status
- Adjust service area
- Suspend/activate account
- Send message/notification
- Generate performance report
- Adjust commission rates

**Try This:**
1. Review complete contractor profile
2. Analyze performance metrics
3. Check project history
4. Read customer reviews
5. Review certification documents

### 3.6 Inventory Management (`/admin/inventory`)

**Master Inventory Control:**

#### Inventory Overview Dashboard

##### Summary Cards
1. **Total Products** - Complete catalog count
2. **Total Value** - Retail value of all inventory
3. **Low Stock Items** - Products needing reorder
4. **Categories** - Product groupings

##### Inventory Value Breakdown
- Total retail value: ~$600,000
- Total pro cost: ~$350,000
- Potential margin: ~$250,000
- Average markup: 42%

#### Product Management by Category

**Categories Available:**
1. **Base Coats** (10 products)
2. **Top Coats** (15 products)
3. **Decorative Flakes** (20 products)
4. **Metallic Pigments** (10 products)
5. **Primers & Prep** (5 products)
6. **Tools & Equipment** (10 products)

#### Product Data Table
Each product shows:
- SKU (unique identifier)
- Product name and description
- Category
- Brand/manufacturer
- Unit size (gallons, lbs, etc.)
- Coverage rate (sq ft per unit)
- **Retail price** - Customer/retail cost
- **Pro price** - Contractor discounted cost
- **Markup percentage** - Profit margin
- Stock level with indicator
- Reorder point threshold
- Supplier information
- Status (Active, Low Stock, Out of Stock)

#### Stock Level Indicators
- 🟢 **In Stock** - Above reorder point
- 🟡 **Low Stock** - At or below reorder point
- 🔴 **Out of Stock** - Zero inventory
- 📦 **On Order** - Replenishment incoming

#### Pricing Management
- Set retail prices
- Configure pro discounts (percentage or fixed)
- Bulk price updates
- Seasonal pricing
- Volume discount tiers

#### Low Stock Alerts
Automatic notifications when:
- Stock falls below reorder point
- Product is out of stock
- High-demand items running low
- Seasonal items need restocking

#### Inventory Actions
- **Add New Product** - Create new inventory items
- **Edit Product** - Update details, pricing, stock
- **Adjust Stock** - Manual stock corrections
- **Set Reorder Points** - Configure alert thresholds
- **Bulk Import** - CSV upload for mass updates
- **Generate Reports** - Stock reports, valuation, turnover

#### Reports & Analytics
- Stock value reports
- Turnover rates by product
- Best selling products
- Slow moving inventory
- Profit margin analysis
- Pro ordering patterns
- Seasonal trends

**Try This:**
1. Browse different product categories
2. Check low stock alerts
3. Compare retail vs pro pricing
4. Review total inventory value
5. Click on a product to edit details
6. Set reorder point for a product
7. Generate inventory report

#### Sample Products to Explore:

**Base Coats:**
- StoneCoat Flex™ Base - Gray (SKU: SC-BASE-001)
- ProGrade™ Standard Base - Beige (SKU: SC-BASE-002)

**Decorative Flakes:**
- Designer Blend - Coastal Breeze (SKU: SC-FLAKE-005)
- Premium Mix - Granite Storm (SKU: SC-FLAKE-010)

**Metallic Pigments:**
- Metallic FX™ - Silver Shine (SKU: SC-MET-001)
- Chrome Effect - Gold Rush (SKU: SC-MET-003)

---

## Key Features Summary

### Platform Highlights

#### 1. Intelligent Quote Matching
- Automatic contractor matching based on:
  - Geographic proximity (distance calculations)
  - Specialty/expertise match
  - Availability and capacity
  - Performance history
  - Customer ratings

#### 2. Dynamic Pricing Engine
- Real-time price calculations based on:
  - Project type and complexity
  - Square footage
  - Material costs
  - Location factors
  - Current floor condition
  - Finish type selection
  - Market rates

#### 3. Complete Business Workflow
- **Customer:** Request → Match → Receive Bids → Choose → Schedule
- **Contractor:** View Quotes → Submit Bids → Win Jobs → Execute → Get Paid
- **Admin:** Oversee → Match → Track → Support → Optimize

#### 4. Inventory Management
- Real-time stock tracking
- Pro discount pricing (30-40% off retail)
- Automatic reorder alerts
- 70+ products across 6 categories
- Material cost calculations per project

#### 5. Performance Analytics
- Contractor win rates and revenue
- Quote conversion metrics
- Customer satisfaction tracking
- Revenue trends and forecasting
- Platform usage statistics

#### 6. Geographic Intelligence
- 60+ Florida ZIP codes in system
- Distance calculations for routing
- Location-based pricing adjustments
- Service area visualization
- Market coverage maps

### Technical Capabilities

#### MVP Features (Current)
- ✅ Full responsive design
- ✅ Client-side authentication (localStorage)
- ✅ Mock data for demo purposes
- ✅ Real-time calculations
- ✅ Form validation
- ✅ Status tracking
- ✅ Multi-step workflows
- ✅ Search and filtering
- ✅ Data tables with sorting
- ✅ Professional UI/UX

#### Production-Ready Path
- 🔄 Replace localStorage with NextAuth.js
- 🔄 Connect to PostgreSQL/Supabase database
- 🔄 Add payment processing (Stripe)
- 🔄 Implement email notifications
- 🔄 Add file uploads (photos, documents)
- 🔄 SMS notifications via Twilio
- 🔄 Real-time messaging between parties
- 🔄 Calendar integration for scheduling
- 🔄 PDF generation for quotes/invoices
- 🔄 Analytics dashboard with charts

---

## Technical Notes

### Technology Stack
- **Framework:** Next.js 15.5.6 (React 19)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 4.0
- **Icons:** Heroicons 2.0
- **Charts:** Recharts 3.3
- **Deployment:** Vercel-optimized

### Data Structure
- **Mock Data Files:** 7 comprehensive files
- **Type Safety:** Full TypeScript coverage
- **Referential Integrity:** All IDs properly linked
- **Validation:** Built-in data validators
- **Realistic Data:** Based on actual market research

### Performance
- **Build Time:** ~3 seconds
- **Bundle Size:** 102 kB shared chunks
- **Static Pages:** 18 pre-rendered routes
- **Dynamic Routes:** 2 parameterized routes
- **Load Time:** Sub-second page loads

### Browser Support
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile responsive (iOS Safari, Chrome Mobile)
- Tablet optimized layouts

### Security (MVP)
- Client-side session management
- Input validation and sanitization
- Protected routes with redirects
- No sensitive data exposure
- Ready for production auth upgrade

---

## Demo Script for Presentations

### 5-Minute Quick Demo

**1. Customer Journey (90 seconds)**
- Homepage → Get Quote
- Fill out 2-step form (garage, 500 sq ft, Tampa)
- Show price estimate
- Submit and see confirmation

**2. Contractor Portal (120 seconds)**
- Login as Mike
- Dashboard overview
- Browse quotes → Click one
- Submit a bid
- Check active jobs
- Quick inventory browse

**3. Admin Portal (90 seconds)**
- Login as admin
- Dashboard metrics
- View all quotes
- Check contractor performance
- Inventory overview

**Closing:** "All of this is live demo data showing the complete workflow from customer request through contractor fulfillment, with full admin oversight."

### 15-Minute Deep Dive

Add to quick demo:
- Detailed quote builder walkthrough
- Material calculations explanation
- Pricing algorithm demonstration
- Contractor matching logic
- Inventory management details
- Performance metrics analysis
- Full workflow from end-to-end

---

## Support & Questions

### Common Questions

**Q: Is this live data?**
A: No, all data is mock/sample data designed to demonstrate functionality. Production would connect to real database.

**Q: Can I modify data in the demo?**
A: Form submissions work and show confirmations, but data doesn't persist between sessions (no backend yet).

**Q: How accurate is the pricing?**
A: Pricing algorithm uses research-based formulas and reflects real market rates for epoxy flooring in Florida.

**Q: Can contractors message customers?**
A: Not in MVP - planned for production version with real-time messaging.

**Q: What happens after a quote is won?**
A: In production: payment processing, scheduling, progress tracking, completion verification, reviews.

### For More Information

- **Technical Documentation:** See `/claudedocs` folder
- **Component Library:** `/components/shared/README.md`
- **Type Definitions:** `/lib/types/index.ts`
- **Mock Data Details:** `/lib/data/README.md`

---

## Deployment Information

**Live Demo URL:** [Your Vercel URL here after deployment]

**Repository:** github.com/Stackked239/stonecoat-mvp

**Branch:** `fix/button-visibility-and-redirect`

**Last Updated:** October 2025

---

**Built by the Stonecoat Team**
*Revolutionizing the epoxy flooring industry through technology*


