module.exports = {
  content: [
    './src/**/*.{html, ts}',
  ],
  theme: {
    extend: {
      colors: {
        customGray: '#252525',
        customOrange: '#C9936A',
        customOrange2: '#FB6F05',
        customBluelight: '#0889D5',
        customBluelight2: '#589EC7',

        customG: '#41b8ff',

        tgold: '#FFD700',
        tsilver: '#C0C0C0',
        twhite: '#FFFFFF',

      },
      fontFamily: {
        sans: ['"M PLUS 2"', 'sans-serif'],
      },
      fontSize: {
        'xxs': '.5rem',
        '6': '.65rem'
      },
      padding: {
        'bd': '0.150rem',
      }
    },
  },
  plugins: [],
}

