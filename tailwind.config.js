/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.{html,js}',
    './public/**/*.{html,js}'
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#ECE5C7',
        'secondary': '#C2DEDC',
        'tertiary': '#CDC2AE',
        'quaternary': '#116A7B',
      },
      fontFamily: {
        'dancing': ['Dancing Script', 'cursive'],
        'agdasima': ['Agdasima', 'sans-serif'],
        'oswald': ['Oswald', 'sans-serif'],
      },
      backgroundImage: {
        'layered': "url('../img/background.svg')",
        'second': "url('../img/background2.svg')",
        'atm': "url(../img/bg-atm.svg)",
        'wedding': "url(../img/wedding_bg.jpg)",
      }
    },
  },
  plugins: [],
}

