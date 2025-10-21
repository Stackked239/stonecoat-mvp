'use client';

import { ReactNode, useEffect } from 'react';
import { clsx } from 'clsx';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
  size = 'md'
}: ModalProps) {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop - Dark Theme */}
      <div
        className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal - Dark Theme */}
      <div className="flex min-h-full items-center justify-center p-4 relative z-50">
        <div
          className={clsx(
            'relative bg-white border border-gray-300 rounded-xl shadow-2xl w-full z-50',
            sizes[size]
          )}
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
        >
          {title && (
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-600 rounded-lg p-1 transition-colors"
                aria-label="Close modal"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
          )}

          <div className="px-6 py-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
