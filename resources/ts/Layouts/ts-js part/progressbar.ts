import NProgress from 'nprogress';
import { router } from '@inertiajs/react';

// Tipe data untuk timeout bawaan Node / Browser
let timeout: ReturnType<typeof setTimeout> | null = null;

export function initProgressBar(): void {
    router.on('progress', (event) => {
        if (NProgress.isStarted() && event.detail.progress?.percentage) {
            NProgress.set((event.detail.progress.percentage / 100) * 0.9);
        }
    });

    router.on('start', () => {
        timeout = setTimeout(() => NProgress.start(), 250);
    });

    router.on('finish', (event) => {
        if (timeout) {
            clearTimeout(timeout);
        }

        if (!NProgress.isStarted()) {
            return;
        }

        if (event.detail.visit.completed) {
            NProgress.done();
        } else if (event.detail.visit.interrupted) {
            NProgress.set(0);
        } else if (event.detail.visit.cancelled) {
            NProgress.done();
            NProgress.remove();
        }
    });
}
