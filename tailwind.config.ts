import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
    "./tests/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-dm-sans)", "sans-serif"],
        accent: ["var(--font-sarabun)", "sans-serif"]
      },
      boxShadow: {
        senlek: "0 18px 45px rgba(26, 35, 126, 0.18)"
      },
      backgroundImage: {
        "senlek-gold-line":
          "linear-gradient(90deg, transparent 0%, rgba(212, 160, 23, 0.2) 12%, rgba(212, 160, 23, 0.85) 50%, rgba(212, 160, 23, 0.2) 88%, transparent 100%)"
      }
    }
  },
  plugins: []
} satisfies Config;
