import Link from 'next/link';
import { HomeIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Display */}
        <div className="mb-8">
          <h1 className="font-bebas text-9xl text-brand-orange mb-2">404</h1>
          <div className="h-1 w-24 bg-brand-orange mx-auto mb-4"></div>
        </div>

        {/* Message */}
        <h2 className="text-2xl font-bold text-brand-black mb-4">
          Page Not Found
        </h2>
        <p className="text-brand-black/70 mb-8 leading-relaxed">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
          It may have been moved or doesn&apos;t exist.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-orange text-white font-semibold rounded-lg hover:bg-brand-orange/90 transition-colors"
          >
            <HomeIcon className="w-5 h-5" />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-brand-black text-brand-black font-semibold rounded-lg hover:bg-brand-black hover:text-white transition-colors"
          >
            Go Back
          </button>
        </div>

        {/* Additional Help */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-brand-black/60 mb-2">Need help?</p>
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
