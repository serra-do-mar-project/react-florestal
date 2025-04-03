/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        gray: {
          100: "#F7FAF6",
          200: "#F6F5F5",
        },
        green: {
          600: "#1B5E20"
        },
        secondary: {
          100: "#f8f8f8",
          200: "#f1f1f1",
          300: "#ebebeb",
          400: "#dcdcdc",
          500: "#cccccc",
          600: "#b2b2b2",
          700: "#999999",
          800: "#7f7f7f",
          900: "#666666",
        },
      },
    },
  },
  plugins: [],
}