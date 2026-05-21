export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#fdf9ef',
        ink: '#1c1b19',
        'canvas-dark': '#1b1a18',
        'ink-dark': '#faf1da',
        'bg': 'var(--bg)',
        'text-primary': 'var(--text-primary)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui'],
        body: ['"Manrope"', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};