/** @type {import('tailwindcss').Config} */
export default {
   content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}"
   ],
   theme: {
      fontFamily: {
         'roboto': 'Roboto, sans-serif',
      },
      colors: {
         'primary': '#a8a5a4',
         'accent': '#757370',
         'bg': '#121112',
         'secondary': '#0d0d0c',
         'text': '#eeeded'
      },
      extend: {
         'spacing': {
            'inv100': '-100%',
            'inv50': '-50%'
         },
         'flex': {
            '100': '1 1 100%'
         },
         'transitionProperty': {
            'visibility': 'visibility'
         },
         'maxWidth': {
            '200px': '200px'
         }
      },
   },
   plugins: [],
}

