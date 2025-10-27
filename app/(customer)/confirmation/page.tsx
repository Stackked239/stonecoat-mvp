'use client';

/**
 * Customer Portal - Confirmation Page
 * Displays matched contractors after quote request submission
 * Shows 3-4 best-fit pros based on matching algorithm
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/shared/Button';
import { Card } from '@/components/shared/Card';
import { Badge, StatusBadge, Spinner } from '@/components/shared/Badge';
import { matchProsToRequest, getMatchExplanation } from '@/lib/utils/matching';
import { getZipCodeData } from '@/lib/data/mockZipCodeData';
import { mockPros } from '@/lib/data/mockPros';
import { PROJECT_TYPE_CONFIG } from '@/lib/utils/constants';
import type { Quote, ProjectType, Pro } from '@/lib/types';
import {
  CheckCircleIcon,
  StarIcon,
  MapPinIcon,
  ShieldCheckIcon,
  PhoneIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';

type ProWithMatchData = Pro & { matchScore?: number; distance?: number };

export default function ConfirmationPage() {
  const router = useRouter();
  const [matchedPros, setMatchedPros] = useState<ProWithMatchData[]>([]);
  const [loading, setLoading] = useState(true);
  const [customerName, setCustomerName] = useState('');
  const [projectInfo, setProjectInfo] = useState({ type: '', squareFootage: 0 });

  useEffect(() => {
    // Retrieve form data from sessionStorage
    const storedData = sessionStorage.getItem('quoteRequest');

    if (!storedData) {
      // No request data found, redirect to request page
      router.push('/request-quote');
      return;
    }

    try {
      const formData = JSON.parse(storedData);
      setCustomerName(formData.name);
      setProjectInfo({
        type: formData.projectType,
        squareFootage: parseFloat(formData.squareFootage) || 0,
      });

      // Get ZIP code coordinates
      const zipData = getZipCodeData(formData.zipCode);

      if (!zipData) {
        router.push('/request-quote');
        return;
      }

      // Create a mock quote object for matching
      const quoteRequest: Quote = {
        id: 'temp-' + Date.now(),
        type: 'customer-initiated',
        status: 'requested',
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: {
            street: formData.street || '',
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            lat: zipData.coordinates.lat,
            lng: zipData.coordinates.lng,
          },
        },
        project: {
          type: formData.projectType as ProjectType,
          squareFootage: parseFloat(formData.squareFootage) || 0,
          description: formData.description || '',
          timeline: formData.timeline || '1-2-weeks',
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Match pros to the request
      // Type assertion needed because mockPros uses slightly different Pro structure
      const matches = matchProsToRequest(
        quoteRequest,
        mockPros as any,
        4
      ) as any as ProWithMatchData[];
      setMatchedPros(matches);
      setLoading(false);
    } catch (error) {
      console.error('Error processing quote request:', error);
      router.push('/request-quote');
    }
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" className="mx-auto mb-4" />
          <p className="text-lg text-brand-black/70">Finding the best contractors for you...</p>
        </div>
      </div>
    );
  }

  if (matchedPros.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center sm:px-6 lg:px-8">
        <div className="mb-6 text-6xl">😔</div>
        <h1 className="font-bebas text-3xl md:text-4xl text-brand-black mb-4">
          No Contractors Available
        </h1>
        <p className="mb-8 text-lg text-brand-black/70">
          We couldn&apos;t find any certified contractors in your area at this time. Please try a different ZIP code or contact us directly.
        </p>
        <Link href="/request-quote">
          <Button variant="primary">Try Another Location</Button>
        </Link>
      </div>
    );
  }

  const projectConfig = PROJECT_TYPE_CONFIG[projectInfo.type as keyof typeof PROJECT_TYPE_CONFIG];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Success Header */}
      <div className="mb-8 text-center">
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-accent-green/20 p-3">
            <CheckCircleIcon className="h-12 w-12 text-accent-green" />
          </div>
        </div>
        <h1 className="font-bebas text-4xl md:text-5xl text-brand-black mb-3">
          Request Submitted Successfully!
        </h1>
        <p className="text-lg text-brand-black/70">
          Hi {customerName}, we&apos;ve matched you with {matchedPros.length} certified contractors
        </p>
      </div>

      {/* Project Summary */}
      <Card padding="lg" className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-brand-black">
          Your Project
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-brand-black/60">Project Type</p>
            <p className="font-medium text-brand-black">
              {projectConfig?.label || projectInfo.type}
            </p>
          </div>
          <div>
            <p className="text-sm text-brand-black/60">Square Footage</p>
            <p className="font-medium text-brand-black">
              {projectInfo.squareFootage.toLocaleString()} sq ft
            </p>
          </div>
        </div>
      </Card>

      {/* Matched Pros */}
      <div className="mb-8">
        <h2 className="mb-6 text-2xl font-bold text-brand-black">
          Your Matched Contractors
        </h2>
        <div className="space-y-6">
          {matchedPros.map((pro) => {
            const reasons = getMatchExplanation(pro);

            return (
              <Card key={pro.id} hover padding="lg">
                <div className="flex flex-col gap-6 lg:flex-row">
                  {/* Pro Info */}
                  <div className="flex-1">
                    <div className="mb-3 flex items-start justify-between">
                      <div>
                        <h3 className="mb-1 text-xl font-bold text-brand-black">
                          {pro.businessName}
                        </h3>
                        <p className="text-sm text-brand-black/60">
                          {(pro as any).contactPerson || pro.ownerName}
                        </p>
                      </div>
                      {pro.certificationLevel === 'master' && (
                        <Badge variant="blue" className="flex items-center gap-1">
                          <ShieldCheckIcon className="h-4 w-4" />
                          <span className="text-sm font-medium">Master Certified</span>
                        </Badge>
                      )}
                    </div>

                    {/* Rating and Distance */}
                    <div className="mb-4 flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <StarIcon className="h-5 w-5 fill-accent-gold text-accent-gold" />
                        <span className="font-semibold text-brand-black">
                          {pro.metrics.customerRating}
                        </span>
                        <span className="text-brand-black/60">
                          ({(pro as any).metrics.completedJobs || pro.metrics.jobsCompletedLast30} jobs)
                        </span>
                      </div>
                      {pro.distance !== undefined && (
                        <div className="flex items-center gap-1 text-brand-black/60">
                          <MapPinIcon className="h-4 w-4" />
                          {pro.distance.toFixed(1)} miles away
                        </div>
                      )}
                    </div>

                    {/* Match Reasons */}
                    <div className="mb-4">
                      <p className="mb-2 text-sm font-medium text-brand-black/70">
                        Why this pro is a great match:
                      </p>
                      <ul className="space-y-1">
                        {reasons.map((reason, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-brand-black/70">
                            <CheckCircleIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-green" />
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Specialties */}
                    {pro.specialties && pro.specialties.length > 0 && (
                      <div className="mb-4">
                        <p className="mb-2 text-sm font-medium text-brand-black/70">
                          Specialties:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {pro.specialties.map((specialty) => (
                            <Badge
                              key={specialty}
                              variant="gray"
                              size="sm"
                            >
                              {specialty.replace('-', ' ')}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Contact Buttons */}
                    <div className="flex flex-wrap gap-3">
                      <Button
                        variant="primary"
                        size="md"
                        onClick={() => window.open(`tel:${pro.phone}`, '_self')}
                      >
                        <PhoneIcon className="mr-2 h-4 w-4" />
                        Call Now
                      </Button>
                      <Button
                        variant="outline"
                        size="md"
                        onClick={() => window.open(`mailto:${pro.email}?subject=Quote Request from ${customerName}`, '_blank')}
                      >
                        <EnvelopeIcon className="mr-2 h-4 w-4" />
                        Email
                      </Button>
                    </div>
                  </div>

                  {/* Match Score Badge (for demo purposes) */}
                  {pro.matchScore !== undefined && (
                    <div className="lg:w-32">
                      <div className="rounded-lg bg-accent-blue/10 p-4 text-center border border-accent-blue/20">
                        <p className="mb-1 text-sm font-medium text-accent-blue">
                          Match Score
                        </p>
                        <p className="text-3xl font-bold text-accent-blue">
                          {Math.round(pro.matchScore)}
                        </p>
                        <p className="text-xs text-accent-blue/70">out of 100</p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Next Steps */}
      <Card padding="lg" className="bg-accent-blue/10 border border-accent-blue/20">
        <h2 className="mb-4 text-xl font-semibold text-brand-black">
          What Happens Next?
        </h2>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-orange text-sm font-bold text-white">
              1
            </div>
            <p className="text-brand-black/70">
              Contact the contractors above directly to discuss your project and schedule consultations
            </p>
          </li>
          <li className="flex items-start gap-3">
            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-orange text-sm font-bold text-white">
              2
            </div>
            <p className="text-brand-black/70">
              Contractors will provide detailed quotes and project timelines
            </p>
          </li>
          <li className="flex items-start gap-3">
            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-orange text-sm font-bold text-white">
              3
            </div>
            <p className="text-brand-black/70">
              Compare quotes and select the contractor that best fits your needs
            </p>
          </li>
        </ul>
      </Card>

      {/* Action Buttons */}
      <div className="mt-8 text-center">
        <Link href="/request-quote">
          <Button variant="outline" size="lg">
            Request Another Quote
          </Button>
        </Link>
      </div>
    </div>
  );
}
