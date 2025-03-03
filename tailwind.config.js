/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#f5f1e8",
        text: "#3e2723",
        primary: "#8d6e63",
        border: "#d7ccc8",
        dark: {
          background: "#2b211e",
          text: "#d7ccc8",
          primary: "#a1887f",
          border: "#4e342e",
        },
      },
    },
  },
  plugins: [],
};
