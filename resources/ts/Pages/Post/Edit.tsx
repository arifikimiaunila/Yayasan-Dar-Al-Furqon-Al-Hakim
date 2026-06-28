import { Link } from '@inertiajs/react';
import { route } from 'ziggy-js';

interface Post {
    id: number;
    title: string;
    body: string;
    published: boolean;
    published_at: string;
}

interface Props {
    posts: Post[];
}

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '');

const formatDate = (dateString: string) =>
    dateString
        ? new Date(dateString).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
          })
        : '-';

export default function Edit({ posts }: Props) {
    return (
        <div className="max-w-7xl mx-auto py-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 space-y-4 md:space-y-0">
                <div>
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">Manajemen Artikel</h2>
                    <p className="text-sm text-gray-500 mt-1">Pilih artikel di bawah ini untuk diperbarui atau dikelola lebih lanjut.</p>
                </div>

                <Link href={route('post.create')} className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-sm transition-all active:scale-95">
                    Tulis Artikel Baru
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-400 uppercase bg-gray-50/50 border-b border-gray-100 font-black tracking-widest">
                            <tr>
                                <th className="px-6 py-5 text-center w-16">No</th>
                                <th className="px-6 py-5">Judul &amp; Cuplikan</th>
                                <th className="px-6 py-5 w-40 text-center">Status</th>
                                <th className="px-6 py-5 w-48">Tanggal Terbit</th>
                                <th className="px-6 py-5 text-center w-32">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {posts.map((post, index) => (
                                <tr key={post.id} className="hover:bg-blue-50/30 transition-colors group">
                                    <td className="px-6 py-4 text-center font-mono text-gray-400">{index + 1}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-gray-900 font-bold text-base group-hover:text-blue-600 transition-colors line-clamp-1">{post.title}</span>
                                            <span className="text-gray-400 text-xs mt-1 line-clamp-1 italic">{stripHtml(post.body)}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border ${post.published ? 'bg-green-50 text-green-600 border-green-100' : 'bg-gray-50 text-gray-400 border-gray-200'}`}>
                                            {post.published ? 'Published' : 'Draft'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500 font-medium">{formatDate(post.published_at)}</td>
                                    <td className="px-6 py-4 text-center">
                                        <Link href={route('post.choose', { post_id: post.id })} className="inline-flex items-center justify-center bg-gray-900 hover:bg-blue-600 text-white w-10 h-10 rounded-xl transition-all shadow-sm shadow-gray-200 hover:shadow-blue-200" title="Pilih Artikel ini">
                                            →
                                        </Link>
                                    </td>
                                </tr>
                            ))}

                            {posts.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center">
                                            <p className="text-gray-400 italic">Belum ada artikel yang ditulis.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
