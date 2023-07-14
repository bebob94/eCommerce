/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {},
      background: (theme) => ({
        "gradient-rainbow":
          "linear-gradient(180deg,rgba(241, 109, 8, 1) 0%,rgba(37, 148, 14, 1) 100%)",
      }),
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        opensans: ["Open Sans", "sans-serif"],
      },
    },
    screens: {
      xs: "360px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};
