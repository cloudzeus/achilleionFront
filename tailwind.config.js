/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        hero: "url('/images/hero.svg')",
      },
      colors: {
        cream: "#EAE5DF",
        gold: "#A38970",
        turquoise: "#6CBEBF",
        slate: "#6E7F91",
        secondary: "#9A9B8A",
        "light-secondary": "#C3BAB3",
        primary: "#01383D",
        "dark-blue": "#394C60",
        "light-gray": "#CDCAC5",
      },
      fontFamily: {
        comfortaa: ["Comfortaa", "sans-serif"],
        noto: ["Noto Serif", "sans-serif"],
      },
      fontSize: {
        h1: "57px", // size for h1
        h2: "45px", // size for h2
        h3: "36px", // size for h3
        h4: "32px", // size for h4
        h5: "28px", // size for h5
      },
    },
  },
  plugins: [],
};
