'use client';

/**
 * Pro Portal Layout
 * Authenticated layout for contractor portal
 * Includes navigation, user menu, and protected route logic
 */

import { ReactNode, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { getProSession, clearProSession } from '@/lib/utils/auth';
import {
  HomeIcon,
  DocumentTextIcon,
  ShoppingCartIcon,
  CubeIcon,
  BriefcaseIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

interface ProLayoutProps {
  children: ReactNode;
}

export default function ProLayout({ children }: ProLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const [session, setSession] = useState(getProSession());
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Wait for client-side hydration
  useEffect(() => {
    setIsClient(true);
    setSession(getProSession());
  }, []);

  // Protected route logic - redirect to login if not authenticated
  useEffect(() => {
    if (isClient && !session && pathname !== '/pro/login') {
      router.push('/pro/login');
    }
  }, [isClient, session, pathname, router]);

  const handleLogout = () => {
    clearProSession();
    setSession(null);
    router.push('/pro/login');
  };

  // Don't show layout on login page
  if (pathname === '/pro/login') {
    return <>{children}</>;
  }

  // Show loading state during hydration
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show nothing if not authenticated (will redirect)
  if (!session) {
    return null;
  }

  const navigation = [
    { name: 'Dashboard', href: '/pro/dashboard', icon: HomeIcon },
    { name: 'Quotes', href: '/pro/quotes', icon: DocumentTextIcon },
    { name: 'Jobs', href: '/pro/jobs', icon: BriefcaseIcon },
    { name: 'Inventory', href: '/pro/inventory', icon: CubeIcon },
    { name: 'Orders', href: '/pro/orders', icon: ShoppingCartIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-8">
              <Link href="/pro/dashboard" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-gray-900 font-bold text-xl">S</span>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">Stonecoat</div>
                  <div className="text-xs text-gray-600">Pro Portal</div>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`
                        flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
                        ${
                          isActive
                            ? 'bg-primary-50 text-primary-700'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }
                      `}
                    >
                      <Icon className="w-5 h-5" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-medium text-gray-900">
                    {session.businessName}
                  </div>
                  <div className="text-xs text-gray-600">{session.email}</div>
                </div>
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-700 font-semibold text-sm">
                    {session.businessName.charAt(0)}
                  </span>
                </div>
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <>
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowUserMenu(false)}
                  />

                  {/* Menu */}
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {/* Business Info */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {session.businessName}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">{session.email}</p>
                    </div>

                    {/* Logout Button */}
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-error-600 hover:bg-error-50 flex items-center gap-2 transition-colors"
                    >
                      <ArrowRightOnRectangleIcon className="w-5 h-5" />
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-white border-b border-gray-200 px-4 py-2 overflow-x-auto">
        <div className="flex gap-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors
                  ${
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              &copy; 2024 Stonecoat. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-600 hover:text-primary-600">
                Support
              </a>
              <a href="#" className="text-gray-600 hover:text-primary-600">
                Terms
              </a>
              <a href="#" className="text-gray-600 hover:text-primary-600">
                Privacy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
