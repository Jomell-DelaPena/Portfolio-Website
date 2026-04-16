---
name: web-asset-generator
description: Generate favicons, PWA app icons, and Open Graph social media images for the portfolio website
type: skill
---

# Web Asset Generator

Generate professional web assets for the portfolio website including favicons, app icons, and social media preview images.

## Capabilities

1. **Favicons** — browser tab icons (16x16, 32x32, 96x96) + favicon.ico
2. **App Icons** — PWA icons for iOS/Android (180x180, 192x192, 512x512)
3. **Open Graph Images** — social sharing previews optimized for Facebook, Twitter, LinkedIn, WhatsApp (1200x630)

## Source Material Options
- Logo/PNG images (transparent backgrounds work best)
- Emoji characters (with optional background color)
- Text/name with customizable colors and gradients
- Combined logo + text overlay

## Workflow

1. Ask user for source material (logo file, emoji, or text)
2. Ask which asset types are needed
3. Ask for brand colors / background preferences
4. Generate assets using Python + Pillow scripts in `scripts/` folder
5. Place output in `public/` (Next.js standard)
6. Provide HTML meta tag snippets for integration

## Scripts to Use

```bash
# Favicons from an image
python scripts/generate_favicons.py --source public/logo.png --output public/

# Favicons from emoji
python scripts/generate_favicons.py --emoji "💼" --emoji-bg "#0f172a" --output public/

# OG image from text
python scripts/generate_og_images.py --name "Your Name" --title "Full-Stack Developer" --bg "#0f172a" --output public/og/

# Validate generated assets
python scripts/generate_favicons.py --validate --output public/
```

## Next.js Integration (app/layout.tsx)

```tsx
export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    images: [{ url: '/og/og-image.png', width: 1200, height: 630 }],
  },
};
```

## Validation Tools (post-deployment)
- Facebook: https://developers.facebook.com/tools/debug/
- Twitter: https://cards-dev.twitter.com/validator
- LinkedIn: https://linkedin.com/post-inspector/
- Generic: https://opengraph.xyz/
