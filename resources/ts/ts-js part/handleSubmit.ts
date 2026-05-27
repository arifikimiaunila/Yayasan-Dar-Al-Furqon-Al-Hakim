import { router } from '@inertiajs/vue3';

// Mendefinisikan interface untuk opsi custom jika diperlukan, atau pakai type 'any' bawaan Inertia
export function handleSubmit(
    x: number, 
    e: Event, 
    location: string, 
    values: any = null, 
    options: any = {}
): void {
    // Mencegah reload halaman bawaan browser submit form
    e.preventDefault();

    if (x === 0) {
        return router.get(location, values, options);
    }
    else if (x === 1) {
        return router.post(location, values, options);
    }
    else if (x === 2) {
        return router.put(location, values, options);
    }
    else if (x === 3) {
        return router.patch(location, values, options);
    }
    else if (x === 4) {
        return router.delete(location, {
            ...options, // Tetap menyertakan opsi lain jika ada
            onBefore: () => confirm('Apakah kamu yakin ingin menghapusnya?')
        });
    }
    else {
        return router.reload(options);
    }
}
