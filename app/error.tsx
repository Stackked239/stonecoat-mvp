'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="mb-8 flex justify-center">
          <div className="bg-brand-orange/10 rounded-full p-6">
            <ExclamationTriangleIcon className="w-16 h-16 text-brand-orange" />
          </div>
        </div>

        {/* Message */}
        <h2 className="text-2xl font-bold text-brand-black mb-4">
          Something Went Wrong
        </h2>
        <p className="text-brand-black/70 mb-8 leading-relaxed">
          We encountered an unexpected error. Our team has been notified and
          is working to fix the issue.
        </p>

        {/* Error Details (Development) */}
        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
            <p className="text-sm font-mono text-red-800 break-words">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-red-600 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-orange text-white font-semibold rounded-lg hover:bg-brand-orange/90 transition-colors"
          >
            <ArrowPathIcon className="w-5 h-5" />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-brand-black text-brand-black font-semibold rounded-lg hover:bg-brand-black hover:text-white transition-colors"
          >
            Go to Home
          </Link>
        </div>

        {/* Additional Help */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-brand-black/60 mb-2">
            If this problem persists
          </p>
          <Link
            href="/contact"
            className="text-sm text-brand-orange hover:text-brand-orange/80 font-medium"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
