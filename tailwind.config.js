/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cream': '#Fdfbf7',
        'gold': '#D4AF37',
        'maroon': {
          900: '#3D0C11',
          800: '#5A121A',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
        handwriting: ['"Caveat"', 'cursive'],
      },
    },
  },
  plugins: [],
}
