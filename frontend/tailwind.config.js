/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0c",
        surface: "rgba(255, 255, 255, 0.05)",
        primary: {
          DEFAULT: "#6366f1",
          hover: "#4f46e5",
        },
        accent: "#10b981",
        glass: "rgba(255, 255, 255, 0.03)",
        glassBorder: "rgba(255, 255, 255, 0.1)",
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
