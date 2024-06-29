import './bootstrap.ts'
import { createApp, DefineComponent, h } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import createServer from '@inertiajs/vue3/server'
import Layout from './Layout'
import { ZiggyVue } from 'ziggy-js'

dom.watch()

const appName = import.meta.env.VITE_APP_NAME || 'Yayasan Dar Al Furqon Al Hakim'

createInertiaApp({
  render: renderToString,
    title: (title) => `${title} - ${appName}`,
    resolve: name => {
    const pages = import.meta.glob<DefineComponent>('./Pages/**/*.vue', {eager:true})
    let page = pages['./Pages/${name}.vue']
    return page
    },
    setup({ el, App, props, plugin }) {
        createApp({ render: () => h(App, props)}) 
            .use(plugin)
            .use(ZiggyVue)
            
.mount(el)
    },
    progress: {
        color: '#6366f1'
    }
})

