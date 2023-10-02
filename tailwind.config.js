/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      ze: "0px",
      xs: "480px",
      sm: "640px",
      md: "768px",
      desk: "960px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      aspectRatio: {
        "4/3": "4 / 3",
        "6/5": "6 / 5",
      },
      colors: {
        darkBlue: "#3127FF",
        darkGrey: "#F2F2F2",
        white: "#FFFFFF",
        black: "#000000",
        orange: "#F39200",
      },
      fontSize: {
        xs: "0.75rem", // Extra Small
        sm: "0.875rem", // Small
        base: "1rem", // Base
        lg: "1.125rem", // Large
        xl: "1.25rem", // Extra Large
        "2xl": "1.5rem", // 2 Extra Large
      },
    },
  },
  plugins: [],
};
