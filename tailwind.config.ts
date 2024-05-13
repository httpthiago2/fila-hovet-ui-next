import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "sysfila-green": "#298633",
        "sysfila-light-green": "#1DCF19",
        "light-white": "rgba(255, 255, 255, 0.18)",
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config