import './bootstrap.ts'
import { createApp, DefineComponent, h } from 'vue'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { createInertiaApp } from '@inertiajs/vue3'
import createServer from '@inertiajs/vue3/server'
import Layout from './Layout'

dom.watch()

const appName = import.meta.env.VITE_APP_NAME || 'Yayasan Dar Al Furqon Al Hakim'

createInertiaApp({
  render: renderToString,
    title: (title) => `${title} - ${appName}`,
    resolve: name => {
        resolvePageComponent(`./Pages/${name}.vue`, 
        import.meta.glob<DefineComponent>('./Pages/**/*.vue'), page.default.layout = name.startsWith('Public/') ? undefined : Layout)},
    setup({ el, App, props, plugin }) {
        createApp({ render: () => h(App, props)}) 
            .use(plugin)
            .use(ZiggyVue, Ziggy)
            
.mount(el)
    },
    progress: {
        color: '#6366f1'
    }
})

