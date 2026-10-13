---
name: Sovereign Node
colors:
  surface: '#0f131f'
  surface-dim: '#0f131f'
  surface-bright: '#353946'
  surface-container-lowest: '#0a0e1a'
  surface-container-low: '#171b28'
  surface-container: '#1b1f2c'
  surface-container-high: '#262a37'
  surface-container-highest: '#313442'
  on-surface: '#dfe2f3'
  on-surface-variant: '#c9c4d8'
  inverse-surface: '#dfe2f3'
  inverse-on-surface: '#2c303d'
  outline: '#938ea1'
  outline-variant: '#484555'
  surface-tint: '#cabeff'
  primary: '#cabeff'
  on-primary: '#31009a'
  primary-container: '#947dff'
  on-primary-container: '#2a0088'
  inverse-primary: '#603ce2'
  secondary: '#5de6ff'
  on-secondary: '#00363e'
  secondary-container: '#00cbe6'
  on-secondary-container: '#00515d'
  tertiary: '#45dfa4'
  on-tertiary: '#003825'
  tertiary-container: '#00a574'
  on-tertiary-container: '#003120'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e6deff'
  primary-fixed-dim: '#cabeff'
  on-primary-fixed: '#1c0062'
  on-primary-fixed-variant: '#4816cb'
  secondary-fixed: '#a2eeff'
  secondary-fixed-dim: '#2fd9f4'
  on-secondary-fixed: '#001f25'
  on-secondary-fixed-variant: '#004e5a'
  tertiary-fixed: '#68fcbf'
  tertiary-fixed-dim: '#45dfa4'
  on-tertiary-fixed: '#002114'
  on-tertiary-fixed-variant: '#005137'
  background: '#0f131f'
  on-background: '#dfe2f3'
  surface-variant: '#313442'
typography:
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 44px
    fontWeight: '600'
    lineHeight: 52px
  headline-xl-mobile:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 26px
    fontWeight: '500'
    lineHeight: 34px
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 22px
    fontWeight: '500'
    lineHeight: 30px
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 26px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-code-lg:
    fontFamily: JetBrains Mono
    fontSize: 15px
    fontWeight: '500'
    lineHeight: 20px
  label-code-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-code-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system expresses quiet technical mastery, sovereign privacy, and cryptographic calm. It is built for a peer-to-peer communication platform where users require total discretion, resilient direct routing, and zero tracking. The mood balances deep mathematical precision with an atmospheric, organic sense of presence: tranquil midnight fields punctuated by lucid neon connections.

The design movement blends high-end futuristic minimalism with atmospheric glassmorphism:
- **Atmospheric Depth:** Deep spatial canvas layered with low-frequency field glows rather than heavy flat panels.
- **Luminescent Telemetry:** Thin, glowing vector pathways, precise connection pings, and sub-pixel edge reflections replace arbitrary decorative accents.
- **Cryptographic Trust:** Every interface element signals absolute security through disciplined information density, monospaced validation tokens, and zero visual clutter.

## Colors

The palette operates under a strict dark-space hierarchy designed to prioritize readability and minimize eye strain during nocturnal or continuous operations.

- **Foundational Canvas:** `#0A0E1A` serves as the absolute void base. Depth is formed using muted secondary background gradients in `#1B1442` (deep indigo) anchored to the top-left or focal zones, paired with `#062B3A` (deep abyssal teal) across peripheral or incoming network hubs.
- **Electric Violet (`#7C5CFF`):** The primary signal driver. Used for primary calls-to-action, active connection routes, current user message payloads, and prioritized cryptographic keys.
- **Cyan (`#22D3EE`):** The secondary network indicator. Applied to peer discovery status, secondary action triggers, data transfer metrics, and subtle edge highlights.
- **Mint (`#34D399`):** The tertiary integrity color. Strictly dedicated to peer-to-peer handshake verification, live encryption state, verified node status, and completed peer handoffs.
- **Surface & Alpha Layers:** Surfaces exist as translucent scrims:
  - Base Panel: `rgba(255, 255, 255, 0.03)`
  - Elevated Card: `rgba(255, 255, 255, 0.05)`
  - Active / Hover State: `rgba(255, 255, 255, 0.08)`
  - Hairline Boundaries: `rgba(255, 255, 255, 0.10)`
- **Text & Foreground Layers:**
  - High Contrast (Headings, primary data): `#F8FAFC`
  - Medium Contrast (Body text, partner messages): `#94A3B8`
  - Low Contrast / Muted (Timestamps, metadata): `#475569`

## Typography

Typography establishes an intentional contrast between structural human dialogue and raw computational validation:

- **Space Grotesk (Headlines):** Imparts geometric discipline and futuristic clarity. Used for space titles, panel titles, section headers, and primary metric figures. Letter spacing is slightly contracted (`-0.02em`) on sizes above 24px for a compact, engineered look.
- **Inter (Body):** Ensures neutral, high-legibility messaging across conversational flows, user identities, and contextual instructions. Rendered with subpixel anti-aliasing against dark backgrounds to avoid optical thinning.
- **JetBrains Mono (Technical/Telemetry):** Anchors trust. Dedicated to PGP key fingerprints, peer session hashes, room invite strings, network latency readouts, and end-to-end encryption confirmation seals.

## Layout & Spacing

The interface uses a multi-tier responsive layout structure calibrated around continuous communication feeds and network topology dashboards:

- **Desktop (1200px+):** A 3-pane modular architecture consisting of a persistent navigational channel strip (72px), a collapsible peer & room roster (320px), and an expansive conversation console with dynamic telemetry side-drawers (fill width).
- **Tablet (768px - 1199px):** 2-pane configuration with an off-canvas peer panel accessible via sliding gesture or header toggle.
- **Mobile (<768px):** Single-pane full viewport layout. Navigation transitions to a bottom docked glass bar, with dedicated full-screen modals for room details and key verification.
- **Grid & Rhythm:** Horizontal spacing relies on standard 8px/16px intervals. Margins drop from `2rem` on wide displays to `1rem` on mobile viewports to conserve usable conversational canvas. Gutters between cards and modular dashboard panes sit strictly at `1.5rem` (`1rem` on mobile).

## Elevation & Depth

Visual hierarchy is constructed through luminous transparency, surface stacking, and selective radiance rather than conventional shadow casting.

1. **Base Layer (Level 0):** Canvas `#0A0E1A` with fixed background radial meshes: one indigo `radial-gradient(ellipse 60% 50% at 10% 20%, rgba(27, 20, 66, 0.45), transparent 70%)` and one teal `radial-gradient(ellipse 50% 40% at 85% 75%, rgba(6, 43, 58, 0.35), transparent 70%)`.
2. **Glass Planes (Level 1 - Chat Stream & Sidebars):** Surface fill `rgba(255, 255, 255, 0.03)` with `backdrop-filter: blur(16px)` and a continuous 1px edge boundary using `rgba(255, 255, 255, 0.08)`.
3. **Elevated Panels (Level 2 - Cards, Popovers, Modals):** Surface fill `rgba(255, 255, 255, 0.06)`, `backdrop-filter: blur(24px)`, reinforced by a directional top border highlight `rgba(255, 255, 255, 0.16)` and bottom border `rgba(255, 255, 255, 0.04)`.
4. **Neon Radiance & Signal Glows:**
   - Violet Focus: `0 0 20px rgba(124, 92, 255, 0.28), 0 0 40px rgba(124, 92, 255, 0.12)`
   - Cyan Connection Ping: `0 0 16px rgba(34, 211, 238, 0.35)`
   - Mint Verification: `0 0 12px rgba(52, 211, 153, 0.40)`

## Shapes

The shape system pairs pill geometry for micro-interactions with soft rounded surfaces for containment areas:

- **Pill Formation (`rounded-full` / Level 3):** Reserved for high-value interactive anchors: buttons, status indicators, room code chips, identity tokens, and reaction clusters. This creates a human, approachable, ergonomic touchpoint against the technical backdrop.
- **Structural Containers (`rounded-xl` to `rounded-2xl`):** Chat bubbles, contextual popovers, side-panels, and dashboard modules use smooth, non-aggressive curves (16px to 24px) providing seamless framing for blurred background refraction.
- **Connection Lines:** Strictly linear 1px vectors accented with variable opacity gradients (`rgba(34, 211, 238, 0.6)` fading to `0`) and floating circular anchor dots to symbolize peer links.

## Components

### Buttons
- **Primary Action (Pill):** Solid `#7C5CFF` fill, white bold text (`Space Grotesk` or `Inter`), subtle inner glow `inset 0 1px 1px rgba(255, 255, 255, 0.35)`, outer glow on hover `0 0 24px rgba(124, 92, 255, 0.45)`.
- **Secondary Ghost (Pill):** Transparent fill, 1px border `rgba(34, 211, 238, 0.4)`, text `#22D3EE`. On hover: `background: rgba(34, 211, 238, 0.08)`, border color `#22D3EE`.
- **Destructive/Terminal:** Deep translucent crimson `rgba(239, 68, 68, 0.15)` with `1px` border `rgba(239, 68, 68, 0.4)`.

### Chips & Room Codes
- **Room Code / Key Token:** Pill silhouette, background `rgba(255, 255, 255, 0.04)`, border `1px solid rgba(255, 255, 255, 0.10)`. Displays cryptographic hashes or room IDs in `JetBrains Mono` (`label-code-md`) with an integrated single-tap copy trigger and peer counter badge.
- **Network Status Chip:** Tiny 6px illuminated orb pulsating with status: Mint (`#34D399`) for direct P2P connected, Cyan (`#22D3EE`) for relay mode, Amber for resolving DHT routes.

### Input Fields
- **Message Input Console:** Floating dock, pill or heavy `24px` radius, filled with `rgba(255, 255, 255, 0.04)`, backdrop blur `20px`, border `1px solid rgba(255, 255, 255, 0.10)`. Focus shifts border to `#7C5CFF` accompanied by an ambient purple trace shadow. Action attachments and encryption badges nest inside the margins.

### Cards & Dialogue Containers
- **Incoming Peer Bubble:** Aligned left, background `rgba(255, 255, 255, 0.04)`, border `1px solid rgba(255, 255, 255, 0.08)`, border-radius `18px 18px 18px 4px`.
- **Outgoing User Bubble:** Aligned right, background `linear-gradient(135deg, rgba(124, 92, 255, 0.25), rgba(124, 92, 255, 0.10))`, border `1px solid rgba(124, 92, 255, 0.35)`, border-radius `18px 18px 4px 18px`.
- **Peer Profile Card:** Elevated glass panel (`backdrop-filter: blur(24px)`), featuring a cryptographic avatar shield, latency metrics in `JetBrains Mono`, and direct verification keys with a one-click validation stamp.

### Checkboxes & Toggle Switches
- **Toggles:** Pill-shaped rail `rgba(255, 255, 255, 0.12)`, active rail `#7C5CFF`. Thumb is solid white circle with subtle drop shadow `0 2px 4px rgba(0,0,0,0.5)`.
- **Verification Checkbox:** 18px rounded rectangle (4px radius), unchecked: 1px border `rgba(255, 255, 255, 0.2)`, checked: filled `#34D399` with a deep navy checkmark.

### Additional P2P Indicators
- **Mesh Topology Graph:** Thin glowing `#22D3EE` and `#7C5CFF` connecting paths connecting circular user nodes across active multi-party rooms, showing real-time peer hops and ping indicators.