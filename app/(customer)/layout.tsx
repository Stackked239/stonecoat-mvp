/**
 * Customer Portal Layout
 * Public-facing portal - no authentication required
 * Includes navbar and footer across all customer pages
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { CUSTOMER_NAV_LINKS } from '@/lib/utils/constants';

export const metadata: Metadata = {
  title: 'Stonecoat - Premium Epoxy Flooring',
  description: 'Connect with certified epoxy flooring contractors in Florida. Get free quotes from top-rated professionals.',
};

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar */}
      <nav className="border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="text-2xl font-bold text-blue-600">
                Stonecoat
              </div>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-6">
              {CUSTOMER_NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50">{children}</main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Company Info */}
            <div>
              <h3 className="mb-3 text-lg font-bold text-gray-900">
                Stonecoat
              </h3>
              <p className="text-sm text-gray-600">
                Florida&apos;s premier network of certified epoxy flooring contractors. Quality work, trusted professionals.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-900">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-sm text-gray-600 hover:text-blue-600">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/request-quote" className="text-sm text-gray-600 hover:text-blue-600">
                    Request Quote
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-900">
                Contact
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>support@stonecoat.com</li>
                <li>(813) 555-COAT</li>
                <li>Tampa, Florida</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8 text-center">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Stonecoat. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
