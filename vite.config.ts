import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import commonjs from '@rollup/plugin-commonjs';
import manifestSRI from 'vite-plugin-manifest-sri';
import ziggy from 'vite-plugin-ziggy';
import  tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/css/app.css', 'resources/stories/ts/app.jsx'],
      ssr: 'resources/stories/ts/ssr.jsx',
      refresh: [
        {
          paths: ['path/to/watch/**'],
          config: { delay: 300 }
        }
      ],
      detectTls: 'my-app.test',
      buildDirectory: 'build'
    }),
  react(),
  commonjs(),
    manifestSRI(),
  tailwindcss(),
  // Add your other plugins here, e.g. vue(), vueI18n(),...
  ziggy()
],
ssr: {
  noExternal: ['@inertiajs/server'],
},
});
