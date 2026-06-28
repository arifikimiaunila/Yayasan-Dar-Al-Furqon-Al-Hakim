import { router } from '@inertiajs/react';
import { route } from 'ziggy-js';

// Pastikan Anda menyesuaikan path interface/type Team sesuai struktur folder Vue Anda
interface Team {
    id: number | string;
    name: string;
    // tambahkan properti lain jika ada
}

/**
 * Memindahkan tim aktif pengguna (Switch Team)
 */
export function switchToTeam(e: Event, team: Team): void {
    e.preventDefault();
    
    router.put(
        route('current-team.update'),
        {
            team_id: team.id,
        },
        {
            preserveState: false,
        },
    );
}

/**
 * Proses Keluar Aplikasi (Logout)
 */
export function logout(e: Event): void {
    e.preventDefault();
    
    router.post(route('logout'));
}
