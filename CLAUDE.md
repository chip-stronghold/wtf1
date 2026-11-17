# WTF1 — design sandbox (forked from the WTF Games prototype)

**Purpose:** a public place to iterate on tokens, colours and skins for the next casino
frontend (Vegangster is the platform under evaluation — see `design-handoff/vegangster/`).
Live at https://wtf1-nine.vercel.app. The original review areas are carried across unchanged.

## Skin tokens area (`?area=tokens`, the default here)

- `src/data/skins.ts` — three skin directions authored as small palettes; `buildTokens`
  expands each to Vegangster's full token set (`--token-brand-*` etc). `skinToCss` emits the
  `:root { … }` block their theme file uses (the **Copy CSS** button in the control bar).
- `src/components/tokens/TokensScreen.tsx` — a Vegangster-shaped frontend styled only through
  those tokens (no hard-coded colours). Game art is placeholder gradients.
- `src/components/tokens/TokenSheet.tsx` — every token of the active skin, grouped, click to copy.
- URL: `?area=tokens&skin=1..3&view=mobile|desktop&sheet=1&logged=1&controls=0`.
- Fonts stay on Vegangster's default stack: **Korolev is ruled out for this platform**
  (Adobe-licensed). Green-filled buttons always carry **black** text.
- `SKIN_PICK` in `skins.ts` marks AJ's chosen direction (PICK badge): **3 · Carbon** (picked 17 Nov 2026).
  Game tiles use the real covers from `public/uploads/WTF Games/`; the banner uses `banner_vip.png`.
  Keep gradient fills out of cards — flat token surfaces only.

---

# WTF Games — casino lobby prototype (carried across)

A **design review prototype**, not a production app. One Vite + React +
TypeScript app covering several areas of the wtfgames.com product, with a
control bar on top for flipping between concepts, devices, breakpoints and
states. Deployed to Vercel from `main`.

Repo: `github.com/chip-stronghold/wtf1` (public sandbox, forked from `wtfgames` on 17 Nov 2026 to play with Vegangster-style tokens and skins)

## Stack

Vite + React 18 + TypeScript. **No UI framework, no Tailwind.** Design tokens are
CSS custom properties in `src/index.css`; components are styled to match the
design pixel-for-pixel. Keep it that way.

```bash
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
```

If `npm install` hangs, see the IPv6 note in the global CLAUDE.md.

## The review harness

`src/config.ts` is the control panel for everything:

- `REVIEW_AREAS` — the area dropdown. Add an entry here (plus its screen in
  `App.tsx`) to start iterating on a new part of the product.
- `SHIPPED_HERO` — the mobile concept picked for dev (PICK badge). `null` until
  AJ picks one. Desktop is always **Cinematic D** (signed off).
- `SHOW_CONTROLS` — set `false` (or `?controls=0`) for the clean build.
- `SHOW_SCHEDULE` — weekly show day/time that drives the countdown and the
  flip to LIVE.
- `DESKTOP_BREAKPOINT` — `1024`. Below it: bottom tab bar. At/above: left sidebar.

Every view is URL-addressable, and must stay that way:

```
?hero=1..2   mobile lobby concept (1 D Tile · 2 D Swipe) —
             desktop renders Cinematic D for all three
?area=casino | lobby | auth | profile | wallet | promotions
?casino=1..3 casino lobby brief directions (1 Shelf · 2 Arcade · 3 Feed)
?visit=first | returning   logged-out first visit / logged-in with history
?interests=1  interest pills pre-selected · ?overlay=prefs | swipe
?preview=1 ?loading=1 ?unavailable=1 ?day=1   optional module + states
?profile=1..7  account concept (1 MVP strip · 2 Stats hub · 3 Ledger · 4 Share-first ·
               5 Dashboard · 6 Account nav · 7 Cover — the earlier set, kept for comparison)
?pnl=up | down account P&L module in profit or loss
?live=1      force the LIVE state
?view=mobile | desktop
?controls=0 | 1
```

Review areas currently built: **Casino lobby** (brief response — 3 directions, no hero video, see
`design-handoff/CASINO_LOBBY_CONCEPTS.md`), **Lobby** (2 mobile concepts, desktop = D), **Login / Sign-up**
(3), **Profile** (7: 4 new account concepts: P&L, rewards given back, VIP map, favourite games, share poster; production Overview / Bonuses / History data carried through), **Wallet** (3), **Promotions** (5).

## Type — read this before touching fonts

Korolev is served to **everyone** by the Adobe Fonts kit linked in `index.html`:
`https://use.typekit.net/isp0udh.css` (the same kit as the WTF Racing page).

- `korolev-compressed-light` → display. **Set `font-weight: 900`** to get the
  Heavy cut. Headings and CTAs use this.
- `korolev-thin` → body copy.

**Casino lobby area is the exception:** the brief rules Korolev out there (Adobe embedding problems), so
`.casino` is scoped to **Archivo** (display at `font-stretch: 62%` / 900, body at 100%) and **Clash Display**
for WTF Studios moments — both open-licence and self-hostable. Tokens live in `src/casino.css`.

**Never rely on a locally installed Korolev.** It renders correctly on AJ's
machine and silently falls back to a generic font for everyone else on Vercel or
a screenshare — this was a real bug we fixed in `b60f6e1`.

## Layout conventions

- **40px** left and right margins on all desktop main content (rails, adverts,
  and the hero's headline / subcopy / timer / pills / CTA).
- Hero CTA type: **18px desktop, 16px mobile**.
- Type and the big CTA **scale up** at 2560 / 3440 — they don't just reflow.
  Game rails duplicate tiles to fill wide rows.
- Live and Offline versions of the hero must be the **same height**.
- Promo banner artwork is **1104 × 674** (`BANNER_RATIO` in `src/data/lobby.ts`).
  On mobile the banners live inside the hero module; desktop shows the 3-up grid.
- The video's left/right fade gradients only apply above 1440px (below that it's
  full width).
- Play button gradient: `#009B00` top → `#00FF00` bottom.

## Where things live

```
src/config.ts        review areas, shipped hero, schedule, breakpoint, prize
src/index.css        design tokens (colours, type, gradients, keyframes)
src/data/            games, clips, episodes, promotions, wallet, profile (P&L per period, up + down)
src/components/casino/  brief concepts: shells, 3 directions, overlays, control bar
src/data/casino.ts   illustrative catalogue + explainable suggestion rules
src/components/      Hero (desktop D) + HeroMobileD (mobile 1–2) + HeroBits, rails,
                     modals, ControlBar, AreaSelect
src/components/shell/  DesktopShell (sidebar) · MobileShell (tab bar)
public/uploads/      brand art, hero video, promo banners, game covers
design-handoff/      original Claude Design handoff (DESIGN_SPEC.md + .dc.html)
```

AJ drops new assets straight into `public/uploads/` and says "I've added it to
the folder" — go look rather than asking for a path.

## Conventions

- Commit and push to `main` only. `push` means commit everything and push.
- Content lists in `src/data/` are mock data — nicknames, never real names.
- Concepts get **renumbered** when one is culled ("delete V2, V3 becomes V2").
- Dropdowns (area select, etc.) must sit on the top z-layer.
