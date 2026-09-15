import './bootstrap';
import '../css/app.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import AppLayout from './Layouts/App';
import GuestLayout from './Layouts/Guest';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const pageComponent =
            ((props as { initialPage?: { component?: string } }).initialPage?.component) ?? '';

        const Layout = pageComponent.startsWith('Auth/') ? GuestLayout : AppLayout;

        createRoot(el).render(
            <React.StrictMode>
                <Layout>
                    <App {...props} />
                </Layout>
            </React.StrictMode>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});
