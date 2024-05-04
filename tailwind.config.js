/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    backgroundImage: {
      pattern: "url('/images/pattern-bg.png')",
    },
    backgroundPosition: {
      "center-56": "56.5%",
    },
    extend: {
      colors: {
        "dark-gray": "hsl(0, 0%, 59%)",
        "very-dark-gray": "hsl(0, 0%, 17%)",
      },
    },
  },
  plugins: [],
};
