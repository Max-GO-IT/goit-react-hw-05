import { defineConfig } from  "vite" ;
 import react from  "@vitejs/plugin-react" ;
 import path from 'path';
 import { fileURLToPath, URL } from 'node:url';
// https:// vitejs.dev /config/ 
export  default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true ,
  },
  resolve: {
    alias: {
      '@pages': path.resolve(fileURLToPath(new URL('./src/pages', import.meta.url))),
      '@components': path.resolve(fileURLToPath(new URL('./src/components', import.meta.url))),
   }
  }
})




