import './bootstrap';
import '../css/app.css';
import { hydrateRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import React from 'react';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Yayasan Dar Al Furqon Al Hakim';

createInertiaApp({
  	id: 'Yayasan Dar Al Furqon Al Hakim',
    title: (title) => `${title} - ${appName}`,
    progress:{
      color: '#4B5563',
    },
    resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.tsx`,
      import.meta.glob('./Pages/**/*.tsx',{
          import: 'setup',
          eager: true
        }
      ),
    ),
    setup({el, App, props}) {
      hydrateRoot(el, <App {...props} />)
},
});
