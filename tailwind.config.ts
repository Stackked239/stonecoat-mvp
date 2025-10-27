import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Stone Coat Brand Colors
        brand: {
          orange: '#B75533',
          black: '#221F20',
          white: '#FFFFFF',
        },
        accent: {
          blue: '#526D9D',
          gold: '#C8944E',
          green: '#3E6855',
        },
        // Semantic colors (using brand palette)
        success: '#3E6855',
        warning: '#C8944E',
        error: '#B75533',
        info: '#526D9D',
      },
      fontFamily: {
        // Primary font - use for everything by default
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
        // Display font - use for large headers
        bebas: ['var(--font-bebas)', 'sans-serif'],
        // Script fonts - use sparingly for emphasis
        campfire: ['var(--font-campfire)', 'cursive'],
        script: ['var(--font-script)', 'cursive'],
        // Default sans to Montserrat
        sans: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Typography hierarchy based on brand guidelines
        'hero': ['3.5rem', { lineHeight: '1.1', fontWeight: '400' }],      // 56px - for Bebas Neue
        'display-lg': ['3rem', { lineHeight: '1.1', fontWeight: '400' }],  // 48px - for Bebas Neue
        'display': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],   // 40px
        'h1': ['2rem', { lineHeight: '1.3', fontWeight: '700' }],          // 32px
        'h2': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],        // 24px
        'h3': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],       // 20px
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }], // 18px
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],        // 16px
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }], // 14px
        'caption': ['0.75rem', { lineHeight: '1.4', fontWeight: '400' }],  // 12px
      },
      backgroundImage: {
        'kraft-paper': "url('/textures/kraft-paper.jpg')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'brand-sm': '0 1px 2px 0 rgba(34, 31, 32, 0.05)',
        'brand': '0 4px 6px -1px rgba(34, 31, 32, 0.1), 0 2px 4px -1px rgba(34, 31, 32, 0.06)',
        'brand-md': '0 10px 15px -3px rgba(34, 31, 32, 0.1), 0 4px 6px -2px rgba(34, 31, 32, 0.05)',
        'brand-lg': '0 20px 25px -5px rgba(34, 31, 32, 0.1), 0 10px 10px -5px rgba(34, 31, 32, 0.04)',
        'brand-xl': '0 25px 50px -12px rgba(34, 31, 32, 0.25)',
      },
      borderRadius: {
        'brand-sm': '0.375rem', // 6px
        'brand': '0.5rem',      // 8px
        'brand-lg': '0.75rem',  // 12px
        'brand-xl': '1rem',     // 16px
      },
      spacing: {
        // Additional spacing for brand consistency
        '18': '4.5rem',   // 72px
        '22': '5.5rem',   // 88px
        '26': '6.5rem',   // 104px
        '30': '7.5rem',   // 120px
      },
      maxWidth: {
        'brand-narrow': '42rem',   // 672px - for focused content
        'brand-content': '65rem',  // 1040px - for main content
        'brand-wide': '80rem',     // 1280px - for full width sections
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
