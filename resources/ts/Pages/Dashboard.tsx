import { Link } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function Dashboard() {
    return (
        <div className="max-w-6xl mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">Anda berhasil login.</p>

            <div className="mt-6 flex flex-wrap gap-3">
                <Link href={route('home')} className="px-4 py-2 rounded-lg bg-gray-900 text-white">Beranda</Link>
                <Link href={route('video.edit')} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700">Kelola Video</Link>
                <Link href={route('post.edit')} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700">Kelola Artikel</Link>
            </div>
        </div>
    );
}
