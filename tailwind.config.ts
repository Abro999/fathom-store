import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        "ink-soft": "rgb(var(--color-ink-soft) / <alpha-value>)",
        paper: "rgb(var(--color-paper) / <alpha-value>)",
        "paper-soft": "rgb(var(--color-paper-soft) / <alpha-value>)",
        brass: "rgb(var(--color-brass) / <alpha-value>)",
        "brass-soft": "rgb(var(--color-brass-soft) / <alpha-value>)",
        teel: "rgb(var(--color-teel) / <alpha-value>)",
        charcoal: "rgb(var(--color-charcoal) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)",
        "line-dark": "rgb(var(--color-line-dark) / <alpha-value>)",
        cream: "rgb(var(--color-cream) / <alpha-value>)",
        rust: "rgb(var(--color-rust) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-space-grotesk)", "sans-serif"],
      },
      maxWidth: {
        content: "1400px",
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
