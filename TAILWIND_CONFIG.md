# Tailwind CSS v4 Configuration - Stonecoat MVP

## Configuration Approach

This project uses **Tailwind CSS v4**, which has a fundamentally different configuration approach than v3:

- **No `tailwind.config.ts` file needed** - Configuration is done in CSS using `@theme` directive
- **CSS-first configuration** - Theme tokens are defined directly in `app/globals.css`
- **PostCSS plugin** - Uses `@tailwindcss/postcss` instead of traditional Tailwind PostCSS setup

## Custom Theme Tokens

All custom theme configuration is in `/Users/austinwarren/Stone-Coat MVP/stonecoat-mvp/app/globals.css` within the `@theme inline {}` block.

### Brand Colors

**Primary (Blue)** - Main brand color for actions, links, CTAs
- `primary-50` through `primary-950` - Full color scale
- Main: `primary-600` (#2563eb)

**Secondary (Gray)** - Neutral scale for text, borders, backgrounds
- `secondary-50` through `secondary-950` - Full gray scale

**Accent (Red)** - Emphasis and important actions
- `accent-50`, `accent-100`, `accent-500`, `accent-600`, `accent-700`

**Success (Green)** - Positive states, confirmations
- `success-50`, `success-500`, `success-600`, `success-700`

**Warning (Yellow)** - Alerts, cautions
- `warning-50`, `warning-500`, `warning-600`, `warning-700`

**Error (Red)** - Error states, destructive actions
- `error-50`, `error-500`, `error-600`, `error-700`

### Typography

- **Font Sans**: Inter, system-ui, sans-serif stack
- **Font Heading**: Inter, system-ui, sans-serif stack

### Custom Spacing

- `spacing-128`: 32rem
- `spacing-144`: 36rem

### Custom Border Radius

- `radius-4xl`: 2rem

### Custom Shadows

- `shadow-card`: Standard card shadow
- `shadow-card-hover`: Elevated card shadow on hover

## Component Classes

Pre-built component classes for common UI patterns:

### Buttons
```css
.btn-primary    /* Primary action button */
.btn-secondary  /* Secondary action button */
.btn-outline    /* Outlined button variant */
```

### Cards
```css
.card           /* Standard card with shadow */
```

### Forms
```css
.input-field    /* Styled input with focus states */
```

### Badges
```css
.badge          /* Base badge styles */
.badge-success  /* Success state badge */
.badge-warning  /* Warning state badge */
.badge-error    /* Error state badge */
.badge-primary  /* Primary state badge */
```

## Usage Examples

### Using Custom Colors
```jsx
<button className="bg-primary-600 text-white hover:bg-primary-700">
  Click Me
</button>

<div className="bg-success-50 text-success-700 border border-success-500">
  Success message
</div>
```

### Using Component Classes
```jsx
<button className="btn-primary">Primary Action</button>
<button className="btn-outline">Secondary Action</button>

<div className="card">
  <h3>Card Title</h3>
  <p>Card content</p>
</div>

<input className="input-field" placeholder="Enter text..." />

<span className="badge badge-success">Active</span>
```

### Using Custom Spacing
```jsx
<div className="space-y-128">
  Large vertical spacing
</div>
```

## Responsive Design

Mobile-first approach using standard Tailwind breakpoints:

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Responsive grid */}
</div>

<h1 className="text-2xl md:text-3xl lg:text-4xl">
  Responsive heading
</h1>
```

## Prettier Integration

The project includes `prettier-plugin-tailwindcss` for automatic class sorting.

Run formatting:
```bash
npm run format  # or prettier --write .
```

## Adding New Theme Tokens

To add new custom tokens, edit the `@theme inline {}` block in `app/globals.css`:

```css
@theme inline {
  /* Add new color */
  --color-custom-500: #hexcode;

  /* Add new spacing */
  --spacing-custom: 20rem;

  /* Add new shadow */
  --shadow-custom: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

Then use in your classes:
```jsx
<div className="bg-custom-500 shadow-custom space-x-custom">
  Content
</div>
```

## Resources

- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs/v4-beta)
- [Tailwind v4 Migration Guide](https://tailwindcss.com/docs/upgrade-guide)
- Styling Guide: `/Users/austinwarren/Stone-Coat MVP/Get Started/13-STYLING-GUIDE.md`
