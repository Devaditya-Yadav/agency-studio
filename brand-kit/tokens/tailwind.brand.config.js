/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
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
          terracotta: {
            light: '#F5E8E1',
            DEFAULT: '#B65028',
            deep: '#983E1B',
          },
          bronze: '#A67C5B',
          evening: {
            canvas: '#1C1B17',
            surface: '#26241E',
            elevated: '#312F26',
          },
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        script: ['"Alex Brush"', '"Pinyon Script"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'Montserrat', 'sans-serif'],
      },
      letterSpacing: {
        editorial: '0.16em',
        eyebrow: '0.26em',
      },
      boxShadow: {
        whisper: '0 8px 30px -10px rgba(42, 40, 32, 0.07)',
        editorial: '0 20px 50px -18px rgba(42, 40, 32, 0.12)',
      },
      transitionTimingFunction: {
        atelier: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
};
