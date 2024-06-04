import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */


export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px'
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        error: 'var(--error-color)',
        uncertain: 'var(--uncertain-color)',
        yellow: 'var(--yellow)',
        // default: 'var(--aw-color-text-default)',
        // muted: 'var(--aw-color-text-muted)'
      },
      fontFamily: {
        sans: ['var(--font-sans, ui-sans-serif)', ...defaultTheme.fontFamily.sans],
        serif: ['var(--font-serif, ui-serif)', ...defaultTheme.fontFamily.serif],
        heading: ['var(--font-heading, ui-sans-serif)', ...defaultTheme.fontFamily.sans]
      },
      filter: {
        invert: 'invert(1)'
      }
    }
  },
  corePlugins: {
    preflight: false
  },
  plugins: []
}
