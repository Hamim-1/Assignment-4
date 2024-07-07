/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./dist/**/*.{html,js}'],
  theme: {
    screens: {
      'xs': '540px',
      'sm': '640px',
      'md': '768px',
      'lg': '992px',
      'xl': '1224px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        secondary: '#F44335',
      },
      fontFamily: {
        sans: ["Raleway", "sans-serif"]
      },

    },
  },
  plugins: [],
}

