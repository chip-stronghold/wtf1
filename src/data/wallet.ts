// Mock wallet data for the balance dropdown + deposit/withdraw modal designs.

export interface Coin {
  sym: string
  name: string
  glyph: string
  color: string
  balance: string
  fiat: string
  networks: string[]
}

export const coins: Coin[] = [
  { sym: 'BTC', name: 'Bitcoin', glyph: '₿', color: '#f7931a', balance: '0.00000000', fiat: '$0.00', networks: ['Bitcoin', 'BEP20'] },
  { sym: 'ETH', name: 'Ethereum', glyph: 'Ξ', color: '#627eea', balance: '0.00000000', fiat: '$0.00', networks: ['ERC20', 'Arbitrum', 'BEP20'] },
  { sym: 'SOL', name: 'Solana', glyph: '◎', color: '#14f195', balance: '0.00000000', fiat: '$0.00', networks: ['Solana'] },
  { sym: 'USDC', name: 'USD Coin', glyph: '$', color: '#2775ca', balance: '0.00000000', fiat: '$0.00', networks: ['ERC20', 'Solana', 'BEP20'] },
  { sym: 'USDT', name: 'Tether', glyph: '₮', color: '#26a17b', balance: '1.12000000', fiat: '$1.12', networks: ['BEP20', 'ERC20', 'TRC20', 'Solana'] },
  { sym: 'LTC', name: 'Litecoin', glyph: 'Ł', color: '#a6a9aa', balance: '0.00000000', fiat: '$0.00', networks: ['Litecoin'] },
  { sym: 'XRP', name: 'Ripple', glyph: '✕', color: '#3a4450', balance: '0.00000000', fiat: '$0.00', networks: ['XRP Ledger'] },
]

export const balanceBuckets = [
  { label: 'Real money', value: '1.12000000', fiat: '$1.12' },
  { label: 'Bonus money', value: '0.00000000', fiat: '$0.00' },
  { label: 'Withdrawable', value: '1.12000000', fiat: '$1.12' },
]

/** Default selected wallet for the deposit/withdraw modal. */
export const activeCoin = coins[4] // USDT
export const depositAddress = '0xa35bb48e5fb9b193c44ad498a8aa21385c4f4f4f'
