import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        red: {
          400: "#ef4444",
          500: "#dc2626",
          600: "#b91c1c",
          700: "#991b1b",
          800: "#7f1d1d",
        },
        'red-gold': {
          DEFAULT: "#f59e0b",
          light: "#fbbf24",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "serif"],
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        handwriting: ["var(--font-handwriting)", "cursive"],
      },
    },
  },
  plugins: [],
};

export default config;

