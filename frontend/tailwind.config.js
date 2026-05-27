/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lumen: {
          gold: '#C5A059',
          black: '#1A1A1A',
          gray: '#F5F5F5',
        }
      }
    },
  },
  plugins: [],
}
