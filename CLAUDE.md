# WTF1 — Vegangster skinning sandbox

A public Vite + React + TypeScript review prototype with **one job**: show how
Vegangster's demo frontend (demo.vegangster.com) looks in WTF Games' skin, and
produce the token file they need. Live at https://wtf1-nine.vercel.app. Repo
`github.com/chip-stronghold/wtf1`. Deploys from `main` via Vercel.

**Scope rule:** the canvas only contains what Vegangster's demo contains — their
pages, their modules, their interactions. No modules from our older mock-ups.
Content is mock (made-up nicknames) with our own game covers and studio art.

Pages (`src/data/pages.ts` lists each with their path): Home `/` · Casino hub `/casino` ·
Category grid `/casino/slots` · Live Casino `/live-casino/all` · Sport `/sports` ·
Predictions `/sports/predictions` · Studio Packs (their Phygitals `/pokemon`) · PVP Arena
`/pvp` · Promotions `/casino-promo/all-promo` · Tournaments · Contests · Lotteries ·
Game page `/game/…` · Login and Sign-up (bonus step) dialogs. Their `/155_io` is an empty
third-party embed and is not reproduced.

Interactions that work in-canvas: side-menu accordions and language menu, product tabs,
bottom nav pill, chips/tabs, odds buttons (select/deselect), toggles, hero carousel
(tap to centre, tap again to open), game tiles → game page, pack price/quantity,
settings popover, login ↔ sign-up switch, mobile back arrow. All reflected in the URL.

```bash
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
```

## Where things live

```
src/data/skins.ts            3 skin directions as palettes → expanded to Vegangster's full
                             token set (--token-brand-*, --token-font-*, …). skinToCss() emits
                             the :root block their theme file uses (Copy CSS button). SKIN_PICK.
src/data/demo.ts             mock content shaped like their demo (games, jackpot tiers, streamers,
                             providers, events, bets, footer)
src/components/tokens/       TokensScreen (router + frames) · chrome (header, side menu, nav pill,
                             tiles, chips) · home · pages (all other pages) · modals · TokensControlBar
                             (page dropdown, dialogs, skins) · TokenSheet · icons
src/data/pages.ts            page list + per-page mock content
src/tokens.css               .veg scope: base type/colour + the few shared component classes
src/hooks/useReviewOverrides URL state
design-handoff/vegangster/   their demo theme file, our mapping, screenshots, notes
public/uploads/              brand marks, game covers (WTF Games/), studio art
```

## URL state (keep every view addressable)

```
?skin=1..3   V1 Night · V2 Forest · V3 Carbon (graphite, PICK, default) — all green-primary
?page=home|casino|slots|live|sport|predictions|packs|pvp|promotions|tournaments|contests|lotteries|game
?modal=login|signup         ?view=mobile | desktop      ?sheet=1 token sheet      ?controls=0 clean build
```

## Rules

- **Type: Oswald from Google Fonts** (trial, 17 Nov 2026), loaded in `index.html` and set via
  the `--token-font-*` tokens. Korolev is ruled out for this platform (Adobe-licensed).
- **Green is the primary in every skin direction**; magenta, gold and cyan only support it.
- **Green-filled buttons carry black text**, never white.
- **No gradient fills** on cards. Flat token surfaces; real covers for games.
- Nothing in the canvas may hard-code a colour, radius or font — everything goes
  through `var(--token-…)`, so a skin swap restyles all of it.
- Commit as `chip-stronghold` / `aj@engine4.com`, one branch `main`, `push` = commit + push.
