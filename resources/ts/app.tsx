import './bootstrap.ts'
import { createInertiaApp } from '@inertiajs/react'
import Layout from './Layout'
import { Ziggy} from './ziggy.js'
import { hydrateRoot } from 'react-dom/client'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'

dom.watch()

globalThis.Ziggy = Ziggy
const appName = import.meta.env.VITE_APP_NAME || 'Yayasan Dar Al Furqon Al Hakim'

createInertiaApp({
  	id: 'Yayasan Dar Al Furqon Al Hakim',
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx', { eager: true })),
    setup({el, App, props, plugin}) {
    hydrateRoot(el, <App {...props}/>)
	.use(plugin)
}});
