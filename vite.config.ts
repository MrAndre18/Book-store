import { defineConfig } from 'vite'
import { fileURLToPath, URL } from "node:url";
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import '@/shared/styles/global/config';
          @import '@/shared/styles/global/mixins';
        `
      }
    }
  }
})
