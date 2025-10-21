/**
 * Mock Quote Data
 * 50+ quotes with mixed statuses and types
 * All references validated against mockPros and mockZipCodeData
 */

import { Quote, QuoteStatus, QuoteType, ProjectType } from '../types/quote';

/**
 * Helper function to create dates relative to current date
 */
const daysAgo = (days: number): Date => {
  const date = new Date('2025-10-21'); // Current date from env
  date.setDate(date.getDate() - days);
  return date;
};

const daysFromNow = (days: number): Date => {
  const date = new Date('2025-10-21');
  date.setDate(date.getDate() + days);
  return date;
};

/**
 * Mock Quotes Dataset
 * Distribution:
 * - Requested: 15 (30%)
 * - Sent: 12 (24%)
 * - Accepted: 14 (28%)
 * - Declined: 6 (12%)
 * - Expired: 3 (6%)
 */
export const mockQuotes: Quote[] = [
  // REQUESTED QUOTES (15) - Customer-initiated, awaiting pro response
  {
    id: 'QUO-001',
    type: 'customer-initiated',
    status: 'requested',
    customer: {
      name: 'John Mitchell',
      email: 'john.mitchell@gmail.com',
      phone: '813-555-0123',
      address: {
        street: '4521 Bay Vista Drive',
        city: 'Tampa',
        state: 'FL',
        zipCode: '33610',
        lat: 27.9767, lng: -82.4370
      }
    },
    project: {
      type: 'garage-floor',
      squareFootage: 400,
      description: 'Two-car garage with oil stains and minor cracks. Need complete resurfacing with decorative flake finish.',
      timeline: 'within-2-weeks',
      preferredFinish: 'Granite Gray Flake'
    },
    matchedPros: [
      { id: 'PRO-001' } as any,
      { id: 'PRO-004' } as any,
      { id: 'PRO-007' } as any
    ],
    createdAt: daysAgo(2),
    updatedAt: daysAgo(2)
  },
  {
    id: 'QUO-002',
    type: 'customer-initiated',
    status: 'requested',
    customer: {
      name: 'Sarah Thompson',
      email: 'sarah.t@outlook.com',
      phone: '813-555-0456',
      address: {
        street: '892 Riverside Lane',
        city: 'Tampa',
        state: 'FL',
        zipCode: '33612',
        lat: 28.0275, lng: -82.4526
      }
    },
    project: {
      type: 'patio',
      squareFootage: 250,
      description: 'Covered patio area. Want natural stone appearance with UV protection.',
      timeline: 'within-month',
      preferredFinish: 'Desert Tan Broadcast'
    },
    matchedPros: [
      { id: 'PRO-002' } as any,
      { id: 'PRO-005' } as any,
      { id: 'PRO-010' } as any
    ],
    createdAt: daysAgo(1),
    updatedAt: daysAgo(1)
  },
  {
    id: 'QUO-003',
    type: 'customer-initiated',
    status: 'requested',
    customer: {
      name: 'Michael Rodriguez',
      email: 'm.rodriguez@yahoo.com',
      phone: '813-555-0789',
      address: {
        street: '2156 Palm Court',
        city: 'Brandon',
        state: 'FL',
        zipCode: '33511',
        lat: 27.9378, lng: -82.2859
      }
    },
    project: {
      type: 'basement-floor',
      squareFootage: 600,
      description: 'Basement finishing project. Want modern industrial look with metallic finish.',
      timeline: 'flexible',
      preferredFinish: 'Charcoal Metallic'
    },
    matchedPros: [
      { id: 'PRO-003' } as any,
      { id: 'PRO-007' } as any,
      { id: 'PRO-008' } as any
    ],
    createdAt: daysAgo(3),
    updatedAt: daysAgo(3)
  },
  {
    id: 'QUO-004',
    type: 'customer-initiated',
    status: 'requested',
    customer: {
      name: 'David Patterson',
      email: 'dpatterson@hotmail.com',
      phone: '727-555-0567',
      address: {
        street: '3421 Sunset Ridge',
        city: 'St. Petersburg',
        state: 'FL',
        zipCode: '33707',
        lat: 27.7676, lng: -82.6403
      }
    },
    project: {
      type: 'commercial-floor',
      squareFootage: 1200,
      description: 'Retail showroom. High traffic area needs professional polished concrete look.',
      timeline: 'urgent',
      preferredFinish: 'Polished Concrete Look'
    },
    matchedPros: [
      { id: 'PRO-001' } as any,
      { id: 'PRO-003' } as any,
      { id: 'PRO-006' } as any,
      { id: 'PRO-012' } as any
    ],
    createdAt: daysAgo(1),
    updatedAt: daysAgo(1)
  },
  {
    id: 'QUO-005',
    type: 'customer-initiated',
    status: 'requested',
    customer: {
      name: 'Jennifer Santos',
      email: 'jennifer.santos@gmail.com',
      phone: '813-555-0891',
      address: {
        street: '5678 Oak Street',
        city: 'Tampa',
        state: 'FL',
        zipCode: '33613',
        lat: 28.0731, lng: -82.4398
      }
    },
    project: {
      type: 'garage-floor',
      squareFootage: 550,
      description: 'Three-car garage, currently bare concrete. Want durable coating for heavy use.',
      timeline: 'within-month',
      preferredFinish: 'Midnight Black Flake'
    },
    matchedPros: [
      { id: 'PRO-001' } as any,
      { id: 'PRO-004' } as any,
      { id: 'PRO-007' } as any
    ],
    createdAt: daysAgo(4),
    updatedAt: daysAgo(4)
  },
  {
    id: 'QUO-006',
    type: 'customer-initiated',
    status: 'requested',
    customer: {
      name: 'Robert Chen',
      email: 'robert.chen@outlook.com',
      phone: '727-555-0234',
      address: {
        street: '9012 Beach Drive',
        city: 'Clearwater',
        state: 'FL',
        zipCode: '33764',
        lat: 27.9169, lng: -82.7831
      }
    },
    project: {
      type: 'pool-deck',
      squareFootage: 400,
      description: 'Pool deck resurfacing. Need slip-resistant finish that can handle chlorine.',
      timeline: 'within-2-weeks',
      preferredFinish: 'Aqua Blue Flake'
    },
    matchedPros: [
      { id: 'PRO-005' } as any,
      { id: 'PRO-010' } as any,
      { id: 'PRO-011' } as any
    ],
    createdAt: daysAgo(2),
    updatedAt: daysAgo(2)
  },
  {
    id: 'QUO-007',
    type: 'customer-initiated',
    status: 'requested',
    customer: {
      name: 'Amanda Wilson',
      email: 'amanda.w@yahoo.com',
      phone: '813-555-0345',
      address: {
        street: '7823 Highland Avenue',
        city: 'Tampa',
        state: 'FL',
        zipCode: '33615',
        lat: 28.0170, lng: -82.5177
      }
    },
    project: {
      type: 'basement-floor',
      squareFootage: 450,
      description: 'Finished basement needs epoxy coating. Moisture can be an issue.',
      timeline: 'flexible',
      preferredFinish: 'Silver Metallic'
    },
    matchedPros: [
      { id: 'PRO-003' } as any,
      { id: 'PRO-007' } as any,
      { id: 'PRO-008' } as any
    ],
    createdAt: daysAgo(5),
    updatedAt: daysAgo(5)
  },
  {
    id: 'QUO-008',
    type: 'customer-initiated',
    status: 'requested',
    customer: {
      name: 'Thomas Martinez',
      email: 'tmart@gmail.com',
      phone: '813-555-0678',
      address: {
        street: '3456 Commerce Way',
        city: 'Brandon',
        state: 'FL',
        zipCode: '33510',
        lat: 27.8825, lng: -82.2953
      }
    },
    project: {
      type: 'garage-floor',
      squareFootage: 480,
      description: 'Workshop garage, needs chemical-resistant coating for automotive work.',
      timeline: 'within-month',
      preferredFinish: 'Granite Blend'
    },
    matchedPros: [
      { id: 'PRO-001' } as any,
      { id: 'PRO-004' } as any
    ],
    createdAt: daysAgo(1),
    updatedAt: daysAgo(1)
  },
  {
    id: 'QUO-009',
    type: 'customer-initiated',
    status: 'requested',
    customer: {
      name: 'Lisa Anderson',
      email: 'lisa.anderson@hotmail.com',
      phone: '727-555-0456',
      address: {
        street: '8901 Pine Street',
        city: 'Largo',
        state: 'FL',
        zipCode: '33770',
        lat: 27.9095, lng: -82.7873
      }
    },
    project: {
      type: 'patio',
      squareFootage: 320,
      description: 'Outdoor patio with partial sun exposure. Want decorative finish.',
      timeline: 'within-month',
      preferredFinish: 'Sedona Blend'
    },
    matchedPros: [
      { id: 'PRO-005' } as any,
      { id: 'PRO-010' } as any
    ],
    createdAt: daysAgo(3),
    updatedAt: daysAgo(3)
  },
  {
    id: 'QUO-010',
    type: 'customer-initiated',
    status: 'requested',
    customer: {
      name: 'Kevin Brown',
      email: 'kbrown@gmail.com',
      phone: '813-555-0789',
      address: {
        street: '6543 Executive Drive',
        city: 'Tampa',
        state: 'FL',
        zipCode: '33606',
        lat: 27.9419, lng: -82.5133
      }
    },
    project: {
      type: 'commercial-floor',
      squareFootage: 800,
      description: 'Office lobby area. Need professional appearance with low maintenance.',
      timeline: 'flexible',
      preferredFinish: 'Polished Gray'
    },
    matchedPros: [
      { id: 'PRO-006' } as any,
      { id: 'PRO-012' } as any
    ],
    createdAt: daysAgo(2),
    updatedAt: daysAgo(2)
  },
  {
    id: 'QUO-011',
    type: 'customer-initiated',
    status: 'requested',
    customer: {
      name: 'Patricia Lee',
      email: 'patricia.lee@yahoo.com',
      phone: '727-555-0890',
      address: {
        street: '4567 Sunset Boulevard',
        city: 'Dunedin',
        state: 'FL',
        zipCode: '34698',
        lat: 28.0200, lng: -82.7718
      }
    },
    project: {
      type: 'pool-deck',
      squareFootage: 280,
      description: 'Small pool deck. Want coastal colors with slip resistance.',
      timeline: 'within-2-weeks',
      preferredFinish: 'Blue Ridge Blend'
    },
    matchedPros: [
      { id: 'PRO-010' } as any,
      { id: 'PRO-011' } as any
    ],
    createdAt: daysAgo(1),
    updatedAt: daysAgo(1)
  },
  {
    id: 'QUO-012',
    type: 'customer-initiated',
    status: 'requested',
    customer: {
      name: 'Daniel White',
      email: 'dwhite@outlook.com',
      phone: '813-555-0123',
      address: {
        street: '7890 Lake View Drive',
        city: 'Lutz',
        state: 'FL',
        zipCode: '33549',
        lat: 28.1539, lng: -82.4612
      }
    },
    project: {
      type: 'basement-floor',
      squareFootage: 700,
      description: 'Large basement, want upscale metallic finish for entertainment area.',
      timeline: 'flexible',
      preferredFinish: 'Copper Metallic'
    },
    matchedPros: [
      { id: 'PRO-003' } as any,
      { id: 'PRO-008' } as any
    ],
    createdAt: daysAgo(4),
    updatedAt: daysAgo(4)
  },
  {
    id: 'QUO-013',
    type: 'customer-initiated',
    status: 'requested',
    customer: {
      name: 'Michelle Garcia',
      email: 'mgarcia@gmail.com',
      phone: '813-555-0234',
      address: {
        street: '2345 Park Avenue',
        city: 'Tampa',
        state: 'FL',
        zipCode: '33602',
        lat: 27.9506, lng: -82.4572
      }
    },
    project: {
      type: 'garage-floor',
      squareFootage: 420,
      description: 'Attached two-car garage. Want clean, modern look.',
      timeline: 'within-month',
      preferredFinish: 'Granite Gray'
    },
    matchedPros: [
      { id: 'PRO-001' } as any,
      { id: 'PRO-006' } as any
    ],
    createdAt: daysAgo(3),
    updatedAt: daysAgo(3)
  },
  {
    id: 'QUO-014',
    type: 'customer-initiated',
    status: 'requested',
    customer: {
      name: 'Christopher Davis',
      email: 'chris.davis@hotmail.com',
      phone: '727-555-0345',
      address: {
        street: '5678 Marina Way',
        city: 'Clearwater',
        state: 'FL',
        zipCode: '33759',
        lat: 27.9797, lng: -82.7870
      }
    },
    project: {
      type: 'patio',
      squareFootage: 180,
      description: 'Small covered patio. Simple, durable finish needed.',
      timeline: 'within-2-weeks',
      preferredFinish: 'Sandstone'
    },
    matchedPros: [
      { id: 'PRO-003' } as any,
      { id: 'PRO-011' } as any
    ],
    createdAt: daysAgo(2),
    updatedAt: daysAgo(2)
  },
  {
    id: 'QUO-015',
    type: 'customer-initiated',
    status: 'requested',
    customer: {
      name: 'Rebecca Johnson',
      email: 'rebecca.j@yahoo.com',
      phone: '863-555-0456',
      address: {
        street: '8901 Commerce Center Drive',
        city: 'Lakeland',
        state: 'FL',
        zipCode: '33803',
        lat: 28.0656, lng: -81.9292
      }
    },
    project: {
      type: 'commercial-floor',
      squareFootage: 1500,
      description: 'Warehouse floor. Heavy forklift traffic, need industrial-grade coating.',
      timeline: 'urgent',
      preferredFinish: 'Industrial Gray'
    },
    matchedPros: [
      { id: 'PRO-006' } as any,
      { id: 'PRO-009' } as any
    ],
    createdAt: daysAgo(1),
    updatedAt: daysAgo(1)
  },

  // SENT QUOTES (12) - Pro-created quotes sent to customers
  {
    id: 'QUO-016',
    type: 'pro-created',
    status: 'sent',
    proId: 'PRO-001',
    proName: 'Tampa Premium Coatings',
    customer: {
      name: 'Mark Thompson',
      email: 'mark.t@gmail.com',
      phone: '813-555-0567',
      address: {
        street: '3456 Bay Shore Drive',
        city: 'Tampa',
        state: 'FL',
        zipCode: '33611',
        lat: 27.9128, lng: -82.5053
      }
    },
    project: {
      type: 'garage-floor',
      squareFootage: 380,
      description: 'Standard two-car garage coating with flake finish.',
      timeline: 'within-month'
    },
    pricing: {
      materials: 1580.00,
      labor: 1330.00,
      total: 3113.70,
      calculatedRate: 8.19,
      adjustments: [
        { reason: 'Standard job discount', type: 'percentage', value: -5 }
      ]
    },
    createdAt: daysAgo(7),
    updatedAt: daysAgo(7),
    expiresAt: daysFromNow(7)
  },
  {
    id: 'QUO-017',
    type: 'pro-created',
    status: 'sent',
    proId: 'PRO-002',
    proName: 'Bay Area Epoxy Experts',
    customer: {
      name: 'Susan Miller',
      email: 'susan.miller@outlook.com',
      phone: '813-555-0678',
      address: {
        street: '7890 Elm Street',
        city: 'Tampa',
        state: 'FL',
        zipCode: '33614',
        lat: 28.0078, lng: -82.5095
      }
    },
    project: {
      type: 'patio',
      squareFootage: 200,
      description: 'Covered patio with UV-resistant coating.',
      timeline: 'within-2-weeks'
    },
    pricing: {
      materials: 980.00,
      labor: 800.00,
      total: 1902.20,
      calculatedRate: 9.51,
      adjustments: []
    },
    createdAt: daysAgo(5),
    updatedAt: daysAgo(5),
    expiresAt: daysFromNow(9)
  },
  {
    id: 'QUO-018',
    type: 'pro-created',
    status: 'sent',
    proId: 'PRO-003',
    proName: 'Coastal Floors Pro',
    customer: {
      name: 'James Robinson',
      email: 'james.rob@yahoo.com',
      phone: '727-555-0789',
      address: {
        street: '4567 Ocean Boulevard',
        city: 'Clearwater',
        state: 'FL',
        zipCode: '33760',
        lat: 27.9786, lng: -82.8209
      }
    },
    project: {
      type: 'basement-floor',
      squareFootage: 520,
      description: 'Basement with moisture barrier primer and metallic finish.',
      timeline: 'flexible'
    },
    pricing: {
      materials: 2840.00,
      labor: 2080.00,
      total: 5258.40,
      calculatedRate: 10.11,
      adjustments: [
        { reason: 'Moisture barrier required', type: 'fixed', value: 350 }
      ]
    },
    createdAt: daysAgo(8),
    updatedAt: daysAgo(8),
    expiresAt: daysFromNow(6)
  },
  {
    id: 'QUO-019',
    type: 'pro-created',
    status: 'sent',
    proId: 'PRO-005',
    proName: 'Sunshine Coatings',
    customer: {
      name: 'Nancy Wilson',
      email: 'nancy.wilson@gmail.com',
      phone: '727-555-0890',
      address: {
        street: '8901 Coastal Highway',
        city: 'St. Petersburg',
        state: 'FL',
        zipCode: '33701',
        lat: 27.7706, lng: -82.6394
      }
    },
    project: {
      type: 'pool-deck',
      squareFootage: 300,
      description: 'Pool deck with slip-resistant coating and chlorine resistance.',
      timeline: 'within-month'
    },
    pricing: {
      materials: 1680.00,
      labor: 1350.00,
      total: 3241.20,
      calculatedRate: 10.80,
      adjustments: []
    },
    createdAt: daysAgo(6),
    updatedAt: daysAgo(6),
    expiresAt: daysFromNow(8)
  },
  {
    id: 'QUO-020',
    type: 'pro-created',
    status: 'sent',
    proId: 'PRO-006',
    proName: 'Elite Epoxy Professionals',
    customer: {
      name: 'Richard Martinez',
      email: 'richard.m@outlook.com',
      phone: '813-555-0901',
      address: {
        street: '1234 Business Park Drive',
        city: 'Tampa',
        state: 'FL',
        zipCode: '33609',
        lat: 27.9428, lng: -82.4970
      }
    },
    project: {
      type: 'commercial-floor',
      squareFootage: 2000,
      description: 'Commercial showroom, high-end polished finish.',
      timeline: 'urgent'
    },
    pricing: {
      materials: 6800.00,
      labor: 10000.00,
      total: 17956.00,
      calculatedRate: 8.98,
      adjustments: [
        { reason: 'Weekend installation premium', type: 'percentage', value: 10 }
      ]
    },
    createdAt: daysAgo(4),
    updatedAt: daysAgo(4),
    expiresAt: daysFromNow(10)
  },
  {
    id: 'QUO-021',
    type: 'pro-created',
    status: 'sent',
    proId: 'PRO-004',
    proName: 'Premier Garage Floors',
    customer: {
      name: 'Barbara Taylor',
      email: 'btaylor@gmail.com',
      phone: '813-555-0112',
      address: {
        street: '5678 Maple Avenue',
        city: 'Brandon',
        state: 'FL',
        zipCode: '33578',
        lat: 27.8658, lng: -82.3264
      }
    },
    project: {
      type: 'garage-floor',
      squareFootage: 460,
      description: 'Three-car garage with standard coating.',
      timeline: 'within-month'
    },
    pricing: {
      materials: 1720.00,
      labor: 1380.00,
      total: 3317.00,
      calculatedRate: 7.21,
      adjustments: []
    },
    createdAt: daysAgo(9),
    updatedAt: daysAgo(9),
    expiresAt: daysFromNow(5)
  },
  {
    id: 'QUO-022',
    type: 'pro-created',
    status: 'sent',
    proId: 'PRO-007',
    proName: 'Precision Floor Coatings',
    customer: {
      name: 'William Anderson',
      email: 'wanderson@yahoo.com',
      phone: '813-555-0223',
      address: {
        street: '7890 Pine Ridge Road',
        city: 'Tampa',
        state: 'FL',
        zipCode: '33618',
        lat: 28.0678, lng: -82.5298
      }
    },
    project: {
      type: 'basement-floor',
      squareFootage: 480,
      description: 'Basement finishing with standard epoxy coating.',
      timeline: 'flexible'
    },
    pricing: {
      materials: 1920.00,
      labor: 1680.00,
      total: 3846.00,
      calculatedRate: 8.01,
      adjustments: []
    },
    createdAt: daysAgo(7),
    updatedAt: daysAgo(7),
    expiresAt: daysFromNow(7)
  },
  {
    id: 'QUO-023',
    type: 'pro-created',
    status: 'sent',
    proId: 'PRO-008',
    proName: 'Modern Surface Solutions',
    customer: {
      name: 'Elizabeth Thomas',
      email: 'elizabeth.thomas@hotmail.com',
      phone: '813-555-0334',
      address: {
        street: '2345 Highland Drive',
        city: 'Lutz',
        state: 'FL',
        zipCode: '33558',
        lat: 28.1428, lng: -82.4526
      }
    },
    project: {
      type: 'basement-floor',
      squareFootage: 550,
      description: 'Modern metallic finish for entertainment room.',
      timeline: 'within-month'
    },
    pricing: {
      materials: 2640.00,
      labor: 1980.00,
      total: 4944.60,
      calculatedRate: 8.99,
      adjustments: []
    },
    createdAt: daysAgo(5),
    updatedAt: daysAgo(5),
    expiresAt: daysFromNow(9)
  },
  {
    id: 'QUO-024',
    type: 'pro-created',
    status: 'sent',
    proId: 'PRO-010',
    proName: 'Crystal Clear Coatings',
    customer: {
      name: 'Joseph Harris',
      email: 'joe.harris@gmail.com',
      phone: '727-555-0445',
      address: {
        street: '8901 Bayside Drive',
        city: 'Largo',
        state: 'FL',
        zipCode: '33771',
        lat: 27.8886, lng: -82.7548
      }
    },
    project: {
      type: 'patio',
      squareFootage: 280,
      description: 'Outdoor patio with decorative flake finish.',
      timeline: 'within-2-weeks'
    },
    pricing: {
      materials: 1260.00,
      labor: 1120.00,
      total: 2546.80,
      calculatedRate: 9.10,
      adjustments: []
    },
    createdAt: daysAgo(6),
    updatedAt: daysAgo(6),
    expiresAt: daysFromNow(8)
  },
  {
    id: 'QUO-025',
    type: 'pro-created',
    status: 'sent',
    proId: 'PRO-009',
    proName: 'Apex Floor Coatings',
    customer: {
      name: 'Margaret Clark',
      email: 'margaret.clark@outlook.com',
      phone: '863-555-0556',
      address: {
        street: '3456 Industrial Way',
        city: 'Lakeland',
        state: 'FL',
        zipCode: '33801',
        lat: 28.0395, lng: -81.9498
      }
    },
    project: {
      type: 'commercial-floor',
      squareFootage: 1800,
      description: 'Warehouse floor with industrial-grade coating.',
      timeline: 'urgent'
    },
    pricing: {
      materials: 5400.00,
      labor: 7200.00,
      total: 13484.00,
      calculatedRate: 7.49,
      adjustments: []
    },
    createdAt: daysAgo(3),
    updatedAt: daysAgo(3),
    expiresAt: daysFromNow(11)
  },
  {
    id: 'QUO-026',
    type: 'pro-created',
    status: 'sent',
    proId: 'PRO-011',
    proName: 'Gulf Coast Epoxy',
    customer: {
      name: 'Charles Lewis',
      email: 'charles.lewis@yahoo.com',
      phone: '727-555-0667',
      address: {
        street: '6789 Coastal Road',
        city: 'Dunedin',
        state: 'FL',
        zipCode: '34698',
        lat: 28.0200, lng: -82.7718
      }
    },
    project: {
      type: 'pool-deck',
      squareFootage: 320,
      description: 'Pool deck with coastal-themed finish.',
      timeline: 'within-month'
    },
    pricing: {
      materials: 1760.00,
      labor: 1440.00,
      total: 3422.00,
      calculatedRate: 10.69,
      adjustments: []
    },
    createdAt: daysAgo(8),
    updatedAt: daysAgo(8),
    expiresAt: daysFromNow(6)
  },
  {
    id: 'QUO-027',
    type: 'pro-created',
    status: 'sent',
    proId: 'PRO-012',
    proName: 'Platinum Surfaces',
    customer: {
      name: 'Dorothy Walker',
      email: 'dorothy.w@gmail.com',
      phone: '813-555-0778',
      address: {
        street: '9012 Executive Plaza',
        city: 'Tampa',
        state: 'FL',
        zipCode: '33602',
        lat: 27.9506, lng: -82.4572
      }
    },
    project: {
      type: 'commercial-floor',
      squareFootage: 950,
      description: 'High-end office space with showroom-quality finish.',
      timeline: 'flexible'
    },
    pricing: {
      materials: 3800.00,
      labor: 5700.00,
      total: 10155.00,
      calculatedRate: 10.69,
      adjustments: [
        { reason: 'Premium materials upgrade', type: 'fixed', value: 500 }
      ]
    },
    createdAt: daysAgo(4),
    updatedAt: daysAgo(4),
    expiresAt: daysFromNow(10)
  },

  // ACCEPTED QUOTES (14) - Customers have accepted and jobs are proceeding
  {
    id: 'QUO-028',
    type: 'pro-created',
    status: 'accepted',
    proId: 'PRO-001',
    proName: 'Tampa Premium Coatings',
    customer: {
      name: 'Sandra Allen',
      email: 'sandra.allen@gmail.com',
      phone: '813-555-0889',
      address: {
        street: '1234 Oak Park Drive',
        city: 'Tampa',
        state: 'FL',
        zipCode: '33604',
        lat: 28.0253, lng: -82.4209
      }
    },
    project: {
      type: 'garage-floor',
      squareFootage: 410,
      description: 'Two-car garage with granite flake finish.',
      timeline: 'within-2-weeks'
    },
    pricing: {
      materials: 1640.00,
      labor: 1435.00,
      total: 3288.75,
      calculatedRate: 8.02,
      adjustments: []
    },
    createdAt: daysAgo(15),
    updatedAt: daysAgo(10),
    expiresAt: daysFromNow(5)
  },
  {
    id: 'QUO-029',
    type: 'pro-created',
    status: 'accepted',
    proId: 'PRO-002',
    proName: 'Bay Area Epoxy Experts',
    customer: {
      name: 'Kenneth Young',
      email: 'kenneth.young@outlook.com',
      phone: '813-555-0990',
      address: {
        street: '5678 Riverside Avenue',
        city: 'Tampa',
        state: 'FL',
        zipCode: '33605',
        lat: 27.9614, lng: -82.4081
      }
    },
    project: {
      type: 'patio',
      squareFootage: 240,
      description: 'Covered patio with desert tan finish.',
      timeline: 'within-month'
    },
    pricing: {
      materials: 1104.00,
      labor: 960.00,
      total: 2206.80,
      calculatedRate: 9.19,
      adjustments: []
    },
    createdAt: daysAgo(20),
    updatedAt: daysAgo(12),
    expiresAt: daysFromNow(8)
  },
  {
    id: 'QUO-030',
    type: 'pro-created',
    status: 'accepted',
    proId: 'PRO-003',
    proName: 'Coastal Floors Pro',
    customer: {
      name: 'Donna King',
      email: 'donna.king@yahoo.com',
      phone: '727-555-0101',
      address: {
        street: '7890 Marina View',
        city: 'Clearwater',
        state: 'FL',
        zipCode: '33755',
        lat: 27.9658, lng: -82.7331
      }
    },
    project: {
      type: 'basement-floor',
      squareFootage: 580,
      description: 'Basement with charcoal metallic finish.',
      timeline: 'flexible'
    },
    pricing: {
      materials: 2900.00,
      labor: 2320.00,
      total: 5584.80,
      calculatedRate: 9.63,
      adjustments: []
    },
    createdAt: daysAgo(25),
    updatedAt: daysAgo(18),
    expiresAt: daysFromNow(4)
  },
  {
    id: 'QUO-031',
    type: 'pro-created',
    status: 'accepted',
    proId: 'PRO-004',
    proName: 'Premier Garage Floors',
    customer: {
      name: 'Steven Wright',
      email: 'steven.wright@gmail.com',
      phone: '813-555-0212',
      address: {
        street: '2345 Brandon Boulevard',
        city: 'Brandon',
        state: 'FL',
        zipCode: '33511',
        lat: 27.9378, lng: -82.2859
      }
    },
    project: {
      type: 'garage-floor',
      squareFootage: 390,
      description: 'Standard garage coating with flake blend.',
      timeline: 'within-month'
    },
    pricing: {
      materials: 1482.00,
      labor: 1248.00,
      total: 2918.10,
      calculatedRate: 7.48,
      adjustments: []
    },
    createdAt: daysAgo(18),
    updatedAt: daysAgo(14),
    expiresAt: daysFromNow(6)
  },
  {
    id: 'QUO-032',
    type: 'pro-created',
    status: 'accepted',
    proId: 'PRO-005',
    proName: 'Sunshine Coatings',
    customer: {
      name: 'Carol Scott',
      email: 'carol.scott@hotmail.com',
      phone: '727-555-0323',
      address: {
        street: '8901 Harbor Drive',
        city: 'St. Petersburg',
        state: 'FL',
        zipCode: '33703',
        lat: 27.8167, lng: -82.6403
      }
    },
    project: {
      type: 'pool-deck',
      squareFootage: 360,
      description: 'Pool deck with aqua blue flake finish.',
      timeline: 'within-2-weeks'
    },
    pricing: {
      materials: 1980.00,
      labor: 1620.00,
      total: 3844.20,
      calculatedRate: 10.68,
      adjustments: []
    },
    createdAt: daysAgo(22),
    updatedAt: daysAgo(15),
    expiresAt: daysFromNow(7)
  },
  {
    id: 'QUO-033',
    type: 'pro-created',
    status: 'accepted',
    proId: 'PRO-006',
    proName: 'Elite Epoxy Professionals',
    customer: {
      name: 'Brian Green',
      email: 'brian.green@outlook.com',
      phone: '813-555-0434',
      address: {
        street: '3456 Commerce Drive',
        city: 'Tampa',
        state: 'FL',
        zipCode: '33610',
        lat: 27.9767, lng: -82.4370
      }
    },
    project: {
      type: 'commercial-floor',
      squareFootage: 1600,
      description: 'Commercial showroom with industrial coating.',
      timeline: 'urgent'
    },
    pricing: {
      materials: 5600.00,
      labor: 8000.00,
      total: 14544.00,
      calculatedRate: 9.09,
      adjustments: []
    },
    createdAt: daysAgo(30),
    updatedAt: daysAgo(25),
    expiresAt: daysFromNow(5)
  },
  {
    id: 'QUO-034',
    type: 'pro-created',
    status: 'accepted',
    proId: 'PRO-007',
    proName: 'Precision Floor Coatings',
    customer: {
      name: 'Ruth Baker',
      email: 'ruth.baker@yahoo.com',
      phone: '813-555-0545',
      address: {
        street: '6789 University Boulevard',
        city: 'Tampa',
        state: 'FL',
        zipCode: '33617',
        lat: 28.0739, lng: -82.4026
      }
    },
    project: {
      type: 'basement-floor',
      squareFootage: 440,
      description: 'Basement with standard epoxy coating.',
      timeline: 'flexible'
    },
    pricing: {
      materials: 1760.00,
      labor: 1540.00,
      total: 3531.00,
      calculatedRate: 8.03,
      adjustments: []
    },
    createdAt: daysAgo(28),
    updatedAt: daysAgo(20),
    expiresAt: daysFromNow(8)
  },
  {
    id: 'QUO-035',
    type: 'pro-created',
    status: 'accepted',
    proId: 'PRO-008',
    proName: 'Modern Surface Solutions',
    customer: {
      name: 'Frank Adams',
      email: 'frank.adams@gmail.com',
      phone: '813-555-0656',
      address: {
        street: '9012 Country Club Road',
        city: 'Lutz',
        state: 'FL',
        zipCode: '33549',
        lat: 28.1539, lng: -82.4612
      }
    },
    project: {
      type: 'basement-floor',
      squareFootage: 620,
      description: 'Large basement with silver metallic finish.',
      timeline: 'within-month'
    },
    pricing: {
      materials: 2976.00,
      labor: 2232.00,
      total: 5572.56,
      calculatedRate: 8.99,
      adjustments: []
    },
    createdAt: daysAgo(24),
    updatedAt: daysAgo(17),
    expiresAt: daysFromNow(11)
  },
  {
    id: 'QUO-036',
    type: 'pro-created',
    status: 'accepted',
    proId: 'PRO-009',
    proName: 'Apex Floor Coatings',
    customer: {
      name: 'Betty Nelson',
      email: 'betty.nelson@hotmail.com',
      phone: '863-555-0767',
      address: {
        street: '4567 Lakeside Drive',
        city: 'Lakeland',
        state: 'FL',
        zipCode: '33813',
        lat: 28.1106, lng: -81.9681
      }
    },
    project: {
      type: 'commercial-floor',
      squareFootage: 2200,
      description: 'Large warehouse with industrial-grade coating.',
      timeline: 'urgent'
    },
    pricing: {
      materials: 6600.00,
      labor: 8800.00,
      total: 16476.00,
      calculatedRate: 7.49,
      adjustments: []
    },
    createdAt: daysAgo(35),
    updatedAt: daysAgo(28),
    expiresAt: daysFromNow(6)
  },
  {
    id: 'QUO-037',
    type: 'pro-created',
    status: 'accepted',
    proId: 'PRO-010',
    proName: 'Crystal Clear Coatings',
    customer: {
      name: 'Ralph Carter',
      email: 'ralph.carter@outlook.com',
      phone: '727-555-0878',
      address: {
        street: '7890 Sunset Lane',
        city: 'Largo',
        state: 'FL',
        zipCode: '33770',
        lat: 27.9095, lng: -82.7873
      }
    },
    project: {
      type: 'patio',
      squareFootage: 300,
      description: 'Large patio with decorative finish.',
      timeline: 'within-month'
    },
    pricing: {
      materials: 1380.00,
      labor: 1200.00,
      total: 2760.60,
      calculatedRate: 9.20,
      adjustments: []
    },
    createdAt: daysAgo(26),
    updatedAt: daysAgo(19),
    expiresAt: daysFromNow(9)
  },
  {
    id: 'QUO-038',
    type: 'pro-created',
    status: 'accepted',
    proId: 'PRO-011',
    proName: 'Gulf Coast Epoxy',
    customer: {
      name: 'Judy Mitchell',
      email: 'judy.mitchell@yahoo.com',
      phone: '727-555-0989',
      address: {
        street: '1234 Beach Way',
        city: 'Palm Harbor',
        state: 'FL',
        zipCode: '34683',
        lat: 28.0781, lng: -82.7623
      }
    },
    project: {
      type: 'pool-deck',
      squareFootage: 340,
      description: 'Pool deck with coastal blue finish.',
      timeline: 'within-2-weeks'
    },
    pricing: {
      materials: 1870.00,
      labor: 1530.00,
      total: 3638.00,
      calculatedRate: 10.70,
      adjustments: []
    },
    createdAt: daysAgo(21),
    updatedAt: daysAgo(16),
    expiresAt: daysFromNow(12)
  },
  {
    id: 'QUO-039',
    type: 'pro-created',
    status: 'accepted',
    proId: 'PRO-012',
    proName: 'Platinum Surfaces',
    customer: {
      name: 'Eugene Perez',
      email: 'eugene.perez@gmail.com',
      phone: '813-555-0190',
      address: {
        street: '5678 Downtown Plaza',
        city: 'Tampa',
        state: 'FL',
        zipCode: '33602',
        lat: 27.9506, lng: -82.4572
      }
    },
    project: {
      type: 'commercial-floor',
      squareFootage: 1100,
      description: 'Upscale retail space with showroom finish.',
      timeline: 'flexible'
    },
    pricing: {
      materials: 4400.00,
      labor: 6600.00,
      total: 11770.00,
      calculatedRate: 10.70,
      adjustments: []
    },
    createdAt: daysAgo(32),
    updatedAt: daysAgo(24),
    expiresAt: daysFromNow(10)
  },
  {
    id: 'QUO-040',
    type: 'pro-created',
    status: 'accepted',
    proId: 'PRO-001',
    proName: 'Tampa Premium Coatings',
    customer: {
      name: 'Marie Roberts',
      email: 'marie.roberts@hotmail.com',
      phone: '813-555-0201',
      address: {
        street: '8901 Palm Drive',
        city: 'Tampa',
        state: 'FL',
        zipCode: '33612',
        lat: 28.0275, lng: -82.4526
      }
    },
    project: {
      type: 'garage-floor',
      squareFootage: 440,
      description: 'Three-car garage with midnight black flake.',
      timeline: 'within-month'
    },
    pricing: {
      materials: 1760.00,
      labor: 1540.00,
      total: 3531.00,
      calculatedRate: 8.03,
      adjustments: []
    },
    createdAt: daysAgo(19),
    updatedAt: daysAgo(13),
    expiresAt: daysFromNow(15)
  },
  {
    id: 'QUO-041',
    type: 'pro-created',
    status: 'accepted',
    proId: 'PRO-003',
    proName: 'Coastal Floors Pro',
    customer: {
      name: 'Arthur Turner',
      email: 'arthur.turner@outlook.com',
      phone: '727-555-0312',
      address: {
        street: '2345 Gulf Boulevard',
        city: 'Clearwater',
        state: 'FL',
        zipCode: '33756',
        lat: 27.9947, lng: -82.7509
      }
    },
    project: {
      type: 'basement-floor',
      squareFootage: 500,
      description: 'Basement with copper metallic finish.',
      timeline: 'flexible'
    },
    pricing: {
      materials: 2750.00,
      labor: 2000.00,
      total: 5082.50,
      calculatedRate: 10.17,
      adjustments: []
    },
    createdAt: daysAgo(27),
    updatedAt: daysAgo(21),
    expiresAt: daysFromNow(13)
  },

  // DECLINED QUOTES (6) - Customers declined or chose another contractor
  {
    id: 'QUO-042',
    type: 'pro-created',
    status: 'declined',
    proId: 'PRO-004',
    proName: 'Premier Garage Floors',
    customer: {
      name: 'Gregory Phillips',
      email: 'gregory.phillips@gmail.com',
      phone: '813-555-0423',
      address: {
        street: '6789 Valley Road',
        city: 'Brandon',
        state: 'FL',
        zipCode: '33569',
        lat: 27.8270, lng: -82.2981
      }
    },
    project: {
      type: 'garage-floor',
      squareFootage: 450,
      description: 'Two-car garage coating.',
      timeline: 'within-month'
    },
    pricing: {
      materials: 1800.00,
      labor: 1575.00,
      total: 3610.13,
      calculatedRate: 8.02,
      adjustments: []
    },
    createdAt: daysAgo(40),
    updatedAt: daysAgo(35),
    expiresAt: daysAgo(26)
  },
  {
    id: 'QUO-043',
    type: 'pro-created',
    status: 'declined',
    proId: 'PRO-007',
    proName: 'Precision Floor Coatings',
    customer: {
      name: 'Virginia Campbell',
      email: 'virginia.campbell@yahoo.com',
      phone: '813-555-0534',
      address: {
        street: '9012 Forest Lane',
        city: 'Tampa',
        state: 'FL',
        zipCode: '33618',
        lat: 28.0678, lng: -82.5298
      }
    },
    project: {
      type: 'basement-floor',
      squareFootage: 420,
      description: 'Basement epoxy coating.',
      timeline: 'flexible'
    },
    pricing: {
      materials: 1680.00,
      labor: 1470.00,
      total: 3370.50,
      calculatedRate: 8.03,
      adjustments: []
    },
    createdAt: daysAgo(45),
    updatedAt: daysAgo(38),
    expiresAt: daysAgo(31)
  },
  {
    id: 'QUO-044',
    type: 'pro-created',
    status: 'declined',
    proId: 'PRO-010',
    proName: 'Crystal Clear Coatings',
    customer: {
      name: 'Catherine Parker',
      email: 'catherine.parker@hotmail.com',
      phone: '727-555-0645',
      address: {
        street: '3456 Shore Drive',
        city: 'Largo',
        state: 'FL',
        zipCode: '33771',
        lat: 27.8886, lng: -82.7548
      }
    },
    project: {
      type: 'patio',
      squareFootage: 220,
      description: 'Small patio coating.',
      timeline: 'within-month'
    },
    pricing: {
      materials: 990.00,
      labor: 880.00,
      total: 2000.30,
      calculatedRate: 9.09,
      adjustments: []
    },
    createdAt: daysAgo(38),
    updatedAt: daysAgo(33),
    expiresAt: daysAgo(24)
  },
  {
    id: 'QUO-045',
    type: 'pro-created',
    status: 'declined',
    proId: 'PRO-002',
    proName: 'Bay Area Epoxy Experts',
    customer: {
      name: 'Dennis Evans',
      email: 'dennis.evans@outlook.com',
      phone: '813-555-0756',
      address: {
        street: '7890 Oak Hill Drive',
        city: 'Tampa',
        state: 'FL',
        zipCode: '33603',
        lat: 28.0078, lng: -82.4531
      }
    },
    project: {
      type: 'patio',
      squareFootage: 260,
      description: 'Covered patio coating.',
      timeline: 'within-2-weeks'
    },
    pricing: {
      materials: 1170.00,
      labor: 1040.00,
      total: 2364.70,
      calculatedRate: 9.10,
      adjustments: []
    },
    createdAt: daysAgo(42),
    updatedAt: daysAgo(36),
    expiresAt: daysAgo(28)
  },
  {
    id: 'QUO-046',
    type: 'pro-created',
    status: 'declined',
    proId: 'PRO-008',
    proName: 'Modern Surface Solutions',
    customer: {
      name: 'Martha Edwards',
      email: 'martha.edwards@gmail.com',
      phone: '813-555-0867',
      address: {
        street: '4567 Heritage Boulevard',
        city: 'Lutz',
        state: 'FL',
        zipCode: '33558',
        lat: 28.1428, lng: -82.4526
      }
    },
    project: {
      type: 'basement-floor',
      squareFootage: 480,
      description: 'Basement with metallic finish.',
      timeline: 'flexible'
    },
    pricing: {
      materials: 2400.00,
      labor: 1920.00,
      total: 4622.40,
      calculatedRate: 9.63,
      adjustments: []
    },
    createdAt: daysAgo(50),
    updatedAt: daysAgo(44),
    expiresAt: daysAgo(36)
  },
  {
    id: 'QUO-047',
    type: 'pro-created',
    status: 'declined',
    proId: 'PRO-011',
    proName: 'Gulf Coast Epoxy',
    customer: {
      name: 'Harold Collins',
      email: 'harold.collins@yahoo.com',
      phone: '727-555-0978',
      address: {
        street: '8901 Bayshore Road',
        city: 'Palm Harbor',
        state: 'FL',
        zipCode: '34684',
        lat: 28.0828, lng: -82.7331
      }
    },
    project: {
      type: 'pool-deck',
      squareFootage: 290,
      description: 'Pool deck coating.',
      timeline: 'within-month'
    },
    pricing: {
      materials: 1595.00,
      labor: 1305.00,
      total: 3103.00,
      calculatedRate: 10.70,
      adjustments: []
    },
    createdAt: daysAgo(48),
    updatedAt: daysAgo(40),
    expiresAt: daysAgo(34)
  },

  // EXPIRED QUOTES (3) - Quotes that expired without response
  {
    id: 'QUO-048',
    type: 'pro-created',
    status: 'expired',
    proId: 'PRO-005',
    proName: 'Sunshine Coatings',
    customer: {
      name: 'Helen Stewart',
      email: 'helen.stewart@hotmail.com',
      phone: '727-555-0189',
      address: {
        street: '1234 Palm Avenue',
        city: 'St. Petersburg',
        state: 'FL',
        zipCode: '33702',
        lat: 27.8008, lng: -82.6731
      }
    },
    project: {
      type: 'patio',
      squareFootage: 190,
      description: 'Small patio area.',
      timeline: 'flexible'
    },
    pricing: {
      materials: 855.00,
      labor: 760.00,
      total: 1727.05,
      calculatedRate: 9.09,
      adjustments: []
    },
    createdAt: daysAgo(60),
    updatedAt: daysAgo(60),
    expiresAt: daysAgo(46)
  },
  {
    id: 'QUO-049',
    type: 'pro-created',
    status: 'expired',
    proId: 'PRO-009',
    proName: 'Apex Floor Coatings',
    customer: {
      name: 'Gerald Sanchez',
      email: 'gerald.sanchez@outlook.com',
      phone: '863-555-0290',
      address: {
        street: '5678 Industrial Avenue',
        city: 'Lakeland',
        state: 'FL',
        zipCode: '33801',
        lat: 28.0395, lng: -81.9498
      }
    },
    project: {
      type: 'commercial-floor',
      squareFootage: 1400,
      description: 'Warehouse floor coating.',
      timeline: 'urgent'
    },
    pricing: {
      materials: 4200.00,
      labor: 5600.00,
      total: 10486.00,
      calculatedRate: 7.49,
      adjustments: []
    },
    createdAt: daysAgo(65),
    updatedAt: daysAgo(65),
    expiresAt: daysAgo(51)
  },
  {
    id: 'QUO-050',
    type: 'pro-created',
    status: 'expired',
    proId: 'PRO-012',
    proName: 'Platinum Surfaces',
    customer: {
      name: 'Gloria Morris',
      email: 'gloria.morris@gmail.com',
      phone: '813-555-0391',
      address: {
        street: '9012 Corporate Center',
        city: 'Tampa',
        state: 'FL',
        zipCode: '33606',
        lat: 27.9419, lng: -82.5133
      }
    },
    project: {
      type: 'commercial-floor',
      squareFootage: 900,
      description: 'Office space coating.',
      timeline: 'flexible'
    },
    pricing: {
      materials: 3600.00,
      labor: 5400.00,
      total: 9630.00,
      calculatedRate: 10.70,
      adjustments: []
    },
    createdAt: daysAgo(70),
    updatedAt: daysAgo(70),
    expiresAt: daysAgo(56)
  }
];

/**
 * Helper Functions
 */

// Get quotes by status
export const getQuotesByStatus = (status: QuoteStatus): Quote[] => {
  return mockQuotes.filter(q => q.status === status);
};

// Get quotes by type
export const getQuotesByType = (type: QuoteType): Quote[] => {
  return mockQuotes.filter(q => q.type === type);
};

// Get quotes by pro ID
export const getQuotesByPro = (proId: string): Quote[] => {
  return mockQuotes.filter(q => q.proId === proId);
};

// Get quote by ID
export const getQuoteById = (id: string): Quote | undefined => {
  return mockQuotes.find(q => q.id === id);
};

// Get customer-initiated quotes
export const getCustomerInitiatedQuotes = (): Quote[] => {
  return mockQuotes.filter(q => q.type === 'customer-initiated');
};

// Get pro-created quotes
export const getProCreatedQuotes = (): Quote[] => {
  return mockQuotes.filter(q => q.type === 'pro-created');
};

// Get active quotes (not expired or declined)
export const getActiveQuotes = (): Quote[] => {
  return mockQuotes.filter(q =>
    q.status !== 'expired' && q.status !== 'declined'
  );
};

// Get recent quotes (last 30 days)
export const getRecentQuotes = (days: number = 30): Quote[] => {
  const cutoffDate = new Date('2025-10-21');
  cutoffDate.setDate(cutoffDate.getDate() - days);

  return mockQuotes.filter(q => q.createdAt >= cutoffDate);
};

/**
 * Validation function to check referential integrity
 */
export const validateQuotes = (): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Validate pro IDs exist in mockPros (would need to import mockPros)
  mockQuotes.forEach(quote => {
    if (quote.proId && !quote.proName) {
      errors.push(`${quote.id}: Has proId but missing proName`);
    }

    if (quote.type === 'pro-created' && !quote.proId) {
      errors.push(`${quote.id}: Pro-created quote missing proId`);
    }

    if (quote.type === 'customer-initiated' && !quote.matchedPros) {
      errors.push(`${quote.id}: Customer-initiated quote missing matchedPros`);
    }

    // Validate pricing calculations
    if (quote.pricing) {
      const expectedTotal = quote.pricing.materials + quote.pricing.labor;
      const taxRate = 0.07; // 7% sales tax
      const expectedTotalWithTax = expectedTotal * (1 + taxRate);

      if (Math.abs(quote.pricing.total - expectedTotalWithTax) > 1) {
        errors.push(
          `${quote.id}: Pricing mismatch. Expected ${expectedTotalWithTax.toFixed(2)}, got ${quote.pricing.total}`
        );
      }

      // Validate calculated rate
      const expectedRate = quote.pricing.total / quote.project.squareFootage;
      if (Math.abs(quote.pricing.calculatedRate - expectedRate) > 0.05) {
        errors.push(
          `${quote.id}: Rate mismatch. Expected ${expectedRate.toFixed(2)}, got ${quote.pricing.calculatedRate}`
        );
      }
    }
  });

  return {
    valid: errors.length === 0,
    errors
  };
};
