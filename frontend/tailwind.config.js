/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        primary: {
          500: "#6366F1",
          600: "#7C3AED",
          700: "#4F46E5",
        },
        secondary: {
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
        },
      },
      boxShadow: {
        glow: "0 0 25px rgba(124, 58, 237, 0.4)",
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      },
      backgroundImage: {
        "auth-gradient":
          "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
      },
    },
  },
  plugins: [],
};