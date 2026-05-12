import './bootstrap';
import '../css/app.css'; // Pastikan path CSS sudah benar

import { DefineComponent } from 'vue';
import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Yayasan Dar Al Furqon Al Hakim';

createInertiaApp({
  id: 'app', // Biasanya defaultnya 'app', pastikan sesuai dengan @inertia di Blade kamu
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.vue`, // Ubah ekstensi menjadi .vue
      import.meta.glob<DefineComponent>('./Pages/**/*.vue') // Gunakan glob standar Vue
    ),
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .mount(el);
  },
  progress: {
    color: '#4B5563',
  },
});
