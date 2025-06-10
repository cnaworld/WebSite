import type { Config } from 'tailwindcss';
const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        'hacker-green': '#00ff00',
        'hacker-dark': '#0d0d0d',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Add this line
  ],
};
export default config;
