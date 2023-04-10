/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'cel-lg': {'max': '465px'},
      // => @media (max-width: 1023px) { ... }

      'cel-md': {'max': '375px'},
      // => @media (max-width: 767px) { ... }

      'cel-sm': {'max': '320px'},
      // => @media (max-width: 639px) { ... }
    }

  },
  plugins: [],
};
