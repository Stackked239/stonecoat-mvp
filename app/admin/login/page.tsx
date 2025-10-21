'use client';

/**
 * Admin Login Page
 * Authentication for Stonecoat administrators to access master dashboard
 * MVP: Simulated auth with localStorage
 */

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/shared/Input';
import { Button } from '@/components/shared/Button';
import { validateAdminLogin, setAdminSession } from '@/lib/utils/auth';
import { EnvelopeIcon, LockClosedIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

export default function AdminLoginPage() {
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
      const isValid = validateAdminLogin(email, password);

      if (!isValid) {
        setError('Invalid email or password.');
        setIsLoading(false);
        return;
      }

      // Store session
      setAdminSession();

      // Redirect to dashboard
      router.push('/admin/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
              <ShieldCheckIcon className="w-8 h-8 text-slate-700" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Admin Portal
            </h1>
            <p className="text-gray-600">
              Stonecoat Master Dashboard
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
              placeholder="admin@stonecoat.com"
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
              className="bg-slate-800 hover:bg-slate-900 focus:ring-slate-700"
            >
              {isLoading ? 'Logging in...' : 'Login to Dashboard'}
            </Button>
          </form>

          {/* Demo Credentials Info */}
          <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-xs text-slate-600 font-medium mb-2">
              Demo Credentials:
            </p>
            <div className="space-y-1 text-xs text-slate-700 font-mono">
              <p>
                <span className="font-semibold">Email:</span> admin@stonecoat.com
              </p>
              <p>
                <span className="font-semibold">Password:</span> admin123
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-slate-300 mt-6">
          Restricted access - Stonecoat administrators only
        </p>
      </div>
    </div>
  );
}
