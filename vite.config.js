import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',
      '@COM': '/src/components',
      '@PAGE': '/src/pages',
      '@ROUTER': '/src/router',
      '@SERVICE': '/src/service',
      '@STORE': '/src/store',
    },
  },
});
