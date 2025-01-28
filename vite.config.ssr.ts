import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    laravel({
      input: 'resources/ts/app.jsx',
      ssr: 'resources/ts/ssr.jsx',
      refresh: true,
    }),
    react(),
  ],
  resolve: {
    alias: {
      '@': '/resources/ts',
    },
  },
  ssr: {
    noExternal: ['@inertiajs/server'],
  },
});
