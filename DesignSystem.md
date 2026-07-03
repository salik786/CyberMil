# [Platform Name] — Design System & Brand Guidelines

> **Purpose of this file:** This is the single source of truth for visual design on this project. Claude Code (or any contributor) should reference this file before writing any UI code — colors, type, spacing, components, and imagery rules all live here. Nothing here should be improvised or eyeballed; use the tokens.

**Replace `[Platform Name]` throughout this file once a name is chosen.** Everything else is ready to use as-is.

---

## 1. Brand Positioning

**What this is:** A platform that connects TAFE NSW students with industry — placements, apprenticeships, mentors, projects, and jobs.

**Who it's for:**
- **Students** — vocational learners who want proof they're job-ready, not just theory.
- **Industry partners** — employers who want reliably-skilled, work-ready talent without a heavy recruiting lift.
- **TAFE staff/coordinators** — need visibility into placements and outcomes.

**Brand personality:** Credible, competent, and grounded — the platform equivalent of a firm handshake. Professional and corporate first, but never cold or bureaucratic. This is vocational education: it should feel like *real work*, not campus branding.

**Positioning line (placeholder, adjust freely):**
> "Where TAFE NSW skill meets industry demand."

**Three words it should always feel like:** Trusted · Direct · Capable
**Three words it should never feel like:** Corporate-generic · Childish · Bureaucratic

---

## 2. Color System

### Rationale
Deep navy carries the trust/credibility TAFE partners and employers expect. A warm ochre/amber accent nods to trades and craftsmanship without tipping into a "kids' education app" palette, and keeps us visually distinct from TAFE NSW's own red/maroon identity so the platform reads as its own product. A muted teal is reserved for growth/success states and secondary accents only — never as a primary brand color.

**Rule of thumb:** Navy dominates. Ochre is the spark, used sparingly (CTAs, highlights, key numbers). Teal is functional, not decorative.

### Primary — Navy (trust, authority, structure)
| Token | Hex | Usage |
|---|---|---|
| `navy-50` | `#EEF3F8` | Page backgrounds, subtle section tints |
| `navy-100` | `#D7E3EF` | Hover backgrounds, disabled fills |
| `navy-200` | `#B0C7DF` | Borders on light surfaces |
| `navy-300` | `#82A5C8` | Icon strokes on light backgrounds |
| `navy-400` | `#4F7AA3` | Secondary text on dark surfaces |
| `navy-500` | `#2C567F` | Links, secondary buttons |
| `navy-600` | `#1B3A5C` | Hover state of primary |
| `navy-700` | `#10243E` | **Primary brand color** — nav bars, headers, primary buttons |
| `navy-800` | `#0A182B` | Dark section backgrounds, footer |
| `navy-900` | `#060F1C` | Max-contrast text on light backgrounds |

### Accent — Ochre (energy, action, craftsmanship)
| Token | Hex | Usage |
|---|---|---|
| `ochre-50` | `#FDF3E7` | Highlight chip backgrounds |
| `ochre-100` | `#FBE3C2` | Badge backgrounds |
| `ochre-200` | `#F5C88A` | Illustration accents |
| `ochre-300` | `#EEA954` | Hover on light accent elements |
| `ochre-400` | `#E8912F` | Secondary CTA hover |
| `ochre-500` | `#D97B29` | **Primary accent** — main CTAs, key stats, active states |
| `ochre-600` | `#B8621E` | CTA hover/pressed |
| `ochre-700` | `#8F4B18` | Text-on-light accent use (still passes AA at this weight) |
| `ochre-800` | `#663613` | Reserved |
| `ochre-900` | `#40220C` | Reserved |

**Accent discipline:** No more than one ochre element per "screen area" competing for attention (e.g., one primary CTA). Never use ochre for large background fills — it's a highlight color, not a surface color.

### Secondary — Teal (growth, success, connection — functional use only)
| Token | Hex | Usage |
|---|---|---|
| `teal-50` | `#E8F5F2` | Success banner background |
| `teal-500` | `#1F7A6C` | Success text/icons, "matched" states, progress indicators |
| `teal-700` | `#12463D` | Success text on light backgrounds (AA compliant) |

### Neutrals (warm-tinted gray, not pure gray — keeps things from feeling clinical)
| Token | Hex | Usage |
|---|---|---|
| `gray-0` | `#FFFFFF` | Base surface |
| `gray-50` | `#F7F6F4` | App background |
| `gray-100` | `#EFEDE9` | Card backgrounds, dividers |
| `gray-200` | `#E2DFD9` | Borders |
| `gray-300` | `#C9C5BC` | Disabled borders |
| `gray-400` | `#A6A199` | Placeholder text |
| `gray-500` | `#7D786F` | Secondary/muted text |
| `gray-600` | `#5A564F` | Body text (secondary weight) |
| `gray-700` | `#3D3A35` | Body text (primary weight) |
| `gray-800` | `#26241F` | Headings on light backgrounds |
| `gray-900` | `#161512` | Max-contrast text |

### Semantic colors
| State | Hex | Text-safe variant |
|---|---|---|
| Success | `#1F7A6C` | `#12463D` on light bg |
| Warning | `#C97A1A` | `#7A4A10` on light bg |
| Error | `#C13B3B` | `#7A2323` on light bg |
| Info | `#2D6CA6` | `#1B4266` on light bg |

### Accessibility rule
Every text/background pairing **must** hit WCAG AA (4.5:1 for body text, 3:1 for large text/UI components). `navy-700` on `gray-0`, and `gray-0` on `navy-700`/`navy-800`, are the two workhorse pairings — default to these when unsure. Never place `ochre-500` text on white (fails AA) — use `ochre-700` instead, or use ochre only as a background with dark text/white text on top, checked individually.

### CSS Variables (drop into `:root`)
```css
:root {
  /* Primary */
  --color-navy-50: #EEF3F8;
  --color-navy-100: #D7E3EF;
  --color-navy-200: #B0C7DF;
  --color-navy-300: #82A5C8;
  --color-navy-400: #4F7AA3;
  --color-navy-500: #2C567F;
  --color-navy-600: #1B3A5C;
  --color-navy-700: #10243E; /* primary brand */
  --color-navy-800: #0A182B;
  --color-navy-900: #060F1C;

  /* Accent */
  --color-ochre-50: #FDF3E7;
  --color-ochre-100: #FBE3C2;
  --color-ochre-200: #F5C88A;
  --color-ochre-300: #EEA954;
  --color-ochre-400: #E8912F;
  --color-ochre-500: #D97B29; /* primary accent */
  --color-ochre-600: #B8621E;
  --color-ochre-700: #8F4B18;

  /* Secondary */
  --color-teal-50: #E8F5F2;
  --color-teal-500: #1F7A6C;
  --color-teal-700: #12463D;

  /* Neutrals */
  --color-gray-0: #FFFFFF;
  --color-gray-50: #F7F6F4;
  --color-gray-100: #EFEDE9;
  --color-gray-200: #E2DFD9;
  --color-gray-300: #C9C5BC;
  --color-gray-400: #A6A199;
  --color-gray-500: #7D786F;
  --color-gray-600: #5A564F;
  --color-gray-700: #3D3A35;
  --color-gray-800: #26241F;
  --color-gray-900: #161512;

  /* Semantic */
  --color-success: #1F7A6C;
  --color-success-text: #12463D;
  --color-warning: #C97A1A;
  --color-warning-text: #7A4A10;
  --color-error: #C13B3B;
  --color-error-text: #7A2323;
  --color-info: #2D6CA6;
  --color-info-text: #1B4266;
}
```

### Tailwind config snippet
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#EEF3F8', 100: '#D7E3EF', 200: '#B0C7DF', 300: '#82A5C8',
          400: '#4F7AA3', 500: '#2C567F', 600: '#1B3A5C', 700: '#10243E',
          800: '#0A182B', 900: '#060F1C',
        },
        ochre: {
          50: '#FDF3E7', 100: '#FBE3C2', 200: '#F5C88A', 300: '#EEA954',
          400: '#E8912F', 500: '#D97B29', 600: '#B8621E', 700: '#8F4B18',
        },
        teal: { 50: '#E8F5F2', 500: '#1F7A6C', 700: '#12463D' },
        gray: {
          0: '#FFFFFF', 50: '#F7F6F4', 100: '#EFEDE9', 200: '#E2DFD9',
          300: '#C9C5BC', 400: '#A6A199', 500: '#7D786F', 600: '#5A564F',
          700: '#3D3A35', 800: '#26241F', 900: '#161512',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
    },
  },
};
```

---

## 3. Typography

### Font pairing
- **Display / Headings — Fraunces** (variable serif). Gives editorial authority and warmth — signals "credible institution," not "startup template." Use weights 500–600 for headings, optionally with slight optical sizing for large hero text.
- **Body / UI — IBM Plex Sans**. Built for interfaces, excellent legibility at small sizes, professional without being sterile. Use for all body copy, forms, nav, buttons.
- **Data / Code — IBM Plex Mono**. For any tabular data, IDs, timestamps, or code.

**Never use:** Inter, Roboto, Arial, system-ui as a display font, or any default OS font stack for headings. These read as "unstyled" and undercut the credibility this brand needs.

Import via Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### Type scale (base 16px, 1.25 ratio)
| Token | Size | Line height | Weight | Font | Use |
|---|---|---|---|---|---|
| `text-xs` | 12px / 0.75rem | 1.5 | 400 | Plex Sans | Captions, timestamps, legal |
| `text-sm` | 14px / 0.875rem | 1.5 | 400 | Plex Sans | Secondary UI text, labels |
| `text-base` | 16px / 1rem | 1.6 | 400 | Plex Sans | Body copy (default) |
| `text-lg` | 18px / 1.125rem | 1.6 | 400 | Plex Sans | Lead paragraphs |
| `text-xl` | 20px / 1.25rem | 1.4 | 500 | Plex Sans | Card titles, subheads |
| `text-2xl` | 25px / 1.563rem | 1.3 | 600 | Fraunces | H4 |
| `text-3xl` | 31px / 1.953rem | 1.25 | 600 | Fraunces | H3 |
| `text-4xl` | 39px / 2.441rem | 1.15 | 600 | Fraunces | H2 |
| `text-5xl` | 49px / 3.052rem | 1.1 | 500 | Fraunces | H1 |
| `text-6xl` | 61px / 3.815rem | 1.05 | 500 | Fraunces | Hero headline (desktop only) |

**Letter spacing:** Headings in Fraunces: `-0.01em` to `-0.02em` at large sizes (tightens optically). Body text: default (`0`). All-caps labels (badges, eyebrow text): `+0.06em` and `text-xs`/`text-sm` only — never all-caps at large sizes.

**Body text color:** `gray-700` on light backgrounds (not pure black — softer, more readable). Headings: `gray-900` or `navy-700`.

---

## 4. Spacing System

Base unit: **4px**. All margins, padding, and gaps must come from this scale — no arbitrary pixel values.

| Token | Value | Common use |
|---|---|---|
| `space-1` | 4px | Icon-to-text gaps |
| `space-2` | 8px | Tight component padding |
| `space-3` | 12px | Input padding, small gaps |
| `space-4` | 16px | Default component padding |
| `space-5` | 20px | Card padding (mobile) |
| `space-6` | 24px | Card padding (desktop), section gaps |
| `space-8` | 32px | Between related components |
| `space-10` | 40px | Between distinct sections (mobile) |
| `space-12` | 48px | Between distinct sections (desktop) |
| `space-16` | 64px | Major section breaks |
| `space-20` | 80px | Hero/section vertical padding |
| `space-24` | 96px | Large hero vertical padding |

**Padding rule of thumb:** Buttons `space-3` vertical / `space-6` horizontal. Cards `space-6` all sides (desktop), `space-4` (mobile). Page container horizontal padding: `space-4` mobile, `space-8` tablet, `space-16`+ desktop (centered, max-width below).

---

## 5. Layout & Grid

| Breakpoint | Width | Container max-width | Columns |
|---|---|---|---|
| `sm` | 640px+ | 100% | 4 |
| `md` | 768px+ | 720px | 8 |
| `lg` | 1024px+ | 960px | 12 |
| `xl` | 1280px+ | 1200px | 12 |
| `2xl` | 1536px+ | 1400px | 12 |

- Gutter: `space-4` (mobile) → `space-6` (desktop).
- Content should rarely span the full viewport width above `lg` — cap reading-width text blocks at ~65–75 characters (`max-width: 65ch`).
- Use generous negative space over dense packing — this is a trust-building institutional product, not a dashboard-density SaaS tool.

---

## 6. Radius, Elevation & Borders

### Border radius
| Token | Value | Use |
|---|---|---|
| `radius-sm` | 4px | Badges, chips, inputs |
| `radius-md` | 8px | Buttons, small cards |
| `radius-lg` | 12px | Cards, modals |
| `radius-xl` | 16px | Large feature cards, hero panels |
| `radius-full` | 9999px | Avatars, pills |

Keep radius consistent within a single component family — don't mix `md` and `lg` on sibling elements.

### Shadows (elevation)
```css
--shadow-sm: 0 1px 2px rgba(6, 15, 28, 0.06);
--shadow-md: 0 4px 8px rgba(6, 15, 28, 0.08), 0 1px 2px rgba(6, 15, 28, 0.06);
--shadow-lg: 0 12px 24px rgba(6, 15, 28, 0.10), 0 2px 4px rgba(6, 15, 28, 0.06);
--shadow-xl: 0 24px 48px rgba(6, 15, 28, 0.14);
```
Shadows are tinted navy (not pure black) to stay warm and on-brand. Use `shadow-sm` for cards at rest, `shadow-md` on hover, `shadow-lg`/`xl` for modals and dropdowns only.

### Borders
Default border: `1px solid var(--color-gray-200)`. Focus/active border: `1px solid var(--color-navy-500)`. Never use pure black borders.

---

## 7. Components

### Buttons
| Variant | Background | Text | Border | Use |
|---|---|---|---|---|
| Primary | `navy-700` | white | none | Main actions ("Apply now", "Post a placement") |
| Accent | `ochre-500` | white | none | The *one* highest-priority CTA per page |
| Secondary | white | `navy-700` | `1px navy-300` | Secondary actions |
| Ghost | transparent | `navy-700` | none | Tertiary/inline actions |
| Destructive | white | `error-text` | `1px error` | Delete/cancel actions |

- Height: 40px (default), 48px (large/hero CTAs), 32px (compact/inline).
- Padding: `space-3` vertical, `space-6` horizontal.
- Radius: `radius-md`.
- Hover: darken background one step (`navy-700`→`navy-600`, `ochre-500`→`ochre-600`); Ghost/Secondary get `gray-50` background on hover.
- Disabled: `gray-200` background, `gray-400` text, no hover.
- Always pair icon + label for primary actions; icon-only buttons need `aria-label`.

### Cards
White (`gray-0`) surface, `radius-lg`, `shadow-sm` at rest → `shadow-md` on hover if interactive, `1px solid gray-200` border, `space-6` padding. Used for: job/placement listings, student profiles, industry partner tiles.

### Badges / Tags (skills, industries, statuses)
`radius-full`, `text-xs`, `+0.02em` tracking, `space-1` vertical / `space-3` horizontal padding. Use `navy-50` bg / `navy-700` text for neutral tags (skills, categories); `teal-50` bg / `teal-700` text for positive status ("Matched", "Verified"); `ochre-50` bg / `ochre-700` text for highlighted/featured items.

### Forms
- Input height 44px (comfortable tap target), `radius-md`, `1px solid gray-300` border, `gray-0` background.
- Focus state: `1px solid navy-500` + `0 0 0 3px rgba(44,86,127,0.15)` outer glow. Never rely on color alone — always pair with visible border/outline for accessibility.
- Label above input, `text-sm`, `gray-700`, `space-2` gap.
- Error state: `error` border + `text-sm` error message below in `error-text`.
- Minimum tap target for all interactive elements: 44×44px.

### Navigation
Top nav: `navy-700` background, white text/logo, `ochre-500` used only for the active-state underline or the primary CTA button inside nav. Height 64px desktop / 56px mobile. Sticky on scroll with `shadow-sm` once scrolled.

### Data / Stats
Use `IBM Plex Mono` for large stat numbers (placement rates, counts) — mono numerals reinforce "these are real, measured figures," reinforcing trust positioning.

---

## 8. Imagery & Photography

### Photography style
- **Real people, real settings.** Actual TAFE-style workshops, campuses, worksites, and industry environments — not generic corporate stock photos of people in blazers shaking hands in front of a whiteboard.
- **Diverse and authentic.** Reflect the real range of TAFE NSW students — varied ages, backgrounds, trades, and genders. Avoid staged "stock smile at camera" poses; prefer candid, mid-action shots (hands on tools, working at a bench, in conversation).
- **Natural light.** Avoid harsh studio lighting or oversaturated color. Slightly warm, natural tone — should feel like a real workplace, not an ad.
- **Show the work, not just the person.** Favor images that include tools, materials, workspaces, or industry context over isolated headshot-style portraits, except where a portrait is specifically needed (testimonials, profile photos).

### Treatment
- Optional **navy duotone overlay** (`navy-800` at 40–55% opacity, multiply blend) for hero images behind white text — keeps photography consistent across a page that mixes many source images.
- No heavy filters, no black-and-white by default, no oversaturation.
- Consistent crop ratios per placement (see below) — inconsistent aspect ratios across a grid reads as unpolished.

### Aspect ratios by placement
| Use | Ratio |
|---|---|
| Hero banner | 16:9 or 21:9 |
| Card thumbnail (listings) | 4:3 |
| Profile photo / avatar | 1:1 |
| Story/testimonial feature | 3:4 (portrait) |

### Icons
Line-style icons only (not filled/glyph style), consistent **1.5–2px stroke weight**, rounded line caps, 24×24px default grid. Recommend **Lucide** or **Phosphor (regular weight)** icon sets for consistency. Never mix icon libraries/styles within the same screen.

### Accessibility
Every meaningful image needs descriptive `alt` text (not "image123.jpg" or "photo"). Decorative images use `alt=""`. Never convey information (status, category) through color/image alone — always pair with text or icon.

### Do / Don't
- ✅ A student mid-task in a real workshop, natural light, visible tools/materials.
- ✅ A diverse group in genuine conversation, mid-gesture, not posed.
- ❌ Generic "business handshake" stock photography.
- ❌ Purple/blue gradient overlays or glassmorphism treatments on photos.
- ❌ Clip-art style illustrations mixed with photography on the same page.

---

## 9. Motion

- **Durations:** micro-interactions (hover, focus) 120–160ms; component transitions (dropdown open, tab switch) 200–250ms; page/section reveals 300–400ms.
- **Easing:** `cubic-bezier(0.4, 0, 0.2, 1)` (ease-out) for elements entering/appearing; `cubic-bezier(0.4, 0, 1, 1)` (ease-in) for exiting.
- **Use motion for:** hover/focus feedback, staggered content reveal on scroll (cards fading/rising in, 40–60ms stagger between siblings), loading states.
- **Avoid:** bouncy/elastic easing (reads as playful/consumer-app, off-brand here), parallax-heavy scroll effects, autoplay carousels.
- Respect `prefers-reduced-motion` — disable non-essential animation for users who request it.

---

## 10. Voice & Tone

Direct, competent, and human. Write like a knowledgeable career advisor, not a marketing brochure.

| Do | Don't |
|---|---|
| "You've completed 3 of 5 required units for this placement." | "You're crushing it on your journey! 🎉" |
| "This employer is looking for someone with Cert III in Electrotechnology." | "This amazing opportunity awaits YOU!" |
| "Apply by 14 August to be considered for this intake." | "Don't miss out on this incredible chance!" |
| Plain, specific numbers and dates | Vague hype ("world-class," "game-changing") |

No exclamation-point marketing voice, no emoji in core product UI (fine sparingly in informal notification copy only). Contractions are fine ("you're," "we'll") — this keeps it human without being casual.

---

## 11. Accessibility Standards (non-negotiable)

- WCAG 2.1 **AA** minimum across the whole product.
- Text contrast ≥ 4.5:1 (body), ≥ 3:1 (large text, 24px+/19px+ bold).
- All interactive elements keyboard-navigable with a visible focus state (never `outline: none` without a replacement).
- Minimum touch target 44×44px.
- Color is never the sole carrier of meaning (status, errors, required fields) — pair with icon/text.
- All form inputs have associated `<label>` elements.
- Respect `prefers-reduced-motion` and `prefers-color-scheme` where dark mode is supported.

---

## 12. Logo & Lockup (placeholder guidance)

No final logo has been designed yet. Until one exists:
- Use a simple wordmark in **Fraunces, weight 600**, `navy-700` on light backgrounds / white on `navy-700`+ backgrounds, as a text-based placeholder lockup.
- Reserve clear space around any future logo equal to the height of its own lettermark on all sides.
- Minimum logo size: 24px height (digital), never scale below legibility.
- Do not place the future logo on busy photography without a solid or duotone-overlay backing area.
- **Recommendation:** commission a proper mark once the name is finalized — the navy/ochre palette and Fraunces display face above should inform that design so it's cohesive with everything in this file.

---

## 13. Quick Reference — Don'ts

- ❌ No purple gradients, no glassmorphism, no default Inter/system-ui headings.
- ❌ No pure black (`#000`) or pure gray — use the warm neutral scale.
- ❌ No arbitrary spacing values outside the 4px-based scale.
- ❌ No more than one `ochre-500` CTA competing for attention per screen.
- ❌ No stock-photo handshake imagery.
- ❌ No exclamation-heavy marketing copy in product UI.
- ❌ No icon style-mixing within a single screen.

---

*This file should be updated as the brand evolves. Treat it as living documentation, not a one-time spec.*