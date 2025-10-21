/**
 * Mock Inventory/Product Data
 * Comprehensive product catalog for Stonecoat MVP
 * 60+ products across 6 categories with pro/retail pricing tiers
 */

import { Product, ProductCategory } from '../types/product';

/**
 * Complete product catalog for the Stonecoat platform
 * Pro pricing: Contractor cost (40-50% margin)
 * Retail pricing: End-customer pricing (if buying direct)
 */
export const mockInventory: Product[] = [
  // ========================================
  // BASE COATS (10 products)
  // ========================================
  {
    id: 'BC-001',
    sku: 'SC-BASE-001',
    name: 'Countertop FX Poxy',
    category: 'base-coats',
    description: 'Premium grade epoxy base coat for countertops and floors. High clarity, self-leveling formula.',
    images: ['/images/products/base-coat-001.jpg'],
    proCost: 89.99,
    retailPrice: 149.99,
    stockLevel: 156,
    unit: 'gallon',
    reorderLevel: 50,
    specs: {
      coverage: '200 sqft per gallon at 8 mils',
      viscosity: 'Medium',
      potLife: '30-45 minutes',
      cureTime: '24 hours',
      coatsRequired: '2'
    },
    tags: ['premium', 'countertops', 'floors', 'self-leveling'],
    featured: true
  },
  {
    id: 'BC-002',
    sku: 'SC-BASE-002',
    name: 'Industrial Floor Pro',
    category: 'base-coats',
    description: 'Heavy-duty epoxy for commercial and industrial applications. Exceptional chemical resistance.',
    images: ['/images/products/base-coat-002.jpg'],
    proCost: 95.99,
    retailPrice: 159.99,
    stockLevel: 98,
    unit: 'gallon',
    reorderLevel: 40,
    specs: {
      coverage: '180 sqft per gallon at 10 mils',
      viscosity: 'High',
      potLife: '45-60 minutes',
      cureTime: '48 hours',
      coatsRequired: '2'
    },
    tags: ['commercial', 'industrial', 'heavy-duty', 'chemical-resistant']
  },
  {
    id: 'BC-003',
    sku: 'SC-BASE-003',
    name: 'Garage Floor Elite',
    category: 'base-coats',
    description: 'Standard garage floor epoxy coating. Excellent adhesion and durability for residential garages.',
    images: ['/images/products/base-coat-003.jpg'],
    proCost: 79.99,
    retailPrice: 129.99,
    stockLevel: 203,
    unit: 'gallon',
    reorderLevel: 75,
    specs: {
      coverage: '250 sqft per gallon at 6 mils',
      viscosity: 'Low-Medium',
      potLife: '30 minutes',
      cureTime: '24 hours',
      coatsRequired: '2'
    },
    tags: ['residential', 'garage', 'standard', 'cost-effective'],
    featured: true
  },
  {
    id: 'BC-004',
    sku: 'SC-BASE-004',
    name: 'UV-Resistant Outdoor Epoxy',
    category: 'base-coats',
    description: 'UV-stabilized epoxy for exterior applications. Will not yellow or degrade in sunlight.',
    images: ['/images/products/base-coat-004.jpg'],
    proCost: 95.99,
    retailPrice: 165.99,
    stockLevel: 67,
    unit: 'gallon',
    reorderLevel: 30,
    specs: {
      coverage: '200 sqft per gallon at 8 mils',
      viscosity: 'Medium',
      potLife: '35 minutes',
      cureTime: '36 hours',
      coatsRequired: '2',
      uvStabilized: 'true'
    },
    tags: ['outdoor', 'uv-resistant', 'patio', 'exterior']
  },
  {
    id: 'BC-005',
    sku: 'SC-BASE-005',
    name: 'Pool Deck Epoxy',
    category: 'base-coats',
    description: 'Slip-resistant epoxy for pool decks and wet areas. Chlorine and UV resistant.',
    images: ['/images/products/base-coat-005.jpg'],
    proCost: 99.99,
    retailPrice: 175.99,
    stockLevel: 54,
    unit: 'gallon',
    reorderLevel: 25,
    specs: {
      coverage: '175 sqft per gallon at 10 mils',
      viscosity: 'High',
      potLife: '40 minutes',
      cureTime: '48 hours',
      coatsRequired: '2',
      slipResistant: 'true',
      chlorineResistant: 'true'
    },
    tags: ['pool-deck', 'slip-resistant', 'chlorine-resistant', 'outdoor']
  },
  {
    id: 'BC-006',
    sku: 'SC-BASE-006',
    name: 'Basement Floor Sealer',
    category: 'base-coats',
    description: 'Moisture-tolerant epoxy for basement floors. Bonds to damp concrete.',
    images: ['/images/products/base-coat-006.jpg'],
    proCost: 92.99,
    retailPrice: 155.99,
    stockLevel: 78,
    unit: 'gallon',
    reorderLevel: 35,
    specs: {
      coverage: '220 sqft per gallon at 7 mils',
      viscosity: 'Medium',
      potLife: '40 minutes',
      cureTime: '36 hours',
      coatsRequired: '2',
      moistureTolerant: 'true'
    },
    tags: ['basement', 'moisture-tolerant', 'residential']
  },
  {
    id: 'BC-007',
    sku: 'SC-BASE-007',
    name: 'High-Build Base Coat',
    category: 'base-coats',
    description: 'Extra thick base coat for filling imperfections. Excellent for damaged concrete.',
    images: ['/images/products/base-coat-007.jpg'],
    proCost: 104.99,
    retailPrice: 179.99,
    stockLevel: 45,
    unit: 'gallon',
    reorderLevel: 20,
    specs: {
      coverage: '120 sqft per gallon at 15 mils',
      viscosity: 'Very High',
      potLife: '50 minutes',
      cureTime: '48 hours',
      coatsRequired: '1-2'
    },
    tags: ['high-build', 'repair', 'filling', 'damaged-concrete']
  },
  {
    id: 'BC-008',
    sku: 'SC-BASE-008',
    name: 'Fast-Cure Base Coat',
    category: 'base-coats',
    description: 'Rapid-cure epoxy for quick turnaround projects. Walk-on in 12 hours.',
    images: ['/images/products/base-coat-008.jpg'],
    proCost: 109.99,
    retailPrice: 189.99,
    stockLevel: 62,
    unit: 'gallon',
    reorderLevel: 25,
    specs: {
      coverage: '200 sqft per gallon at 8 mils',
      viscosity: 'Medium',
      potLife: '20 minutes',
      cureTime: '12 hours',
      coatsRequired: '2'
    },
    tags: ['fast-cure', 'quick-turnaround', 'commercial']
  },
  {
    id: 'BC-009',
    sku: 'SC-BASE-009',
    name: 'Clear Epoxy Base',
    category: 'base-coats',
    description: 'Crystal clear epoxy for creating custom color blends or showcasing decorative elements.',
    images: ['/images/products/base-coat-009.jpg'],
    proCost: 94.99,
    retailPrice: 162.99,
    stockLevel: 89,
    unit: 'gallon',
    reorderLevel: 40,
    specs: {
      coverage: '200 sqft per gallon at 8 mils',
      viscosity: 'Medium',
      potLife: '35 minutes',
      cureTime: '24 hours',
      coatsRequired: '2',
      clarity: 'High'
    },
    tags: ['clear', 'custom-colors', 'high-clarity']
  },
  {
    id: 'BC-010',
    sku: 'SC-BASE-010',
    name: 'Anti-Static Base Coat',
    category: 'base-coats',
    description: 'Conductive epoxy for electronics manufacturing and server room floors.',
    images: ['/images/products/base-coat-010.jpg'],
    proCost: 134.99,
    retailPrice: 229.99,
    stockLevel: 28,
    unit: 'gallon',
    reorderLevel: 15,
    specs: {
      coverage: '180 sqft per gallon at 10 mils',
      viscosity: 'Medium-High',
      potLife: '45 minutes',
      cureTime: '48 hours',
      coatsRequired: '2',
      antiStatic: 'true'
    },
    tags: ['anti-static', 'electronics', 'commercial', 'specialty']
  },

  // ========================================
  // TOP COATS (15 products)
  // ========================================
  {
    id: 'TC-001',
    sku: 'SC-TOP-001',
    name: 'Clear High-Performance Top Coat',
    category: 'top-coats',
    description: 'Crystal clear polyurethane seal coat. Excellent abrasion and chemical resistance.',
    images: ['/images/products/top-coat-001.jpg'],
    proCost: 119.99,
    retailPrice: 199.99,
    stockLevel: 187,
    unit: 'gallon',
    reorderLevel: 60,
    specs: {
      coverage: '300 sqft per gallon',
      finish: 'High Gloss',
      abrasionResistance: 'Excellent',
      chemicalResistance: 'Excellent',
      uvResistant: 'false'
    },
    tags: ['clear', 'polyurethane', 'high-gloss', 'durable'],
    featured: true
  },
  {
    id: 'TC-002',
    sku: 'SC-TOP-002',
    name: 'Moisture Vapor Seal',
    category: 'top-coats',
    description: 'Moisture barrier top coat for basements and below-grade applications.',
    images: ['/images/products/top-coat-002.jpg'],
    proCost: 109.99,
    retailPrice: 189.99,
    stockLevel: 145,
    unit: 'gallon',
    reorderLevel: 50,
    specs: {
      coverage: '250 sqft per gallon',
      finish: 'Satin',
      moistureBarrier: 'true',
      breathable: 'false'
    },
    tags: ['basement', 'moisture-barrier', 'below-grade']
  },
  {
    id: 'TC-003',
    sku: 'SC-TOP-003',
    name: 'UV-Resistant Clear Seal',
    category: 'top-coats',
    description: 'UV-stabilized outdoor top coat. Will not yellow or chalk outdoors.',
    images: ['/images/products/top-coat-003.jpg'],
    proCost: 129.99,
    retailPrice: 215.99,
    stockLevel: 78,
    unit: 'gallon',
    reorderLevel: 40,
    specs: {
      coverage: '275 sqft per gallon',
      finish: 'High Gloss',
      uvResistant: 'true',
      weatherResistant: 'true'
    },
    tags: ['uv-resistant', 'outdoor', 'weather-proof', 'patio']
  },
  {
    id: 'TC-004',
    sku: 'SC-TOP-004',
    name: 'Non-Slip Pool Deck Seal',
    category: 'top-coats',
    description: 'Textured non-slip seal for wet areas. Chlorine and UV resistant.',
    images: ['/images/products/top-coat-004.jpg'],
    proCost: 139.99,
    retailPrice: 229.99,
    stockLevel: 62,
    unit: 'gallon',
    reorderLevel: 30,
    specs: {
      coverage: '225 sqft per gallon',
      finish: 'Satin',
      textured: 'true',
      slipResistant: 'true',
      chlorineResistant: 'true',
      uvResistant: 'true'
    },
    tags: ['pool-deck', 'non-slip', 'textured', 'outdoor']
  },
  {
    id: 'TC-005',
    sku: 'SC-TOP-005',
    name: 'Satin Finish Top Coat',
    category: 'top-coats',
    description: 'Low-sheen satin finish for a more subtle, natural appearance.',
    images: ['/images/products/top-coat-005.jpg'],
    proCost: 114.99,
    retailPrice: 194.99,
    stockLevel: 103,
    unit: 'gallon',
    reorderLevel: 45,
    specs: {
      coverage: '300 sqft per gallon',
      finish: 'Satin',
      abrasionResistance: 'Very Good',
      chemicalResistance: 'Very Good'
    },
    tags: ['satin', 'low-sheen', 'residential']
  },
  {
    id: 'TC-006',
    sku: 'SC-TOP-006',
    name: 'Matte Finish Seal Coat',
    category: 'top-coats',
    description: 'Non-glossy matte finish for modern, industrial aesthetics.',
    images: ['/images/products/top-coat-006.jpg'],
    proCost: 124.99,
    retailPrice: 209.99,
    stockLevel: 67,
    unit: 'gallon',
    reorderLevel: 30,
    specs: {
      coverage: '280 sqft per gallon',
      finish: 'Matte',
      abrasionResistance: 'Good',
      chemicalResistance: 'Very Good'
    },
    tags: ['matte', 'modern', 'industrial', 'low-gloss']
  },
  {
    id: 'TC-007',
    sku: 'SC-TOP-007',
    name: 'High-Traffic Commercial Seal',
    category: 'top-coats',
    description: 'Extra durable top coat for retail, warehouse, and high-traffic areas.',
    images: ['/images/products/top-coat-007.jpg'],
    proCost: 144.99,
    retailPrice: 239.99,
    stockLevel: 54,
    unit: 'gallon',
    reorderLevel: 25,
    specs: {
      coverage: '250 sqft per gallon',
      finish: 'High Gloss',
      abrasionResistance: 'Superior',
      chemicalResistance: 'Excellent',
      trafficRating: 'Heavy'
    },
    tags: ['commercial', 'high-traffic', 'warehouse', 'durable']
  },
  {
    id: 'TC-008',
    sku: 'SC-TOP-008',
    name: 'Food-Safe Top Coat',
    category: 'top-coats',
    description: 'NSF-certified food-safe seal coat for restaurant kitchens and food prep areas.',
    images: ['/images/products/top-coat-008.jpg'],
    proCost: 149.99,
    retailPrice: 249.99,
    stockLevel: 32,
    unit: 'gallon',
    reorderLevel: 15,
    specs: {
      coverage: '275 sqft per gallon',
      finish: 'Satin',
      nsfCertified: 'true',
      chemicalResistance: 'Excellent'
    },
    tags: ['food-safe', 'nfs-certified', 'restaurant', 'commercial']
  },
  {
    id: 'TC-009',
    sku: 'SC-TOP-009',
    name: 'Fast-Cure Top Coat',
    category: 'top-coats',
    description: 'Rapid-cure seal coat for minimal downtime. Traffic-ready in 8 hours.',
    images: ['/images/products/top-coat-009.jpg'],
    proCost: 134.99,
    retailPrice: 224.99,
    stockLevel: 71,
    unit: 'gallon',
    reorderLevel: 35,
    specs: {
      coverage: '300 sqft per gallon',
      finish: 'High Gloss',
      cureTime: '8 hours',
      trafficReady: '8 hours'
    },
    tags: ['fast-cure', 'quick-turnaround', 'commercial']
  },
  {
    id: 'TC-010',
    sku: 'SC-TOP-010',
    name: 'Broadcast Grit Top Coat',
    category: 'top-coats',
    description: 'Top coat designed for embedding anti-slip grit. Maximum traction.',
    images: ['/images/products/top-coat-010.jpg'],
    proCost: 119.99,
    retailPrice: 199.99,
    stockLevel: 48,
    unit: 'gallon',
    reorderLevel: 20,
    specs: {
      coverage: '250 sqft per gallon',
      finish: 'Clear',
      gritCompatible: 'true',
      slipResistant: 'Maximum'
    },
    tags: ['anti-slip', 'grit', 'safety', 'commercial']
  },
  {
    id: 'TC-011',
    sku: 'SC-TOP-011',
    name: 'Low-VOC Eco Seal',
    category: 'top-coats',
    description: 'Environmentally friendly low-VOC top coat. LEED compliant.',
    images: ['/images/products/top-coat-011.jpg'],
    proCost: 129.99,
    retailPrice: 219.99,
    stockLevel: 56,
    unit: 'gallon',
    reorderLevel: 25,
    specs: {
      coverage: '290 sqft per gallon',
      finish: 'Satin',
      vocLevel: 'Low',
      leedCompliant: 'true'
    },
    tags: ['low-voc', 'eco-friendly', 'leed', 'green-building']
  },
  {
    id: 'TC-012',
    sku: 'SC-TOP-012',
    name: 'Thermal-Shock Resistant Seal',
    category: 'top-coats',
    description: 'Top coat for areas with extreme temperature changes. Automotive shops.',
    images: ['/images/products/top-coat-012.jpg'],
    proCost: 139.99,
    retailPrice: 234.99,
    stockLevel: 41,
    unit: 'gallon',
    reorderLevel: 20,
    specs: {
      coverage: '270 sqft per gallon',
      finish: 'High Gloss',
      temperatureRange: '-20°F to 180°F',
      thermalShock: 'Resistant'
    },
    tags: ['automotive', 'thermal-resistant', 'commercial']
  },
  {
    id: 'TC-013',
    sku: 'SC-TOP-013',
    name: 'Epoxy Top Coat',
    category: 'top-coats',
    description: '100% solids epoxy top coat for maximum chemical resistance.',
    images: ['/images/products/top-coat-013.jpg'],
    proCost: 124.99,
    retailPrice: 209.99,
    stockLevel: 79,
    unit: 'gallon',
    reorderLevel: 35,
    specs: {
      coverage: '250 sqft per gallon',
      finish: 'High Gloss',
      chemicalResistance: 'Superior',
      solidsContent: '100%'
    },
    tags: ['epoxy', 'chemical-resistant', 'industrial']
  },
  {
    id: 'TC-014',
    sku: 'SC-TOP-014',
    name: 'Graffiti-Resistant Top Coat',
    category: 'top-coats',
    description: 'Non-porous finish that allows easy removal of paint, markers, and stains.',
    images: ['/images/products/top-coat-014.jpg'],
    proCost: 154.99,
    retailPrice: 259.99,
    stockLevel: 29,
    unit: 'gallon',
    reorderLevel: 15,
    specs: {
      coverage: '280 sqft per gallon',
      finish: 'High Gloss',
      graffitiResistant: 'true',
      stainResistant: 'true'
    },
    tags: ['graffiti-resistant', 'commercial', 'public-spaces']
  },
  {
    id: 'TC-015',
    sku: 'SC-TOP-015',
    name: 'Metallic Sealer',
    category: 'top-coats',
    description: 'Specialized top coat for metallic epoxy systems. Enhances depth and luster.',
    images: ['/images/products/top-coat-015.jpg'],
    proCost: 134.99,
    retailPrice: 224.99,
    stockLevel: 63,
    unit: 'gallon',
    reorderLevel: 30,
    specs: {
      coverage: '300 sqft per gallon',
      finish: 'High Gloss',
      metallicOptimized: 'true',
      clarity: 'Superior'
    },
    tags: ['metallic', 'specialty', 'high-end']
  },

  // ========================================
  // DECORATIVE FLAKES (20 products)
  // ========================================
  {
    id: 'CF-001',
    sku: 'SC-FLAKE-001',
    name: '1/4" Blend - Granite',
    category: 'flakes',
    description: 'Gray and white granite blend flakes for a classic stone appearance.',
    images: ['/images/products/flake-granite.jpg'],
    proCost: 12.50,
    retailPrice: 24.99,
    stockLevel: 289,
    unit: 'lb',
    reorderLevel: 100,
    specs: {
      coverage: '1 lb per 20 sqft (full broadcast)',
      size: '1/4 inch',
      colorFamily: 'Gray'
    },
    tags: ['gray', 'granite', 'classic', 'neutral'],
    featured: true
  },
  {
    id: 'CF-002',
    sku: 'SC-FLAKE-002',
    name: '1/4" Blend - Midnight',
    category: 'flakes',
    description: 'Black, charcoal, and silver blend for a dramatic modern look.',
    images: ['/images/products/flake-midnight.jpg'],
    proCost: 12.50,
    retailPrice: 24.99,
    stockLevel: 245,
    unit: 'lb',
    reorderLevel: 100,
    specs: {
      coverage: '1 lb per 20 sqft (full broadcast)',
      size: '1/4 inch',
      colorFamily: 'Black'
    },
    tags: ['black', 'charcoal', 'modern', 'dramatic']
  },
  {
    id: 'CF-003',
    sku: 'SC-FLAKE-003',
    name: '1/4" Blend - Granite Gray',
    category: 'flakes',
    description: 'Multi-tone gray granite appearance with natural stone variation.',
    images: ['/images/products/flake-granite-gray.jpg'],
    proCost: 12.50,
    retailPrice: 24.99,
    stockLevel: 312,
    unit: 'lb',
    reorderLevel: 100,
    specs: {
      coverage: '1 lb per 20 sqft (full broadcast)',
      size: '1/4 inch',
      colorFamily: 'Gray'
    },
    tags: ['gray', 'granite', 'natural', 'multi-tone'],
    featured: true
  },
  {
    id: 'CF-004',
    sku: 'SC-FLAKE-004',
    name: '1/4" Blend - Sandstone',
    category: 'flakes',
    description: 'Tan, beige, and brown natural stone look perfect for outdoor spaces.',
    images: ['/images/products/flake-sandstone.jpg'],
    proCost: 13.00,
    retailPrice: 25.99,
    stockLevel: 178,
    unit: 'lb',
    reorderLevel: 80,
    specs: {
      coverage: '1 lb per 20 sqft (full broadcast)',
      size: '1/4 inch',
      colorFamily: 'Tan'
    },
    tags: ['tan', 'beige', 'natural', 'sandstone']
  },
  {
    id: 'CF-005',
    sku: 'SC-FLAKE-005',
    name: '1/4" Blend - Desert Tan',
    category: 'flakes',
    description: 'Light tan and cream blend with warm southwestern tones.',
    images: ['/images/products/flake-desert-tan.jpg'],
    proCost: 13.00,
    retailPrice: 25.99,
    stockLevel: 156,
    unit: 'lb',
    reorderLevel: 80,
    specs: {
      coverage: '1 lb per 20 sqft (full broadcast)',
      size: '1/4 inch',
      colorFamily: 'Tan'
    },
    tags: ['tan', 'cream', 'warm', 'southwestern']
  },
  {
    id: 'CF-006',
    sku: 'SC-FLAKE-006',
    name: '1/4" Blend - Sedona',
    category: 'flakes',
    description: 'Rust, orange, and tan southwestern blend inspired by desert landscapes.',
    images: ['/images/products/flake-sedona.jpg'],
    proCost: 13.50,
    retailPrice: 26.99,
    stockLevel: 134,
    unit: 'lb',
    reorderLevel: 60,
    specs: {
      coverage: '1 lb per 20 sqft (full broadcast)',
      size: '1/4 inch',
      colorFamily: 'Orange'
    },
    tags: ['rust', 'orange', 'southwestern', 'desert']
  },
  {
    id: 'CF-007',
    sku: 'SC-FLAKE-007',
    name: '1/4" Blend - Blue Ridge',
    category: 'flakes',
    description: 'Blue, gray, and white mountain blend with cool tones.',
    images: ['/images/products/flake-blue-ridge.jpg'],
    proCost: 14.00,
    retailPrice: 27.99,
    stockLevel: 98,
    unit: 'lb',
    reorderLevel: 50,
    specs: {
      coverage: '1 lb per 20 sqft (full broadcast)',
      size: '1/4 inch',
      colorFamily: 'Blue'
    },
    tags: ['blue', 'gray', 'cool-tones', 'mountain']
  },
  {
    id: 'CF-008',
    sku: 'SC-FLAKE-008',
    name: '1/4" Blend - Aqua Blue',
    category: 'flakes',
    description: 'Aqua, teal, and white tropical blend perfect for pool areas.',
    images: ['/images/products/flake-aqua-blue.jpg'],
    proCost: 14.00,
    retailPrice: 27.99,
    stockLevel: 112,
    unit: 'lb',
    reorderLevel: 50,
    specs: {
      coverage: '1 lb per 20 sqft (full broadcast)',
      size: '1/4 inch',
      colorFamily: 'Blue'
    },
    tags: ['aqua', 'teal', 'tropical', 'pool-deck']
  },
  {
    id: 'CF-009',
    sku: 'SC-FLAKE-009',
    name: '1/4" Blend - Mocha Java',
    category: 'flakes',
    description: 'Rich brown and cream coffee-inspired tones.',
    images: ['/images/products/flake-mocha.jpg'],
    proCost: 13.00,
    retailPrice: 25.99,
    stockLevel: 142,
    unit: 'lb',
    reorderLevel: 70,
    specs: {
      coverage: '1 lb per 20 sqft (full broadcast)',
      size: '1/4 inch',
      colorFamily: 'Brown'
    },
    tags: ['brown', 'cream', 'warm', 'coffee']
  },
  {
    id: 'CF-010',
    sku: 'SC-FLAKE-010',
    name: '1/4" Blend - Burgundy',
    category: 'flakes',
    description: 'Deep red and black blend for a bold, luxurious appearance.',
    images: ['/images/products/flake-burgundy.jpg'],
    proCost: 14.50,
    retailPrice: 28.99,
    stockLevel: 87,
    unit: 'lb',
    reorderLevel: 40,
    specs: {
      coverage: '1 lb per 20 sqft (full broadcast)',
      size: '1/4 inch',
      colorFamily: 'Red'
    },
    tags: ['burgundy', 'red', 'bold', 'luxurious']
  },
  {
    id: 'CF-011',
    sku: 'SC-FLAKE-011',
    name: '1/8" Blend - Granite',
    category: 'flakes',
    description: 'Smaller granite flakes for a subtle, refined texture.',
    images: ['/images/products/flake-granite-small.jpg'],
    proCost: 11.00,
    retailPrice: 22.99,
    stockLevel: 203,
    unit: 'lb',
    reorderLevel: 90,
    specs: {
      coverage: '1 lb per 30 sqft (full broadcast)',
      size: '1/8 inch',
      colorFamily: 'Gray'
    },
    tags: ['gray', 'small', 'subtle', 'refined']
  },
  {
    id: 'CF-012',
    sku: 'SC-FLAKE-012',
    name: '1/8" Blend - Terra Cotta',
    category: 'flakes',
    description: 'Small flakes in rustic terracotta and earth tones.',
    images: ['/images/products/flake-terracotta.jpg'],
    proCost: 11.50,
    retailPrice: 23.99,
    stockLevel: 167,
    unit: 'lb',
    reorderLevel: 75,
    specs: {
      coverage: '1 lb per 30 sqft (full broadcast)',
      size: '1/8 inch',
      colorFamily: 'Orange'
    },
    tags: ['terracotta', 'rustic', 'earth-tones', 'small']
  },
  {
    id: 'CF-013',
    sku: 'SC-FLAKE-013',
    name: '1/2" Large Flake - Pewter',
    category: 'flakes',
    description: 'Large metallic gray flakes for dramatic visual impact.',
    images: ['/images/products/flake-pewter-large.jpg'],
    proCost: 15.50,
    retailPrice: 30.99,
    stockLevel: 94,
    unit: 'lb',
    reorderLevel: 45,
    specs: {
      coverage: '1 lb per 15 sqft (full broadcast)',
      size: '1/2 inch',
      colorFamily: 'Gray'
    },
    tags: ['large', 'pewter', 'metallic', 'dramatic']
  },
  {
    id: 'CF-014',
    sku: 'SC-FLAKE-014',
    name: '1/4" Blend - Forest Green',
    category: 'flakes',
    description: 'Deep green with brown and tan for a natural forest floor look.',
    images: ['/images/products/flake-forest.jpg'],
    proCost: 14.00,
    retailPrice: 27.99,
    stockLevel: 76,
    unit: 'lb',
    reorderLevel: 40,
    specs: {
      coverage: '1 lb per 20 sqft (full broadcast)',
      size: '1/4 inch',
      colorFamily: 'Green'
    },
    tags: ['green', 'natural', 'forest', 'earth-tones']
  },
  {
    id: 'CF-015',
    sku: 'SC-FLAKE-015',
    name: '1/4" Blend - Autumn Leaves',
    category: 'flakes',
    description: 'Warm fall colors: orange, red, brown, and gold.',
    images: ['/images/products/flake-autumn.jpg'],
    proCost: 13.50,
    retailPrice: 26.99,
    stockLevel: 118,
    unit: 'lb',
    reorderLevel: 60,
    specs: {
      coverage: '1 lb per 20 sqft (full broadcast)',
      size: '1/4 inch',
      colorFamily: 'Orange'
    },
    tags: ['autumn', 'fall', 'warm', 'seasonal']
  },
  {
    id: 'CF-016',
    sku: 'SC-FLAKE-016',
    name: '1/4" Blend - Arctic White',
    category: 'flakes',
    description: 'Bright white with light gray accents for a clean, modern look.',
    images: ['/images/products/flake-arctic.jpg'],
    proCost: 13.00,
    retailPrice: 25.99,
    stockLevel: 189,
    unit: 'lb',
    reorderLevel: 85,
    specs: {
      coverage: '1 lb per 20 sqft (full broadcast)',
      size: '1/4 inch',
      colorFamily: 'White'
    },
    tags: ['white', 'clean', 'modern', 'bright']
  },
  {
    id: 'CF-017',
    sku: 'SC-FLAKE-017',
    name: '1/4" Blend - Sunset',
    category: 'flakes',
    description: 'Vibrant orange, yellow, and red sunset-inspired blend.',
    images: ['/images/products/flake-sunset.jpg'],
    proCost: 14.50,
    retailPrice: 28.99,
    stockLevel: 103,
    unit: 'lb',
    reorderLevel: 50,
    specs: {
      coverage: '1 lb per 20 sqft (full broadcast)',
      size: '1/4 inch',
      colorFamily: 'Orange'
    },
    tags: ['sunset', 'vibrant', 'warm', 'bold']
  },
  {
    id: 'CF-018',
    sku: 'SC-FLAKE-018',
    name: '1/4" Blend - Denim',
    category: 'flakes',
    description: 'Blue jean-inspired flakes with navy, light blue, and white.',
    images: ['/images/products/flake-denim.jpg'],
    proCost: 13.50,
    retailPrice: 26.99,
    stockLevel: 127,
    unit: 'lb',
    reorderLevel: 60,
    specs: {
      coverage: '1 lb per 20 sqft (full broadcast)',
      size: '1/4 inch',
      colorFamily: 'Blue'
    },
    tags: ['blue', 'denim', 'casual', 'modern']
  },
  {
    id: 'CF-019',
    sku: 'SC-FLAKE-019',
    name: '1/4" Blend - Pink Flamingo',
    category: 'flakes',
    description: 'Fun pink and white blend for playful, tropical designs.',
    images: ['/images/products/flake-flamingo.jpg'],
    proCost: 14.50,
    retailPrice: 28.99,
    stockLevel: 64,
    unit: 'lb',
    reorderLevel: 35,
    specs: {
      coverage: '1 lb per 20 sqft (full broadcast)',
      size: '1/4 inch',
      colorFamily: 'Pink'
    },
    tags: ['pink', 'tropical', 'fun', 'playful']
  },
  {
    id: 'CF-020',
    sku: 'SC-FLAKE-020',
    name: '1/4" Blend - Storm Cloud',
    category: 'flakes',
    description: 'Dark gray with blue undertones for a moody, sophisticated look.',
    images: ['/images/products/flake-storm.jpg'],
    proCost: 13.50,
    retailPrice: 26.99,
    stockLevel: 141,
    unit: 'lb',
    reorderLevel: 70,
    specs: {
      coverage: '1 lb per 20 sqft (full broadcast)',
      size: '1/4 inch',
      colorFamily: 'Gray'
    },
    tags: ['gray', 'blue', 'sophisticated', 'moody']
  },

  // ========================================
  // METALLIC PIGMENTS (10 products)
  // ========================================
  {
    id: 'MET-001',
    sku: 'SC-MET-001',
    name: 'Charcoal Metallic Epoxy',
    category: 'metallic',
    description: 'Dark charcoal metallic finish system with marbled effect.',
    images: ['/images/products/metallic-charcoal.jpg'],
    proCost: 149.99,
    retailPrice: 259.99,
    stockLevel: 45,
    unit: 'gallon',
    reorderLevel: 20,
    specs: {
      coverage: '150 sqft per gallon',
      finish: 'Metallic',
      effectType: 'Marbled',
      pigmentType: 'Charcoal'
    },
    tags: ['metallic', 'charcoal', 'marbled', 'high-end'],
    featured: true
  },
  {
    id: 'MET-002',
    sku: 'SC-MET-002',
    name: 'Silver Cloud Metallic',
    category: 'metallic',
    description: 'Silver metallic with cloud effect for ethereal appearance.',
    images: ['/images/products/metallic-silver.jpg'],
    proCost: 149.99,
    retailPrice: 259.99,
    stockLevel: 38,
    unit: 'gallon',
    reorderLevel: 20,
    specs: {
      coverage: '150 sqft per gallon',
      finish: 'Metallic',
      effectType: 'Cloud',
      pigmentType: 'Silver'
    },
    tags: ['metallic', 'silver', 'cloud', 'elegant']
  },
  {
    id: 'MET-003',
    sku: 'SC-MET-003',
    name: 'Copper Penny Metallic',
    category: 'metallic',
    description: 'Copper metallic with dimensional depth and warmth.',
    images: ['/images/products/metallic-copper.jpg'],
    proCost: 159.99,
    retailPrice: 279.99,
    stockLevel: 31,
    unit: 'gallon',
    reorderLevel: 15,
    specs: {
      coverage: '150 sqft per gallon',
      finish: 'Metallic',
      effectType: 'Dimensional',
      pigmentType: 'Copper'
    },
    tags: ['metallic', 'copper', 'warm', 'dimensional']
  },
  {
    id: 'MET-004',
    sku: 'SC-MET-004',
    name: 'Gold Rush Metallic',
    category: 'metallic',
    description: 'Rich gold metallic for luxurious, high-end installations.',
    images: ['/images/products/metallic-gold.jpg'],
    proCost: 169.99,
    retailPrice: 294.99,
    stockLevel: 27,
    unit: 'gallon',
    reorderLevel: 12,
    specs: {
      coverage: '150 sqft per gallon',
      finish: 'Metallic',
      effectType: 'Luxe',
      pigmentType: 'Gold'
    },
    tags: ['metallic', 'gold', 'luxurious', 'premium']
  },
  {
    id: 'MET-005',
    sku: 'SC-MET-005',
    name: 'Bronze Aged Metallic',
    category: 'metallic',
    description: 'Antique bronze with aged patina effect.',
    images: ['/images/products/metallic-bronze.jpg'],
    proCost: 154.99,
    retailPrice: 269.99,
    stockLevel: 33,
    unit: 'gallon',
    reorderLevel: 15,
    specs: {
      coverage: '150 sqft per gallon',
      finish: 'Metallic',
      effectType: 'Aged Patina',
      pigmentType: 'Bronze'
    },
    tags: ['metallic', 'bronze', 'antique', 'patina']
  },
  {
    id: 'MET-006',
    sku: 'SC-MET-006',
    name: 'Pewter Frost Metallic',
    category: 'metallic',
    description: 'Cool-toned pewter with frosted metallic swirls.',
    images: ['/images/products/metallic-pewter.jpg'],
    proCost: 149.99,
    retailPrice: 259.99,
    stockLevel: 41,
    unit: 'gallon',
    reorderLevel: 18,
    specs: {
      coverage: '150 sqft per gallon',
      finish: 'Metallic',
      effectType: 'Frosted',
      pigmentType: 'Pewter'
    },
    tags: ['metallic', 'pewter', 'frosted', 'cool-tones']
  },
  {
    id: 'MET-007',
    sku: 'SC-MET-007',
    name: 'Sapphire Blue Metallic',
    category: 'metallic',
    description: 'Deep blue metallic with gemstone-like depth.',
    images: ['/images/products/metallic-sapphire.jpg'],
    proCost: 164.99,
    retailPrice: 284.99,
    stockLevel: 24,
    unit: 'gallon',
    reorderLevel: 12,
    specs: {
      coverage: '150 sqft per gallon',
      finish: 'Metallic',
      effectType: 'Gemstone',
      pigmentType: 'Sapphire Blue'
    },
    tags: ['metallic', 'blue', 'gemstone', 'deep']
  },
  {
    id: 'MET-008',
    sku: 'SC-MET-008',
    name: 'Emerald Green Metallic',
    category: 'metallic',
    description: 'Rich emerald green with jewel-tone metallic shimmer.',
    images: ['/images/products/metallic-emerald.jpg'],
    proCost: 164.99,
    retailPrice: 284.99,
    stockLevel: 19,
    unit: 'gallon',
    reorderLevel: 10,
    specs: {
      coverage: '150 sqft per gallon',
      finish: 'Metallic',
      effectType: 'Jewel Tone',
      pigmentType: 'Emerald Green'
    },
    tags: ['metallic', 'green', 'emerald', 'jewel-tone']
  },
  {
    id: 'MET-009',
    sku: 'SC-MET-009',
    name: 'Titanium White Metallic',
    category: 'metallic',
    description: 'Pearl white metallic with subtle iridescent shifts.',
    images: ['/images/products/metallic-titanium.jpg'],
    proCost: 154.99,
    retailPrice: 269.99,
    stockLevel: 36,
    unit: 'gallon',
    reorderLevel: 16,
    specs: {
      coverage: '150 sqft per gallon',
      finish: 'Metallic',
      effectType: 'Pearl',
      pigmentType: 'Titanium White'
    },
    tags: ['metallic', 'white', 'pearl', 'iridescent']
  },
  {
    id: 'MET-010',
    sku: 'SC-MET-010',
    name: 'Onyx Black Metallic',
    category: 'metallic',
    description: 'Deep black with subtle metallic undertones for dramatic effect.',
    images: ['/images/products/metallic-onyx.jpg'],
    proCost: 159.99,
    retailPrice: 279.99,
    stockLevel: 29,
    unit: 'gallon',
    reorderLevel: 14,
    specs: {
      coverage: '150 sqft per gallon',
      finish: 'Metallic',
      effectType: 'Deep Shimmer',
      pigmentType: 'Onyx Black'
    },
    tags: ['metallic', 'black', 'dramatic', 'deep']
  },

  // ========================================
  // PRIMERS/PREP (5 products)
  // ========================================
  {
    id: 'PR-001',
    sku: 'SC-PRM-001',
    name: 'Concrete Bonding Primer',
    category: 'primers',
    description: 'High-adhesion concrete primer for maximum bond strength.',
    images: ['/images/products/primer-001.jpg'],
    proCost: 69.99,
    retailPrice: 119.99,
    stockLevel: 167,
    unit: 'gallon',
    reorderLevel: 60,
    specs: {
      coverage: '300 sqft per gallon',
      dryTime: '2-4 hours',
      application: 'Brush, roller, or spray'
    },
    tags: ['primer', 'bonding', 'adhesion', 'concrete']
  },
  {
    id: 'PR-002',
    sku: 'SC-PRM-002',
    name: 'Moisture Barrier Primer',
    category: 'primers',
    description: 'Epoxy primer for high-moisture substrates. Blocks up to 8% RH.',
    images: ['/images/products/primer-002.jpg'],
    proCost: 79.99,
    retailPrice: 135.99,
    stockLevel: 89,
    unit: 'gallon',
    reorderLevel: 40,
    specs: {
      coverage: '250 sqft per gallon',
      dryTime: '4-6 hours',
      moistureBarrier: 'true',
      maxMoisture: '8% RH'
    },
    tags: ['primer', 'moisture-barrier', 'basement', 'epoxy']
  },
  {
    id: 'PR-003',
    sku: 'SC-PRM-003',
    name: 'Crack Filler Epoxy',
    category: 'primers',
    description: 'Low-viscosity epoxy for filling cracks and divots before coating.',
    images: ['/images/products/primer-003.jpg'],
    proCost: 84.99,
    retailPrice: 144.99,
    stockLevel: 73,
    unit: 'gallon',
    reorderLevel: 35,
    specs: {
      coverage: 'Varies by crack size',
      viscosity: 'Low',
      application: 'Pour or inject'
    },
    tags: ['crack-filler', 'repair', 'epoxy', 'prep']
  },
  {
    id: 'PR-004',
    sku: 'SC-PRM-004',
    name: 'Concrete Etching Solution',
    category: 'primers',
    description: 'Acid-based etching solution for opening concrete pores. 1 gallon covers 200 sqft.',
    images: ['/images/products/primer-004.jpg'],
    proCost: 34.99,
    retailPrice: 59.99,
    stockLevel: 124,
    unit: 'gallon',
    reorderLevel: 50,
    specs: {
      coverage: '200 sqft per gallon',
      type: 'Acid Etch',
      dwellTime: '10-15 minutes'
    },
    tags: ['etching', 'prep', 'acid', 'surface-preparation']
  },
  {
    id: 'PR-005',
    sku: 'SC-PRM-005',
    name: 'Oil Stain Remover',
    category: 'primers',
    description: 'Industrial degreaser for removing oil, grease, and tire marks from concrete.',
    images: ['/images/products/primer-005.jpg'],
    proCost: 44.99,
    retailPrice: 74.99,
    stockLevel: 96,
    unit: 'gallon',
    reorderLevel: 40,
    specs: {
      coverage: '300 sqft per gallon',
      type: 'Degreaser',
      biodegradable: 'true'
    },
    tags: ['degreaser', 'oil-remover', 'prep', 'cleaning']
  },

  // ========================================
  // TOOLS/EQUIPMENT (10 products)
  // ========================================
  {
    id: 'TOOL-001',
    sku: 'SC-TOOL-001',
    name: 'Professional Epoxy Roller Frame',
    category: 'tools',
    description: '18" heavy-duty roller frame with spike wheels for walking on wet epoxy.',
    images: ['/images/products/roller-frame.jpg'],
    proCost: 45.00,
    retailPrice: 79.99,
    stockLevel: 78,
    unit: 'each',
    reorderLevel: 30,
    specs: {
      size: '18 inches',
      material: 'Aluminum',
      spikeWheels: 'true'
    },
    tags: ['roller', 'frame', 'professional', 'spike-wheels']
  },
  {
    id: 'TOOL-002',
    sku: 'SC-TOOL-002',
    name: 'Epoxy Roller Cover (3-pack)',
    category: 'tools',
    description: '18" x 3/8" nap roller covers. Lint-free microfiber for smooth application.',
    images: ['/images/products/roller-covers.jpg'],
    proCost: 18.00,
    retailPrice: 34.99,
    stockLevel: 145,
    unit: 'kit',
    reorderLevel: 50,
    specs: {
      size: '18 x 3/8 inch',
      material: 'Microfiber',
      quantity: '3'
    },
    tags: ['roller-cover', 'microfiber', 'lint-free', 'consumable']
  },
  {
    id: 'TOOL-003',
    sku: 'SC-TOOL-003',
    name: 'Spiked Shoes (Pair)',
    category: 'tools',
    description: 'Professional spiked shoes for walking on wet epoxy without leaving marks.',
    images: ['/images/products/spiked-shoes.jpg'],
    proCost: 32.00,
    retailPrice: 59.99,
    stockLevel: 62,
    unit: 'each',
    reorderLevel: 25,
    specs: {
      spikeLlength: '1.5 inches',
      size: 'Adjustable',
      material: 'Steel spikes, nylon straps'
    },
    tags: ['spiked-shoes', 'application', 'safety', 'professional']
  },
  {
    id: 'TOOL-004',
    sku: 'SC-TOOL-004',
    name: 'Notched Squeegee 24"',
    category: 'tools',
    description: '24" notched squeegee for spreading base coat at consistent mil thickness.',
    images: ['/images/products/squeegee.jpg'],
    proCost: 28.00,
    retailPrice: 49.99,
    stockLevel: 91,
    unit: 'each',
    reorderLevel: 35,
    specs: {
      size: '24 inches',
      notchSize: '1/8 inch',
      handle: 'Ergonomic grip'
    },
    tags: ['squeegee', 'notched', 'spreading', 'application']
  },
  {
    id: 'TOOL-005',
    sku: 'SC-TOOL-005',
    name: 'Mixing Paddle Set',
    category: 'tools',
    description: 'Heavy-duty mixing paddles (3-piece set). For use with 1/2" drill.',
    images: ['/images/products/mixing-paddles.jpg'],
    proCost: 35.00,
    retailPrice: 64.99,
    stockLevel: 54,
    unit: 'kit',
    reorderLevel: 20,
    specs: {
      quantity: '3',
      shaftSize: '1/2 inch',
      material: 'Galvanized steel'
    },
    tags: ['mixing', 'paddle', 'drill', 'set']
  },
  {
    id: 'TOOL-006',
    sku: 'SC-TOOL-006',
    name: 'Floor Grinder Diamond Pads',
    category: 'tools',
    description: 'Diamond grinding pads for concrete surface preparation (5-pack).',
    images: ['/images/products/grinder-pads.jpg'],
    proCost: 125.00,
    retailPrice: 219.99,
    stockLevel: 23,
    unit: 'kit',
    reorderLevel: 10,
    specs: {
      quantity: '5',
      grit: '30/40',
      diameter: '7 inches'
    },
    tags: ['grinder', 'diamond', 'surface-prep', 'consumable']
  },
  {
    id: 'TOOL-007',
    sku: 'SC-TOOL-007',
    name: 'Flake Broadcast Hopper',
    category: 'tools',
    description: 'Hand-crank hopper for even distribution of decorative flakes.',
    images: ['/images/products/flake-hopper.jpg'],
    proCost: 89.00,
    retailPrice: 154.99,
    stockLevel: 37,
    unit: 'each',
    reorderLevel: 15,
    specs: {
      capacity: '5 lbs',
      mechanism: 'Hand crank',
      material: 'Plastic hopper, metal crank'
    },
    tags: ['hopper', 'flake', 'broadcast', 'distribution']
  },
  {
    id: 'TOOL-008',
    sku: 'SC-TOOL-008',
    name: 'Edge Roller Kit',
    category: 'tools',
    description: '4" edge roller with extension pole for walls and corners.',
    images: ['/images/products/edge-roller.jpg'],
    proCost: 22.00,
    retailPrice: 39.99,
    stockLevel: 68,
    unit: 'kit',
    reorderLevel: 30,
    specs: {
      size: '4 inches',
      includes: 'Roller, handle, 3 covers',
      extensionPole: 'Included'
    },
    tags: ['edge-roller', 'detail', 'corners', 'walls']
  },
  {
    id: 'TOOL-009',
    sku: 'SC-TOOL-009',
    name: 'Digital Moisture Meter',
    category: 'tools',
    description: 'Pinless moisture meter for testing concrete before application.',
    images: ['/images/products/moisture-meter.jpg'],
    proCost: 165.00,
    retailPrice: 279.99,
    stockLevel: 19,
    unit: 'each',
    reorderLevel: 8,
    specs: {
      type: 'Pinless',
      accuracy: '+/- 2%',
      range: '0-99% RH'
    },
    tags: ['moisture-meter', 'testing', 'digital', 'diagnostic']
  },
  {
    id: 'TOOL-010',
    sku: 'SC-TOOL-010',
    name: 'Safety Kit - Epoxy Application',
    category: 'tools',
    description: 'Complete safety kit: gloves, respirator, goggles, and Tyvek suit.',
    images: ['/images/products/safety-kit.jpg'],
    proCost: 42.00,
    retailPrice: 74.99,
    stockLevel: 103,
    unit: 'kit',
    reorderLevel: 45,
    specs: {
      includes: 'Gloves (3 pairs), half-face respirator, goggles, Tyvek suit',
      respiratorType: 'Organic vapor cartridge'
    },
    tags: ['safety', 'ppe', 'protection', 'kit'],
    featured: true
  }
];

/**
 * Helper function to get products by category
 */
export const getProductsByCategory = (category: ProductCategory): Product[] => {
  return mockInventory.filter(p => p.category === category);
};

/**
 * Helper function to get product by ID
 */
export const getProductById = (id: string): Product | undefined => {
  return mockInventory.find(p => p.id === id);
};

/**
 * Helper function to get product by SKU
 */
export const getProductBySku = (sku: string): Product | undefined => {
  return mockInventory.find(p => p.sku === sku);
};

/**
 * Helper function to get low stock products (at or below reorder level)
 */
export const getLowStockProducts = (): Product[] => {
  return mockInventory.filter(p => p.stockLevel <= p.reorderLevel);
};

/**
 * Helper function to get featured products
 */
export const getFeaturedProducts = (): Product[] => {
  return mockInventory.filter(p => p.featured === true);
};

/**
 * Helper function to search products by name or description
 */
export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return mockInventory.filter(p =>
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

/**
 * Calculate total inventory value at pro cost
 */
export const calculateInventoryValue = (): number => {
  return mockInventory.reduce((total, product) => {
    return total + (product.proCost * product.stockLevel);
  }, 0);
};

/**
 * Calculate total inventory value at retail price
 */
export const calculateInventoryValueRetail = (): number => {
  return mockInventory.reduce((total, product) => {
    return total + (product.retailPrice * product.stockLevel);
  }, 0);
};

/**
 * Validate inventory data integrity
 */
export const validateInventory = (): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  const skuSet = new Set<string>();
  const idSet = new Set<string>();

  mockInventory.forEach((product, index) => {
    // Check for duplicate SKUs
    if (skuSet.has(product.sku)) {
      errors.push(`Product ${index + 1}: Duplicate SKU ${product.sku}`);
    }
    skuSet.add(product.sku);

    // Check for duplicate IDs
    if (idSet.has(product.id)) {
      errors.push(`Product ${index + 1}: Duplicate ID ${product.id}`);
    }
    idSet.add(product.id);

    // Check pricing logic (retail should be higher than pro cost)
    if (product.retailPrice <= product.proCost) {
      errors.push(
        `Product ${product.id} (${product.name}): Retail price ($${product.retailPrice}) ` +
        `must be higher than pro cost ($${product.proCost})`
      );
    }

    // Check stock levels are non-negative
    if (product.stockLevel < 0) {
      errors.push(`Product ${product.id}: Negative stock level ${product.stockLevel}`);
    }

    // Check reorder levels are sensible
    if (product.reorderLevel < 0) {
      errors.push(`Product ${product.id}: Negative reorder level ${product.reorderLevel}`);
    }
  });

  return {
    valid: errors.length === 0,
    errors
  };
};
