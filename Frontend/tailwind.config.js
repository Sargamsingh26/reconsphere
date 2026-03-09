/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",

        card: "rgb(var(--card) / <alpha-value>)",
        "card-foreground": "rgb(var(--card-foreground) / <alpha-value>)",

        secondary: "rgb(var(--secondary) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        "muted-foreground": "rgb(var(--muted-foreground) / <alpha-value>)",

        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-foreground": "rgb(var(--accent-foreground) / <alpha-value>)",

        border: "rgb(var(--border) / <alpha-value>)",
        ring: "rgb(var(--ring) / <alpha-value>)",

        neon: {
          cyan: "rgb(var(--neon-cyan) / <alpha-value>)",
          "electric-blue": "rgb(var(--neon-electric-blue) / <alpha-value>)",
          purple: "rgb(var(--neon-purple) / <alpha-value>)",
          teal: "rgb(var(--neon-teal) / <alpha-value>)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
};
