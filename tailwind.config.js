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
        secondary: {
          DEFAULT: "#F2BC78",
          dark: "#EEAB58",
        },
        redteam: "#F87171",
        blueteam: "#60A5FA",
      },
      gridTemplateRows: {
        'minfr': 'min-content 1fr',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
