/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        canvas: 'var(--bg-canvas)',
        surface: 'var(--bg-surface)',
        editorial: 'var(--bg-editorial)',
        manifesto: 'var(--bg-manifesto)',
        ink: {
          primary: 'var(--text-primary)',
          heading: 'var(--text-heading)',
          secondary: 'var(--text-secondary)',
          accent: 'var(--text-accent)',
          onbrand: 'var(--text-on-brand)',
        },
        liid: {
          alabaster: '#FAF8F4',
          linen: '#F2EFE9',
          oat: '#DEDAD0',
          travertine: '#C8C2B4',
          kraft: '#C9B39B',
          sage: '#AEB291',
          olive: '#8B8563',
          moss: '#555132',
          umber: '#2A2820',
          muted: '#635F52',
          terracotta: '#B65028',
          clay: '#983E1B',
          blush: '#F5E8E1',
          bronze: '#A67C5B',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        script: ['"Alex Brush"', '"Pinyon Script"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'Montserrat', 'sans-serif'],
      },
      letterSpacing: {
        wordmark: '0.16em',
        manifesto: '0.22em',
        eyebrow: '0.26em',
      },
      boxShadow: {
        whisper: 'var(--shadow-whisper)',
        editorial: 'var(--shadow-editorial)',
      },
      transitionTimingFunction: {
        atelier: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
