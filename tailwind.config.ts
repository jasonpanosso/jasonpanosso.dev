import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        tertiary: 'var(--tertiary-color)',
        background: 'var(--background-color)',
        foreground: 'var(--foreground-color)',
      },
    },
  },
  plugins: [],
} satisfies Config;
