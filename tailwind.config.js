/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        xxs: "384px",
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
      maxWidth: {
        base: "82.625rem",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        brand: {
          red: "#9E211B",
          "dark-red": "#84100B",
          gray: {
            100: "#F2F4F7",
            200: "#D3D4DD",
            300: "#FEFCFA",
            400: "#7D8693",
            500: "#E7EAF1",
          },
        },
      },
      spacing: {
        18: "1.125rem",
        30: "1.875rem",
        50: "3.125rem",
        sixty: "3.75rem",
        100: "6.25rem",
      },
    },
  },
  plugins: [],
};
