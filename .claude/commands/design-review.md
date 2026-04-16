# /design-review

Perform a comprehensive UI/UX design review of recent changes to the portfolio website.

## What This Command Does

Analyzes front-end changes against elite design standards (inspired by Stripe, Linear, Vercel, and the reference site bryllim.com).

## Review Checklist

### 1. Visual Consistency
- [ ] Typography hierarchy is consistent (font sizes, weights, line heights)
- [ ] Color usage matches the defined palette (CSS variables / Tailwind config)
- [ ] Spacing follows the 4px/8px grid system
- [ ] Border radius values are consistent across components
- [ ] Shadows and elevation match the design system

### 2. Responsiveness
- [ ] Desktop (1440px) — 6-column bento grid renders correctly
- [ ] Tablet (768px) — layout reflows gracefully
- [ ] Mobile (375px) — single column, no overflow, touch targets ≥ 44px

### 3. Animations & Interactions
- [ ] Fade-in stagger animations fire correctly on load
- [ ] Hover states have smooth transitions (150–300ms)
- [ ] No layout shift (CLS) caused by animations
- [ ] Reduced motion respected via `@media (prefers-reduced-motion)`

### 4. Accessibility (WCAG 2.1 AA)
- [ ] Color contrast ratio ≥ 4.5:1 for body text, ≥ 3:1 for large text
- [ ] All interactive elements keyboard-navigable
- [ ] Focus indicators are visible
- [ ] Images have meaningful alt text
- [ ] Semantic HTML (header, main, section, nav, footer)

### 5. Dark / Light Mode
- [ ] All colors use CSS variables or `dark:` Tailwind classes
- [ ] No hardcoded color values that break in dark mode
- [ ] Images and icons are legible in both modes

### 6. Performance
- [ ] Images use Next.js `<Image>` component with size hints
- [ ] No unused CSS classes
- [ ] Fonts loaded with `next/font` (no FOIT/FOUT)

### 7. Code Health
- [ ] Components are reusable and not duplicated
- [ ] No inline styles (use Tailwind classes or CSS variables)
- [ ] TypeScript types are defined (no `any`)

## Usage

Run `/design-review` after making UI changes. Claude will:
1. Read recently modified component files
2. Check against the above checklist
3. Take a live preview screenshot (if preview server is running)
4. Report issues as: **Blocker** | **High** | **Medium** | **Nitpick**
