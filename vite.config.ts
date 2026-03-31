import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://showroom.eis24.me',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/c300/api/v4/test'),
      },
    },
  },
});
