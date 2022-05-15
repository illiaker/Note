import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
//   externals: {
//     // global app config object
//     config: JSON.stringify({
//         apiUrl: 'http://localhost:44329'
//     })
//   }
// ,
  define: {    
      apiUrl: JSON.stringify('https://localhost:44329')    
  }
})
