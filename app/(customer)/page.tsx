'use client';

/**
 * Customer Portal - Landing Page
 * Public-facing homepage with hero, features, how-it-works, and CTA
 */

import Link from 'next/link';
import { Button, GetStartedButton } from '@/components/shared/Button';
import { Card, FeatureCard, CardGrid } from '@/components/shared/Card';
import { SectionHeader, Divider } from '@/components/shared/Badge';
import { LogoFull } from '@/components/shared/Logo';
import {
  CheckCircleIcon,
  ShieldCheckIcon,
  ClockIcon,
  StarIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

export default function CustomerLandingPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section
        className="relative py-20 px-4 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/hero-background.svg)',
        }}
      >
        {/* Optional overlay for better text readability */}
        <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]"></div>

        <div className="relative z-10 max-w-brand-wide mx-auto">
          <div className="text-center mb-8">
            <LogoFull size="lg" className="mx-auto mb-8 drop-shadow-lg" />
          </div>

          <h1 className="font-bebas text-5xl md:text-6xl lg:text-hero text-brand-black text-center mb-6 leading-tight drop-shadow-md">
            Premium Epoxy Flooring,
            <br />
            <span className="text-brand-orange drop-shadow-md">CERTIFIED PROFESSIONALS</span>
          </h1>

          <p className="text-xl md:text-2xl text-brand-black text-center max-w-3xl mx-auto mb-10 drop-shadow-sm font-medium">
            Connect with Florida&apos;s top-rated epoxy flooring contractors. Get free quotes from 3-4 certified pros in minutes.
          </p>

          <div className="flex justify-center gap-4">
            <Link href="/request-quote">
              <Button size="lg" variant="primary" className="shadow-lg">
                Request Free Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-brand-wide mx-auto">
          <SectionHeader
            title="Why Choose Stone Coat Countertops?"
            subtitle="We connect you with the best epoxy flooring professionals in Florida"
            centered
          />

          <CardGrid cols={3}>
            <FeatureCard
              icon="🛡️"
              title="Certified Contractors"
              description="All pros are Stone Coat certified with verified credentials and insurance."
            />
            <FeatureCard
              icon="⭐"
              title="Top-Rated Professionals"
              description="Average 4.8-star rating from thousands of satisfied customers."
            />
            <FeatureCard
              icon="⚡"
              title="Fast Response"
              description="Get matched with 3-4 qualified pros within minutes of your request."
            />
            <FeatureCard
              icon="👥"
              title="Multiple Quotes"
              description="Compare quotes from multiple contractors to find the best fit for your project."
            />
            <FeatureCard
              icon="💰"
              title="Competitive Pricing"
              description="Our network ensures fair, competitive pricing for all projects."
            />
            <FeatureCard
              icon="✅"
              title="Quality Guaranteed"
              description="All work backed by contractor warranties and Stone Coat quality standards."
            />
          </CardGrid>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-brand-wide mx-auto">
          <SectionHeader
            title="How It Works"
            subtitle="Get started with your epoxy flooring project in three simple steps"
            centered
          />

          <div className="grid gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-orange text-2xl font-bold text-white">
                  1
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-brand-black">
                Submit Your Request
              </h3>
              <p className="text-brand-black/70">
                Fill out our simple form with your project details and location. Takes less than 2 minutes.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-orange text-2xl font-bold text-white">
                  2
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-brand-black">
                Get Matched with Pros
              </h3>
              <p className="text-brand-black/70">
                We instantly match you with 3-4 certified contractors in your area who specialize in your project type.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-orange text-2xl font-bold text-white">
                  3
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-brand-black">
                Compare & Choose
              </h3>
              <p className="text-brand-black/70">
                Receive quotes, review contractor profiles, and select the best pro for your project.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-orange py-16 px-4">
        <div className="max-w-brand-content mx-auto text-center">
          <h2 className="font-bebas text-4xl md:text-5xl text-white mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who found their perfect contractor through Stone Coat Countertops.
          </p>
          <Link href="/request-quote">
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-brand-orange"
            >
              Request Free Quote Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
