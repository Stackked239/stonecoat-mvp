/**
 * Customer Portal - Landing Page
 * Public-facing homepage with hero, features, how-it-works, and CTA
 */

import Link from 'next/link';
import { Button } from '@/components/shared/Button';
import { Card } from '@/components/shared/Card';
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
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Premium Epoxy Flooring,
              <br />
              Certified Professionals
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-blue-100 sm:text-xl">
              Connect with Florida&apos;s top-rated epoxy flooring contractors. Get free quotes from 3-4 certified pros in minutes.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/request-quote">
                <Button size="lg" variant="primary" className="bg-white text-blue-600 hover:bg-gray-100 focus:ring-blue-600">
                  Request Free Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Why Choose Stonecoat?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            We connect you with the best epoxy flooring professionals in Florida
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Feature 1 */}
          <Card hoverable padding="lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
              <ShieldCheckIcon className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              Certified Contractors
            </h3>
            <p className="text-gray-600">
              All pros are Stonecoat certified with verified credentials and insurance.
            </p>
          </Card>

          {/* Feature 2 */}
          <Card hoverable padding="lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
              <StarIcon className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              Top-Rated Professionals
            </h3>
            <p className="text-gray-600">
              Average 4.8-star rating from thousands of satisfied customers.
            </p>
          </Card>

          {/* Feature 3 */}
          <Card hoverable padding="lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
              <ClockIcon className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              Fast Response
            </h3>
            <p className="text-gray-600">
              Get matched with 3-4 qualified pros within minutes of your request.
            </p>
          </Card>

          {/* Feature 4 */}
          <Card hoverable padding="lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100">
              <UserGroupIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              Multiple Quotes
            </h3>
            <p className="text-gray-600">
              Compare quotes from multiple contractors to find the best fit for your project.
            </p>
          </Card>

          {/* Feature 5 */}
          <Card hoverable padding="lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-pink-100">
              <CurrencyDollarIcon className="h-6 w-6 text-pink-600" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              Competitive Pricing
            </h3>
            <p className="text-gray-600">
              Our network ensures fair, competitive pricing for all projects.
            </p>
          </Card>

          {/* Feature 6 */}
          <Card hoverable padding="lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100">
              <CheckCircleIcon className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              Quality Guaranteed
            </h3>
            <p className="text-gray-600">
              All work backed by contractor warranties and Stonecoat quality standards.
            </p>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              How It Works
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Get started with your epoxy flooring project in three simple steps
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
                  1
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Submit Your Request
              </h3>
              <p className="text-gray-600">
                Fill out our simple form with your project details and location. Takes less than 2 minutes.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
                  2
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Get Matched with Pros
              </h3>
              <p className="text-gray-600">
                We instantly match you with 3-4 certified contractors in your area who specialize in your project type.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
                  3
                </div>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Compare & Choose
              </h3>
              <p className="text-gray-600">
                Receive quotes, review contractor profiles, and select the best pro for your project.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold">
            Ready to Transform Your Space?
          </h2>
          <p className="mb-8 text-lg text-blue-100">
            Join thousands of satisfied customers who found their perfect contractor through Stonecoat.
          </p>
          <Link href="/request-quote">
            <Button size="lg" variant="primary" className="bg-white text-blue-600 hover:bg-gray-100 focus:ring-blue-600">
              Request Free Quote Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
