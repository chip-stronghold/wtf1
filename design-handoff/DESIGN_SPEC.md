# Handoff: WTF Games — Crypto Casino Lobby + "WTF Live" Hero

## Overview
A **mobile-responsive crypto casino lobby** for WTF Games, centred on promoting the house's flagship live show **WTF Live** (a free-to-play, play-along game show with a **$1,000 weekly cash prize** — pick winners across hamster/marble/treadmill racing etc. to earn raffle tickets).

The deliverable is a single lobby that:
- Renders as a **mobile phone layout** and a **desktop layout** (toggle), sharing one content component.
- Presents **5 interchangeable WTF Live "hero" concepts** at the top of the lobby (a switcher flips between them; this is a design-exploration device, not a shipping feature — see "Hero concepts").
- Shows a **LIVE vs OFFLINE** show state (offline shows a countdown to the next show; live shows a play affordance).
- Below the hero: **3 rectangular promo banners**, then horizontally-scrolling rows of **square game covers** by category (Trending Slots, WTF Originals, Table Games), a **WTF Clips** social-video rail, and a **Past Episodes** rail.
- A **dark left sidebar nav** (desktop) / **bottom tab bar + top logo header** (mobile).
- Tapping a WTF Clip opens a **fullscreen video modal**.

## About the Design Files
The files in this bundle are **design references created in HTML** — working prototypes that show the intended look and behaviour. They are **not production code to copy directly**.

These specific `.dc.html` files use an internal streaming-component runtime (`support.js`, with `<x-dc>`, `<sc-if>`, `<sc-for>`, `<dc-import>` tags and a `renderVals()` logic class). **Do not port that runtime.** Treat the HTML/CSS/JS as a precise visual + behavioural spec and **recreate it in the target codebase's existing environment** (React, Vue, SwiftUI, native, etc.) using its established component patterns, styling system, and routing. If no environment exists yet, choose the most appropriate framework for the project and implement there.

To preview the prototype: open `WTF Live Lobby.dc.html` in a browser (it pulls in `WTF Lobby Content.dc.html` and the `uploads/` assets via relative paths).

## Fidelity
**High-fidelity (hifi).** Final colours, typography, spacing, copy, and interactions are all specified below and present in the files. Recreate pixel-accurately using the codebase's libraries. The one caveat: the in-page **hero-concept switcher** and **Mobile/Desktop + Offline/Live toggles** are a *review harness* for choosing a direction — production should pick ONE hero concept and the real responsive breakpoint, not ship the switcher.

---

## Design Tokens

### Colour
| Token | Hex | Use |
|---|---|---|
| Black (page) | `#08080A` / `#000000` | App background, hero base |
| Sidenav ink | `#0E0E10` | Desktop sidebar |
| Panel | `#101014` / `#141418` | Wallet chip, search field |
| Card fill | `#111111` | Cover/clip card placeholder bg |
| Border | `#23232A` | Card & divider borders (primary) |
| Border alt | `#2C2C33` / `#303036` | Inputs, timer pill |
| Neon green (accent) | `#00FF00` | CTAs, live dots, accents, active nav |
| Magenta | `#E128FF` | Secondary accent (avatars/episodes) |
| Cyan | `#05C5FF` | Tertiary accent |
| Red (live) | `#FF0000` | LIVE badges/dots |
| Orange | `#CF640D` | Accent |
| Purple | `#4800FF` / `#6A00FF` | Accent |
| Text primary | `#FFFFFF` | Headlines, body |
| Text dim | `#D2D2D2` | Subcopy |
| Text muted | `#A5A5A5` | Eyebrows, labels |
| Text faint | `#787878` / `#5A5A5A` | Tertiary / footer |

### Typography
- **Display / headings:** `Oswald`, weights 600/700 (substitute for the brand's *Korolev Compressed*). Uppercase, tight line-heights (.8–.88), letter-spacing ~ -0.01em.
- **Body / UI:** `Barlow`, weights 400–700 (substitute for the brand's *Korolev*).
- **Sticker (optional):** `Luckiest Guy`.
- Google Fonts import used: `Oswald:400,500,600,700` + `Barlow:400,500,600,700` + `Luckiest Guy`.
- Key sizes: section titles 23px/700 uppercase; hero headline 38–44px (concept 1 uses `clamp(30px,7.5vw,40px)`); subcopy 12–12.5px / line-height ~1.45; eyebrow & labels 9–11px uppercase, letter-spacing .06–.2em; button label 14–15px uppercase.

### Spacing & Radius
- Spacing scale: 4 / 8 / 9 / 12 / 14 / 16 / 18 / 20 / 22 px (page gutter is **14px** on mobile content).
- Radius: chips/pills `9999px`; buttons/inputs `10px`; cards `12px`; banners `14px`; hero module (concept 5) `16px`; modal video `20px`; phone frame `38–46px`.

### Shadows / Effects
- Card shadow / elevation: `0 6px 14px rgba(0,0,0,.5)`, deep `0 24px 70px rgba(0,0,0,.6)`.
- Neon glow (CTAs, prize numbers): `0 0 24–34px rgba(0,255,0,.45–.6)`.
- Hero **protection gradients** (Netflix-style): an angular left wash + a bottom fade to black — e.g. `linear-gradient(100deg, rgba(8,8,12,.96) 0%, rgba(8,8,12,.8) 26%, rgba(8,8,12,.4) 50%, rgba(8,8,12,.05) 72%, transparent 90%)` plus `linear-gradient(0deg,#08080c 0%, rgba(8,8,12,.55) 16%, transparent 46%)`.
- Modal backdrop: `rgba(0,0,0,.5)` + `backdrop-filter: blur(14px)` (semi-transparent, lobby shows through).

### Motion
- Hover: card lift `translateY(-3px)`, transition `transform .18s ease`. Buttons: brightness only, no scale.
- Keyframes used: `wtfBlink` (live dot, 1s steps), `wtfFloat` (play button bob, 3s), `wtfPan` (slow drift on episode thumbs).

---

## Layout Shells

### Mobile shell (~390px wide phone)
- Phone frame: `#050507`, radius 46, 10px padding; screen radius 38, `height:728px`, `overflow:hidden`, single vertical scroll container (`#wtf-scroller`).
- **Status bar** (mock): 34px, time left / signal right.
- **Header** (sticky, top): left = **WTF Games logo** (`uploads/WTF_games.png`, height 30); right = wallet chip (`$1,250 USDC` + green `+` deposit). No hamburger, no notification bell.
- Content component (see below).
- **Bottom tab bar** (sticky): Home (active, green) · Slots · **WTF Live** (raised green circular center) · Leagues · Wallet. Icons ~22px, labels 9px. Home & center scroll to top.

### Desktop shell (`min(1180px, 96vw)` window)
- Browser-window chrome (traffic lights + `wtfgames.com/casino` URL pill).
- Body `height:720px`, flex row: **sidebar (230px fixed)** + **main (flex)**.
- **Sidebar** (`#0E0E10`, right border `#23232A`): full-bleed logo image at top (`uploads/sidenav.png`, width 100%, no inset/box), divider, search field, divider, then nav list, spacer, Help + Discord Support pinned bottom.
  - Nav items (icon 20px + label 14px; active = green icon, `rgba(0,255,0,.08)` bg, 2px green left border): **Originals** (active) · Slots · Table Games · Blackjack · Roulette · Game Shows · Sports | Coming Soon · Promotions.
- **Top bar** (60px, `#000`, bottom border): right-aligned wallet chip (`$1,250 USDC` + green **Deposit**), **Sign in** (ghost) + **Sign up** (green). No breadcrumb, no notification bell.
- Scroll container `#wtf-scroller-d` holds the content component with `desktop` flag on.

Shared content renders identically except: desktop promos = 3-up full-width grid; desktop game categories = single horizontal rows; mobile game categories = single horizontal rows too; hero CTAs are standard-width on desktop (≈170px min) vs full-width/flex on mobile.

---

## Content Component (shared) — top to bottom

1. **Hero** (concepts 1–4 render here; concept 5 renders *below* the promo banners instead).
2. **Promo banners** — 3 rectangular image banners (aspect 1106:580): `Welcome-offer.png` ($500 welcome), `WTF-Orginals.png` (Bet Crazy), `Daily_draw.png` ($1,000 weekly draw). Mobile = horizontal snap rail (~300px each); desktop = 3-col grid full-width.
3. **Trending Slots** — title + "See all ›"; single horizontal rail of **square (1:1) cover images, no text/chips overlaid**. Cards: radius 12, border `#23232A`, hover lift. Card width 120px mobile / 152px desktop.
4. **WTF Originals** — same rail; title has a green "Studios" pill.
5. **WTF Clips** — title + "Watch all ›"; horizontal rail of **9:16 vertical** social thumbnails (112px wide). Each: image + bottom gradient + center play glyph + caption (10.5px) + handle + view count (eye icon). **Tap → fullscreen modal** (see Interactions).
6. **Table Games** — same square-cover rail (live-dealer covers).
7. **Past Episodes** (`#wtf-previous`) — horizontal rail of 198px cards: 112px thumb (animated gradient placeholder) with EP tag + duration + play glyph, then title, date, and green "Winner: …".
8. **Footer** — copyright / responsible-play line.

---

## Hero Concepts (WTF Live)

All concepts: full-bleed looping background video (`uploads/bg_hero.mp4`, autoplay/muted/loop/playsinline), Netflix angular-left + bottom-to-black protection gradients, content anchored bottom-left, and two states:
- **OFFLINE** → countdown to next show + **Set reminder** (primary green) + **Previous episodes** (ghost; scrolls to Past Episodes section).
- **LIVE** → **Play and Watch Free Now** (primary, full-width on mobile).

Prize string is a single source value (`$1,000`) reused across concepts.

- **Concept 1 — Cinematic.** Green pill **"WTF LIVE · FREE TO PLAY"**; big headline **"WIN $1,000 WEEKLY"** ($ amount in green); subcopy: *"Watch the crazy show with your favourite hosts and bet on Hamsters, Marbles and whatever weird stuff the guys are up to tonight!"* Offline countdown pill = compact "NEXT SHOW 1d 06:22:14". **Desktop:** module height ~268 (mobile 300); countdown pill **top-right**; in LIVE state the LIVE badge is **top-right** and the green play button is **removed** (mobile keeps top-left + play button). **Desktop also pulls the 3 promo banners up ~58px** so the video fades to black behind them (integrated top section).
- **Concept 2 — Prize Pot.** Big headline **"WIN $1,000 WEEKLY FREE TO ENTER"** ($ in green) + subcopy *"Just watch WTF Live and pick your winners to earn raffle tickets across hamster, marble racing and more unhinged craziness."* Shorter video (height ~272). Top-left countdown/live pill.
- **Concept 3 — Countdown.** Centerpiece is a **segmented flip countdown** (D : H : M : S blocks; seconds block is green/glowing). Bottom-left uses the **WTF Live logo image** (`uploads/WTFLIVE_LOGO.png`, height 40) followed by big headline **"WIN $1,000 FREE"**. Compact height (~266). Live state swaps countdown for "LIVE NOW" + play button.
- **Concept 4 — Starring.** Ribbon + "WTF Live" + subcopy *"Just watch WTF Live and pick your winners to earn raffle tickets across hamster, marble racing and more unhinged craziness."* + a **"★ Starring this week"** avatar row. Avatars are circular gradient tokens with initials + names: **"Piss Pants Greg" (PG, green)** and **"Crackhead Josh" (CJ, magenta)**. Mobile: avatars inline under subcopy, above CTAs (38px). Desktop: avatars pinned **bottom-right** of the video (46px). Height ~298.
- **Concept 5 — Below Banners.** No hero at the very top; instead the 3 promo banners come first, then a **full-width WTF Live module tile** (rounded 16, height ~236) with the same video + content.

---

## Interactions & Behaviour
- **Hero switcher / state toggles** (review harness): select concept 1–5; toggle Mobile/Desktop; toggle Offline/Live. In production, pick one concept + real responsive breakpoint and the real live/offline data source.
- **Countdown:** live ticking countdown to a target datetime, formatted `Dd HH:MM:SS` (and as D/H/M/S blocks in concept 3). Updates every 1s.
- **Previous episodes** button & links: smooth-scroll the lobby scroll container to the **Past Episodes** section (`scrollTo`, not `scrollIntoView`).
- **Game/clip rails:** native horizontal overflow scroll, scrollbars hidden.
- **WTF Clip → fullscreen modal:** clicking a clip opens a `position:fixed` overlay (z-index 9999) with a **semi-transparent blurred backdrop** (`rgba(0,0,0,.5)` + blur 14px — lobby visible behind). Inside: a 9:16 video (`bg_hero.mp4` as stand-in) auto-playing, with bottom gradient, caption/handle/views, a red "WTF Clips" live pill top-left, and a circular **✕** close top-right. Click backdrop or ✕ to close; clicks inside the video card don't close (stop propagation).
- **Hover:** cover/clip cards lift 3px; buttons brighten only.

## State Management
- `view`: `'mobile' | 'desktop'` (production: real responsive breakpoint, not state).
- `hero`: `1–5` and `live`: boolean — production: choose one concept; `live` comes from the show's real status feed.
- `countdown`: `{ d,h,m,s }` derived from a target datetime on a 1s interval.
- `activeClip`: the clip object currently open in the modal (or null).
- Data needed: wallet balance/currency; lists for slots, originals, table games (cover image + title), WTF clips (video src, caption, handle, views), past episodes (thumb, ep#, title, date, winner, duration), starring cast (name/initials/colour), next-show datetime, weekly prize amount.

---

## Assets
All under `uploads/` (paths are relative; the lobby references them directly). Filenames with spaces are URL-encoded at runtime.
- **Brand:** `WTF_games.png` (mobile header logo), `sidenav.png` (desktop sidebar logo art), `WTFLIVE_LOGO.png` (concept-3 WTF Live wordmark).
- **Hero video:** `bg_hero.mp4` (also used as the stand-in clip video in the modal).
- **Promo banners:** `Welcome-offer.png`, `WTF-Orginals.png`, `Daily_draw.png`.
- **WTF Clips (social, 9:16):** `hrl_2.jpg`, `hrl_3.jpg`, `mrl_1.jpg`, `mrl_2.jpg`, `mrl_3.jpg`, `trl_1.jpg`, `trl_2.jpg`, `trl_3.jpg`, `mystery_1.jpg`, `mystery_2.jpg`, `mystery_3.jpg`.
- **Game covers (square)** in `uploads/WTF Games/`:
  - *Slots:* Sweet Bonanza, Gates of Olympus, Big Bass Splash, Overdose, Last Call, Transformers, Big Black Cock (BBC), Ivy, Blazin' Quinn.
  - *WTF Originals:* Royal Flush, Plinko, Mines, Towers, Dice, Keno, Wheel, LaunchX, Lost My Marbles.
  - *Table Games (live dealer):* Dice City, Money Time, PowerUP Roulette, Mega Wheel, The Bingo Spot, Sweet Bonanza Candyland.
- These covers are real product artwork (logos baked in) — **the design intentionally overlays no extra text/labels on them.**

> Brand system note: this design follows the **WTF Games design system** (dark, high-contrast, neon-green accent, Korolev type → Oswald/Barlow fallbacks). In your codebase, map these to the equivalent brand tokens/components if they already exist. Clips currently all play the same `bg_hero.mp4` placeholder — wire each clip to its own MP4 in production.

## Files
- `WTF Live Lobby.dc.html` — top-level lobby: control/switcher harness, mobile shell, desktop shell, countdown logic, nav data.
- `WTF Lobby Content.dc.html` — the shared content component: all 5 hero concepts, promo banners, game rails, clips + modal, past episodes, and the data arrays.
- `support.js` — the prototype runtime (reference only; **do not port**).
- `uploads/` — all images + the hero video referenced above.
