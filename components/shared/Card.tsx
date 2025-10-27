'use client';

/**
 * Stone Coat Countertops - Card Component
 * 
 * Branded card component following Stone Coat design guidelines
 */

import React from 'react';

type CardVariant = 'default' | 'feature' | 'pricing' | 'stat' | 'kraft';
type CardPadding = 'none' | 'sm' | 'md' | 'lg';

interface CardProps {
  variant?: CardVariant;
  padding?: CardPadding;
  hover?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const baseStyles = 'rounded-lg transition-all duration-200';

const variantStyles: Record<CardVariant, string> = {
  default: `
    bg-white border border-gray-200 
    shadow-brand-sm hover:shadow-brand-md
  `,
  feature: `
    bg-kraft-paper border-2 border-brand-orange/20
    hover:border-brand-orange/40
  `,
  pricing: `
    bg-white border-2 border-brand-orange
    shadow-brand-lg hover:shadow-brand-xl
  `,
  stat: `
    bg-white border-l-4 border-brand-orange
    shadow-brand-sm hover:shadow-brand-md
  `,
  kraft: `
    bg-kraft-paper border border-gray-300
    shadow-sm
  `,
};

const paddingStyles: Record<CardPadding, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({
  variant = 'default',
  padding = 'md',
  hover = true,
  className = '',
  children,
  onClick,
}: CardProps) {
  const styles = [
    baseStyles,
    variantStyles[variant],
    paddingStyles[padding],
    hover ? 'cursor-pointer' : '',
    onClick ? 'cursor-pointer' : '',
    className,
  ].join(' ').replace(/\s+/g, ' ').trim();

  return (
    <div className={styles} onClick={onClick}>
      {children}
    </div>
  );
}

// Card sub-components for consistent structure

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export function CardTitle({ children, className = '', as: Component = 'h3' }: CardTitleProps) {
  return (
    <Component className={`font-semibold text-brand-black mb-2 ${className}`}>
      {children}
    </Component>
  );
}

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function CardDescription({ children, className = '' }: CardDescriptionProps) {
  return (
    <p className={`text-brand-black/70 ${className}`}>
      {children}
    </p>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return (
    <div className={`${className}`}>
      {children}
    </div>
  );
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div className={`mt-6 pt-4 border-t border-gray-200 ${className}`}>
      {children}
    </div>
  );
}

// Specialized card components

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ icon, title, description, className = '' }: FeatureCardProps) {
  return (
    <Card variant="feature" className={className}>
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-brand-orange rounded-full flex items-center justify-center text-white text-2xl mb-4 shadow-brand">
          {icon}
        </div>
        <h3 className="font-semibold text-xl text-brand-black mb-2">
          {title}
        </h3>
        <p className="text-brand-black/70">
          {description}
        </p>
      </div>
    </Card>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
  className?: string;
}

export function StatCard({ label, value, change, trend = 'neutral', icon, className = '' }: StatCardProps) {
  const trendColors = {
    up: 'text-accent-green',
    down: 'text-brand-orange',
    neutral: 'text-gray-500',
  };

  const trendIcons = {
    up: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    ),
    down: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    ),
    neutral: null,
  };

  return (
    <Card variant="stat" hover={false} className={className}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-brand-black/60 font-medium mb-1">
            {label}
          </p>
          <p className="text-3xl font-bold text-brand-black">
            {value}
          </p>
          {change && (
            <div className={`flex items-center gap-1 mt-2 text-sm font-medium ${trendColors[trend]}`}>
              {trendIcons[trend]}
              <span>{change}</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="text-brand-orange/20 text-3xl">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}

interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  features: string[];
  highlighted?: boolean;
  ctaText?: string;
  onCtaClick?: () => void;
  className?: string;
}

export function PricingCard({
  title,
  price,
  period = '/month',
  features,
  highlighted = false,
  ctaText = 'Get Started',
  onCtaClick,
  className = '',
}: PricingCardProps) {
  return (
    <Card 
      variant={highlighted ? 'pricing' : 'default'} 
      padding="lg"
      className={`relative ${highlighted ? 'transform scale-105' : ''} ${className}`}
    >
      {highlighted && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-brand-orange text-white px-4 py-1 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-brand-black mb-4">
          {title}
        </h3>
        <div className="flex items-baseline justify-center gap-2">
          <span className="text-5xl font-bold text-brand-orange">
            {price}
          </span>
          <span className="text-brand-black/60">
            {period}
          </span>
        </div>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <svg 
              className="w-5 h-5 text-accent-green flex-shrink-0 mt-0.5" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                clipRule="evenodd" 
              />
            </svg>
            <span className="text-brand-black/80">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={onCtaClick}
        className={`w-full py-3 rounded-md font-semibold transition-all ${
          highlighted
            ? 'bg-brand-orange text-white hover:bg-brand-orange/90'
            : 'border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white'
        }`}
      >
        {ctaText}
      </button>
    </Card>
  );
}

// Card Grid for layout
interface CardGridProps {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4;
  className?: string;
}

export function CardGrid({ children, cols = 3, className = '' }: CardGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid ${gridCols[cols]} gap-6 ${className}`}>
      {children}
    </div>
  );
}
