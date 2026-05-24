export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 45px rgba(129, 140, 248, 0.25)',
      },
      colors: {
        neon: '#7c3aed',
        surface: '#0f172a',
        panel: '#111827',
        accent: '#38bdf8'
      }
    }
  },
  plugins: []
};
