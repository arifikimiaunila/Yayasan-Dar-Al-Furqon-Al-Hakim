import { createSSRApp, h } from  '@vue/server-renderer'
import { renderToString } from '@vue/server-renderer'
import Layout from './Layout'
import { createInertiaApp } from '@inertiajs/vue3'
import createServer from '@inertiajs/vue3/server'
import { route } from 'ziggy-js'
import { Ziggy } from './ziggy.js'

route('home', undefined, undefined, Ziggy)

createServer((page) =>
    createInertiaApp({
        page,
        render: renderToString,
        title: (title) => `${title} - ${appName}`,
resolve: name=>{
	const pages: object =import.meta.glob('./Pages/**/*.vue', {eager:true})
	return pages[`./Pages/${name}.vue`]
}
		,
        setup({ App, props, plugin }) {
            return createSSRApp({ render: () => h(App, props) })
                .use(plugin)
               .use(ZiggyVue, {
                    ...page.props.ziggy,
                    location: new URL(page.props.ziggy.location)
                })
        }
    })
)
