import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'sans-serif'],
        body: ['var(--font-open-sans)', 'sans-serif'],
      },
      colors: {
        bg: '#0A0A0A',
        surface: '#141414',
        'surface-2': '#1E1E1E',
        border: '#2A2A2A',
        text: '#F5F5F5',
        muted: '#9A9A9A',
        accent: 'var(--brand-accent)',
        'accent-hover': 'var(--brand-accent-hover)',
        gold: '#FFD700',
      },
    },
  },
  plugins: [],
}

export default config
