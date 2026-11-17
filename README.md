# WTF Games — Crypto Casino Lobby

A production React port of the **WTF Games** crypto casino lobby + **WTF Live**
hero, built from the design handoff in [`design-handoff/`](design-handoff/).

Mobile-responsive lobby centred on the house's flagship play-along game show
**WTF Live** (free-to-play, $1,000 weekly prize): a cinematic hero with a live
countdown / LIVE state, promo banners, horizontally-scrolling game rails
(Trending Slots, WTF Originals, Table Games), a WTF Clips social-video rail with
a fullscreen player, and a Past Episodes rail.

## Stack
- **Vite** + **React 18** + **TypeScript**
- No UI framework — design tokens as CSS custom properties (`src/index.css`),
  components styled to match the handoff pixel-for-pixel.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build → dist/
npm run preview  # serve the built app
```

## What changed vs. the prototype

The handoff shipped a **review harness** — a switcher to flip between 5 hero
concepts, a Mobile/Desktop toggle, and an Offline/Live toggle, all wrapped in a
fake phone bezel / browser window. Production drops the harness:

| Handoff (review harness) | This app (production) |
|---|---|
| Mobile **/** Desktop toggle | **Real responsive** — bottom-tab layout below `1024px`, sidebar layout at/above |
| Offline **/** Live toggle | **Derived** from the weekly show schedule + a live 1s countdown (`src/hooks/useShowClock.ts`) |
| 5-way hero switcher | Defaults to one concept (`SHIPPED_HERO`); all 5 implemented and swappable via the control bar below |
| Fake phone frame / browser chrome / status bar | Removed — the app *is* the page (forcing mobile via the control bar frames it as a phone-width column) |

### Design-review control bar
The handoff's top controller is included: a bar that swaps **hero concept (1–5)**,
**device (Mobile/Desktop)**, and **show state (Offline/Live)** live. It's
collapsible (× to hide) and gated by `SHOW_CONTROLS` in `src/config.ts`.

- Ship the clean production lobby by setting `SHOW_CONTROLS = false` (or visiting `?controls=0`).
- The same controls are also URL-addressable for sharing a specific view:
  - `?hero=1..6` — hero concept. Cinematic variants first: 1 Cinematic (boxed) · 2 Cinematic B (unit-in-box) · 3 Cinematic C (mobile timer in CTA) · 4 Cinematic D (timer in CTA on mobile + desktop, no buttons) · then 5 Starring · 6 Below-Banners
  - `?live=1` — force the LIVE show state
  - `?view=mobile` / `?view=desktop` — force a layout (otherwise responsive)
  - `?controls=0` / `?controls=1` — hide / show the control bar

Example: `/?hero=3&live=1&view=mobile`

## Configuration
Everything tweakable lives in [`src/config.ts`](src/config.ts): shipped hero
concept, weekly prize string, wallet chip, the weekly show schedule (day / time /
duration that drives the countdown + LIVE state), and the desktop breakpoint.

Content lists (games, clips, episodes, cast, nav) live in
[`src/data/lobby.ts`](src/data/lobby.ts) — wire these to the real catalog / CMS /
show feed in production.

## Project layout
```
src/
  config.ts            production config (hero, schedule, breakpoint, prize)
  App.tsx              picks shell (responsive) + wires show clock
  index.css            design tokens, keyframes, globals
  data/lobby.ts        games / clips / episodes / cast / banners / nav
  hooks/               useMediaQuery, useShowClock, useReviewOverrides
  lib/                 asset paths, colour helpers
  components/
    Hero.tsx           all 5 WTF Live hero concepts
    HeroBits.tsx       shared hero pieces (video, pills, CTAs, play button)
    PromoBanners.tsx · GameRail.tsx · ClipsRail.tsx · ClipModal.tsx
    PastEpisodes.tsx · Footer.tsx · Lobby.tsx
    shell/             DesktopShell (sidebar + top bar), MobileShell (header + tab bar)
public/uploads/        brand art, hero video, promo banners, game covers, clips
design-handoff/        original design reference (DESIGN_SPEC.md + .dc.html prototypes)
```

## Notes
- All WTF Clips currently play the same `bg_hero.mp4` stand-in (as in the
  handoff) — wire each clip to its own MP4 in production.
- Game-cover art has logos baked in; the design intentionally overlays no extra
  text on the square covers.
