'use client';

import Link from 'next/link';
import { clsx } from 'clsx';

interface FooterLink {
  href: string;
  label: string;
}

interface SocialLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface FooterProps {
  companyName?: string;
  tagline?: string;
  links?: FooterLink[];
  socialLinks?: SocialLink[];
  className?: string;
}

export default function Footer({
  companyName = 'Stonecoat',
  tagline = 'Professional epoxy flooring solutions',
  links = [
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' }
  ],
  socialLinks,
  className
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={clsx('bg-brand-black text-white', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-brand-orange">{companyName}™</h3>
              <p className="mt-2 text-sm text-white/80">{tagline}</p>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Links
            </h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-brand-orange transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media (Optional) */}
          {socialLinks && socialLinks.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
                Connect
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-brand-orange transition-colors"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-white/20">
          <p className="text-sm text-white/60 text-center">
            &copy; {currentYear} {companyName}™. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
