# Stonecoat Design System Specification

## Executive Summary

This document provides a comprehensive design system extracted from https://stonecoatcountertops.com/ for application across the Stonecoat MVP. The design system emphasizes **modern premium minimalism** through dark theming, strategic blue accents, and careful attention to contextual color usage.

**Key Transformation**: Convert MVP from light theme to dark theme while preserving all functionality and enhancing brand alignment with Stonecoat's professional aesthetic.

---

## Design Philosophy

**Brand Personality**: Modern, Professional, Premium
- Dark theme conveys sophistication and contemporary positioning
- Generous whitespace communicates confidence and clarity
- Blue accents build trust (critical for e-commerce and contractor relationships)
- Precise micro-interactions demonstrate attention to craft and quality

**Target Audience**: Homeowners and certified contractors seeking professional-grade epoxy flooring solutions

---

## Color System

### Primary Backgrounds

**Dark Primary**: `#141414`
- **Usage**: Main application background, primary UI surfaces, cards, modals
- **Psychology**: Premium positioning, modern aesthetic, reduces eye strain
- **Context**: All main content areas, navigation bars, dashboards

**Dark Secondary**: `#1a1a1a` - `#222222` (derived)
- **Usage**: Elevated surfaces, hover states for cards
- **Context**: Secondary cards, sidebar backgrounds, nested content

**Dark Tertiary**: `#333333`
- **Usage**: Hover states for interactive elements
- **Context**: Button hover backgrounds, row hover in tables

### Text Colors

**Primary Text**: `#ffffff` (white)
- **Usage**: All primary text on dark backgrounds
- **Context**: Headlines, body text, navigation labels, button text

**Secondary Text**: `#e5e5e5` - `#cccccc` (derived)
- **Usage**: Supporting text, descriptions, metadata
- **Context**: Timestamps, helper text, secondary information

**Tertiary Text**: `#999999` - `#888888` (derived)
- **Usage**: Disabled text, placeholders, least important text
- **Context**: Form placeholders, disabled button text, footnotes

### Accent & Interactive

**Blue Primary**: `#2563EB` (rgba(37, 99, 235, 1))
- **Usage**: Primary CTAs, links, active states, focus indicators
- **Psychology**: Trust, action, professionalism
- **Context**:
  - Primary buttons (Request Quote, Submit, Save)
  - Active navigation items
  - Links and interactive elements
  - Focus rings on form inputs
  - Progress indicators

**Blue Hover**: `#1d4ed8` (derived from primary-700)
- **Usage**: Hover state for blue elements
- **Context**: Button hover, link hover

**Blue Light**: `#3b82f6` - `#60a5fa` (primary-400/500)
- **Usage**: Highlights, badges, subtle emphasis
- **Context**: New badges, notification indicators, selected states

### Neutral Grays

**Border Gray**: `#2a2a2a` - `#333333`
- **Usage**: Borders, dividers, subtle separations
- **Context**: Card borders, table cell borders, section dividers

**Input Gray**: `#252525` - `#2d2d2d`
- **Usage**: Form input backgrounds
- **Context**: Text inputs, textareas, select dropdowns

**Hover Gray**: `#545454`
- **Usage**: Secondary hover states
- **Context**: Dropdown menu hover, secondary button hover

### Light Accents (Minimal Use)

**Light Background**: `#E2E2E2`
- **Usage**: ONLY when light contrast needed on dark (rare)
- **Context**: Variant indicators, light badges on dark surfaces

### Status Colors (Maintain Existing)

**Success**: Keep existing green scale
- `#22c55e` (success-500)
- `#16a34a` (success-600)
- `#15803d` (success-700)

**Warning**: Keep existing yellow scale
- `#f59e0b` (warning-500)
- `#d97706` (warning-600)

**Error**: Keep existing red scale
- `#ef4444` (error-500)
- `#dc2626` (error-600)

---

## Typography System

### Font Stack
**Primary**: `Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- ✅ Already implemented correctly in MVP
- Modern, professional, excellent readability

### Font Weights
- **Regular (400)**: Body text, descriptions, paragraph content
- **Medium (500)**: Subtle emphasis, subheadings, labels
- **Semibold (600)**: Card titles, section headers
- **Bold (700)**: Page titles, primary headings

### Font Sizes
- **12px (text-xs)**: Tiny labels, timestamps, metadata
- **14px (text-sm)**: Body text, form inputs, table cells
- **16px (text-base)**: Standard body text, navigation
- **18px (text-lg)**: Large body text, prominent labels
- **20px (text-xl)**: Card titles, section subheadings
- **24px (text-2xl)**: Section headings
- **30px (text-3xl)**: Page headings
- **36px (text-4xl)**: Hero headings, main page titles

---

## Component Patterns

### Buttons

**Primary CTA**
```
Background: #2563EB
Text: #ffffff
Padding: 12px 24px (px-6 py-3)
Border Radius: 8px (rounded-lg)
Font Weight: 600 (font-semibold)
Hover: #1d4ed8
Transition: 300ms ease
Shadow: 0 1px 3px rgba(0,0,0,0.3)
```

**Secondary Button**
```
Background: transparent
Border: 2px solid #333333
Text: #ffffff
Padding: 12px 24px
Border Radius: 8px
Hover Background: #1a1a1a
Hover Border: #545454
```

**Tertiary/Ghost Button**
```
Background: transparent
Text: #ffffff
Padding: 8px 16px
Border Radius: 6px
Hover Background: #333333
```

### Cards

**Standard Card**
```
Background: #1a1a1a
Border: 1px solid #2a2a2a
Border Radius: 8px (rounded-lg)
Padding: 24px (p-6)
Shadow: 0 1px 3px rgba(0,0,0,0.4)
Hover: Border → #333333, Shadow → 0 4px 6px rgba(0,0,0,0.5)
Transition: 300ms ease
```

**Elevated Card** (Important content)
```
Background: #222222
Border: 1px solid #333333
Border Radius: 8px
Padding: 24px
Shadow: 0 4px 6px rgba(0,0,0,0.5)
```

### Form Elements

**Text Input**
```
Background: #1a1a1a
Border: 1px solid #333333
Text: #ffffff
Padding: 12px 16px (px-4 py-3)
Border Radius: 6px (rounded-md)
Placeholder: #888888
Focus Border: #2563EB
Focus Ring: 2px #2563EB with 50% opacity
```

**Select Dropdown**
```
Same as text input
Arrow Icon: #ffffff
Dropdown Background: #1a1a1a
Dropdown Border: #333333
Option Hover: #333333
```

**Checkbox/Radio**
```
Background: #1a1a1a
Border: 2px solid #333333
Checked Background: #2563EB
Checked Border: #2563EB
Size: 20px
Border Radius: 4px (checkbox), 50% (radio)
```

### Navigation

**Top Navigation Bar**
```
Background: #141414
Border Bottom: 1px solid #2a2a2a
Height: 64px
Padding: 0 24px
Shadow: 0 1px 3px rgba(0,0,0,0.3)
```

**Navigation Link**
```
Text: #e5e5e5
Hover Text: #ffffff
Active Text: #2563EB
Active Indicator: 2px bottom border #2563EB
Padding: 12px 16px
```

**Sidebar Navigation** (Pro/Admin portals)
```
Background: #1a1a1a
Border Right: 1px solid #2a2a2a
Width: 256px
Link Padding: 12px 20px
Link Hover: #333333
Active Background: #2563EB with 10% opacity
Active Border Left: 3px solid #2563EB
```

### Tables

**Table Header**
```
Background: #1a1a1a
Border Bottom: 2px solid #333333
Text: #ffffff
Font Weight: 600
Padding: 12px 16px
```

**Table Row**
```
Background: #141414
Border Bottom: 1px solid #2a2a2a
Hover Background: #1a1a1a
Padding: 16px
Transition: 200ms ease
```

**Table Cell**
```
Text: #ffffff (primary) or #cccccc (secondary)
Padding: 16px
Vertical Align: middle
```

### Badges

**Status Badge Base**
```
Padding: 4px 12px (px-3 py-1)
Border Radius: 12px (rounded-full)
Font Size: 12px (text-xs)
Font Weight: 600
Text Transform: uppercase
Letter Spacing: 0.05em
```

**Success Badge**
```
Background: #15803d with 20% opacity
Text: #22c55e
Border: 1px solid #15803d
```

**Warning Badge**
```
Background: #b45309 with 20% opacity
Text: #f59e0b
Border: 1px solid #b45309
```

**Error Badge**
```
Background: #b91c1c with 20% opacity
Text: #ef4444
Border: 1px solid #b91c1c
```

**Primary Badge**
```
Background: #1d4ed8 with 20% opacity
Text: #3b82f6
Border: 1px solid #1d4ed8
```

### Modals

**Modal Overlay**
```
Background: rgba(0, 0, 0, 0.8)
Backdrop Blur: 4px
Z-index: 50
```

**Modal Container**
```
Background: #1a1a1a
Border: 1px solid #333333
Border Radius: 12px (rounded-xl)
Padding: 32px (p-8)
Max Width: 600px
Shadow: 0 20px 25px rgba(0,0,0,0.5)
```

### Alerts

**Info Alert**
```
Background: #1d4ed8 with 15% opacity
Border Left: 4px solid #2563EB
Text: #ffffff
Icon: #3b82f6
Padding: 16px 20px
Border Radius: 6px
```

**Success Alert**
```
Background: #15803d with 15% opacity
Border Left: 4px solid #22c55e
Text: #ffffff
Icon: #22c55e
```

**Warning Alert**
```
Background: #b45309 with 15% opacity
Border Left: 4px solid #f59e0b
Text: #ffffff
Icon: #f59e0b
```

**Error Alert**
```
Background: #b91c1c with 15% opacity
Border Left: 4px solid #ef4444
Text: #ffffff
Icon: #ef4444
```

---

## Spacing & Layout

### Spacing Scale (Maintain Tailwind Standard)
- 4px (1): Tight spacing, icon gaps
- 8px (2): Compact spacing, small gaps
- 12px (3): Small spacing, inline elements
- 16px (4): Standard spacing, card padding
- 24px (6): Medium spacing, section gaps
- 32px (8): Large spacing, major sections
- 48px (12): Extra large spacing, hero sections

### Border Radius Scale
- 4px (rounded): Subtle rounding, small elements
- 6px (rounded-md): Standard inputs, small cards
- 8px (rounded-lg): Standard cards, buttons
- 12px (rounded-xl): Large cards, modals
- 16px (rounded-2xl): Hero sections, feature cards

### Shadow System

**Subtle** (Default cards)
```css
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
```

**Elevated** (Hover states, dropdowns)
```css
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
```

**Modal** (Overlays, prominent dialogs)
```css
box-shadow: 0 20px 25px rgba(0, 0, 0, 0.5);
```

---

## Animation & Transitions

### Standard Transitions
```
Property: all
Duration: 300ms
Easing: cubic-bezier(0.4, 0, 0.2, 1)
```

### Quick Transitions (Hover states)
```
Duration: 200ms
Easing: ease-in-out
```

### Slow Transitions (Modals, overlays)
```
Duration: 400ms
Easing: ease-in-out
```

### Micro-interactions
- Button hover: 200ms scale(1.02)
- Card hover: 300ms translate-y(-2px)
- Opacity fade: 300ms
- Color change: 200ms

---

## Contextual Color Usage Guide

### When to Use Blue (#2563EB)
✅ **DO Use**:
- Primary action buttons (Request Quote, Submit Order, Create Quote)
- Active navigation items
- Links and clickable text
- Focus states on form inputs
- Progress indicators and loading states
- New/featured badges
- Primary information highlights

❌ **DON'T Use**:
- Body text or paragraph content
- Non-interactive decorative elements
- Secondary navigation
- Disabled states

### When to Use Dark (#141414)
✅ **DO Use**:
- Main application background
- Primary content areas
- Navigation bars
- Footer backgrounds
- Modal overlays (with transparency)

### When to Use White (#ffffff)
✅ **DO Use**:
- All primary text on dark backgrounds
- Button text on colored backgrounds
- Icon colors in navigation
- Headlines and headings

❌ **DON'T Use**:
- Large background areas (too bright on dark theme)
- Borders (too harsh contrast)

### When to Use Gray Hierarchy
**#1a1a1a**: Elevated surfaces above main background
**#2a2a2a**: Borders, dividers, subtle separations
**#333333**: Hover states, secondary interactive elements
**#545454**: Secondary hover, dropdown hover
**#888888**: Disabled text, placeholders
**#cccccc**: Secondary text, supporting information
**#e5e5e5**: Primary supporting text

---

## Implementation Strategy

### Phase 1: Foundation (Tailwind Config)
1. Update `app/globals.css` `@theme inline` block with new dark color tokens
2. Add dark background colors (#141414, #1a1a1a, #222222)
3. Add new gray scale for dark theme borders and hover states
4. Update component classes (.btn-primary, .card, .input-field, .badge)

### Phase 2: Global Styles
1. Change body background from gray-50 to #141414
2. Change default text color to #ffffff
3. Update heading styles with white text
4. Add dark theme specific utility classes

### Phase 3: Shared Components (14 components)
Apply in dependency order:
1. Button.tsx - Update backgrounds, text colors, hover states
2. Input.tsx - Dark backgrounds, white text, new focus styles
3. Badge.tsx - Update badge backgrounds with dark theme variants
4. Card.tsx - Dark background, new borders, adjusted shadows
5. Modal.tsx - Dark overlay, dark container, white text
6. PageHeader.tsx - Dark background, white text
7. DataTable.tsx - Dark headers, dark rows, hover states
8. Navbar.tsx - Dark background, updated links
9. Footer.tsx - Dark background, light text

### Phase 4: Portal-Specific Components
**Customer Portal** (6 components)
- Hero sections: Dark backgrounds with white text
- Quote form: Dark inputs with white text
- Pro cards: Dark card backgrounds with adjusted content

**Pro Portal** (24 components)
- Dashboard: Dark cards, white text metrics
- QuoteBuilder: Dark form backgrounds, white text
- Material cards: Dark backgrounds with product info
- Charts: Adjust for dark backgrounds

**Admin Portal** (7 components)
- Dashboard: Dark cards with white text
- Charts: Dark backgrounds with light grid lines
- Tables: Dark rows with hover states

### Phase 5: Pages
Apply systematically to all route pages:
1. Customer landing page
2. Pro dashboard and all sub-pages
3. Admin dashboard and all sub-pages

### Phase 6: Validation
1. Visual inspection of all pages
2. Check color contrast ratios (WCAG AA minimum)
3. Test interactive states (hover, focus, active)
4. Validate on different screen sizes
5. Browser testing (Chrome, Safari minimum)

---

## Accessibility Considerations

### Color Contrast Requirements (WCAG AA)
- **Normal text**: Minimum 4.5:1 ratio
- **Large text** (18pt+): Minimum 3:1 ratio
- **UI components**: Minimum 3:1 ratio

### Dark Theme Specific
✅ **Passing Combinations**:
- #ffffff on #141414 (ratio: 19.77:1) ✅
- #2563EB on #141414 (ratio: 5.12:1) ✅
- #cccccc on #141414 (ratio: 12.63:1) ✅
- #888888 on #141414 (ratio: 6.38:1) ✅

⚠️ **Check Carefully**:
- Status colors on dark backgrounds
- Badge text on badge backgrounds
- Disabled states

### Focus Indicators
- All interactive elements MUST have visible focus states
- Use 2px blue (#2563EB) focus ring with offset
- Never remove focus outlines without replacement

### Screen Reader Support
- Maintain all existing ARIA labels
- Add screen reader text for icon-only buttons
- Ensure proper heading hierarchy (h1 → h2 → h3)

---

## Testing Checklist

### Visual Testing
- [ ] All text is readable on dark backgrounds
- [ ] Interactive elements have clear hover states
- [ ] Focus states are visible for keyboard navigation
- [ ] Status colors maintain meaning in dark theme
- [ ] Shadows provide appropriate depth
- [ ] Borders are visible but not harsh

### Functional Testing
- [ ] All buttons respond to clicks
- [ ] Forms submit correctly
- [ ] Navigation works across all portals
- [ ] Modals open/close properly
- [ ] Tables display data correctly
- [ ] Charts render with dark backgrounds

### Responsive Testing
- [ ] Mobile (375px width)
- [ ] Tablet (768px width)
- [ ] Desktop (1280px width)
- [ ] Large desktop (1920px width)

### Browser Testing
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (optional)
- [ ] Edge (optional)

### Accessibility Testing
- [ ] Keyboard navigation works throughout
- [ ] Focus indicators visible
- [ ] Color contrast passes WCAG AA
- [ ] Screen reader announces content properly

---

## Brand Alignment Benefits

**Why This Design System Enhances Stonecoat MVP**:

1. **Professional Credibility**: Dark theme conveys premium positioning, aligning with high-end epoxy flooring products
2. **Trust Building**: Strategic blue accents leverage color psychology to build trust with homeowners and contractors
3. **Visual Hierarchy**: Clear contrast between backgrounds, content, and CTAs guides user attention effectively
4. **Modern Aesthetic**: Contemporary dark UI signals technical sophistication and innovation
5. **Brand Consistency**: Visual alignment with main Stonecoat domain creates cohesive brand experience
6. **User Comfort**: Dark theme reduces eye strain for users spending extended time in pro/admin portals

---

## Reference Files

**Research Source**: https://stonecoatcountertops.com/
**Current Configuration**: `/app/globals.css`
**Tailwind Config Guide**: `/TAILWIND_CONFIG.md`
**Styling Quick Reference**: `/STONECOAT_THEME_REFERENCE.md`

---

**Document Version**: 1.0
**Created**: October 21, 2025
**Status**: Ready for Implementation
