# Stonecoat Theme Quick Reference

## Color Palette

### Primary (Brand Blue)
```jsx
bg-primary-50    /* Lightest blue background */
bg-primary-500   /* Standard blue */
bg-primary-600   /* Main brand blue - USE THIS */
bg-primary-700   /* Darker blue for hover states */
text-primary-600 /* Blue text */
border-primary-600 /* Blue borders */
```

### Status Colors
```jsx
/* Success - Green */
bg-success-50 text-success-700  /* Light green background with dark text */
bg-success-600                   /* Solid green */

/* Warning - Yellow */
bg-warning-50 text-warning-700   /* Light yellow background */
bg-warning-600                    /* Solid yellow */

/* Error - Red */
bg-error-50 text-error-700       /* Light red background */
bg-error-600                      /* Solid red */
```

### Neutrals (Gray Scale)
```jsx
bg-gray-50      /* Lightest gray - page backgrounds */
bg-gray-100     /* Very light gray */
bg-gray-200     /* Light gray - borders */
bg-gray-800     /* Dark gray - text */
bg-gray-900     /* Darkest gray - headings */
```

## Pre-built Components

### Buttons
```jsx
<button className="btn-primary">Primary Action</button>
<button className="btn-secondary">Secondary Action</button>
<button className="btn-outline">Outlined Button</button>

/* Or custom: */
<button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
  Custom Button
</button>
```

### Cards
```jsx
<div className="card">
  <h3 className="text-xl font-semibold mb-4">Card Title</h3>
  <p>Card content goes here</p>
</div>

/* Or custom: */
<div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
  Content
</div>
```

### Form Inputs
```jsx
<input
  type="text"
  className="input-field"
  placeholder="Enter text..."
/>

/* Or custom: */
<input
  type="email"
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
  placeholder="email@example.com"
/>
```

### Badges
```jsx
<span className="badge badge-success">Active</span>
<span className="badge badge-warning">Pending</span>
<span className="badge badge-error">Failed</span>
<span className="badge badge-primary">New</span>

/* Custom badge: */
<span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
  Custom
</span>
```

## Common Layout Patterns

### Page Container
```jsx
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <h1 className="text-3xl font-bold mb-8">Page Title</h1>
  {/* Content */}
</div>
```

### Grid Layout
```jsx
{/* 1 column mobile, 2 tablet, 3 desktop */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div className="card">Item 1</div>
  <div className="card">Item 2</div>
  <div className="card">Item 3</div>
</div>
```

### Flex Layout
```jsx
{/* Horizontal with space between */}
<div className="flex items-center justify-between gap-4">
  <h2>Title</h2>
  <button className="btn-primary">Action</button>
</div>

{/* Vertical stack */}
<div className="flex flex-col gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

### Responsive Stack
```jsx
{/* Stack mobile, horizontal desktop */}
<div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
  <div>Left content</div>
  <div>Right content</div>
</div>
```

## Typography Scale

```jsx
<h1 className="text-4xl font-bold">Main Heading</h1>
<h2 className="text-3xl font-bold">Section Heading</h2>
<h3 className="text-2xl font-semibold">Subsection</h3>
<h4 className="text-xl font-semibold">Card Title</h4>
<p className="text-base leading-7">Body text</p>
<p className="text-sm text-gray-600">Small text</p>
<p className="text-xs text-gray-500">Tiny text</p>
```

## Spacing Scale

```jsx
/* Padding */
p-2  /* 0.5rem = 8px */
p-4  /* 1rem = 16px */
p-6  /* 1.5rem = 24px */
p-8  /* 2rem = 32px */

/* Margin */
mb-4 /* margin-bottom: 1rem */
mt-8 /* margin-top: 2rem */

/* Gap (for flex/grid) */
gap-4  /* 1rem gap */
gap-6  /* 1.5rem gap */
gap-8  /* 2rem gap */

/* Space between children */
space-y-4  /* vertical spacing */
space-x-4  /* horizontal spacing */
```

## Common Combinations

### Primary CTA Button
```jsx
<button className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg">
  Get Started
</button>
```

### Info Card with Icon
```jsx
<div className="card flex items-start gap-4">
  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
    <IconComponent className="w-6 h-6 text-primary-600" />
  </div>
  <div className="flex-1">
    <h4 className="text-lg font-semibold mb-2">Card Title</h4>
    <p className="text-gray-600">Description text goes here</p>
  </div>
</div>
```

### Alert Box
```jsx
{/* Success */}
<div className="bg-success-50 border border-success-500 rounded-lg p-4">
  <p className="text-success-700 font-medium">Success message</p>
</div>

{/* Error */}
<div className="bg-error-50 border border-error-500 rounded-lg p-4">
  <p className="text-error-700 font-medium">Error message</p>
</div>
```

### Data Table Row
```jsx
<div className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors">
  <div className="px-6 py-4 flex items-center justify-between">
    <span className="font-medium text-gray-900">Item Name</span>
    <span className="badge badge-success">Active</span>
  </div>
</div>
```

## Responsive Breakpoints

```jsx
/* Mobile first approach */
sm:  /* 640px and up */
md:  /* 768px and up */
lg:  /* 1024px and up */
xl:  /* 1280px and up */
2xl: /* 1536px and up */

/* Example: */
<div className="text-sm md:text-base lg:text-lg">
  Responsive text size
</div>
```

## Interactive States

```jsx
/* Hover */
hover:bg-primary-700
hover:shadow-lg
hover:scale-105

/* Focus (for forms) */
focus:ring-2
focus:ring-primary-500
focus:border-primary-500

/* Active (button press) */
active:scale-95

/* Disabled */
disabled:opacity-50
disabled:cursor-not-allowed

/* Example button with all states: */
<button className="
  px-4 py-2
  bg-primary-600 text-white
  rounded-lg font-medium
  hover:bg-primary-700
  active:scale-95
  disabled:opacity-50 disabled:cursor-not-allowed
  transition-all duration-200
">
  Interactive Button
</button>
```

## Transitions & Animations

```jsx
/* Quick fade */
transition-opacity duration-200

/* Color change */
transition-colors duration-300

/* Transform effects */
transition-transform duration-200
hover:scale-105

/* All properties */
transition-all duration-300

/* Example smooth card: */
<div className="card transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
  Smooth hover effect
</div>
```

## Accessibility Tips

```jsx
/* Focus visible for keyboard navigation */
focus:ring-2 focus:ring-primary-500 focus:outline-none

/* Screen reader only text */
<span className="sr-only">Screen reader text</span>

/* Proper button contrast */
<button className="bg-primary-600 text-white">
  Good contrast
</button>

/* ARIA labels */
<button aria-label="Close dialog" className="...">
  ×
</button>
```

## Files
- **Configuration**: `/Users/austinwarren/Stone-Coat MVP/stonecoat-mvp/app/globals.css`
- **Prettier Config**: `/Users/austinwarren/Stone-Coat MVP/stonecoat-mvp/.prettierrc`
- **Full Documentation**: `/Users/austinwarren/Stone-Coat MVP/stonecoat-mvp/TAILWIND_CONFIG.md`
