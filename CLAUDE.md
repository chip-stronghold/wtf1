# WTF1 — Vegangster skinning sandbox

A public Vite + React + TypeScript review prototype with **one job**: show how
Vegangster's demo frontend (demo.vegangster.com) looks in WTF Games' skin, and
produce the token file they need. Live at https://wtf1-nine.vercel.app. Repo
`github.com/chip-stronghold/wtf1`. Deploys from `main` via Vercel.

**Scope rule:** the canvas only contains what Vegangster's demo contains — their
modules, in their order (glass header with product tabs · 340px side menu on desktop ·
"What are you playing today?" carousel ·
jackpot tiers + opt-in · Top grid · Our Streamers · Providers · Top events · bets
feed · SEO text + footer · floating bottom nav). No modules from our older
mock-ups. Content is mock (made-up nicknames) with our own game covers.

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
src/components/tokens/       TokensScreen (the canvas, token-only styling) · TokensControlBar ·
                             TokenSheet (every token, click to copy) · icons
src/tokens.css               .veg scope: base type/colour + the few shared component classes
src/hooks/useReviewOverrides URL state
design-handoff/vegangster/   their demo theme file, our mapping, screenshots, notes
public/uploads/              brand marks, game covers (WTF Games/), studio art
```

## URL state (keep every view addressable)

```
?skin=1..3   V1 Night · V2 Forest · V3 Carbon (graphite, PICK, default) — all green-primary
?view=mobile | desktop      ?sheet=1 token sheet      ?controls=0 clean build
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
