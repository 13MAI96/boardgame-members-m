/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#1e293b', // Color para modo claro
          dark: '#c8c8c8',  // Color para modo oscuro
        },
      },
    },
  },
  plugins: [],
  darkMode: 'selector',
}


 