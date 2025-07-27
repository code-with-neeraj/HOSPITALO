import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  theme: {
    extend:{
     colors: {
       'primary': '#5f6FFF', // Example primary color
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
  server:{port:5174}
})