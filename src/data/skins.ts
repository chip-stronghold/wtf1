/**
 * Skin directions for the Vegangster frontend, expressed in Vegangster's OWN
 * token names (`--token-brand-*`, `--token-font-*`, …) so a skin can be copied
 * straight into their per-brand theme file. See design-handoff/vegangster.
 *
 * A skin is authored as a small palette; `buildTokens` expands it to the full
 * ~130-token set the platform expects. Fonts stay on Vegangster's default stack
 * (Korolev is ruled out — Adobe-licensed).
 */
export type SkinId = 1 | 2 | 3
export type Tokens = Record<string, string>

interface Ramp {
  100: string
  300: string
  400: string
  500: string
  600: string
}

export interface Palette {
  id: SkinId
  label: string
  desc: string
  /** Page / app background (their secondary-4). */
  bg: string
  /** Header, sidenav, footers (secondary-1). */
  surface: string
  /** Cards and panels (secondary-5). */
  surface2: string
  /** Raised / hover panels (secondary-2). */
  surface3: string
  line: string
  lineStrong: string
  text: string
  textDim: string
  textMuted: string
  textFaint: string
  textFainter: string
  /** Accent 1 drives CTAs, active tabs, focus (their brand-color-1). */
  a1: Ramp
  /** Accent 2: promo / VIP / secondary emphasis (brand-color-2). */
  a2: Ramp
  /** Accent 3: info, live, links (brand-color-3). */
  a3: Ramp
  /** Label colour on accent-1 filled buttons. */
  buttonText: string
  success: string
  warning: string
  error: string
  info: string
  radius: { button: number; buttonLg: number; tab: number; input: number; label: number }
}

/** Trial type: Oswald (Google Fonts, OFL) in every slot — display weight 600, UI weight 400. */
const DEFAULT_FONT = '"Oswald", "Arial Narrow", Arial, sans-serif'

function rgb(hex: string): string {
  const h = hex.replace('#', '')
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16)
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`
}
const rgba = (hex: string, a: number) => `rgba(${rgb(hex)}, ${a})`

export function buildTokens(p: Palette): Tokens {
  const ramp = (name: string, r: Ramp): Tokens => ({
    [`--token-brand-${name}-100`]: r[100],
    [`--token-brand-${name}-300`]: r[300],
    [`--token-brand-${name}-400`]: r[400],
    [`--token-brand-${name}-500`]: r[500],
    [`--token-brand-${name}-600`]: r[600],
  })
  const btn = (name: string): Tokens => ({
    [`--token-brand-button-${name}-text`]: p.buttonText,
    [`--token-brand-button-${name}-normal`]: p.a1[500],
    [`--token-brand-button-${name}-hover`]: p.a1[400],
    [`--token-brand-button-${name}-active`]: p.a1[600],
  })
  return {
    ...ramp('brand-color-1', p.a1),
    ...ramp('brand-color-2', p.a2),
    ...ramp('brand-color-3', p.a3),
    // "primary-1" is their text ramp: 100 = faintest … 600 = brightest.
    '--token-brand-primary-1-100': p.textFainter,
    '--token-brand-primary-1-200': p.textFaint,
    '--token-brand-primary-1-300': p.textMuted,
    '--token-brand-primary-1-400': p.textDim,
    '--token-brand-primary-1-500': p.textDim,
    '--token-brand-primary-1-600': p.text,
    // Numbered surface slots, mapped from how the demo uses them.
    '--token-brand-secondary-1': p.surface,
    '--token-brand-secondary-2': p.surface3,
    '--token-brand-secondary-3': p.text,
    '--token-brand-secondary-4': p.bg,
    '--token-brand-secondary-5': p.surface2,
    '--token-brand-secondary-6': p.line,
    '--token-brand-secondary-7': p.surface2,
    '--token-brand-secondary-8': p.surface,
    '--token-brand-secondary-9': p.textDim,
    '--token-brand-secondary-10': p.a3[500],
    '--token-brand-secondary-11': p.a2[400],
    '--token-brand-secondary-12': p.a1[500],
    '--token-brand-secondary-13': p.text,
    '--token-brand-secondary-14': 'rgba(0, 0, 0, 0.6)',
    '--token-brand-secondary-15': p.surface2,
    '--token-brand-secondary-16': p.success,
    '--token-brand-secondary-17': p.text,
    '--token-brand-secondary-18': p.bg,
    '--token-brand-secondary-19': p.surface2,
    '--token-brand-secondary-20': p.surface3,
    '--token-brand-secondary-21': p.text,
    '--token-brand-secondary-22': p.surface,
    '--token-brand-secondary-23': p.error,
    '--token-brand-secondary-24': rgba(p.surface2, 0.85),
    '--token-brand-secondary-4-rgb': rgb(p.bg),
    '--token-brand-secondary-5-rgb': rgb(p.surface2),
    '--token-brand-secondary-13-rgb': rgb(p.text),
    '--token-brand-brand-color-3-500-rgb': rgb(p.a3[500]),
    '--token-brand-line-strong': p.lineStrong,
    ...btn('banner'),
    ...btn('deposit'),
    '--token-brand-error-500': p.error,
    '--token-brand-error-600': rgba(p.error, 0.9),
    '--token-brand-warning-500': p.warning,
    '--token-brand-warning-600': rgba(p.warning, 0.9),
    '--token-brand-success-500': p.success,
    '--token-brand-success-600': rgba(p.success, 0.9),
    '--token-brand-info-500': p.info,
    '--token-brand-info-600': rgba(p.info, 0.9),
    '--token-brand-shadow-1': '0px -4px 10px rgba(0, 0, 0, 0.05), 0px 14px 20px rgba(0, 0, 0, 0.2)',
    '--token-brand-shadow-2': '0px 1px 5px 2px rgba(0, 0, 0, 0.15)',
    '--token-brand-shadow-3': '0px -4px 7px rgba(0, 0, 0, 0.05)',
    '--token-brand-shadow-4': '0px 1px 5px 0px rgba(0, 0, 0, 0.15)',
    '--token-font-card-family': DEFAULT_FONT,
    '--token-font-card-weight': '600',
    '--token-font-banner-family': DEFAULT_FONT,
    '--token-font-banner-weight': '600',
    '--token-font-map-family': DEFAULT_FONT,
    '--token-font-map-weight': '600',
    '--token-font-ui-family': DEFAULT_FONT,
    '--token-font-ui-weight': '400',
    '--token-typography-size-xs': '8px',
    '--token-typography-size-sm': '10px',
    '--token-typography-size-md': '12px',
    '--token-typography-size-lg': '14px',
    '--token-typography-size-lg-plus': '16px',
    '--token-typography-size-xl': '18px',
    '--token-typography-size-2xl': '20px',
    '--token-typography-size-3xl': '24px',
    '--token-typography-size-4xl': '30px',
    '--token-typography-size-5xl': '40px',
    '--token-border-radius-button': `${p.radius.button}px`,
    '--token-border-radius-buttons-sm': `${p.radius.button}px`,
    '--token-border-radius-buttons-md': `${p.radius.button}px`,
    '--token-border-radius-buttons-lg': `${p.radius.buttonLg}px`,
    '--token-border-radius-buttons-preset-button': `${p.radius.input}px`,
    '--token-border-radius-tabs-category-tab-v2': `${p.radius.tab}px`,
    '--token-border-radius-input': `${p.radius.input}px`,
    '--token-border-radius-label': `${p.radius.label}px`,
    '--token-brand-gradient-8': 'linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%)',
    '--token-brand-gradient-9': `linear-gradient(270deg, ${rgba(p.bg, 0)} 0%, ${p.bg} 100%)`,
    '--token-brand-gradient-10': `linear-gradient(180deg, ${p.surface2} 0%, ${rgba(p.surface2, 0)} 100%)`,
    '--token-brand-gradient-11': `linear-gradient(180deg, ${rgba(p.bg, 0)} 0%, ${p.bg} 100%)`,
    '--token-brand-gradient-13': `linear-gradient(90deg, ${rgba(p.a1[500], 0.18)} 0%, ${rgba(p.bg, 0.4)} 100%)`,
    '--token-brand-gradient-14': `linear-gradient(180deg, ${rgba(p.surface2, 0)} 0%, ${p.surface2} 100%)`,
    '--token-brand-constructor-bento-gradient-1': `linear-gradient(125deg, ${p.surface3} 0%, ${p.a1[600]} 100%)`,
    '--token-brand-constructor-bento-gradient-2': `linear-gradient(125deg, ${p.surface3} 0%, ${p.a2[500]} 100%)`,
    '--token-brand-constructor-bento-gradient-3': `linear-gradient(125deg, ${p.surface3} 0%, ${p.a3[500]} 100%)`,
    '--token-brand-constructor-bonus-gradient-2': `linear-gradient(90deg, ${p.a1[600]} 0%, ${p.surface3} 100%)`,
    '--token-brand-glass-effect-general': rgba(p.surface2, 0.55),
    '--token-brand-glass-effect-brand': rgba(p.a1[500], 0.22),
    '--token-brand-glass-effect-stroke': rgba(p.a1[500], 0.35),
  }
}

const GREEN: Ramp = { 100: '#b3ffb3', 300: '#66ff66', 400: '#33ff33', 500: '#00ff00', 600: '#009b00' }
const MAGENTA: Ramp = { 100: '#f6c9ff', 300: '#ee8dff', 400: '#e75cff', 500: '#e128ff', 600: '#a81bbf' }
// Green is the WTF primary in every direction; magenta/gold/cyan only ever support it.
const CYAN: Ramp = { 100: '#c9f1ff', 300: '#6fdbff', 400: '#05c5ff', 500: '#049ccb', 600: '#037396' }
const GOLD: Ramp = { 100: '#fff0b3', 300: '#ffd666', 400: '#ffc933', 500: '#ffb800', 600: '#b88400' }
const MINT: Ramp = { 100: '#c9fff1', 300: '#6fffd8', 400: '#1ef0b6', 500: '#12b88a', 600: '#0c7f60' }

export const PALETTES: Palette[] = [
  {
    id: 1,
    label: 'V1 · Night',
    desc: 'WTF blacks · green CTA · magenta + cyan support · tight 8px radii',
    bg: '#08080c',
    surface: '#0e0e10',
    surface2: '#101014',
    surface3: '#16161c',
    line: 'rgba(255, 255, 255, 0.08)',
    lineStrong: '#2c2c33',
    text: '#ffffff',
    textDim: '#d2d2d2',
    textMuted: '#a5a5a5',
    textFaint: '#787878',
    textFainter: '#5a5a5a',
    a1: GREEN,
    a2: MAGENTA,
    a3: CYAN,
    buttonText: '#000000',
    success: '#00ff00',
    warning: '#ffb800',
    error: '#ff3b5c',
    info: '#05c5ff',
    radius: { button: 8, buttonLg: 10, tab: 8, input: 8, label: 6 },
  },
  {
    id: 2,
    label: 'V2 · Forest',
    desc: 'Green-black surfaces · green CTA · gold for jackpots + VIP · pill radii',
    bg: '#050a07',
    surface: '#09120d',
    surface2: '#0c1711',
    surface3: '#132219',
    line: 'rgba(120, 255, 160, 0.09)',
    lineStrong: '#21382d',
    text: '#f2fff5',
    textDim: '#cfe3d6',
    textMuted: '#94ad9d',
    textFaint: '#627a6b',
    textFainter: '#44584c',
    a1: GREEN,
    a2: GOLD,
    a3: MINT,
    buttonText: '#000000',
    success: '#00ff00',
    warning: '#ffb800',
    error: '#ff4d6d',
    info: '#1ef0b6',
    radius: { button: 20, buttonLg: 30, tab: 24, input: 12, label: 16 },
  },
  {
    id: 3,
    label: 'V3 · Carbon',
    desc: 'Graphite surfaces · green CTA · magenta support · soft 12px radii',
    bg: '#0a0a0c',
    surface: '#111114',
    surface2: '#131317',
    surface3: '#1b1b20',
    line: 'rgba(255, 255, 255, 0.07)',
    lineStrong: '#2a2a31',
    text: '#ffffff',
    textDim: '#d6d6dc',
    textMuted: '#a0a0aa',
    textFaint: '#72727c',
    textFainter: '#52525a',
    a1: GREEN,
    a2: MAGENTA,
    a3: CYAN,
    buttonText: '#000000',
    success: '#00ff00',
    warning: '#ffb800',
    error: '#ff3b5c',
    info: '#05c5ff',
    radius: { button: 12, buttonLg: 14, tab: 12, input: 10, label: 8 },
  },
]

export const SKINS: Record<SkinId, { palette: Palette; tokens: Tokens }> = {
  1: { palette: PALETTES[0], tokens: buildTokens(PALETTES[0]) },
  2: { palette: PALETTES[1], tokens: buildTokens(PALETTES[1]) },
  3: { palette: PALETTES[2], tokens: buildTokens(PALETTES[2]) },
}

/** The skin AJ picks for dev (PICK badge). null until chosen. */
export const SKIN_PICK: SkinId | null = 3

/** Serialise a skin as the `:root { … }` block Vegangster's theme file uses. */
export function skinToCss(id: SkinId): string {
  const { palette, tokens } = SKINS[id]
  const lines = Object.entries(tokens).map(([k, v]) => `  ${k}: ${v};`)
  return `/* WTF Games skin — ${palette.label} — generated from WTF1 */\n:root {\n${lines.join('\n')}\n}\n`
}

/** Groups for the token sheet, in display order. */
export const TOKEN_GROUPS: { title: string; match: (k: string) => boolean }[] = [
  { title: 'Accent 1 · CTAs, active, focus', match: (k) => k.startsWith('--token-brand-brand-color-1-') && !k.endsWith('-rgb') },
  { title: 'Accent 2 · promo, VIP', match: (k) => k.startsWith('--token-brand-brand-color-2-') },
  { title: 'Accent 3 · info, live, links', match: (k) => k.startsWith('--token-brand-brand-color-3-') && !k.endsWith('-rgb') },
  { title: 'Text ramp (their “primary-1”)', match: (k) => k.startsWith('--token-brand-primary-1-') },
  { title: 'Surfaces (their numbered “secondary” slots)', match: (k) => /^--token-brand-secondary-\d+$/.test(k) || k === '--token-brand-line-strong' },
  { title: 'Buttons', match: (k) => k.startsWith('--token-brand-button-') },
  { title: 'Status', match: (k) => /^--token-brand-(error|warning|success|info)-/.test(k) },
  { title: 'Radii', match: (k) => k.startsWith('--token-border-radius-') },
  { title: 'Gradients + glass', match: (k) => k.startsWith('--token-brand-gradient-') || k.startsWith('--token-brand-constructor-') || k.startsWith('--token-brand-glass-') },
  { title: 'Type (Oswald trial)', match: (k) => k.startsWith('--token-font-') || k.startsWith('--token-typography-size-') },
]
