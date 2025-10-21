'use client';

/**
 * Pro Login Page
 * Authentication for contractors to access their portal
 * MVP: Simulated auth with localStorage
 */

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/shared/Input';
import { Button } from '@/components/shared/Button';
import { validateProLogin, setProSession } from '@/lib/utils/auth';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

export default function ProLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validate credentials
      const proId = validateProLogin(email, password);

      if (!proId) {
        setError('Invalid email or password. Use any pro email and password "demo".');
        setIsLoading(false);
        return;
      }

      // Store session
      setProSession(proId);

      // Redirect to dashboard
      router.push('/pro/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Pro Portal Login
            </h1>
            <p className="text-gray-600">
              Access your contractor dashboard
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              disabled={isLoading}
              startIcon={<EnvelopeIcon className="w-5 h-5" />}
            />

            {/* Password Input */}
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              disabled={isLoading}
              startIcon={<LockClosedIcon className="w-5 h-5" />}
            />

            {/* Error Message */}
            {error && (
              <div className="bg-error-50 border border-error-200 rounded-lg p-4">
                <p className="text-sm text-error-700 flex items-start gap-2">
                  <svg
                    className="w-5 h-5 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {error}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          {/* Demo Credentials Info */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-600 font-medium mb-2">
              Demo Credentials:
            </p>
            <div className="space-y-1 text-xs text-gray-600">
              <p>
                <span className="font-medium">Email:</span> Any email from mockPros
                (e.g., mike@tampacoatings.com)
              </p>
              <p>
                <span className="font-medium">Password:</span> demo
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Need access?{' '}
          <a href="mailto:support@stonecoat.com" className="text-primary-600 hover:text-primary-700 font-medium">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
}
