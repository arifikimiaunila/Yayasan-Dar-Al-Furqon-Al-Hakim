import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import commonjs from '@rollup/plugin-commonjs';
import manifestSRI from 'vite-plugin-manifest-sri';
import ziggy from 'vite-plugin-ziggy';
import * as path from 'path';
import  tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/css/app.css', 'resources/ts/app.jsx'],
      ssr: 'resources/ts/ssr.jsx',
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
resolve: {
  alias: {
  '@': path.resolve('/resources/ts')
  }
},
ssr: {
  noExternal: ['@inertiajs/server'],
},
});
