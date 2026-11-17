# WTF Games — Casino Lobby Design Concepts

Response to the brief *"WTF Games — Casino Lobby Design Concepts"* · first pass · 27 Oct 2026.

Everything described here is **built and clickable** in the review harness under the **Casino lobby** area.
Games, providers, play history, suggestion results and offers shown are **illustrative** — demonstration
interactions only, no real-money actions.

| Open | Link (local dev: `http://localhost:5173` · Vercel: the deployed `main`) |
|---|---|
| Direction 1 · The Shelf | `?area=casino&casino=1` |
| Direction 2 · The Arcade | `?area=casino&casino=2` |
| Direction 3 · The Feed | `?area=casino&casino=3` |
| State modifiers | `&view=mobile\|desktop` · `&visit=first\|returning` · `&interests=1` · `&overlay=prefs\|swipe` · `&preview=1` · `&loading=1` · `&unavailable=1` · `&day=1` · `&controls=0` |

The control bar also flips device, breakpoint (1440 / 2560 / 3440), first-vs-returning visit, interests on/off,
the preferences sheet, swipe mode, and the "States" menu (preview shelf, loading, live-tables-unavailable, tomorrow).

---

## 0. Review gaps and assumptions (read first)

- **Current site not inspected.** `wtfgames.com` redirects to `block.wtfgames.com` ("Out of bounds: not available
  in your region") from this machine. Per the brief, no VPN or network change was made. The current-site review
  is therefore **not done**; everything below proceeds from the brief and the existing prototype in this repo.
- **WTF Studios DNA skill not supplied.** No skill by that name exists in this environment. The DNA used is the
  **WTF Brand Guides** project (`/Users/ajnewman/Claude/WTF Brand Guides/src/brands.ts` and its asset folders):
  Studio Violet `#4800FF`, Chrome Lilac `#A48BFF`, Void `#0F0F14`, Frost `#ECECF2`, Clash Display, the chrome pill
  logo, the X-eyed studio hamster, the Vegas-hamster key art, and eight square game covers. Treat any Studios
  decision as provisional until the DNA skill is confirmed.
- **"Coralive"** is read as the Adobe-served brand display face used elsewhere in this repo. It is **not used
  anywhere** in the casino area (fonts are scoped to `.casino`). See §6 for the proposed substitute.
- **Platform provider unknown.** Every concept is built from components a turnkey/white-label lobby normally
  exposes (rails, grids, banners, category nav, search). Anything beyond that is labelled.
- **Preferred logo identified:** the WTF watermark/pill (`wtf-watermark-white.svg`, the WTF mark + GAMES inside
  a rounded pill) from the WTF Games brand guide. It replaces the old `WTF_games.png` / `sidenav.png` lockups in
  all three concepts. Black and green versions also supplied.

---

## 1. Three directions

### Direction 1 — The Shelf
- **Central idea.** The casino lobby people already know, done properly. Search and categories first, rails of
  square covers with titles underneath, and one house shelf that is unmistakably WTF Studios.
- **Layout.** Mobile: search → sticky category chips → opening row (WTF Live card + welcome offer, fixed height,
  no video) → **WTF Studios band** (violet wash, chrome pill logo, hamster, larger cards) → interest pills or
  "Picked for you" → Recently played → More like what you played → Today's six (3 × 2 grid) → Trending slots →
  Live tables → Game shows → Promotions → footer with safer-play tools. Desktop: 240px sidebar (pill logo,
  categories, Responsible play + Help pinned), top bar with search and wallet, same section order with
  40px margins.
- **Game presentation.** Uniform square covers, 118px on mobile (three visible per row), 164px on desktop,
  title + provider below the art so nothing overlaps the artwork. Studios cards are 138px with a lilac ring
  and a soft violet glow.
- **Navigation.** Bottom tabs Home · Search · Studios · Promos · Account; desktop sidebar.
- **WTF Studios DNA.** Contained in one band: violet gradient, Clash Display headline "Only on WTF Games",
  the chrome pill logo, the studio hamster as a quiet mascot. The rest of the lobby stays black-and-green.
- **Feasibility.** Highest. Every section is a rail, grid or banner; the band is a styled rail. Nothing needs
  provider work beyond the standard catalogue feed.

### Direction 2 — The Arcade
- **Central idea.** WTF Studios leads. The opening is a **static key-art marquee** (the Vegas hamster, chrome
  pill logo, one headline, one action) with Studios "cartridge" cards overlapping its foot. Below it, a
  **bento grid** where tile size is hierarchy: the big tile is your last game (returning) or the lead Studios
  title (first visit).
- **Layout.** Mobile: marquee → cartridges → "Where to start / Your lobby" bento (one 2×2 + five 1×1) →
  "Pick your poison" interest pills → "Dealt for you" grid → More like what you played → Today's six with a
  date sticker → the full Studios catalogue rail → Slots → Live → Game shows → Promos → footer.
  Desktop: **no sidebar** — categories live as tabs in the top bar; content full width with a 6-column bento.
- **Game presentation.** Studios titles get a cartridge: cover + a plate in the studio face. Everything else
  stays square. Bento big tile carries a title overlay and a Play button.
- **Navigation.** A sticky **mode strip** under the header (For you · WTF Studios · Originals · Slots · Live ·
  Game shows · New) is the primary nav; the bottom bar shrinks to Lobby · Search · Wallet · Account.
- **WTF Studios DNA.** Loudest of the three: violet-to-void header gradient, lilac buttons, chrome pill,
  key art, Clash Display for every Studios title.
- **Feasibility.** Medium. The marquee and cartridges are theme work. The bento and the top-tab desktop nav
  need a lobby that allows mixed tile sizes and a custom header — confirm with the provider; fallback is a
  standard rail in place of the bento.

### Direction 3 — The Feed
- **Central idea.** Mobile-native. A **channels row** (For you · Studios · Live · Slots · Shows · Promos) up
  top, then a vertical feed of modules. Each module is a card that says who it is from and why it is there,
  so suggestions explain themselves by construction. The optional swipe trainer is a first-class module.
- **Layout.** Mobile: channels → WTF Studios post (wide poster + mini covers) → Your picks / Picked for you →
  Train your feed → Recently played → More like these → Today's six → Trending slots (2-up posters) →
  Live now → Game shows → Promotions → footer. Desktop: slim icon sidebar + centred feed column (max 820px)
  + a sticky right rail holding interests, the trainer and two promos.
- **Game presentation.** Wide 16:11 poster cards in 2-up grids with the title on a scrim; small covers in
  rails; Studios posters carry a lilac ring and the studio face.
- **Navigation.** Bottom tabs Home · Discover (swipe) · Studios · Wallet · Account; channel avatars filter
  the feed.
- **WTF Studios DNA.** The Studios channel avatar is the hamster on violet, the Studios post is framed in
  lilac, and the trainer card uses the violet gradient. Elsewhere the feed is neutral surfaces.
- **Feasibility.** Medium-low on a turnkey platform. The feed is just stacked modules (fine), but the
  channels row, post framing and the three-column desktop need a custom lobby shell. Best fit if the
  platform exposes a headless catalogue API.

---

## 2. Recommended direction: The Shelf, with The Arcade's marquee as the phase-2 opening

**Pick Direction 1 for the first release.** It best balances the three things the brief asks for:

| | The Shelf | The Arcade | The Feed |
|---|---|---|---|
| Familiar casino structure | ✅ strongest | ⚠️ mode strip replaces tabs | ⚠️ social, not casino |
| Brand character | ⚠️ contained to one band | ✅ strongest | ✅ good on mobile |
| Mobile usability | ✅ three covers per row, short sticky strip | ✅ but marquee is 236px tall | ✅ most native |
| Desktop adaptation | ✅ sidebar + wide rails | ✅ top-tab nav, full-width bento | ⚠️ feed column wastes a wide screen |
| Platform practicality | ✅ rails, grids, banners only | ⚠️ bento + custom header | ❌ custom shell |

Trade-off: The Shelf is the least "funky" on first look. The fix is already built in Direction 2 — the static
key-art marquee with the cartridge rail — and it is a theme-level component. Ship The Shelf, then swap its
opening row for the marquee once the Studios key art is cleared for the lobby. Nothing else needs to change.

---

## 3. Mobile-first layout and desktop adaptation (recommended direction)

**Section order, mobile (390px)**

| # | Section | Height / density | Why it's there |
|---|---|---|---|
| 1 | Header: pill logo · wallet chip (returning) or Log in / Sign up (first) | 58px | Account and deposit always one tap away |
| 2 | Search · sticky category chips | 44px + 46px sticky | Find a game in two taps; the chips are the only thing that pins |
| 3 | Opening row: WTF Live card + welcome offer | fixed 1104:674 ratio, ~105px | Replaces the hero video. Static, restrained, same height in every state |
| 4 | WTF Studios band | 138px cards, 2.7 visible | The house games as the defining section, not a provider row |
| 5a | First visit: "What are you into?" pills + House picks | pills wrap, 118px cards | Useful default with zero history |
| 5b | Interests set: "Picked for you" | 118px cards | Explain line: *Because you picked Game shows and Quick rounds.* + Edit |
| 6 | Returning: Recently played (92px) → More like what you played (118px) | | History is labelled "Your history", suggestions "Suggested" — never mixed |
| 7 | Today's six | 3 × 2 grid | Same six for everyone, no countdown, date label only |
| 8 | Trending slots · Live tables · Game shows | 118px rails | The catalogue |
| 9 | Promotions | 290px banners | Existing artwork, reused |
| 10 | Footer: 18+ · Set limits · Take a break · Self-exclude · Get help | | Responsible-play tools visible without digging |

Bottom tabs: Home · Search · Studios · Promos · Account (Account holds preferences and safer-play tools).

**Desktop (1440 → 3440)**
- Left sidebar 240px: pill logo, Lobby, **WTF Studios**, Originals, Slots, Live casino, Game shows, Table
  games, Promotions; Responsible play and Help pinned at the bottom.
- Top bar: search (440px), wallet + Deposit + avatar, or Log in / Sign up.
- Content column capped at 1920px with **40px side margins**; rails repeat covers to fill wide rows.
- Opening row becomes three cards (WTF Live, welcome offer, weekly draw). Studios band cards 196px; standard
  covers 164px (seven visible at 1440).
- Type, cards, buttons and pills scale together via one multiplier (`--k`: 1 at 1440 · 1.5 at 2560 ·
  1.65 at 3440) so big monitors scale rather than reflow.

---

## 4. Key interface states (all built)

| State | What shows | URL |
|---|---|---|
| First visit, no interests | Log in / Sign up; "What are you into?" pills; House picks; no history rows | `?area=casino&casino=1` |
| Interests selected | "Picked for you" row with the reason line and an Edit link; pills reflect selection | `&interests=1` |
| Returning visit | Wallet chip; Recently played (history, labelled) + More like what you played (suggested, with reason) | `&visit=returning` |
| Returning + interests | Both suggestion rows, in that order, each explained | `&visit=returning&interests=1` |
| Refreshed suggestions | Today's six for tomorrow — the date label changes, nothing counts down | `&day=1` |
| Preference editing / reset | "Your lobby" sheet: interests, use-my-history switch, history thumbnails + Clear, Reset all suggestions, device-storage note | `&overlay=prefs` |
| Loading | Skeleton rails in place of suggestion rows | `&loading=1` |
| Empty / unavailable | Live tables down: dashed card with a plain line and Notify me; a greyed "Not available in your region" cover | `&unavailable=1` |
| Optional: preview shelf | "See them move": poster cards with a Preview control; tapping shows a labelled clip placeholder, muted, nothing autoplays | `&preview=1` |
| Optional: swipe discovery | "Train your picks": Like / Skip / Undo buttons, drag works too, rule written on screen, 8-card deck, completion state listing what changed, Start over, Reset interests, exit anywhere | `&overlay=swipe` |

Suggestion rules in the prototype (deliberately explainable, in `src/data/casino.ts`):
1. **Interest pills → Picked for you:** games carrying the most selected tags, history excluded.
2. **Recently played → More like these:** games sharing tags with what you played, history excluded.
3. **Today's six:** a date-seeded shuffle of the catalogue — identical for every player that day.
4. **Default:** a curated "House picks" list (Studios first) when there is no history and no interests.

---

## 5. Asset inventory

**Verified available (in this repo under `public/uploads/`)**
- Preferred logo: `brand/wtf-watermark-white.svg` (+ `-green`), WTF mark `brand/wtf-logo-white.svg`,
  horizontal lockup `brand/wtf-games-secondary.svg`, primary stacked `brand/wtf-games-primary.svg`.
- WTF Studios: `brand/wtf-studios-primary.png` (chrome pill), `brand/wtf-studios-mono-white.png`,
  `studios/studio-hamster.png`, `studios/key-art-hamster-vegas.jpg` (4032 × 1152; has an artefact strip at
  the bottom-right that the marquee crops out), eight 400 × 400 covers: Royal Flush, Lost My Marbles,
  What The Cluck?, Split The G, Numbface, Token Tower, Bubble Wrap, WTF Live.
- WTF Originals covers (7) and promo banners `Welcome-offer.png`, `banner_draw.png`, `banner_vip.png`,
  `banner_bigbass.png`, `WTF-Orginals.png`, `Daily_draw.png` (1104 × 674).
- Category labels used: All · WTF Studios · Originals · Slots · Live · Game shows · New (proposal).

**Potential reuse from the current site (availability and permissions unverified)**
- Partner slot thumbnails already in `uploads/WTF Games/` (Pragmatic Play and the `WG_*` set — provider for
  the `WG_*` titles is unconfirmed and shown as "Partner studio").
- Live-dealer covers (Pragmatic Play Live set).
- Any further category taxonomy, provider list and promo artwork on wtfgames.com (not inspected — see §0).

**Missing**
- WTF Studios DNA skill (the brand guide stood in).
- Gameplay preview clips for the preview shelf — none exist; the shelf shows posters and a labelled placeholder.
- A stacked WTF Studios logo (brand guide lists it as not supplied).
- Final copy for the welcome offer / draw banners in the new type (current banners carry baked-in type).
- Self-hosted font files (the prototype loads Archivo from Google Fonts and Clash Display from Fontshare).

---

## 6. Feasibility and constraints

**Likely theme / content / configuration (no provider work)**
- Colour, type, spacing tokens; the pill logo; the Studios band styling; card titles under art; sticky chips;
  section order; opening row of static cards; promotions grid; footer with safer-play links; 40px margins and
  the big-screen type multiplier.
- Interest pills and "Picked for you" / "More like these" when the platform lets the lobby read a tag per game
  (most do via categories). Tags can be a curated mapping maintained in the CMS.
- Today's six as a scheduled curated list (one CMS slot updated daily) if a date-seeded rule is not possible.

**Needs provider confirmation or additional development**
- Persistent interests and play history per account (fallback: `localStorage` on the device, as the sheet says).
- "Recently played" feed and its clearing.
- Bento / mixed tile sizes (Direction 2), custom top-tab header, the feed shell and three-column desktop
  (Direction 3).
- Preview shelf: clip hosting, muted autoplay-on-tap, poster fallback, reduced-motion handling.
- Swipe discovery: a place to store likes; without it the mode still works on-device.
- Region-availability flags per game (for the "not available in your region" state).

**Typography constraint and proposal**
- The Adobe-served brand face is not used in the casino area. **Proposed substitution:** **Archivo** (SIL Open
  Font Licence, Google Fonts; variable width 62–125 and weight 100–900) — the extra-condensed black cut at
  `font-stretch: 62%` / weight 900 carries the compressed, shouty WTF headline feel; the normal width carries
  body and UI. **Clash Display** (ITF Free Font Licence, Fontshare) is already the WTF Studios face per the
  brand guide and is used for Studios moments only.
- This is a proposal, not a brand standard. Before implementation verify: font identity and version, licence
  text, web-embedding rights, available WOFF2 files, and rendering on iOS Safari / Android Chrome / Windows.
  Both are self-hostable; production should serve them from the site, not the CDNs the prototype uses.

---

## 7. Core versus optional scope

**Release 1 (core)**
1. Direction 1 shell: pill logo, header, sidebar / bottom tabs, search, sticky categories, footer with safer-play tools.
2. Opening row of static cards (no video).
3. WTF Studios band + Studios cards in the catalogue with the "WTF Studios" provider label.
4. Standard rails: Trending slots, Live tables, Game shows, Promotions.
5. Interest pills → Picked for you, with the reason line, Edit, and the "Your lobby" sheet (device-stored).
6. Today's six (curated daily slot if the rule is not supported).
7. Loading, empty / unavailable, region-unavailable states.
8. Archivo + Clash Display self-hosted, verified per §6.

**Phase 2 (when provider support is confirmed)**
- Recently played + More like what you played (needs account history).
- Account-synced preferences and reset.
- The Arcade marquee as the opening section (needs key-art clearance).

**Optional / deferred**
- WTF Studios preview shelf (needs clips).
- Swipe discovery mode.
- Direction 2's bento and Direction 3's feed shell, if the platform turns out to be headless.

---

## Where it lives in the repo

```
src/data/casino.ts                  illustrative catalogue, interests, history, suggestion rules
src/casino.css                      scoped tokens + proposed type (Archivo / Clash Display)
src/components/casino/parts.tsx     logo, headers, cards, pills, states, footer, icons
src/components/casino/modules.tsx   cover rows, Today's six, optional preview shelf
src/components/casino/CasinoShell.tsx   mobile shell (3 nav models) + desktop shell (sidebar / top-nav / three-col)
src/components/casino/ConceptShelf.tsx · ConceptArcade.tsx · ConceptFeed.tsx
src/components/casino/overlays.tsx  "Your lobby" preferences sheet · swipe trainer
src/components/casino/CasinoPage.tsx · CasinoControlBar.tsx
public/uploads/brand/ · public/uploads/studios/   logos and Studios art copied from the WTF Brand Guides
```
