import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

<<<<<<< HEAD
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
=======
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // This new section tells Vite to ignore the problematic library
  // during its optimization step, which fixes the error.
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
})
>>>>>>> master
