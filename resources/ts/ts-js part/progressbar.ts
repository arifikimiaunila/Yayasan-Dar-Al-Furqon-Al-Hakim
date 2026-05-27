import NProgress from 'nprogress';
import { router } from '@inertiajs/vue3';

// Tipe data untuk timeout bawaan Node / Browser
let timeout: ReturnType<typeof setTimeout> | null = null;

export function initProgressBar(): void {
    // 1. Event: Progress (Saat proses upload/loading sedang berjalan)
    router.on('progress', (event) => {
        // Di Inertia Vue 3, detail progress berada di event.detail.progress
        if (NProgress.isStarted() && event.detail.progress?.percentage) {
            NProgress.set((event.detail.progress.percentage / 100) * 0.9);
        }
    });

    // 2. Event: Start (Saat navigasi/request dimulai)
    router.on('start', () => {
        // Berikan jeda 250ms sebelum memunculkan progress bar agar tidak berkedip pada request cepat
        timeout = setTimeout(() => NProgress.start(), 250);
    });

    // 3. Event: Finish (Saat request selesai, baik sukses, gagal, atau batal)
    router.on('finish', (event) => {
        if (timeout) {
            clearTimeout(timeout);
        }

        if (!NProgress.isStarted()) {
            return;
        }

        // Membaca status visit dari event.detail.visit
        if (event.detail.visit.completed) {
            NProgress.done();
        } else if (event.detail.visit.interrupted) {
            NProgress.set(0);
        } else if (event.detail.visit.cancelled) {
            // Memperbaiki typo 'Batalkanled' menjadi 'cancelled' sesuai dokumentasi Inertia
            NProgress.done();
            NProgress.remove();
        }
    });
}
