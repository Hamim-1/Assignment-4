/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./dist/**/*.{html,js}'],
  theme: {
    extend: {

      screens: {
        'xl': '1240px',
        'lg': '1024px',
        'md': '768px',
        'sm': '640px',
        'xs': '520px',
      },
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

