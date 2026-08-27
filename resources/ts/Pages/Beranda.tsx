import { Link } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function Beranda() {
    return (
        <div className="max-w-6xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold text-gray-900">Yayasan Dar Al Furqon Al Hakim</h1>
            <p className="text-gray-600 mt-2">Portal informasi yayasan berbasis Laravel, Inertia, dan React.</p>

            <div className="grid md:grid-cols-2 gap-4 mt-8">
                <Link href={route('video.index')} className="block rounded-xl border border-gray-200 p-6 hover:border-blue-500 hover:bg-blue-50 transition">
                    <h2 className="text-lg font-semibold">Daftar Video</h2>
                    <p className="text-sm text-gray-600 mt-1">Lihat video dakwah yang tersedia.</p>
                </Link>

                <Link href={route('post.edit')} className="block rounded-xl border border-gray-200 p-6 hover:border-blue-500 hover:bg-blue-50 transition">
                    <h2 className="text-lg font-semibold">Manajemen Artikel</h2>
                    <p className="text-sm text-gray-600 mt-1">Kelola artikel yang ditampilkan di website.</p>
                </Link>
            </div>
        </div>
    );
}
