---
name: Midnight Cellar
colors:
  surface: '#131314'
  surface-dim: '#131314'
  surface-bright: '#3a393a'
  surface-container-lowest: '#0e0e0f'
  surface-container-low: '#1c1b1c'
  surface-container: '#201f20'
  surface-container-high: '#2a2a2b'
  surface-container-highest: '#353436'
  on-surface: '#e5e2e3'
  on-surface-variant: '#d1c2d2'
  inverse-surface: '#e5e2e3'
  inverse-on-surface: '#313031'
  outline: '#9a8c9b'
  outline-variant: '#4e4350'
  surface-tint: '#edb1ff'
  primary: '#edb1ff'
  on-primary: '#520070'
  primary-container: '#9d50bb'
  on-primary-container: '#fff3fd'
  inverse-primary: '#883ca6'
  secondary: '#debbe4'
  on-secondary: '#402747'
  secondary-container: '#583d5f'
  on-secondary-container: '#ccaad2'
  tertiary: '#d6baff'
  on-tertiary: '#40147a'
  tertiary-container: '#835dc0'
  on-tertiary-container: '#fcf4ff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#f9d8ff'
  primary-fixed-dim: '#edb1ff'
  on-primary-fixed: '#320046'
  on-primary-fixed-variant: '#6e208c'
  secondary-fixed: '#fad7ff'
  secondary-fixed-dim: '#debbe4'
  on-secondary-fixed: '#291231'
  on-secondary-fixed-variant: '#583d5f'
  tertiary-fixed: '#ecdcff'
  tertiary-fixed-dim: '#d6baff'
  on-tertiary-fixed: '#270057'
  on-tertiary-fixed-variant: '#573092'
  background: '#131314'
  on-background: '#e5e2e3'
  surface-variant: '#353436'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 80px
  container-max: 1440px
---

## Brand & Style
The design system is engineered for an ultra-premium digital experience that evokes the atmosphere of an exclusive, high-end lounge. The personality is moody, sophisticated, and contemporary, departing from traditional "old world" luxury in favor of a "luxury nightlife" aesthetic.

The visual style is a fusion of **Modern Minimalism** and **Glassmorphism**. It utilizes deep, dark surfaces to create a sense of infinite depth, contrasted by vibrant, glowing accents. The emotional response should be one of exclusivity and curated excellence, targeting a discerning audience that appreciates artisanal quality within a sleek, tech-forward environment.

## Colors
This design system operates exclusively in a dark mode environment to maintain its moody, premium character.

- **Primary (Amethyst):** Used for primary actions, critical brand moments, and glowing highlights.
- **Secondary (Lavender):** A soft, low-contrast accent used for secondary information and subtle interactive states.
- **Tertiary (Deep Purple):** Used in gradients to bridge the gap between the primary amethyst and the midnight surface.
- **Neutral (Midnight):** The core background color (#0A0A0B). It provides a high-contrast base for the vibrant accents.
- **Surfaces:** UI containers use a slightly lighter charcoal (#1A1A1C) with varying degrees of transparency to facilitate glassmorphism.

## Typography
The typography strategy relies on the high-contrast tension between the editorial elegance of **Playfair Display** and the geometric clarity of **Plus Jakarta Sans**.

Headlines should be treated with generous leading. Display styles are intended for hero sections and product titles, often utilizing a subtle gradient or pure white against the dark background. Body text must remain highly legible, using the lavender accent sparingly for emphasis. Labels are frequently set in uppercase with increased letter spacing to reinforce the "exclusive label" aesthetic.

## Layout & Spacing
The design system utilizes a **Fluid Grid** model with a focus on expansive white space (or "dark space") to convey luxury.

- **Desktop:** 12-column grid, 1440px max-width, with 24px gutters. Margins are generous (80px) to frame the content as if it were in a gallery.
- **Mobile:** 4-column grid with 20px side margins. 
- **Spacing Rhythm:** Based on an 8px base unit. Component internal padding should favor larger vertical breathing room to enhance the "airy" premium feel. Content blocks should be separated by significantly larger gaps (64px, 96px, or 128px) to allow individual products to stand out.

## Elevation & Depth
Depth is not created through traditional drop shadows, but through **Tonal Layering** and **Glassmorphism**.

1.  **Base:** The Midnight surface (#0A0A0B).
2.  **Mantle:** Elevated cards use a semi-transparent fill (White at 5-8% opacity) with a `backdrop-filter: blur(20px)`.
3.  **Glow Borders:** Instead of shadows, use 1px solid or gradient borders. These borders should be low-opacity (20-30%) and use the Amethyst or Lavender colors to create a "neon-edge" effect.
4.  **Ambient Glows:** Use large, ultra-diffused radial gradients in the background (Amethyst at 10% opacity) behind key components to suggest light reflecting off polished surfaces.

## Shapes
The shape language is controlled and precise. While edges are softened to avoid a harsh "brutalist" feel, they remain sharp enough to feel modern and architectural. 

A "Soft" roundedness (0.25rem - 0.75rem) is the standard. Circles are reserved exclusively for avatars or specific status indicators. Interactive elements like buttons may use slightly higher rounding (rounded-lg) to distinguish them from structural layout containers.

## Components
- **Buttons:** Primary buttons feature a linear gradient (Amethyst to Deep Purple) with a subtle inner glow. Text is white, bold, and uses the Label-MD style. Secondary buttons are "ghost" style with a 1px Lavender border.
- **Glass Cards:** Containers for products or information. They must have a `backdrop-filter: blur(12px)` and a top-to-bottom subtle gradient stroke to simulate light hitting the edge of a glass pane.
- **Inputs:** Fields are dark with a 1px border that brightens to Amethyst on focus. Placeholder text uses the Lavender color at 50% opacity.
- **Chips/Tags:** Small, pill-shaped elements with a deep purple background and white text, used for categories like "Rare Vintage" or "Limited Edition."
- **Lists:** Clean, borderless rows separated by a thin, low-opacity divider. Selection states are indicated by a subtle Amethyst left-accent bar and a background tint change.
- **Modals:** High-blur overlays that dim the background significantly, making the glassmorphic container the absolute focal point.