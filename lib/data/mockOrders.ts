/**
 * Mock Orders Data
 * Material orders placed by pros through the Stonecoat platform
 * All orders reference valid pros from mockPros.ts
 */

import { Order, OrderItem, OrderPricing, ShippingInfo, OrderStatus } from '../types/order';

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    proId: 'PRO-001',
    proName: 'Tampa Premium Coatings',
    projectId: 'QUOTE-001',
    items: [
      {
        productId: 'BC-001',
        productName: 'Countertop FX Poxy Base Coat',
        sku: 'SC-BASE-001',
        quantity: 10,
        unitPrice: 89.99,
        total: 899.90
      },
      {
        productId: 'CF-003',
        productName: '1/4" Granite Gray Decorative Flake',
        sku: 'SC-FLAKE-003',
        quantity: 25,
        unitPrice: 12.50,
        total: 312.50
      },
      {
        productId: 'TC-001',
        productName: 'Clear High-Performance Top Coat',
        sku: 'SC-TOP-001',
        quantity: 8,
        unitPrice: 119.99,
        total: 959.92
      },
      {
        productId: 'TOOL-002',
        productName: 'Epoxy Roller Cover (3-pack)',
        sku: 'SC-TOOL-002',
        quantity: 2,
        unitPrice: 18.00,
        total: 36.00
      }
    ],
    pricing: {
      subtotal: 2208.32,
      proDiscount: 110.42, // 5% volume discount
      shipping: 65.00,
      tax: 151.17,
      total: 2314.07
    },
    shipping: {
      address: {
        street: '4521 Commerce Drive',
        city: 'Tampa',
        state: 'FL',
        zipCode: '33610'
      },
      method: 'Standard Ground (5-7 days)',
      estimatedDelivery: new Date('2024-10-28'),
      trackingNumber: 'TRK-9876543210'
    },
    status: 'delivered',
    paymentMethod: 'Net 30 Terms',
    createdAt: new Date('2024-10-15'),
    updatedAt: new Date('2024-10-24'),
    completedAt: new Date('2024-10-24'),
    notes: 'Regular inventory restock for multiple garage floor projects.'
  },
  {
    id: 'ORD-002',
    proId: 'PRO-002',
    proName: 'Bay Area Epoxy Experts',
    projectId: 'QUOTE-015',
    items: [
      {
        productId: 'BC-004',
        productName: 'UV-Resistant Outdoor Epoxy',
        sku: 'SC-BASE-004',
        quantity: 5,
        unitPrice: 95.99,
        total: 479.95
      },
      {
        productId: 'CF-005',
        productName: '1/4" Desert Tan Decorative Flake',
        sku: 'SC-FLAKE-005',
        quantity: 12,
        unitPrice: 13.00,
        total: 156.00
      },
      {
        productId: 'TC-003',
        productName: 'UV-Resistant Clear Seal',
        sku: 'SC-TOP-003',
        quantity: 4,
        unitPrice: 129.99,
        total: 519.96
      },
      {
        productId: 'PR-001',
        productName: 'Concrete Bonding Primer',
        sku: 'SC-PRM-001',
        quantity: 2,
        unitPrice: 69.99,
        total: 139.98
      }
    ],
    pricing: {
      subtotal: 1295.89,
      proDiscount: 51.84, // 4% discount
      shipping: 45.00,
      tax: 89.08,
      total: 1378.13
    },
    shipping: {
      address: {
        street: '2845 Industrial Parkway',
        city: 'Tampa',
        state: 'FL',
        zipCode: '33612'
      },
      method: 'Expedited (2-3 days)',
      estimatedDelivery: new Date('2024-10-23'),
      trackingNumber: 'TRK-8765432109'
    },
    status: 'shipped',
    paymentMethod: 'Credit Card',
    createdAt: new Date('2024-10-18'),
    updatedAt: new Date('2024-10-20'),
    notes: 'Rush order for patio project. Customer deadline Oct 25.'
  },
  {
    id: 'ORD-003',
    proId: 'PRO-003',
    proName: 'Coastal Floors Pro',
    items: [
      {
        productId: 'MET-001',
        productName: 'Charcoal Metallic Epoxy',
        sku: 'SC-MET-001',
        quantity: 6,
        unitPrice: 149.99,
        total: 899.94
      },
      {
        productId: 'TC-001',
        productName: 'Clear High-Performance Top Coat',
        sku: 'SC-TOP-001',
        quantity: 5,
        unitPrice: 119.99,
        total: 599.95
      },
      {
        productId: 'PR-002',
        productName: 'Moisture Barrier Primer',
        sku: 'SC-PRM-002',
        quantity: 4,
        unitPrice: 79.99,
        total: 319.96
      },
      {
        productId: 'TOOL-004',
        productName: 'Notched Squeegee 24"',
        sku: 'SC-TOOL-004',
        quantity: 2,
        unitPrice: 28.00,
        total: 56.00
      }
    ],
    pricing: {
      subtotal: 1875.85,
      proDiscount: 93.79, // 5% discount
      shipping: 55.00,
      tax: 128.42,
      total: 1965.48
    },
    shipping: {
      address: {
        street: '4521 Marina Boulevard',
        city: 'Clearwater',
        state: 'FL',
        zipCode: '33765'
      },
      method: 'Standard Ground (5-7 days)',
      estimatedDelivery: new Date('2024-10-25')
    },
    status: 'processing',
    paymentMethod: 'Net 30 Terms',
    createdAt: new Date('2024-10-19'),
    updatedAt: new Date('2024-10-20'),
    notes: 'Metallic basement floor project. High-end residential.'
  },
  {
    id: 'ORD-004',
    proId: 'PRO-004',
    proName: 'Premier Garage Floors',
    projectId: 'QUOTE-008',
    items: [
      {
        productId: 'BC-003',
        productName: 'Garage Floor Elite',
        sku: 'SC-BASE-003',
        quantity: 6,
        unitPrice: 79.99,
        total: 479.94
      },
      {
        productId: 'CF-001',
        productName: '1/4" Blend - Granite',
        sku: 'SC-FLAKE-001',
        quantity: 15,
        unitPrice: 12.50,
        total: 187.50
      },
      {
        productId: 'TC-001',
        productName: 'Clear High-Performance Top Coat',
        sku: 'SC-TOP-001',
        quantity: 4,
        unitPrice: 119.99,
        total: 479.96
      }
    ],
    pricing: {
      subtotal: 1147.40,
      proDiscount: 34.42, // 3% discount
      shipping: 40.00,
      tax: 77.89,
      total: 1230.87
    },
    shipping: {
      address: {
        street: '1234 Brandon Blvd',
        city: 'Brandon',
        state: 'FL',
        zipCode: '33511'
      },
      method: 'Standard Ground (5-7 days)',
      estimatedDelivery: new Date('2024-10-26'),
      trackingNumber: 'TRK-7654321098'
    },
    status: 'delivered',
    paymentMethod: 'Credit Card',
    createdAt: new Date('2024-10-16'),
    updatedAt: new Date('2024-10-22'),
    completedAt: new Date('2024-10-22'),
    notes: 'Standard garage floor. 2-car, 450 sqft.'
  },
  {
    id: 'ORD-005',
    proId: 'PRO-005',
    proName: 'Sunshine Coatings',
    projectId: 'QUOTE-022',
    items: [
      {
        productId: 'BC-005',
        productName: 'Pool Deck Epoxy Base',
        sku: 'SC-BASE-005',
        quantity: 7,
        unitPrice: 99.99,
        total: 699.93
      },
      {
        productId: 'CF-008',
        productName: '1/4" Aqua Blue Decorative Flake',
        sku: 'SC-FLAKE-008',
        quantity: 18,
        unitPrice: 14.00,
        total: 252.00
      },
      {
        productId: 'TC-004',
        productName: 'Non-Slip Pool Deck Seal',
        sku: 'SC-TOP-004',
        quantity: 5,
        unitPrice: 139.99,
        total: 699.95
      },
      {
        productId: 'PR-001',
        productName: 'Concrete Bonding Primer',
        sku: 'SC-PRM-001',
        quantity: 3,
        unitPrice: 69.99,
        total: 209.97
      },
      {
        productId: 'TOOL-003',
        productName: 'Spiked Shoes (Pair)',
        sku: 'SC-TOOL-003',
        quantity: 1,
        unitPrice: 32.00,
        total: 32.00
      }
    ],
    pricing: {
      subtotal: 1893.85,
      proDiscount: 94.69, // 5% discount
      shipping: 50.00,
      tax: 129.62,
      total: 1978.78
    },
    shipping: {
      address: {
        street: '1567 Coastal Highway',
        city: 'St. Petersburg',
        state: 'FL',
        zipCode: '33707'
      },
      method: 'Expedited (2-3 days)',
      estimatedDelivery: new Date('2024-10-23'),
      trackingNumber: 'TRK-6543210987'
    },
    status: 'shipped',
    paymentMethod: 'Net 30 Terms',
    createdAt: new Date('2024-10-19'),
    updatedAt: new Date('2024-10-21'),
    notes: 'Pool deck coating - 350 sqft. Chlorine resistant materials required.'
  },
  {
    id: 'ORD-006',
    proId: 'PRO-006',
    proName: 'Elite Epoxy Professionals',
    projectId: 'QUOTE-035',
    items: [
      {
        productId: 'BC-002',
        productName: 'Industrial Floor Pro',
        sku: 'SC-BASE-002',
        quantity: 15,
        unitPrice: 95.99,
        total: 1439.85
      },
      {
        productId: 'CF-002',
        productName: '1/4" Blend - Midnight',
        sku: 'SC-FLAKE-002',
        quantity: 35,
        unitPrice: 12.50,
        total: 437.50
      },
      {
        productId: 'TC-001',
        productName: 'Clear High-Performance Top Coat',
        sku: 'SC-TOP-001',
        quantity: 12,
        unitPrice: 119.99,
        total: 1439.88
      },
      {
        productId: 'PR-001',
        productName: 'Concrete Bonding Primer',
        sku: 'SC-PRM-001',
        quantity: 8,
        unitPrice: 69.99,
        total: 559.92
      }
    ],
    pricing: {
      subtotal: 3877.15,
      proDiscount: 232.63, // 6% volume discount
      shipping: 85.00,
      tax: 260.82,
      total: 3990.34
    },
    shipping: {
      address: {
        street: '1234 Professional Plaza',
        city: 'Tampa',
        state: 'FL',
        zipCode: '33602'
      },
      method: 'Freight (7-10 days)',
      estimatedDelivery: new Date('2024-10-30')
    },
    status: 'pending',
    paymentMethod: 'Net 30 Terms',
    createdAt: new Date('2024-10-20'),
    updatedAt: new Date('2024-10-20'),
    notes: 'Large commercial showroom - 2,800 sqft. Coordinating delivery with site manager.'
  },
  {
    id: 'ORD-007',
    proId: 'PRO-007',
    proName: 'Precision Floor Coatings',
    items: [
      {
        productId: 'BC-003',
        productName: 'Garage Floor Elite',
        sku: 'SC-BASE-003',
        quantity: 4,
        unitPrice: 79.99,
        total: 319.96
      },
      {
        productId: 'CF-003',
        productName: '1/4" Granite Gray Decorative Flake',
        sku: 'SC-FLAKE-003',
        quantity: 10,
        unitPrice: 12.50,
        total: 125.00
      },
      {
        productId: 'TC-001',
        productName: 'Clear High-Performance Top Coat',
        sku: 'SC-TOP-001',
        quantity: 3,
        unitPrice: 119.99,
        total: 359.97
      },
      {
        productId: 'TOOL-002',
        productName: 'Epoxy Roller Cover (3-pack)',
        sku: 'SC-TOOL-002',
        quantity: 1,
        unitPrice: 18.00,
        total: 18.00
      }
    ],
    pricing: {
      subtotal: 822.93,
      proDiscount: 24.69, // 3% discount
      shipping: 35.00,
      tax: 58.36,
      total: 891.60
    },
    shipping: {
      address: {
        street: '789 Industrial Way',
        city: 'Tampa',
        state: 'FL',
        zipCode: '33615'
      },
      method: 'Standard Ground (5-7 days)',
      estimatedDelivery: new Date('2024-10-27'),
      trackingNumber: 'TRK-5432109876'
    },
    status: 'delivered',
    paymentMethod: 'Credit Card',
    createdAt: new Date('2024-10-14'),
    updatedAt: new Date('2024-10-19'),
    completedAt: new Date('2024-10-19'),
    notes: 'Residential garage. Customer accepted quote same day.'
  },
  {
    id: 'ORD-008',
    proId: 'PRO-008',
    proName: 'Modern Surface Solutions',
    projectId: 'QUOTE-041',
    items: [
      {
        productId: 'BC-001',
        productName: 'Countertop FX Poxy Base Coat',
        sku: 'SC-BASE-001',
        quantity: 8,
        unitPrice: 89.99,
        total: 719.92
      },
      {
        productId: 'MET-002',
        productName: 'Silver Cloud Metallic',
        sku: 'SC-MET-002',
        quantity: 3,
        unitPrice: 149.99,
        total: 449.97
      },
      {
        productId: 'TC-001',
        productName: 'Clear High-Performance Top Coat',
        sku: 'SC-TOP-001',
        quantity: 6,
        unitPrice: 119.99,
        total: 719.94
      },
      {
        productId: 'PR-002',
        productName: 'Moisture Barrier Primer',
        sku: 'SC-PRM-002',
        quantity: 3,
        unitPrice: 79.99,
        total: 239.97
      }
    ],
    pricing: {
      subtotal: 2129.80,
      proDiscount: 85.19, // 4% discount
      shipping: 55.00,
      tax: 146.12,
      total: 2245.73
    },
    shipping: {
      address: {
        street: '456 Innovation Drive',
        city: 'Lutz',
        state: 'FL',
        zipCode: '33549'
      },
      method: 'Standard Ground (5-7 days)',
      estimatedDelivery: new Date('2024-10-26')
    },
    status: 'processing',
    paymentMethod: 'Net 30 Terms',
    createdAt: new Date('2024-10-18'),
    updatedAt: new Date('2024-10-19'),
    notes: 'Basement with metallic accents. High-end residential in Lutz.'
  },
  {
    id: 'ORD-009',
    proId: 'PRO-009',
    proName: 'Apex Floor Coatings',
    items: [
      {
        productId: 'BC-002',
        productName: 'Industrial Floor Pro',
        sku: 'SC-BASE-002',
        quantity: 20,
        unitPrice: 95.99,
        total: 1919.80
      },
      {
        productId: 'CF-002',
        productName: '1/4" Blend - Midnight',
        sku: 'SC-FLAKE-002',
        quantity: 50,
        unitPrice: 12.50,
        total: 625.00
      },
      {
        productId: 'TC-001',
        productName: 'Clear High-Performance Top Coat',
        sku: 'SC-TOP-001',
        quantity: 16,
        unitPrice: 119.99,
        total: 1919.84
      },
      {
        productId: 'PR-001',
        productName: 'Concrete Bonding Primer',
        sku: 'SC-PRM-001',
        quantity: 10,
        unitPrice: 69.99,
        total: 699.90
      },
      {
        productId: 'TOOL-005',
        productName: 'Mixing Paddle Set',
        sku: 'SC-TOOL-005',
        quantity: 2,
        unitPrice: 35.00,
        total: 70.00
      },
      {
        productId: 'TOOL-006',
        productName: 'Floor Grinder Diamond Pads',
        sku: 'SC-TOOL-006',
        quantity: 3,
        unitPrice: 125.00,
        total: 375.00
      }
    ],
    pricing: {
      subtotal: 5609.54,
      proDiscount: 336.57, // 6% volume discount
      shipping: 120.00,
      tax: 369.11,
      total: 5762.08
    },
    shipping: {
      address: {
        street: '890 Commerce Center',
        city: 'Lakeland',
        state: 'FL',
        zipCode: '33803'
      },
      method: 'Freight (7-10 days)',
      estimatedDelivery: new Date('2024-11-01'),
      trackingNumber: 'TRK-4321098765'
    },
    status: 'shipped',
    paymentMethod: 'Net 30 Terms',
    createdAt: new Date('2024-10-17'),
    updatedAt: new Date('2024-10-21'),
    notes: 'Large industrial warehouse - 4,500 sqft. Heavy-duty coating required.'
  },
  {
    id: 'ORD-010',
    proId: 'PRO-010',
    proName: 'Crystal Clear Coatings',
    projectId: 'QUOTE-028',
    items: [
      {
        productId: 'BC-004',
        productName: 'UV-Resistant Outdoor Epoxy',
        sku: 'SC-BASE-004',
        quantity: 6,
        unitPrice: 95.99,
        total: 575.94
      },
      {
        productId: 'CF-007',
        productName: '1/4" Blue Ridge Decorative Flake',
        sku: 'SC-FLAKE-007',
        quantity: 15,
        unitPrice: 14.00,
        total: 210.00
      },
      {
        productId: 'TC-003',
        productName: 'UV-Resistant Clear Seal',
        sku: 'SC-TOP-003',
        quantity: 5,
        unitPrice: 129.99,
        total: 649.95
      },
      {
        productId: 'PR-001',
        productName: 'Concrete Bonding Primer',
        sku: 'SC-PRM-001',
        quantity: 3,
        unitPrice: 69.99,
        total: 209.97
      }
    ],
    pricing: {
      subtotal: 1645.86,
      proDiscount: 65.83, // 4% discount
      shipping: 48.00,
      tax: 117.60,
      total: 1745.63
    },
    shipping: {
      address: {
        street: '234 Beach Boulevard',
        city: 'Largo',
        state: 'FL',
        zipCode: '33770'
      },
      method: 'Standard Ground (5-7 days)',
      estimatedDelivery: new Date('2024-10-25')
    },
    status: 'processing',
    paymentMethod: 'Credit Card',
    createdAt: new Date('2024-10-19'),
    updatedAt: new Date('2024-10-20'),
    notes: 'Outdoor patio near beach. UV protection critical for coastal environment.'
  },
  {
    id: 'ORD-011',
    proId: 'PRO-011',
    proName: 'Gulf Coast Epoxy',
    items: [
      {
        productId: 'BC-005',
        productName: 'Pool Deck Epoxy Base',
        sku: 'SC-BASE-005',
        quantity: 5,
        unitPrice: 99.99,
        total: 499.95
      },
      {
        productId: 'CF-008',
        productName: '1/4" Aqua Blue Decorative Flake',
        sku: 'SC-FLAKE-008',
        quantity: 12,
        unitPrice: 14.00,
        total: 168.00
      },
      {
        productId: 'TC-004',
        productName: 'Non-Slip Pool Deck Seal',
        sku: 'SC-TOP-004',
        quantity: 4,
        unitPrice: 139.99,
        total: 559.96
      },
      {
        productId: 'TOOL-001',
        productName: 'Professional Epoxy Roller Frame',
        sku: 'SC-TOOL-001',
        quantity: 1,
        unitPrice: 45.00,
        total: 45.00
      }
    ],
    pricing: {
      subtotal: 1272.91,
      proDiscount: 50.92, // 4% discount
      shipping: 42.00,
      tax: 90.70,
      total: 1354.69
    },
    shipping: {
      address: {
        street: '567 Sunset Drive',
        city: 'Dunedin',
        state: 'FL',
        zipCode: '34698'
      },
      method: 'Standard Ground (5-7 days)',
      estimatedDelivery: new Date('2024-10-28'),
      trackingNumber: 'TRK-3210987654'
    },
    status: 'delivered',
    paymentMethod: 'Net 30 Terms',
    createdAt: new Date('2024-10-13'),
    updatedAt: new Date('2024-10-21'),
    completedAt: new Date('2024-10-21'),
    notes: 'Pool deck resurfacing. Coastal property near water.'
  },
  {
    id: 'ORD-012',
    proId: 'PRO-012',
    proName: 'Platinum Surfaces',
    projectId: 'QUOTE-047',
    items: [
      {
        productId: 'MET-003',
        productName: 'Copper Penny Metallic',
        sku: 'SC-MET-003',
        quantity: 8,
        unitPrice: 159.99,
        total: 1279.92
      },
      {
        productId: 'BC-001',
        productName: 'Countertop FX Poxy Base Coat',
        sku: 'SC-BASE-001',
        quantity: 6,
        unitPrice: 89.99,
        total: 539.94
      },
      {
        productId: 'TC-001',
        productName: 'Clear High-Performance Top Coat',
        sku: 'SC-TOP-001',
        quantity: 8,
        unitPrice: 119.99,
        total: 959.92
      },
      {
        productId: 'PR-001',
        productName: 'Concrete Bonding Primer',
        sku: 'SC-PRM-001',
        quantity: 5,
        unitPrice: 69.99,
        total: 349.95
      }
    ],
    pricing: {
      subtotal: 3129.73,
      proDiscount: 156.49, // 5% discount
      shipping: 75.00,
      tax: 215.15,
      total: 3263.39
    },
    shipping: {
      address: {
        street: '890 Executive Parkway',
        city: 'Tampa',
        state: 'FL',
        zipCode: '33606'
      },
      method: 'Expedited (2-3 days)',
      estimatedDelivery: new Date('2024-10-24')
    },
    status: 'processing',
    paymentMethod: 'Net 30 Terms',
    createdAt: new Date('2024-10-20'),
    updatedAt: new Date('2024-10-21'),
    notes: 'High-end residential basement with copper metallic finish. Premium client.'
  },
  {
    id: 'ORD-013',
    proId: 'PRO-001',
    proName: 'Tampa Premium Coatings',
    items: [
      {
        productId: 'BC-001',
        productName: 'Countertop FX Poxy Base Coat',
        sku: 'SC-BASE-001',
        quantity: 5,
        unitPrice: 89.99,
        total: 449.95
      },
      {
        productId: 'CF-001',
        productName: '1/4" Blend - Granite',
        sku: 'SC-FLAKE-001',
        quantity: 12,
        unitPrice: 12.50,
        total: 150.00
      },
      {
        productId: 'TC-001',
        productName: 'Clear High-Performance Top Coat',
        sku: 'SC-TOP-001',
        quantity: 4,
        unitPrice: 119.99,
        total: 479.96
      }
    ],
    pricing: {
      subtotal: 1079.91,
      proDiscount: 43.20, // 4% discount
      shipping: 38.00,
      tax: 77.68,
      total: 1152.39
    },
    shipping: {
      address: {
        street: '4521 Commerce Drive',
        city: 'Tampa',
        state: 'FL',
        zipCode: '33610'
      },
      method: 'Standard Ground (5-7 days)',
      estimatedDelivery: new Date('2024-10-29')
    },
    status: 'pending',
    paymentMethod: 'Net 30 Terms',
    createdAt: new Date('2024-10-21'),
    updatedAt: new Date('2024-10-21'),
    notes: 'Routine inventory replenishment. Multiple projects coming up.'
  },
  {
    id: 'ORD-014',
    proId: 'PRO-003',
    proName: 'Coastal Floors Pro',
    projectId: 'QUOTE-033',
    items: [
      {
        productId: 'BC-002',
        productName: 'Industrial Floor Pro',
        sku: 'SC-BASE-002',
        quantity: 12,
        unitPrice: 95.99,
        total: 1151.88
      },
      {
        productId: 'CF-002',
        productName: '1/4" Blend - Midnight',
        sku: 'SC-FLAKE-002',
        quantity: 28,
        unitPrice: 12.50,
        total: 350.00
      },
      {
        productId: 'TC-001',
        productName: 'Clear High-Performance Top Coat',
        sku: 'SC-TOP-001',
        quantity: 10,
        unitPrice: 119.99,
        total: 1199.90
      },
      {
        productId: 'PR-001',
        productName: 'Concrete Bonding Primer',
        sku: 'SC-PRM-001',
        quantity: 6,
        unitPrice: 69.99,
        total: 419.94
      }
    ],
    pricing: {
      subtotal: 3121.72,
      proDiscount: 156.09, // 5% discount
      shipping: 70.00,
      tax: 212.41,
      total: 3248.04
    },
    shipping: {
      address: {
        street: '4521 Marina Boulevard',
        city: 'Clearwater',
        state: 'FL',
        zipCode: '33765'
      },
      method: 'Standard Ground (5-7 days)',
      estimatedDelivery: new Date('2024-10-27'),
      trackingNumber: 'TRK-2109876543'
    },
    status: 'shipped',
    paymentMethod: 'Net 30 Terms',
    createdAt: new Date('2024-10-16'),
    updatedAt: new Date('2024-10-20'),
    notes: 'Commercial office space - 2,100 sqft. After-hours installation required.'
  },
  {
    id: 'ORD-015',
    proId: 'PRO-005',
    proName: 'Sunshine Coatings',
    items: [
      {
        productId: 'BC-004',
        productName: 'UV-Resistant Outdoor Epoxy',
        sku: 'SC-BASE-004',
        quantity: 4,
        unitPrice: 95.99,
        total: 383.96
      },
      {
        productId: 'CF-006',
        productName: '1/4" Sedona Decorative Flake',
        sku: 'SC-FLAKE-006',
        quantity: 10,
        unitPrice: 13.50,
        total: 135.00
      },
      {
        productId: 'TC-003',
        productName: 'UV-Resistant Clear Seal',
        sku: 'SC-TOP-003',
        quantity: 3,
        unitPrice: 129.99,
        total: 389.97
      },
      {
        productId: 'TOOL-002',
        productName: 'Epoxy Roller Cover (3-pack)',
        sku: 'SC-TOOL-002',
        quantity: 1,
        unitPrice: 18.00,
        total: 18.00
      }
    ],
    pricing: {
      subtotal: 926.93,
      proDiscount: 27.81, // 3% discount
      shipping: 35.00,
      tax: 66.38,
      total: 1000.50
    },
    shipping: {
      address: {
        street: '1567 Coastal Highway',
        city: 'St. Petersburg',
        state: 'FL',
        zipCode: '33707'
      },
      method: 'Standard Ground (5-7 days)',
      estimatedDelivery: new Date('2024-10-26')
    },
    status: 'processing',
    paymentMethod: 'Credit Card',
    createdAt: new Date('2024-10-19'),
    updatedAt: new Date('2024-10-20'),
    notes: 'Small patio project - 200 sqft. UV protection for Florida sun.'
  },
  {
    id: 'ORD-016',
    proId: 'PRO-007',
    proName: 'Precision Floor Coatings',
    projectId: 'QUOTE-019',
    items: [
      {
        productId: 'BC-003',
        productName: 'Garage Floor Elite',
        sku: 'SC-BASE-003',
        quantity: 7,
        unitPrice: 79.99,
        total: 559.93
      },
      {
        productId: 'CF-003',
        productName: '1/4" Granite Gray Decorative Flake',
        sku: 'SC-FLAKE-003',
        quantity: 18,
        unitPrice: 12.50,
        total: 225.00
      },
      {
        productId: 'TC-001',
        productName: 'Clear High-Performance Top Coat',
        sku: 'SC-TOP-001',
        quantity: 5,
        unitPrice: 119.99,
        total: 599.95
      },
      {
        productId: 'PR-001',
        productName: 'Concrete Bonding Primer',
        sku: 'SC-PRM-001',
        quantity: 3,
        unitPrice: 69.99,
        total: 209.97
      }
    ],
    pricing: {
      subtotal: 1594.85,
      proDiscount: 63.79, // 4% discount
      shipping: 45.00,
      tax: 111.14,
      total: 1687.20
    },
    shipping: {
      address: {
        street: '789 Industrial Way',
        city: 'Tampa',
        state: 'FL',
        zipCode: '33615'
      },
      method: 'Standard Ground (5-7 days)',
      estimatedDelivery: new Date('2024-10-30')
    },
    status: 'pending',
    paymentMethod: 'Net 30 Terms',
    createdAt: new Date('2024-10-21'),
    updatedAt: new Date('2024-10-21'),
    notes: 'Three-car garage - 650 sqft. Customer accepted quote via phone.'
  },
  {
    id: 'ORD-017',
    proId: 'PRO-009',
    proName: 'Apex Floor Coatings',
    projectId: 'QUOTE-044',
    items: [
      {
        productId: 'BC-002',
        productName: 'Industrial Floor Pro',
        sku: 'SC-BASE-002',
        quantity: 10,
        unitPrice: 95.99,
        total: 959.90
      },
      {
        productId: 'CF-002',
        productName: '1/4" Blend - Midnight',
        sku: 'SC-FLAKE-002',
        quantity: 22,
        unitPrice: 12.50,
        total: 275.00
      },
      {
        productId: 'TC-001',
        productName: 'Clear High-Performance Top Coat',
        sku: 'SC-TOP-001',
        quantity: 8,
        unitPrice: 119.99,
        total: 959.92
      },
      {
        productId: 'TOOL-004',
        productName: 'Notched Squeegee 24"',
        sku: 'SC-TOOL-004',
        quantity: 2,
        unitPrice: 28.00,
        total: 56.00
      }
    ],
    pricing: {
      subtotal: 2250.82,
      proDiscount: 90.03, // 4% discount
      shipping: 60.00,
      tax: 154.66,
      total: 2375.45
    },
    shipping: {
      address: {
        street: '890 Commerce Center',
        city: 'Lakeland',
        state: 'FL',
        zipCode: '33803'
      },
      method: 'Standard Ground (5-7 days)',
      estimatedDelivery: new Date('2024-10-28'),
      trackingNumber: 'TRK-1098765432'
    },
    status: 'delivered',
    paymentMethod: 'Net 30 Terms',
    createdAt: new Date('2024-10-12'),
    updatedAt: new Date('2024-10-20'),
    completedAt: new Date('2024-10-20'),
    notes: 'Commercial warehouse floor - 1,800 sqft. Job completed ahead of schedule.'
  },
  {
    id: 'ORD-018',
    proId: 'PRO-006',
    proName: 'Elite Epoxy Professionals',
    items: [
      {
        productId: 'BC-001',
        productName: 'Countertop FX Poxy Base Coat',
        sku: 'SC-BASE-001',
        quantity: 12,
        unitPrice: 89.99,
        total: 1079.88
      },
      {
        productId: 'MET-001',
        productName: 'Charcoal Metallic Epoxy',
        sku: 'SC-MET-001',
        quantity: 4,
        unitPrice: 149.99,
        total: 599.96
      },
      {
        productId: 'TC-001',
        productName: 'Clear High-Performance Top Coat',
        sku: 'SC-TOP-001',
        quantity: 10,
        unitPrice: 119.99,
        total: 1199.90
      },
      {
        productId: 'PR-001',
        productName: 'Concrete Bonding Primer',
        sku: 'SC-PRM-001',
        quantity: 6,
        unitPrice: 69.99,
        total: 419.94
      }
    ],
    pricing: {
      subtotal: 3299.68,
      proDiscount: 164.98, // 5% discount
      shipping: 75.00,
      tax: 227.28,
      total: 3436.98
    },
    shipping: {
      address: {
        street: '1234 Professional Plaza',
        city: 'Tampa',
        state: 'FL',
        zipCode: '33602'
      },
      method: 'Standard Ground (5-7 days)',
      estimatedDelivery: new Date('2024-10-29')
    },
    status: 'processing',
    paymentMethod: 'Net 30 Terms',
    createdAt: new Date('2024-10-21'),
    updatedAt: new Date('2024-10-21'),
    notes: 'High-end showroom with metallic accents. Premium project in downtown Tampa.'
  },
  {
    id: 'ORD-019',
    proId: 'PRO-010',
    proName: 'Crystal Clear Coatings',
    items: [
      {
        productId: 'BC-005',
        productName: 'Pool Deck Epoxy Base',
        sku: 'SC-BASE-005',
        quantity: 4,
        unitPrice: 99.99,
        total: 399.96
      },
      {
        productId: 'CF-008',
        productName: '1/4" Aqua Blue Decorative Flake',
        sku: 'SC-FLAKE-008',
        quantity: 10,
        unitPrice: 14.00,
        total: 140.00
      },
      {
        productId: 'TC-004',
        productName: 'Non-Slip Pool Deck Seal',
        sku: 'SC-TOP-004',
        quantity: 3,
        unitPrice: 139.99,
        total: 419.97
      }
    ],
    pricing: {
      subtotal: 959.93,
      proDiscount: 28.80, // 3% discount
      shipping: 38.00,
      tax: 69.69,
      total: 1038.82
    },
    shipping: {
      address: {
        street: '234 Beach Boulevard',
        city: 'Largo',
        state: 'FL',
        zipCode: '33770'
      },
      method: 'Standard Ground (5-7 days)',
      estimatedDelivery: new Date('2024-10-30'),
      trackingNumber: 'TRK-0987654321'
    },
    status: 'shipped',
    paymentMethod: 'Credit Card',
    createdAt: new Date('2024-10-18'),
    updatedAt: new Date('2024-10-21'),
    notes: 'Small pool deck repair - 180 sqft. Quick turnaround requested.'
  },
  {
    id: 'ORD-020',
    proId: 'PRO-012',
    proName: 'Platinum Surfaces',
    items: [
      {
        productId: 'BC-002',
        productName: 'Industrial Floor Pro',
        sku: 'SC-BASE-002',
        quantity: 8,
        unitPrice: 95.99,
        total: 767.92
      },
      {
        productId: 'CF-001',
        productName: '1/4" Blend - Granite',
        sku: 'SC-FLAKE-001',
        quantity: 20,
        unitPrice: 12.50,
        total: 250.00
      },
      {
        productId: 'TC-001',
        productName: 'Clear High-Performance Top Coat',
        sku: 'SC-TOP-001',
        quantity: 6,
        unitPrice: 119.99,
        total: 719.94
      },
      {
        productId: 'TOOL-005',
        productName: 'Mixing Paddle Set',
        sku: 'SC-TOOL-005',
        quantity: 1,
        unitPrice: 35.00,
        total: 35.00
      }
    ],
    pricing: {
      subtotal: 1772.86,
      proDiscount: 70.91, // 4% discount
      shipping: 50.00,
      tax: 125.84,
      total: 1877.79
    },
    shipping: {
      address: {
        street: '890 Executive Parkway',
        city: 'Tampa',
        state: 'FL',
        zipCode: '33606'
      },
      method: 'Standard Ground (5-7 days)',
      estimatedDelivery: new Date('2024-10-28')
    },
    status: 'processing',
    paymentMethod: 'Net 30 Terms',
    createdAt: new Date('2024-10-20'),
    updatedAt: new Date('2024-10-20'),
    notes: 'Commercial office lobby - 1,400 sqft. Professional grade finish required.'
  },
  {
    id: 'ORD-021',
    proId: 'PRO-002',
    proName: 'Bay Area Epoxy Experts',
    items: [
      {
        productId: 'BC-003',
        productName: 'Garage Floor Elite',
        sku: 'SC-BASE-003',
        quantity: 5,
        unitPrice: 79.99,
        total: 399.95
      },
      {
        productId: 'CF-004',
        productName: '1/4" Sandstone Decorative Flake',
        sku: 'SC-FLAKE-004',
        quantity: 12,
        unitPrice: 13.00,
        total: 156.00
      },
      {
        productId: 'TC-001',
        productName: 'Clear High-Performance Top Coat',
        sku: 'SC-TOP-001',
        quantity: 4,
        unitPrice: 119.99,
        total: 479.96
      }
    ],
    pricing: {
      subtotal: 1035.91,
      proDiscount: 31.08, // 3% discount
      shipping: 38.00,
      tax: 73.84,
      total: 1116.67
    },
    shipping: {
      address: {
        street: '2845 Industrial Parkway',
        city: 'Tampa',
        state: 'FL',
        zipCode: '33612'
      },
      method: 'Standard Ground (5-7 days)',
      estimatedDelivery: new Date('2024-10-31')
    },
    status: 'pending',
    paymentMethod: 'Credit Card',
    createdAt: new Date('2024-10-21'),
    updatedAt: new Date('2024-10-21'),
    notes: 'Residential garage - 380 sqft. Standard installation.'
  },
  {
    id: 'ORD-022',
    proId: 'PRO-004',
    proName: 'Premier Garage Floors',
    projectId: 'QUOTE-012',
    items: [
      {
        productId: 'BC-003',
        productName: 'Garage Floor Elite',
        sku: 'SC-BASE-003',
        quantity: 8,
        unitPrice: 79.99,
        total: 639.92
      },
      {
        productId: 'CF-001',
        productName: '1/4" Blend - Granite',
        sku: 'SC-FLAKE-001',
        quantity: 20,
        unitPrice: 12.50,
        total: 250.00
      },
      {
        productId: 'TC-001',
        productName: 'Clear High-Performance Top Coat',
        sku: 'SC-TOP-001',
        quantity: 6,
        unitPrice: 119.99,
        total: 719.94
      },
      {
        productId: 'PR-001',
        productName: 'Concrete Bonding Primer',
        sku: 'SC-PRM-001',
        quantity: 3,
        unitPrice: 69.99,
        total: 209.97
      }
    ],
    pricing: {
      subtotal: 1819.83,
      proDiscount: 72.79, // 4% discount
      shipping: 48.00,
      tax: 126.69,
      total: 1921.73
    },
    shipping: {
      address: {
        street: '1234 Brandon Blvd',
        city: 'Brandon',
        state: 'FL',
        zipCode: '33511'
      },
      method: 'Standard Ground (5-7 days)',
      estimatedDelivery: new Date('2024-10-29'),
      trackingNumber: 'TRK-9876543211'
    },
    status: 'delivered',
    paymentMethod: 'Net 30 Terms',
    createdAt: new Date('2024-10-14'),
    updatedAt: new Date('2024-10-22'),
    completedAt: new Date('2024-10-22'),
    notes: 'Large three-car garage - 720 sqft. Customer very satisfied with results.'
  }
];

// Helper functions
export const getOrderById = (id: string): Order | undefined => {
  return mockOrders.find(o => o.id === id);
};

export const getOrdersByPro = (proId: string): Order[] => {
  return mockOrders.filter(o => o.proId === proId);
};

export const getOrdersByStatus = (status: OrderStatus): Order[] => {
  return mockOrders.filter(o => o.status === status);
};

export const getPendingOrders = (): Order[] => {
  return mockOrders.filter(o => o.status === 'pending' || o.status === 'processing');
};

export const getRecentOrders = (limit: number = 10): Order[] => {
  return [...mockOrders]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit);
};

// Calculate total order value
export const calculateOrderTotal = (order: Order): number => {
  return order.pricing.total;
};

// Calculate total revenue from all orders
export const getTotalOrderRevenue = (): number => {
  return mockOrders.reduce((sum, order) => sum + order.pricing.total, 0);
};

// Validate order data integrity
export const validateOrderData = (): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  mockOrders.forEach(order => {
    // Validate pricing calculations
    const itemsTotal = order.items.reduce((sum, item) => sum + item.total, 0);
    const expectedSubtotal = parseFloat(itemsTotal.toFixed(2));
    const actualSubtotal = parseFloat(order.pricing.subtotal.toFixed(2));

    if (Math.abs(expectedSubtotal - actualSubtotal) > 0.10) {
      errors.push(`${order.id}: Subtotal mismatch. Expected ${expectedSubtotal}, got ${actualSubtotal}`);
    }

    // Validate total calculation
    const expectedTotal = order.pricing.subtotal - order.pricing.proDiscount + order.pricing.shipping + order.pricing.tax;
    const actualTotal = order.pricing.total;

    if (Math.abs(expectedTotal - actualTotal) > 0.10) {
      errors.push(`${order.id}: Total mismatch. Expected ${expectedTotal.toFixed(2)}, got ${actualTotal.toFixed(2)}`);
    }

    // Validate each line item total
    order.items.forEach(item => {
      const expectedItemTotal = item.quantity * item.unitPrice;
      if (Math.abs(expectedItemTotal - item.total) > 0.01) {
        errors.push(`${order.id}: Item ${item.productId} total mismatch`);
      }
    });
  });

  return {
    valid: errors.length === 0,
    errors
  };
};
