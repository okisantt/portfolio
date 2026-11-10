import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        surface2: "rgb(var(--surface-2) / <alpha-value>)",
        text: "rgb(var(--text) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        wine: "rgb(var(--wine) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)"
      },
      borderRadius: {
        xs: "var(--radius-xs)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)"
      },
      boxShadow: {
        soft: "0 8px 30px rgba(0,0,0,0.25)",
        insetSoft: "inset 0 0 0 1px rgba(255,255,255,0.04)"
      },
      spacing: {
        "section-y": "var(--section-y)"
      },
      letterSpacing: {
        tightish: "-0.015em"
      }
    }
  },
  plugins: []
} satisfies Config;
