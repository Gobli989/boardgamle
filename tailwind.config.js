/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        "2xs": ["0.5rem", "0.5rem"],
      },
      backgroundImage: {
        "arrow-up": "url('/arrow_up.svg')",
        "arrow-down": "url('/arrow_down.svg')"
      },
      backgroundSize: {
        "50%": "50%",
        "75%": "75%",
      }
    },
  },
  plugins: [],
  darkMode: "class"
}

