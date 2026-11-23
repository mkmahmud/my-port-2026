# Design

Scope: the homepage (`app/page.tsx`, `components/home/`). Other routes still use the earlier cream and orange system.

## Theme
Always-dark "ember" world: near-black space, dark ridgelines, and coral light. Source reference: `public/ChatGPT Image Nov 23, 2026, 10_31_10 PM.png`.

## Color tokens (`.ember` in `components/home/home.css`)
| Token | Value | Use |
|---|---|---|
| `--ink` | `#0C0C0C` | Page background |
| `--plum` | `#180C18` | Tinted depth |
| `--panel` | `#141013` | Cards |
| `--ember` | `#3C1818` | Glow and warm fills |
| `--coral` | `#FC6C60` | Actions, emphasis, active states |
| `--text` | `#F7F1EE` | Primary text |
| `--muted` | `#B9AFAD` | Secondary text |
| `--line` | `rgba(255,236,232,.13)` | Hairlines and card borders |

## Type
Manrope throughout. Headings are 750 to 800 weight with tight tracking. The hero's second line is coral.

## Components
Pill buttons and navigation, hairline cards with 10 to 14px radii, circular icon controls, coral rule labels above section headings.

## Imagery
- `public/images/home/portrait-matte.webp`: cleaned from `public/images/profile.png`.
- `hero-ridge.webp` and `ribbon.webp`: rendered procedurally for this site.
- Blog covers and the glass cube are drawn in code.

## Motion
Hero text rises once, tech chips drift, and the cube rotates. All of it stops under `prefers-reduced-motion`.
