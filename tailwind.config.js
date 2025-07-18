/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#6366F1',
        accent: '#F59E0B',
        background: '#000000',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'inter-medium': ['Inter-Medium', 'sans-serif'],
      },
    },
  },
  plugins: [],
}