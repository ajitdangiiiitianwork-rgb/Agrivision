/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    container: { center: true, padding: "1rem" },
    extend: {
      colors: {
        "warm-neutral": "#FAFAF5",
        brand: {
          50:  "#eaf6ff",
          100: "#d6edff",
          200: "#aeddff",
          300: "#7bcbff",
          400: "#49b5ff",
          500: "#0ea5e9",
          600: "#0a86c0",
          700: "#076792",
          800: "#064d6e",
          900: "#053750"
        },
        agri: {
          primary: "#2E7D32",
          dark: "#1B5E20",
          light: "#F1F8E9",
          border: "#C8E6C9"
        }
      },
      borderRadius: { xl: "1rem", "2xl": "1.25rem", "3xl": "1.75rem" },
      boxShadow: {
        card: "0 10px 30px rgba(2,8,20,0.08)",
        glow: "0 0 0 1px rgba(16,185,129,.35), 0 10px 30px rgba(16,185,129,.25)"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "scale(0.98)" },
          "100%": { opacity: "1", transform: "scale(1)" }
        }
      },
      animation: {
        fadeIn: "fadeIn 0.2s ease-out forwards"
      }
    },
  },
  plugins: [],
};
