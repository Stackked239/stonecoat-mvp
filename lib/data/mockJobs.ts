/**
 * Mock Jobs Data
 * Job pipeline tracking from quote to completion
 * Links quotes, pros, and orders together in the job lifecycle
 */

import { Job, JobStatus, Customer, ProjectDetails } from '../types';

export const mockJobs: Job[] = [
  {
    id: 'JOB-001',
    quoteId: 'QUOTE-001',
    proId: 'PRO-001',
    customer: {
      name: 'John Mitchell',
      email: 'john.mitchell@gmail.com',
      phone: '813-555-0123',
      address: {
        street: '4521 Bay Vista Drive',
        city: 'Tampa',
        state: 'FL',
        zipCode: '33610',
        lat: 27.9767,
        lng: -82.4370
      }
    },
    project: {
      type: 'garage-floor',
      squareFootage: 400,
      description: 'Two-car garage with oil stains and minor cracks. Looking for granite gray flake finish.',
      timeline: 'within-2-weeks',
      preferredFinish: 'granite-gray-flake'
    },
    status: 'quote-sent',
    notes: 'Customer requested quote via website. Follow up scheduled for Oct 23.',
    scheduledDate: new Date('2024-10-26')
  },
  {
    id: 'JOB-002',
    quoteId: 'QUOTE-015',
    proId: 'PRO-002',
    customer: {
      name: 'Sarah Thompson',
      email: 'sarah.t@outlook.com',
      phone: '813-555-0456',
      address: {
        street: '892 Riverside Lane',
        city: 'Tampa',
        state: 'FL',
        zipCode: '33612',
        lat: 28.0275,
        lng: -82.4526
      }
    },
    project: {
      type: 'patio',
      squareFootage: 250,
      description: 'Covered patio resurfacing with UV-resistant coating and desert tan flakes.',
      timeline: 'within-4-weeks',
      preferredFinish: 'desert-tan-broadcast'
    },
    status: 'scheduled',
    scheduledDate: new Date('2024-10-25'),
    notes: 'Materials delivered Oct 21. Customer prefers morning installation. Gate code: 5678.'
  },
  {
    id: 'JOB-003',
    quoteId: 'QUOTE-022',
    proId: 'PRO-005',
    customer: {
      name: 'Emily Chen',
      email: 'emily.chen@gmail.com',
      phone: '813-555-0234',
      address: {
        street: '7834 Oak Grove Blvd',
        city: 'Clearwater',
        state: 'FL',
        zipCode: '33765',
        lat: 27.9659,
        lng: -82.8001
      }
    },
    project: {
      type: 'pool-deck',
      squareFootage: 350,
      description: 'Pool deck resurfacing with slip-resistant aqua blue finish. Chlorine resistant coating.',
      timeline: 'within-month',
      preferredFinish: 'aqua-blue-flake'
    },
    status: 'in-progress',
    scheduledDate: new Date('2024-10-21'),
    notes: 'Day 1 complete - surface prep done. Day 2 starts Oct 22 at 7am. Pool party deadline Oct 26.'
  },
  {
    id: 'JOB-004',
    quoteId: 'QUOTE-008',
    proId: 'PRO-004',
    customer: {
      name: 'Michael Rodriguez',
      email: 'm.rodriguez@yahoo.com',
      phone: '813-555-0789',
      address: {
        street: '2156 Palm Court',
        city: 'Brandon',
        state: 'FL',
        zipCode: '33511',
        lat: 27.9378,
        lng: -82.2859
      }
    },
    project: {
      type: 'garage-floor',
      squareFootage: 450,
      description: 'Two-car garage with granite flake finish. Standard installation.',
      timeline: 'flexible',
      preferredFinish: 'granite-gray-flake'
    },
    status: 'completed',
    scheduledDate: new Date('2024-10-18'),
    completionDate: new Date('2024-10-19'),
    notes: 'Job completed successfully. Customer very satisfied. Left 5-star review.'
  },
  {
    id: 'JOB-005',
    quoteId: 'QUOTE-035',
    proId: 'PRO-006',
    customer: {
      name: 'David Patterson',
      email: 'dpatterson@hotmail.com',
      phone: '813-555-0567',
      address: {
        street: '3421 Sunset Ridge',
        city: 'St. Petersburg',
        state: 'FL',
        zipCode: '33707',
        lat: 27.7676,
        lng: -82.6403
      }
    },
    project: {
      type: 'commercial-floor',
      squareFootage: 2800,
      description: 'Commercial showroom floor with midnight flake finish. High traffic area.',
      timeline: 'urgent',
      preferredFinish: 'midnight-black-flake'
    },
    status: 'materials-ordered',
    scheduledDate: new Date('2024-10-28'),
    notes: 'Large commercial project. Materials ordered Oct 20. Delivery expected Oct 25. After-hours installation required.'
  },
  {
    id: 'JOB-006',
    quoteId: 'QUOTE-041',
    proId: 'PRO-008',
    customer: {
      name: 'Jennifer White',
      email: 'jen.white@gmail.com',
      phone: '727-555-0234',
      address: {
        street: '4567 Cypress Lane',
        city: 'Lutz',
        state: 'FL',
        zipCode: '33549',
        lat: 28.1539,
        lng: -82.4612
      }
    },
    project: {
      type: 'basement-floor',
      squareFootage: 800,
      description: 'Finished basement with silver metallic accents. Modern industrial look.',
      timeline: 'flexible',
      preferredFinish: 'silver-metallic'
    },
    status: 'scheduled',
    scheduledDate: new Date('2024-10-27'),
    notes: 'High-end residential. Materials delivered. Customer working from home - quiet installation requested.'
  },
  {
    id: 'JOB-007',
    quoteId: 'QUOTE-044',
    proId: 'PRO-009',
    customer: {
      name: 'Robert Anderson',
      email: 'r.anderson@company.com',
      phone: '863-555-0345',
      address: {
        street: '8901 Industrial Park',
        city: 'Lakeland',
        state: 'FL',
        zipCode: '33803',
        lat: 28.0656,
        lng: -81.9292
      }
    },
    project: {
      type: 'commercial-floor',
      squareFootage: 1800,
      description: 'Warehouse floor coating. Heavy-duty industrial grade with midnight flakes.',
      timeline: 'within-2-weeks',
      preferredFinish: 'midnight-black-flake'
    },
    status: 'completed',
    scheduledDate: new Date('2024-10-14'),
    completionDate: new Date('2024-10-16'),
    notes: 'Commercial warehouse completed ahead of schedule. Client approved for payment. Excellent results.'
  },
  {
    id: 'JOB-008',
    quoteId: 'QUOTE-033',
    proId: 'PRO-003',
    customer: {
      name: 'Lisa Martinez',
      email: 'lisa.m@email.com',
      phone: '727-555-0456',
      address: {
        street: '2345 Office Boulevard',
        city: 'Clearwater',
        state: 'FL',
        zipCode: '33765',
        lat: 27.9659,
        lng: -82.8001
      }
    },
    project: {
      type: 'commercial-floor',
      squareFootage: 2100,
      description: 'Office space floor coating with professional midnight finish.',
      timeline: 'within-4-weeks',
      preferredFinish: 'midnight-black-flake'
    },
    status: 'in-progress',
    scheduledDate: new Date('2024-10-19'),
    notes: 'Day 3 of installation. Surface prep and base coat complete. Top coat scheduled for Oct 22.'
  },
  {
    id: 'JOB-009',
    quoteId: 'QUOTE-019',
    proId: 'PRO-007',
    customer: {
      name: 'Daniel Roberts',
      email: 'dan.roberts@home.com',
      phone: '813-555-0678',
      address: {
        street: '6789 Residential Drive',
        city: 'Tampa',
        state: 'FL',
        zipCode: '33615',
        lat: 28.0170,
        lng: -82.5177
      }
    },
    project: {
      type: 'garage-floor',
      squareFootage: 650,
      description: 'Three-car garage with granite gray flakes. Large residential project.',
      timeline: 'within-2-weeks',
      preferredFinish: 'granite-gray-flake'
    },
    status: 'materials-ordered',
    scheduledDate: new Date('2024-10-29'),
    notes: 'Materials ordered Oct 21. Customer accepted quote via phone. Excited about project.'
  },
  {
    id: 'JOB-010',
    quoteId: 'QUOTE-047',
    proId: 'PRO-012',
    customer: {
      name: 'Angela Davis',
      email: 'angela.d@residence.com',
      phone: '813-555-0890',
      address: {
        street: '3456 Executive Way',
        city: 'Tampa',
        state: 'FL',
        zipCode: '33606',
        lat: 27.9419,
        lng: -82.5133
      }
    },
    project: {
      type: 'basement-floor',
      squareFootage: 1200,
      description: 'Luxury basement with copper metallic finish. Premium high-end residential.',
      timeline: 'flexible',
      preferredFinish: 'copper-metallic'
    },
    status: 'materials-ordered',
    scheduledDate: new Date('2024-10-26'),
    notes: 'High-end client. Premium materials ordered. Customer requested detailed timeline.'
  },
  {
    id: 'JOB-011',
    quoteId: 'QUOTE-028',
    proId: 'PRO-010',
    customer: {
      name: 'Kevin Brown',
      email: 'k.brown@email.com',
      phone: '727-555-0567',
      address: {
        street: '7890 Beachside Avenue',
        city: 'Largo',
        state: 'FL',
        zipCode: '33770',
        lat: 27.9095,
        lng: -82.7873
      }
    },
    project: {
      type: 'patio',
      squareFootage: 300,
      description: 'Outdoor patio near beach with UV protection and blue ridge flakes.',
      timeline: 'within-month',
      preferredFinish: 'blue-ridge-flake'
    },
    status: 'scheduled',
    scheduledDate: new Date('2024-10-26'),
    notes: 'Coastal property. UV protection critical. Materials ready for installation.'
  },
  {
    id: 'JOB-012',
    quoteId: 'QUOTE-012',
    proId: 'PRO-004',
    customer: {
      name: 'Michelle Taylor',
      email: 'michelle.t@home.com',
      phone: '813-555-0912',
      address: {
        street: '1234 Suburban Lane',
        city: 'Brandon',
        state: 'FL',
        zipCode: '33511',
        lat: 27.9378,
        lng: -82.2859
      }
    },
    project: {
      type: 'garage-floor',
      squareFootage: 720,
      description: 'Three-car garage with granite flake finish. Large suburban home.',
      timeline: 'within-2-weeks',
      preferredFinish: 'granite-gray-flake'
    },
    status: 'completed',
    scheduledDate: new Date('2024-10-16'),
    completionDate: new Date('2024-10-18'),
    notes: 'Excellent job. Customer left 5-star review. Referred neighbor for similar project.'
  },
  {
    id: 'JOB-013',
    quoteId: 'QUOTE-007',
    proId: 'PRO-002',
    customer: {
      name: 'Christopher Lee',
      email: 'chris.lee@email.com',
      phone: '813-555-0234',
      address: {
        street: '4567 Park Avenue',
        city: 'Tampa',
        state: 'FL',
        zipCode: '33612',
        lat: 28.0275,
        lng: -82.4526
      }
    },
    project: {
      type: 'garage-floor',
      squareFootage: 380,
      description: 'Two-car garage with sandstone flake finish.',
      timeline: 'flexible',
      preferredFinish: 'sandstone-flake'
    },
    status: 'quote-sent',
    notes: 'Quote sent Oct 21. Customer reviewing options. Follow up scheduled for Oct 24.'
  },
  {
    id: 'JOB-014',
    quoteId: 'QUOTE-031',
    proId: 'PRO-011',
    customer: {
      name: 'Patricia Wilson',
      email: 'pat.wilson@beach.com',
      phone: '727-555-0678',
      address: {
        street: '8901 Coastal Drive',
        city: 'Dunedin',
        state: 'FL',
        zipCode: '34698',
        lat: 28.0200,
        lng: -82.7718
      }
    },
    project: {
      type: 'pool-deck',
      squareFootage: 280,
      description: 'Pool deck resurfacing with aqua blue non-slip finish. Coastal property.',
      timeline: 'within-month',
      preferredFinish: 'aqua-blue-flake'
    },
    status: 'completed',
    scheduledDate: new Date('2024-10-15'),
    completionDate: new Date('2024-10-17'),
    notes: 'Pool deck completed. Customer extremely satisfied. Near beach - UV protection working well.'
  },
  {
    id: 'JOB-015',
    quoteId: 'QUOTE-025',
    proId: 'PRO-006',
    customer: {
      name: 'Thomas Garcia',
      email: 't.garcia@business.com',
      phone: '813-555-0345',
      address: {
        street: '5678 Corporate Plaza',
        city: 'Tampa',
        state: 'FL',
        zipCode: '33602',
        lat: 27.9506,
        lng: -82.4572
      }
    },
    project: {
      type: 'commercial-floor',
      squareFootage: 1400,
      description: 'Office lobby floor with granite flakes. Professional grade finish.',
      timeline: 'within-2-weeks',
      preferredFinish: 'granite-gray-flake'
    },
    status: 'scheduled',
    scheduledDate: new Date('2024-10-25'),
    notes: 'After-hours installation required. Materials ready. Building manager coordinating access.'
  },
  {
    id: 'JOB-016',
    quoteId: 'QUOTE-038',
    proId: 'PRO-001',
    customer: {
      name: 'Rebecca Martinez',
      email: 'rebecca.m@home.com',
      phone: '813-555-0456',
      address: {
        street: '2345 Suburban Street',
        city: 'Tampa',
        state: 'FL',
        zipCode: '33610',
        lat: 27.9767,
        lng: -82.4370
      }
    },
    project: {
      type: 'garage-floor',
      squareFootage: 420,
      description: 'Two-car garage with granite flakes. Standard residential installation.',
      timeline: 'flexible',
      preferredFinish: 'granite-gray-flake'
    },
    status: 'cancelled',
    notes: 'Customer postponed project due to personal reasons. May reschedule for spring.'
  },
  {
    id: 'JOB-017',
    quoteId: 'QUOTE-016',
    proId: 'PRO-005',
    customer: {
      name: 'James Thompson',
      email: 'james.t@residence.com',
      phone: '727-555-0789',
      address: {
        street: '6789 Sunset Boulevard',
        city: 'St. Petersburg',
        state: 'FL',
        zipCode: '33707',
        lat: 27.7676,
        lng: -82.6403
      }
    },
    project: {
      type: 'patio',
      squareFootage: 200,
      description: 'Small outdoor patio with sedona flakes and UV protection.',
      timeline: 'within-month',
      preferredFinish: 'sedona-flake'
    },
    status: 'scheduled',
    scheduledDate: new Date('2024-10-27'),
    notes: 'Small project. Materials delivered Oct 20. Customer flexible on exact start time.'
  },
  {
    id: 'JOB-018',
    quoteId: 'QUOTE-042',
    proId: 'PRO-010',
    customer: {
      name: 'Nancy Johnson',
      email: 'nancy.j@email.com',
      phone: '727-555-0890',
      address: {
        street: '3456 Harbor View',
        city: 'Largo',
        state: 'FL',
        zipCode: '33770',
        lat: 27.9095,
        lng: -82.7873
      }
    },
    project: {
      type: 'pool-deck',
      squareFootage: 180,
      description: 'Small pool deck repair with aqua blue non-slip finish.',
      timeline: 'urgent',
      preferredFinish: 'aqua-blue-flake'
    },
    status: 'in-progress',
    scheduledDate: new Date('2024-10-20'),
    notes: 'Quick repair job. Surface prep complete. Final coat scheduled for Oct 22.'
  },
  {
    id: 'JOB-019',
    quoteId: 'QUOTE-050',
    proId: 'PRO-012',
    customer: {
      name: 'William Davis',
      email: 'will.davis@executive.com',
      phone: '813-555-0901',
      address: {
        street: '7890 Premium Lane',
        city: 'Tampa',
        state: 'FL',
        zipCode: '33606',
        lat: 27.9419,
        lng: -82.5133
      }
    },
    project: {
      type: 'commercial-floor',
      squareFootage: 1600,
      description: 'High-end showroom with metallic charcoal accents.',
      timeline: 'within-4-weeks',
      preferredFinish: 'charcoal-metallic'
    },
    status: 'scheduled',
    scheduledDate: new Date('2024-10-30'),
    notes: 'Premium commercial project. Materials ordered Oct 21. Client expects high-end finish.'
  },
  {
    id: 'JOB-020',
    quoteId: 'QUOTE-026',
    proId: 'PRO-003',
    customer: {
      name: 'Barbara Moore',
      email: 'barbara.m@home.com',
      phone: '727-555-0123',
      address: {
        street: '1234 Coastal Road',
        city: 'Clearwater',
        state: 'FL',
        zipCode: '33765',
        lat: 27.9659,
        lng: -82.8001
      }
    },
    project: {
      type: 'basement-floor',
      squareFootage: 600,
      description: 'Basement floor with charcoal metallic finish. Moisture barrier required.',
      timeline: 'flexible',
      preferredFinish: 'charcoal-metallic'
    },
    status: 'completed',
    scheduledDate: new Date('2024-10-11'),
    completionDate: new Date('2024-10-13'),
    notes: 'Metallic basement completed. Customer loved the finish. Recommended to friends.'
  }
];

// Helper functions
export const getJobById = (id: string): Job | undefined => {
  return mockJobs.find(j => j.id === id);
};

export const getJobsByPro = (proId: string): Job[] => {
  return mockJobs.filter(j => j.proId === proId);
};

export const getJobsByStatus = (status: JobStatus): Job[] => {
  return mockJobs.filter(j => j.status === status);
};

export const getActiveJobs = (proId?: string): Job[] => {
  const activeStatuses: JobStatus[] = ['scheduled', 'in-progress', 'materials-ordered'];
  if (proId) {
    return mockJobs.filter(j => j.proId === proId && activeStatuses.includes(j.status));
  }
  return mockJobs.filter(j => activeStatuses.includes(j.status));
};

export const getCompletedJobs = (proId?: string): Job[] => {
  if (proId) {
    return mockJobs.filter(j => j.proId === proId && j.status === 'completed');
  }
  return mockJobs.filter(j => j.status === 'completed');
};

export const getJobsByQuote = (quoteId: string): Job | undefined => {
  return mockJobs.find(j => j.quoteId === quoteId);
};

export const getUpcomingJobs = (days: number = 7): Job[] => {
  const now = new Date();
  const futureDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

  return mockJobs.filter(j => {
    if (!j.scheduledDate) return false;
    return j.scheduledDate >= now && j.scheduledDate <= futureDate;
  });
};

// Get jobs grouped by status
export const getJobsByStatusGroup = (): Record<JobStatus, Job[]> => {
  const groups: Record<JobStatus, Job[]> = {
    'quote-sent': [],
    'materials-ordered': [],
    'scheduled': [],
    'in-progress': [],
    'completed': [],
    'cancelled': []
  };

  mockJobs.forEach(job => {
    groups[job.status].push(job);
  });

  return groups;
};

// Calculate job metrics
export const getJobMetrics = (proId?: string) => {
  const jobs = proId ? getJobsByPro(proId) : mockJobs;

  return {
    total: jobs.length,
    quoteSent: jobs.filter(j => j.status === 'quote-sent').length,
    materialsOrdered: jobs.filter(j => j.status === 'materials-ordered').length,
    scheduled: jobs.filter(j => j.status === 'scheduled').length,
    inProgress: jobs.filter(j => j.status === 'in-progress').length,
    completed: jobs.filter(j => j.status === 'completed').length,
    cancelled: jobs.filter(j => j.status === 'cancelled').length,
    active: jobs.filter(j => ['scheduled', 'in-progress', 'materials-ordered'].includes(j.status)).length
  };
};

// Validate job data integrity
export const validateJobData = (): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  mockJobs.forEach(job => {
    // Validate completion date logic
    if (job.status === 'completed' && !job.completionDate) {
      errors.push(`${job.id}: Completed job missing completion date`);
    }

    // Validate scheduled date for certain statuses
    if (['scheduled', 'in-progress'].includes(job.status) && !job.scheduledDate) {
      errors.push(`${job.id}: ${job.status} job missing scheduled date`);
    }

    // Validate completion date is after scheduled date
    if (job.scheduledDate && job.completionDate && job.completionDate < job.scheduledDate) {
      errors.push(`${job.id}: Completion date before scheduled date`);
    }
  });

  return {
    valid: errors.length === 0,
    errors
  };
};
