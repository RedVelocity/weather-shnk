module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        cool: 'var(--cool)',
        mild: 'var(--mild)',
        hot: 'var(--hot)',
        dark: 'var(--dark)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
