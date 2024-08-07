import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out ',
      },
      colors:{
        neon: `rgb(var(--clr-neon))`,
        neonRgb: `rgb(var(--clr-neon-rgb))`, 
        txtViolet: `rgb(var(--clr-txt))`,
        txtVioletRgb: `rgb(var(--clr-txt-rgb))`,
      },
      screens:{
        'old': '350px',
      },
    },
  },
  plugins: [],
};
export default config;
