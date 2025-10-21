'use client';

/**
 * Admin Portal Layout
 * Authenticated layout for Stonecoat master dashboard
 * Includes navigation, user menu, and protected route logic
 */

import { ReactNode, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { getAdminSession, clearAdminSession } from '@/lib/utils/auth';
import {
  HomeIcon,
  DocumentTextIcon,
  UsersIcon,
  CubeIcon,
  ArrowRightOnRectangleIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const [session, setSession] = useState(getAdminSession());
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Wait for client-side hydration
  useEffect(() => {
    setIsClient(true);
    setSession(getAdminSession());
  }, []);

  // Update session when pathname changes (to catch login redirects)
  useEffect(() => {
    if (isClient) {
      setSession(getAdminSession());
    }
  }, [isClient, pathname]);

  // Protected route logic - redirect to login if not authenticated
  useEffect(() => {
    if (isClient && !session && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [isClient, session, pathname, router]);

  const handleLogout = () => {
    clearAdminSession();
    setSession(null);
    router.push('/admin/login');
  };

  // Don't show layout on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Show loading state during hydration
  if (!isClient) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show nothing if not authenticated (will redirect)
  if (!session) {
    return null;
  }

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
    { name: 'Quotes', href: '/admin/quotes', icon: DocumentTextIcon },
    { name: 'Contractors', href: '/admin/pros', icon: UsersIcon },
    { name: 'Inventory', href: '/admin/inventory', icon: CubeIcon },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation Bar */}
      <nav className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-8">
              <Link href="/admin/dashboard" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                  <ShieldCheckIcon className="w-6 h-6 text-slate-100" />
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">Stonecoat Admin</div>
                  <div className="text-xs text-slate-300">Master Dashboard</div>
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
                            ? 'bg-slate-700 text-white'
                            : 'text-slate-300 hover:bg-slate-700 hover:text-white'
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
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-700 transition-colors"
              >
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-medium text-gray-900">
                    Administrator
                  </div>
                  <div className="text-xs text-slate-300">{session.email}</div>
                </div>
                <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
                  <span className="text-slate-100 font-semibold text-sm">
                    A
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
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                    {/* Admin Info */}
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="text-sm font-medium text-slate-900">
                        Administrator
                      </p>
                      <p className="text-xs text-slate-600 mt-1">{session.email}</p>
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
      <div className="md:hidden bg-slate-800 border-b border-slate-700 px-4 py-2 overflow-x-auto">
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
                      ? 'bg-slate-700 text-white'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
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
      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-600">
              &copy; 2024 Stonecoat. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-slate-600 hover:text-slate-900">
                Admin Docs
              </a>
              <a href="#" className="text-slate-600 hover:text-slate-900">
                Support
              </a>
              <a href="#" className="text-slate-600 hover:text-slate-900">
                Security
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
