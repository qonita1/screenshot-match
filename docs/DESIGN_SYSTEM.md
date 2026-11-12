# Design System

## Source of truth
`src/styles.css` is the Tailwind CSS v4 entry.
It imports `src/styles/tokens.css` and `src/styles/typography.css`.
Configuration is CSS-first: do not create `tailwind.config.js`.
Tokens use oklch and map to shadcn variables; hex values below are reference swatches,
not values to paste into components.

## Semantic palette
| Token | Reference | Purpose |
| --- | --- | --- |
| `--background` | #F7F9F8 | Page canvas |
| `--card` | #FFFFFF | Surface |
| `--foreground` | #17211D | Main text |
| `--muted-foreground` | #6B7770 | Secondary text |
| `--border` | #E5EAE7 | Dividers and outlines |
| `--primary` | #123C32 | Deep Football Green, primary actions |
| `--success`, `--pitch` | #16A36A | Football Green, success/pitch meaning |
| `--accent` | #C5F36A | Electric Lime, limited emphasis |
| `--warning` | Semantic token | Attention needed |
| `--destructive` | Semantic token | Destructive actions/errors |
| `--info` | Semantic token | Informational status |

Use classes such as `bg-background`, `text-foreground`, `border-border`.
Never hardcode hex, inline colors, or palette utilities such as `text-green-600`.
If a semantic role is missing, add a token and document contrast and usage.
Do not assume lime or success green is accessible as small text on white.
Pair status color with text/icon; validate actual rendered contrast.

## Typography and geometry
- Plus Jakarta Sans: primary UI font, designed in Jakarta and comparable to Inter.
- JetBrains Mono: Football IDs and numeric data.
- Use a clear heading hierarchy; preserve readable body text on mobile.
- Spacing follows a 4px scale using Tailwind defaults.
- Base radius token: `--radius: 0.5rem`; use derived radius utilities consistently.
- Avoid excessive gradients, shadows, decorative surfaces, and oversized radii.

## Components
Use shadcn/ui new-york in `src/components/ui` and extend with cva variants.
Compose domain patterns outside primitives; do not fork a second button or dialog system.
Use Lucide with consistent icon size and stroke weight; label icon-only controls.
Use recharts for data visualization, with equivalent readable data or summaries.
Use sonner for supplementary feedback, not as the only source of critical errors.

## Interaction and accessibility
Target WCAG 2.2 AA; test focus, contrast, keyboard behavior, and zoom/reflow.
Keep visible focus; maintain dialog focus trapping and return focus on close.
Controls need accessible names and adequate touch targets (aim for 44px).
Respect reduced-motion settings; animation must not delay essential interactions.
Support loading, empty, failure, disabled, success, and validation states.

## Change protocol
Search existing tokens and components before adding variants.
Record token purpose and consuming components; check all affected roles and viewports.
Do not introduce alternate typography, color systems, or a second CSS framework.
See `UI_UX_GUIDELINES.md` for screen-level behavior.
