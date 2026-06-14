import { resolve } from 'path'
import { defineConfig } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  main: {
    build: {
      bytecode: {
        transformArrowFunctions: true, // Fix async arrow function crashes
        removeBundleJS: true // Remove .js after compilation
      }
    }
  },
  preload: {
    build: {
      bytecode: {
        transformArrowFunctions: true
      }
    }
  },
  renderer: {
    publicDir: resolve('src/renderer/src/public'),
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [react(), tailwindcss()]
  }
})
