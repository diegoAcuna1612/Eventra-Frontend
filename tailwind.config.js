/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html, ts}',
  ],
  theme: {
    extend: {
      colors: {
        customGray: '#252525',
      },
      fontFamily: {
        sans: ['"M PLUS 2"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

