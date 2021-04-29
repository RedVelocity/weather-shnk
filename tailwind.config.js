module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        cool: '#00BBFF',
        mild: '#F090CC',
        hot: '#EF6A67',
        dark: '#002255',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
