import type { Config } from "tailwindcss"

export default {
  content: ["./popup.tsx", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        graphite: "#07080A",
        slatepanel: "#0D1014",
        steel: "#111820",
        hairline: "rgba(255,255,255,.08)",
        positive: "#4ADE80",
        negative: "#FB7185",
        caution: "#FBBF24",
        muted: "#8A94A6"
      },
      boxShadow: {
        panel: "0 18px 60px rgba(0,0,0,.36)",
        insetline: "inset 0 1px 0 rgba(255,255,255,.055)"
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ],
        mono: [
          "JetBrains Mono",
          "SFMono-Regular",
          "ui-monospace",
          "Menlo",
          "monospace"
        ]
      }
    }
  },
  plugins: []
} satisfies Config
