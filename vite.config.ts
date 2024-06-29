import laravel from 'laravel-vite-plugin'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: 
	[
    laravel({
      input: ['resources/css/a354.css', 'resources/js/app.ts'],
      ssr: 'resources/js/ssr.ts',
      refresh: [
        {
          paths: ['path/to/watch/**'],
          config: { delay: 300 }
        }
      ],
      detectTls: 'my-app.test',
      manifest: true
    }),
    vue({
      template: {
        transformAssetUrls: {
          // The Vue plugin will re-write asset URLs, when referenced
          // in Single File Components, to point to the Laravel web
          // server. Setting this to `null` allows the Laravel plugin
          // to instead re-write asset URLs to point to the Vite
          // server instead.
          base: null,

          // The Vue plugin will parse absolute URLs and treat them
          // as absolute paths to files on disk. Setting this to
          // `false` will leave absolute URLs un-touched so they can
          // reference assets in the public directory as expected.
          includeAbsolute: false
        }
      }
    })
  ],
  resolve: {
    alias: {
    '@':path.resolve('./resources/js'),
		'ziggy-js': path.resolve('vendor/tightenco/ziggy'),
    }
  }
})
