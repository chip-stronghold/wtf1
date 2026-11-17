# Fonts

The display typeface for header titles and button CTAs is **Korolev Compressed
Heavy** — a commercial font that can't be committed to this repo.

The app requests it via the `--f-display` stack in `src/index.css` and falls
back to **Oswald** until the real font is available. To ship Korolev:

## Option A — self-host the webfont (recommended)
1. Obtain the licensed webfont (`.woff2`) from Type Network / Device Fonts.
2. Save it here as `KorolevCompressed-Heavy.woff2`.
3. In `src/index.css`, uncomment the `url('/fonts/KorolevCompressed-Heavy.woff2')`
   line inside the `@font-face` block.

## Option B — Adobe Fonts (Typekit)
Add your Adobe Fonts project `<link>` to `index.html`. As long as the family is
published as `Korolev Compressed Heavy`, the existing `--f-display` stack picks
it up with no other changes.

No file here is required for the app to build or run — it just falls back to
Oswald.
