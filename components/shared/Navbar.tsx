'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

interface NavLink {
  href: string;
  label: string;
}

interface NavbarProps {
  brandName: string;
  brandHref?: string;
  links: NavLink[];
  userMenu?: React.ReactNode;
  className?: string;
}

export default function Navbar({
  brandName,
  brandHref = '/',
  links,
  userMenu,
  className
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActiveRoute = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={clsx('bg-white border-b border-gray-200', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand/Logo - Dark Theme */}
          <div className="flex-shrink-0">
            <Link
              href={brandHref}
              className="text-xl font-bold text-primary-600 hover:text-primary-500 transition-colors"
            >
              {brandName}
            </Link>
          </div>

          {/* Desktop Navigation - Dark Theme */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'text-sm font-medium transition-colors',
                  isActiveRoute(link.href)
                    ? 'text-primary-600 border-b-2 border-primary-600 pb-0.5'
                    : 'text-gray-700 hover:text-gray-900'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* User Menu (Desktop) */}
          {userMenu && (
            <div className="hidden md:flex md:items-center">
              {userMenu}
            </div>
          )}

          {/* Mobile Menu Button - Dark Theme */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-900 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600 rounded-lg p-2"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Dark Theme */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className={clsx(
                  'block px-3 py-2 rounded-lg text-base font-medium transition-colors',
                  isActiveRoute(link.href)
                    ? 'bg-primary-600/10 text-primary-600'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* User Menu (Mobile) */}
          {userMenu && (
            <div className="border-t border-gray-200 px-4 py-3">
              {userMenu}
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
