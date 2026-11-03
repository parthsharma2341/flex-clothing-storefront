import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@designcodeio/threeui/style.css': path.resolve(__dirname, 'src/shaders/threeui.css'),
      '@designcodeio/threeui': path.resolve(__dirname, 'src/shaders/3d-paper/ThreeDPaper.tsx'),
    },
  },
  build: {
    target: 'esnext',
    cssMinify: true,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/three')) {
            return 'vendor-three';
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-icons';
          }
          if (
            id.includes('node_modules/react') || 
            id.includes('node_modules/react-dom') || 
            id.includes('node_modules/wouter')
          ) {
            return 'vendor-core';
          }
        },
      },
    },
    chunkSizeWarningLimit: 800,
  },
  server: {
    port: 3000,
    open: false,
    host: true
  }
});
