import { nextui } from '@nextui-org/theme'

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        "shake": {
          "0%": { transform: "rotate(0deg)" },
          "1%": { transform: "rotate(-17deg)" },
          "3%": { transform: "rotate(17deg)" },
          "5%": { transform: "rotate(-17deg)" },
          "7%": { transform: "rotate(17deg)" },
          "9%": { transform: "rotate(0deg)" },
          "30%": { transform: "rotate(0deg)" },
          "40%": { transform: "rotate(0deg)" },
          "60%, 70%, 80%, 90%, 100%": { transform: "rotate(0deg)" },
        }
      },
      animation: {
        "shake": "shake 5s infinite"
      }
    },
  },
  plugins: [nextui()],
}
