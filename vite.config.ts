
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';
  return {
    base: isDev ? '/' : '/home/',
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    server: isDev
      ? {
          proxy: {
            // Avoid CORS during local development.
            // Frontend calls `/api/*` -> Vite forwards to backend.
            '/api': {
              target: 'http://127.0.0.1:8080',
              changeOrigin: true,
            },
          },
        }
      : undefined,
  };
});
