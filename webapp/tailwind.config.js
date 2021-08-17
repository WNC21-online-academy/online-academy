module.exports = {
  purge: [],
  // purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'], //For production
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
