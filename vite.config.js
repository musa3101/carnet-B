import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
    chunkSizeWarningLimit: 2000,
    cssCodeSplit: false
  },
  server: {
    port: 5173,
    host: true
  }
});
