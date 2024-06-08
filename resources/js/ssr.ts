import { createSSRApp, h } from  '@vue/server-renderer'
import { renderToString } from '@vue/server-renderer'
import Layout from './Layout'
import { createInertiaApp } from '@inertiajs/vue3'
import createServer from '@inertiajs/vue3/server'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { route as routeFn} from 'ziggy-js'
import { Ziggy } from './ziggy.js'
import {route} from './ziggy.d.ts'

route('home', undefined, undefined, Ziggy)

createServer((page) =>
    createInertiaApp({
        page,
        render: renderToString,
        title: (title) => `${title} - ${appName}`,
        resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob<DefineComponent>('./Pages/**/*.vue'), page.default.layout = name.startsWith('Public/') ? undefined : Layout),
        setup({ App, props, plugin }) {
            return createSSRApp({ render: () => h(App, props) })
                .use(plugin)
                .use(ZiggyVue, Ziggy)
        }
    })
)
