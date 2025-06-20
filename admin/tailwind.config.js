/** @type {import('tailwindcss').Config} */


export default {
    
  theme: {
    extend: {
      colors: {
       'primary': '#5f6FFF', // Example primary color
      },
      gridTemplateColumns: {
        'auto': 'repeat(auto-fill, minmax(200px, 1fr))', // Responsive grid columns
      },
    },
  },
  plugins:[],
}
 
