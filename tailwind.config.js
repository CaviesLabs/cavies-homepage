module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screes: {
      xs: "380px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        primary: "#191123",
        white: "#ffffff",
        black: "#000",
        green: "#3CBF7C",
        purple: "#7B64FF",
        grey: "#9D9EA0",
        dividerColor: "#D9D9D9",
        blurPurple: "rgba(185, 152, 251, 0.8)",
        blurGreen: "rgba(60, 191, 124, 0.8)",
        hamserText: "rgba(149, 131, 255, 0.3)",
        greyText: "rgba(77, 77, 77, 1)",
      },
      boxShadow: {
        xl: "3px 3px 3px 3px rgba(0, 0, 0, 0.25)",
        lg: "3px 4px 4px rgba(0, 0, 0, 1)",
      },
      spacing: {
        normal: "18px",
      },
    },
  },
  plugins: [],
};
