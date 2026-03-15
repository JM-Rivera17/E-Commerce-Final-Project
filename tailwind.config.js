/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'saturn-dark': '#0a0b10',
        'saturn-card': '#161821',
        'saturn-accent': '#00ff88',
        'saturn-purple': '#8844ff',
        'saturn-blue': '#0088ff',
      },
      fontFamily: {
        'rajdhani': ['Rajdhani', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

