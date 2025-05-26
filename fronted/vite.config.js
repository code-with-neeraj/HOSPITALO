import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  theme: {
    extend:{
      colors:{
        'primary': "#5f6FFF",
      },
        gridTemplateColumns: {
        'auto': 'repeat(auto-fill, minmax(200px, 1fr))', // Responsive grid columns
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})
