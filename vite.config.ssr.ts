import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    laravel({
      input: 'resources/stories/ts/app.jsx',
      ssr: 'resources/stories/ts/ssr.jsx',
      refresh: true,
    }),
    react(),
  ],
  ssr: {
    noExternal: ['@inertiajs/server'],
  },
});
