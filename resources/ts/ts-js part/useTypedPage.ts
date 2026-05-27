import { usePage } from '@inertiajs/vue3';

// 1. Definisikan interface untuk shared props bawaan Inertia (Sesuaikan dengan file types Anda)
// Jika Anda sudah punya file @/types, Anda bisa mengimpor PageProps dari sana.
interface CustomSharedProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        };
    };
    flash: {
        message: string | null;
    };
    // Tambahkan properti shared global lainnya dari Laravel HandleInertiaRequests di sini
}

/**
 * Custom Composable untuk mengambil data Page dengan tipe data yang ketat (Strongly Typed)
 */
export default function useTypedPage<T = {}>() {
    // Di `@inertiajs/vue3`,usePage menerima generic type gabungan antara Shared Props dan tipe data custom (T)
    return usePage<CustomSharedProps & T>();
}
