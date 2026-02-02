/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["system-ui", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        background: "#0f172a",
        surface: "#020617",
        muted: "#1e293b",
        accent: "#38bdf8",
        accentSoft: "#0f172a",
      },
      boxShadow: {
        subtle: "0 18px 45px rgba(15,23,42,0.55)",
      },
      borderRadius: {
        xl: "1.25rem",
      },
    },
  },
  plugins: [],
};
