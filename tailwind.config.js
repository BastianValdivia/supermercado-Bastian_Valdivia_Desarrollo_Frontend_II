/**
 * Tailwind CSS: tema del proyecto.
 *
 * Los colores y la tipografía NO se escriben aquí: apuntan a las variables
 * CSS de src/styles/theme.css. Para cambiar la paleta basta con editar ese
 * archivo; este se mantiene igual.
 *
 * El formato "rgb(var(--x) / <alpha-value>)" permite usar opacidades de
 * Tailwind sobre los colores del tema (por ejemplo bg-primary/10).
 */
const color = (variable) => `rgb(var(${variable}) / <alpha-value>)`

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: color('--color-primary'),
          dark: color('--color-primary-dark'),
          soft: color('--color-primary-soft'),
        },
        accent: {
          DEFAULT: color('--color-accent'),
          dark: color('--color-accent-dark'),
        },
        ink: color('--color-ink'),
        muted: color('--color-muted'),
        line: color('--color-line'),
        canvas: color('--color-canvas'),
        surface: color('--color-surface'),
        danger: color('--color-danger'),
      },
      fontFamily: {
        sans: 'var(--font-sans)',
      },
      borderRadius: {
        card: 'var(--radius-card)',
      },
    },
  },
  plugins: [],
}
