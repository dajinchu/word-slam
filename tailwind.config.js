module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        noun: "#BBDEF0",
        verb: "#9CC9B5",
        preposition: "#F2D0A6",
        adjective: "#E5B8EA",
        primary: {
          DEFAULT: "#40775E",
          dark: "#396A54",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
