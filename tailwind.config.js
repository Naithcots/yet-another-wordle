/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--color-background))",
      },
      // animation: {
      //   filled: "filled 0.2s ease-in-out",
      //   reveal: "reveal 0.35s linear forwards",
      // },
      // keyframes: {
      //   filled: {
      //     "0%, 100%": { transform: "scale(1)" },
      //     "50%": { transform: "scale(1.15)" },
      //   },
      //   reveal: {
      //     "0%": { transform: "rotateY(0deg)" },
      //     "100%": { transform: "rotateY(180deg)" },
      //   },
      // },
    },
  },
  plugins: [],
};
