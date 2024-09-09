import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import createServer from '@inertiajs/react/server'
import ReactDOMServer from 'react-dom/server'
import { hydrateRoot } from 'react-dom/client'

createServer(page =>
  createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx', { eager: true })),
    setup({el, App, props}){
      hydrateRoot(el, <App{...props} />)
    }
  }))
