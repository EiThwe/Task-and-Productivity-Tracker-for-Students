/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lexend", "system-ui", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#121f3e",
          50: "#f0f4ff",
          100: "#e0e8ff",
          200: "#c7d4fe",
          300: "#a3b8fc",
          400: "#7a94f8",
          500: "#121f3e",
          600: "#0f1a33",
          700: "#0c1528",
          800: "#09101d",
          900: "#060b12",
        },
      },
      boxShadow: {
        subtle: "0 4px 20px rgba(18,31,62,0.08)",
        card: "0 2px 12px rgba(18,31,62,0.06)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
    },
  },
  plugins: [],
};
