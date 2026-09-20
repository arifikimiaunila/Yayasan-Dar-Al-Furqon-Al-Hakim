import './bootstrap';
import '../css/app.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

// Import semua layout
import AppLayout from './Layouts/App';
import App2Layout from './Layouts/App2';
import Admin1Layout from './Layouts/Admin1';
import Admin2Layout from './Layouts/Admin2';
import SuperAdminLayout from './Layouts/SuperAdmin';

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

        // Tentukan layout berdasarkan prefix nama komponen halaman
        let Layout = AppLayout; // default

        if (pageComponent.startsWith('App2/')) {
            Layout = App2Layout;
        } else if (pageComponent.startsWith('Admin1/')) {
            Layout = Admin1Layout;
        } else if (pageComponent.startsWith('Admin2/')) {
            Layout = Admin2Layout;
        } else if (pageComponent.startsWith('SuperAdmin/')) {
            Layout = SuperAdminLayout;
        }

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
