import { Link } from '@inertiajs/react';
import { route } from 'ziggy-js';

interface Post {
    id: number;
    title: string;
    body: string;
    author_name?: string;
    category?: string;
    image_url?: string;
    tags?: string[];
    published_at: string;
}

interface Props {
    post: Post;
}

const formatDate = (dateString: string) =>
    dateString
        ? new Date(dateString).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
          }) + ' WIB'
        : 'Belum diterbitkan';

export default function Show({ post }: Props) {
    return (
        <div className="min-h-screen bg-white py-12 antialiased">
            <article className="max-w-3xl mx-auto px-4 sm:px-6">
                <div className="mb-8">
                    <Link href={route('home')} className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition">
                        Kembali ke Beranda
                    </Link>
                </div>

                <header className="mb-10 text-center md:text-left">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6">
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-md border border-blue-100">
                            {post.category || 'Artikel'}
                        </span>
                        <span className="text-gray-300">|</span>
                        <div className="flex items-center text-sm text-gray-500 font-medium">Terbit: {formatDate(post.published_at)}</div>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-8">{post.title}</h1>

                    <div className="flex items-center justify-center md:justify-start space-x-4 border-t border-gray-100 pt-8">
                        <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg font-bold shadow-sm">
                            {post.author_name?.charAt(0) || 'A'}
                        </div>
                        <div className="text-left">
                            <p className="text-base font-bold text-gray-900 leading-none mb-1">{post.author_name || 'Admin'}</p>
                            <p className="text-xs text-gray-500">Penulis di Dar Al Furqon Al Hakim</p>
                        </div>
                    </div>
                </header>

                {post.image_url && (
                    <div className="mb-12 rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                        <img src={post.image_url} alt={post.title} className="w-full h-auto object-cover" />
                    </div>
                )}

                <section className="max-w-none text-gray-800">
                    <div dangerouslySetInnerHTML={{ __html: post.body }} />
                </section>

                <footer className="mt-16 pt-10 border-t border-gray-100">
                    <div className="bg-gray-900 rounded-3xl p-8 text-center text-white shadow-2xl">
                        <h3 className="text-xl font-bold mb-3 text-blue-400">Dukung Dakwah Kami</h3>
                        <p className="text-gray-400 text-sm mb-8 leading-relaxed max-w-sm mx-auto">Kontribusi Anda sangat berarti bagi kelangsungan program Tahfidz Al-Qur&apos;an di Yayasan kami.</p>
                        <Link href={route('datayayasan.show', { yayasan_id: 1 })} className="inline-block bg-white text-gray-900 px-8 py-3 rounded-xl font-black text-sm hover:bg-blue-400 transition-colors uppercase tracking-widest">
                            Donasi Sekarang
                        </Link>
                    </div>
                </footer>
            </article>
        </div>
    );
}
