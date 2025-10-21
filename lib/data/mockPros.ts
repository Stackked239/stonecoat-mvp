// Mock Pro/Contractor Data
// All zip codes and coordinates reference mockZipCodeData.ts

import { Pro } from '@/lib/types';

export const mockPros: Pro[] = [
  {
    id: 'PRO-001',
    businessName: 'Tampa Premium Coatings',
    ownerName: 'Mike Johnson',
    email: 'mike@tampacoatings.com',
    phone: '813-555-0101',
    location: {
      street: '4521 Commerce Drive',
      city: 'Tampa',
      state: 'FL',
      zipCode: '33610',
      lat: 27.9767,
      lng: -82.4370
    },
    serviceRadius: 30,
    serviceZipCodes: ['33602', '33603', '33604', '33605', '33610', '33611', '33612', '33613', '33614', '33615', '33511', '33578'],
    certificationLevel: 'master',
    certificationDate: new Date('2022-01-15'),
    insuranceVerified: true,
    specialties: ['garage-floor', 'commercial', 'basement'],
    metrics: {
      totalQuotes: 245,
      wonQuotes: 89,
      winRate: 36.3, // (89/245)*100
      avgJobValue: 4200,
      totalRevenue: 373800, // 89 * 4200
      customerRating: 4.8,
      materialOrdersLast30: 12,
      jobsCompletedLast30: 89
    },
    accountStatus: 'active',
    joinedDate: new Date('2022-01-10'),
    lastActive: new Date('2024-10-20')
  },
  {
    id: 'PRO-002',
    businessName: 'Bay Area Epoxy Experts',
    ownerName: 'Sarah Martinez',
    email: 'sarah@bayareaepoxy.com',
    phone: '813-555-0102',
    location: {
      street: '2845 Industrial Parkway',
      city: 'Tampa',
      state: 'FL',
      zipCode: '33612',
      lat: 28.0275,
      lng: -82.4526
    },
    serviceRadius: 25,
    serviceZipCodes: ['33602', '33603', '33604', '33610', '33612', '33613', '33614', '33615', '33617', '33618'],
    certificationLevel: 'advanced',
    certificationDate: new Date('2022-06-20'),
    insuranceVerified: true,
    specialties: ['residential', 'patio', 'pool-deck'],
    metrics: {
      totalQuotes: 198,
      wonQuotes: 67,
      winRate: 33.8, // (67/198)*100
      avgJobValue: 3800,
      totalRevenue: 254600, // 67 * 3800
      customerRating: 4.9,
      materialOrdersLast30: 8,
      jobsCompletedLast30: 67
    },
    accountStatus: 'active',
    joinedDate: new Date('2022-06-15'),
    lastActive: new Date('2024-10-19')
  },
  {
    id: 'PRO-003',
    businessName: 'Coastal Floors Pro',
    ownerName: 'Tom Bradley',
    email: 'tom@coastalfloors.com',
    phone: '727-555-0103',
    location: {
      street: '4521 Marina Boulevard',
      city: 'Clearwater',
      state: 'FL',
      zipCode: '33765',
      lat: 27.9659,
      lng: -82.8001
    },
    serviceRadius: 40,
    serviceZipCodes: ['33755', '33756', '33759', '33760', '33761', '33763', '33764', '33765', '33770', '33771', '34698', '34683', '34684', '33707', '33710'],
    certificationLevel: 'master',
    certificationDate: new Date('2021-03-10'),
    insuranceVerified: true,
    specialties: ['basement', 'commercial', 'metallic-finishes'],
    metrics: {
      totalQuotes: 312,
      wonQuotes: 109,
      winRate: 34.9, // (109/312)*100
      avgJobValue: 5200,
      totalRevenue: 566800, // 109 * 5200
      customerRating: 4.7,
      materialOrdersLast30: 15,
      jobsCompletedLast30: 109
    },
    accountStatus: 'active',
    joinedDate: new Date('2021-03-01'),
    lastActive: new Date('2024-10-21')
  },
  {
    id: 'PRO-004',
    businessName: 'Premier Garage Floors',
    ownerName: 'James Wilson',
    email: 'james@premiergarage.com',
    phone: '813-555-0104',
    location: {
      street: '1234 Brandon Blvd',
      city: 'Brandon',
      state: 'FL',
      zipCode: '33511',
      lat: 27.9378,
      lng: -82.2859
    },
    serviceRadius: 20,
    serviceZipCodes: ['33511', '33510', '33578', '33569', '33610', '33616', '33605'],
    certificationLevel: 'advanced',
    certificationDate: new Date('2023-02-01'),
    insuranceVerified: true,
    specialties: ['garage-floor', 'residential'],
    metrics: {
      totalQuotes: 156,
      wonQuotes: 48,
      winRate: 30.8, // (48/156)*100
      avgJobValue: 3200,
      totalRevenue: 153600, // 48 * 3200
      customerRating: 4.6,
      materialOrdersLast30: 6,
      jobsCompletedLast30: 48
    },
    accountStatus: 'active',
    joinedDate: new Date('2023-02-01'),
    lastActive: new Date('2024-10-18')
  },
  {
    id: 'PRO-005',
    businessName: 'Sunshine Coatings',
    ownerName: 'Lisa Rodriguez',
    email: 'lisa@sunshinecoatings.com',
    phone: '727-555-0105',
    location: {
      street: '1567 Coastal Highway',
      city: 'St. Petersburg',
      state: 'FL',
      zipCode: '33707',
      lat: 27.7676,
      lng: -82.6403
    },
    serviceRadius: 35,
    serviceZipCodes: ['33701', '33702', '33703', '33704', '33705', '33706', '33707', '33710', '33770', '33771', '33781', '33755', '33756'],
    certificationLevel: 'advanced',
    certificationDate: new Date('2022-08-12'),
    insuranceVerified: true,
    specialties: ['pool-deck', 'patio', 'residential'],
    metrics: {
      totalQuotes: 224,
      wonQuotes: 78,
      winRate: 34.8, // (78/224)*100
      avgJobValue: 4100,
      totalRevenue: 319800, // 78 * 4100
      customerRating: 4.9,
      materialOrdersLast30: 10,
      jobsCompletedLast30: 78
    },
    accountStatus: 'active',
    joinedDate: new Date('2022-08-01'),
    lastActive: new Date('2024-10-20')
  },
  {
    id: 'PRO-006',
    businessName: 'Elite Epoxy Professionals',
    ownerName: 'Kevin Chang',
    email: 'kevin@eliteepoxy.com',
    phone: '813-555-0106',
    location: {
      street: '1234 Professional Plaza',
      city: 'Tampa',
      state: 'FL',
      zipCode: '33602',
      lat: 27.9506,
      lng: -82.4572
    },
    serviceRadius: 50,
    serviceZipCodes: ['33602', '33603', '33604', '33605', '33606', '33609', '33610', '33611', '33612', '33613', '33614', '33615', '33616', '33617', '33618', '33511', '33510'],
    certificationLevel: 'master',
    certificationDate: new Date('2021-09-05'),
    insuranceVerified: true,
    specialties: ['commercial', 'industrial', 'showroom'],
    metrics: {
      totalQuotes: 289,
      wonQuotes: 98,
      winRate: 33.9, // (98/289)*100
      avgJobValue: 6800,
      totalRevenue: 666400, // 98 * 6800
      customerRating: 4.8,
      materialOrdersLast30: 14,
      jobsCompletedLast30: 98
    },
    accountStatus: 'active',
    joinedDate: new Date('2021-09-01'),
    lastActive: new Date('2024-10-21')
  },
  {
    id: 'PRO-007',
    businessName: 'Precision Floor Coatings',
    ownerName: 'Daniel Roberts',
    email: 'dan@precisionfloor.com',
    phone: '813-555-0107',
    location: {
      street: '789 Industrial Way',
      city: 'Tampa',
      state: 'FL',
      zipCode: '33615',
      lat: 28.0170,
      lng: -82.5177
    },
    serviceRadius: 25,
    serviceZipCodes: ['33613', '33614', '33615', '33618', '33549', '33558', '34639', '33612'],
    certificationLevel: 'advanced',
    certificationDate: new Date('2023-06-15'),
    insuranceVerified: true,
    specialties: ['basement', 'garage-floor', 'residential'],
    metrics: {
      totalQuotes: 134,
      wonQuotes: 42,
      winRate: 31.3, // (42/134)*100
      avgJobValue: 3600,
      totalRevenue: 151200, // 42 * 3600
      customerRating: 4.7,
      materialOrdersLast30: 5,
      jobsCompletedLast30: 42
    },
    accountStatus: 'active',
    joinedDate: new Date('2023-06-01'),
    lastActive: new Date('2024-10-17')
  },
  {
    id: 'PRO-008',
    businessName: 'Modern Surface Solutions',
    ownerName: 'Angela Davis',
    email: 'angela@modernsurface.com',
    phone: '813-555-0108',
    location: {
      street: '456 Innovation Drive',
      city: 'Lutz',
      state: 'FL',
      zipCode: '33549',
      lat: 28.1539,
      lng: -82.4612
    },
    serviceRadius: 30,
    serviceZipCodes: ['33549', '33558', '34639', '33613', '33617', '33618', '33612', '33614', '33615'],
    certificationLevel: 'advanced',
    certificationDate: new Date('2023-01-20'),
    insuranceVerified: true,
    specialties: ['residential', 'basement', 'modern-finishes'],
    metrics: {
      totalQuotes: 178,
      wonQuotes: 58,
      winRate: 32.6, // (58/178)*100
      avgJobValue: 4300,
      totalRevenue: 249400, // 58 * 4300
      customerRating: 4.8,
      materialOrdersLast30: 7,
      jobsCompletedLast30: 58
    },
    accountStatus: 'active',
    joinedDate: new Date('2023-01-15'),
    lastActive: new Date('2024-10-19')
  },
  {
    id: 'PRO-009',
    businessName: 'Apex Floor Coatings',
    ownerName: 'Robert Lee',
    email: 'robert@apexfloor.com',
    phone: '863-555-0109',
    location: {
      street: '890 Commerce Center',
      city: 'Lakeland',
      state: 'FL',
      zipCode: '33803',
      lat: 28.0656,
      lng: -81.9292
    },
    serviceRadius: 45,
    serviceZipCodes: ['33801', '33803', '33813', '33511', '33510', '33569', '33578'],
    certificationLevel: 'master',
    certificationDate: new Date('2021-11-14'),
    insuranceVerified: true,
    specialties: ['commercial', 'industrial', 'large-scale'],
    metrics: {
      totalQuotes: 267,
      wonQuotes: 92,
      winRate: 34.5, // (92/267)*100
      avgJobValue: 7200,
      totalRevenue: 662400, // 92 * 7200
      customerRating: 4.8,
      materialOrdersLast30: 13,
      jobsCompletedLast30: 92
    },
    accountStatus: 'active',
    joinedDate: new Date('2021-11-01'),
    lastActive: new Date('2024-10-20')
  },
  {
    id: 'PRO-010',
    businessName: 'Crystal Clear Coatings',
    ownerName: 'Jennifer White',
    email: 'jen@crystalclear.com',
    phone: '727-555-0110',
    location: {
      street: '234 Beach Boulevard',
      city: 'Largo',
      state: 'FL',
      zipCode: '33770',
      lat: 27.9095,
      lng: -82.7873
    },
    serviceRadius: 30,
    serviceZipCodes: ['33770', '33771', '33781', '33755', '33756', '33759', '33760', '33764', '33765', '34698', '33703', '33710'],
    certificationLevel: 'advanced',
    certificationDate: new Date('2022-09-30'),
    insuranceVerified: true,
    specialties: ['pool-deck', 'patio', 'outdoor-spaces'],
    metrics: {
      totalQuotes: 201,
      wonQuotes: 69,
      winRate: 34.3, // (69/201)*100
      avgJobValue: 4500,
      totalRevenue: 310500, // 69 * 4500
      customerRating: 4.9,
      materialOrdersLast30: 9,
      jobsCompletedLast30: 69
    },
    accountStatus: 'active',
    joinedDate: new Date('2022-09-15'),
    lastActive: new Date('2024-10-21')
  },
  {
    id: 'PRO-011',
    businessName: 'Gulf Coast Epoxy',
    ownerName: 'Michael Brown',
    email: 'mike@gulfcoastepoxy.com',
    phone: '727-555-0111',
    location: {
      street: '567 Sunset Drive',
      city: 'Dunedin',
      state: 'FL',
      zipCode: '34698',
      lat: 28.0200,
      lng: -82.7718
    },
    serviceRadius: 35,
    serviceZipCodes: ['34698', '34683', '34684', '33759', '33760', '33761', '33763', '33764', '33765', '33770', '33771'],
    certificationLevel: 'advanced',
    certificationDate: new Date('2022-04-10'),
    insuranceVerified: true,
    specialties: ['residential', 'pool-deck', 'coastal-properties'],
    metrics: {
      totalQuotes: 187,
      wonQuotes: 63,
      winRate: 33.7, // (63/187)*100
      avgJobValue: 4400,
      totalRevenue: 277200, // 63 * 4400
      customerRating: 4.7,
      materialOrdersLast30: 8,
      jobsCompletedLast30: 63
    },
    accountStatus: 'active',
    joinedDate: new Date('2022-04-01'),
    lastActive: new Date('2024-10-18')
  },
  {
    id: 'PRO-012',
    businessName: 'Platinum Surfaces',
    ownerName: 'David Kim',
    email: 'david@platinumsurfaces.com',
    phone: '813-555-0112',
    location: {
      street: '890 Executive Parkway',
      city: 'Tampa',
      state: 'FL',
      zipCode: '33606',
      lat: 27.9419,
      lng: -82.5133
    },
    serviceRadius: 40,
    serviceZipCodes: ['33602', '33603', '33606', '33609', '33611', '33614', '33615', '33616', '33618', '33701', '33702', '33707', '33710'],
    certificationLevel: 'master',
    certificationDate: new Date('2021-07-22'),
    insuranceVerified: true,
    specialties: ['commercial', 'showroom', 'high-end-residential'],
    metrics: {
      totalQuotes: 298,
      wonQuotes: 104,
      winRate: 34.9, // (104/298)*100
      avgJobValue: 8500,
      totalRevenue: 884000, // 104 * 8500
      customerRating: 4.9,
      materialOrdersLast30: 16,
      jobsCompletedLast30: 104
    },
    accountStatus: 'active',
    joinedDate: new Date('2021-07-15'),
    lastActive: new Date('2024-10-21')
  }
];

// Helper function to get pro by ID
export const getProById = (id: string): Pro | undefined => {
  return mockPros.find(p => p.id === id);
};

// Helper function to get pros by certification level
export const getProsByCertification = (level: 'basic' | 'advanced' | 'master'): Pro[] => {
  return mockPros.filter(p => p.certificationLevel === level);
};

// Helper function to get pros by specialty
export const getProsBySpecialty = (specialty: string): Pro[] => {
  return mockPros.filter(p => p.specialties?.includes(specialty));
};

// Helper function to get active pros
export const getActivePros = (): Pro[] => {
  return mockPros.filter(p => p.accountStatus === 'active');
};

// Validate all calculated metrics
export const validateProMetrics = (): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  mockPros.forEach(pro => {
    const calculatedWinRate = (pro.metrics.wonQuotes / pro.metrics.totalQuotes) * 100;
    const calculatedRevenue = pro.metrics.wonQuotes * pro.metrics.avgJobValue;

    if (Math.abs(calculatedWinRate - pro.metrics.winRate) > 0.1) {
      errors.push(`${pro.id}: Win rate mismatch. Expected ${calculatedWinRate.toFixed(1)}, got ${pro.metrics.winRate}`);
    }

    if (calculatedRevenue !== pro.metrics.totalRevenue) {
      errors.push(`${pro.id}: Revenue mismatch. Expected ${calculatedRevenue}, got ${pro.metrics.totalRevenue}`);
    }
  });

  return {
    valid: errors.length === 0,
    errors
  };
};
