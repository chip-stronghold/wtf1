# Vegangster — skinning notes (17 Nov 2026)

Vegangster (vegangster.com) is the turnkey/white-label platform under evaluation.
Nothing public exists for design: no docs site, no Figma kit, no GitHub.

What they *do* have (per their CPO, iGaming Expert, 2 Nov 2026):
- **Frontend Agent Skills**, downloaded from the operator **back office** —
  a *design* skill (how their visual system works) and a *development* skill
  (how platform data is exposed). Meant to be fed to Claude/Cursor/Codex to
  generate **custom components** (HTML+JS widgets pasted into the CMS, sandboxed).
- The frontend is React; theming is one `:root` token file per brand
  (`/media/theme/<brand>.<ts>.css`, ~130 tokens) plus BEM `ui-*` components.

Live playground: https://wtf1-nine.vercel.app/?area=tokens (repo chip-stronghold/wtf1) —
three skin directions on a token-only component kit, with a token sheet and Copy-CSS export.

Files here:
- `demo-theme.vegangster.css` — their demo brand's token file, verbatim.
- `demo-theme.readable.css` — same, one token per line, data URIs stripped.
- `component-classes.txt` — the 126 `ui-*` component families in their bundle.
- `wtf-games-skin.css` — our brand mapped onto their tokens (proven live on the demo).
- `demo-original-desktop.jpg`, `wtf-skin-*.jpg` — before / after.

Ask Vegangster for: a sandbox back-office login (to download both Agent Skills),
and the token naming reference behind `secondary-1…24`. Fonts stay on their
default stack for now (Korolev ruled out: Adobe-licensed).
