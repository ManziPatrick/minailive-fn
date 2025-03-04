/** @type {import('tailwindcss').Config} */
export default {
  content: [
   "./index.html",
   "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    screens: {
      '2xl': {'max': '1535px'},
     

      'xl': {'max': '1279px'},
    

      'lg': {'max': '1023px'},
      

      'md': {'max': '880px'},
    

      'sm': {'max': '639px'},
      // => @media (max-width: 639px) { ... }
    },
    extend: {},
  },
  plugins: [],
}

