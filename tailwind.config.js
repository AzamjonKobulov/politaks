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
          slate: {
            500: "#ADB2C3",
          },
          gray: {
            100: "#F2F4F7",
            200: "#D3D4DD",
            300: "#FEFCFA",
            400: "#7D8693",
            500: "#E7EAF1",
            600: "#9BA0A6",
            700: "#F3F5F8",
          },
        },
      },
      spacing: {
        13: ".8125rem",
        15: ".9375rem",
        18: "1.125rem",
        30: "1.875rem",
        50: "3.125rem",
        sixty: "3.75rem",
        100: "6.25rem",
        190: "11.875rem",
        250: "15.625rem",
        300: "18.75rem",
        410: "25.625rem",
      },
      boxShadow: {
        switch: "0px 4px 4px 0px #0F0F100F inset;",
        "switch-toggle": "0px 4px 4px 0px #0F0F100F inset;",
      },
    },
  },
  plugins: [],
};
