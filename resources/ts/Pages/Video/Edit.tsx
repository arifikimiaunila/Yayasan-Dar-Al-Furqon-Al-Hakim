import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import Admin2 from '@/Layouts/Admin2';

interface Video {
    id: number;
    no_video: number;
    judul: string;
    youtube_id: string;
    is_published: boolean;
    uploader_name?: string;
    created_at: string;
}

interface Props {
    videos: Video[];
}

const formatDateTime = (dateString: string) =>
    new Date(dateString).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

export default function Edit({ videos }: Props) {
    return (
        <Admin2>
            <Head title="Daftar Video" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-4 md:space-y-0">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Pilih Video</h2>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">
                            Silakan pilih video dari daftar di bawah ini untuk melihat detail, mengupdate, atau menghapusnya.
                        </p>
                    </div>
                </div>

                {/* Table Container dengan Overflow Scroll untuk Mobile */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto -mx-4 sm:mx-0">
                        <div className="inline-block min-w-full align-middle">
                            <table className="min-w-full text-sm text-left text-gray-600">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-100 border-b border-gray-200">
                                    <tr>
                                        <th scope="col" className="px-3 sm:px-4 py-3 sm:py-4 font-bold text-center">ID</th>
                                        <th scope="col" className="px-3 sm:px-4 py-3 sm:py-4 font-bold text-center">No. Video</th>
                                        <th scope="col" className="px-3 sm:px-4 py-3 sm:py-4 font-bold">Judul</th>
                                        <th scope="col" className="px-3 sm:px-4 py-3 sm:py-4 font-bold">Link (YT ID)</th>
                                        <th scope="col" className="px-3 sm:px-4 py-3 sm:py-4 font-bold text-center">Published</th>
                                        <th scope="col" className="px-3 sm:px-4 py-3 sm:py-4 font-bold">Uploader</th>
                                        <th scope="col" className="px-3 sm:px-4 py-3 sm:py-4 font-bold">Tanggal</th>
                                        <th scope="col" className="px-3 sm:px-4 py-3 sm:py-4 font-bold text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {videos.map((video) => (
                                        <tr key={video.no_video} className="hover:bg-amber-50/50 transition-colors">
                                            <td className="px-3 sm:px-4 py-3 text-center font-mono text-gray-400 text-xs sm:text-sm">{video.id}</td>
                                            <td className="px-3 sm:px-4 py-3 text-center font-bold text-gray-700 text-xs sm:text-sm">#{video.no_video}</td>
                                            <td className="px-3 sm:px-4 py-3 font-medium text-gray-900 max-w-xs text-xs sm:text-sm">
                                                <Link
                                                    href={route('video.choose', { no_video: video.no_video })}
                                                    className="text-blue-600 hover:text-blue-800 hover:underline block truncate"
                                                    title={video.judul}
                                                >
                                                    {video.judul}
                                                </Link>
                                            </td>
                                            <td className="px-3 sm:px-4 py-3 font-mono text-xs">
                                                <a
                                                    href={`https://youtube.com/watch?v=${video.youtube_id}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-blue-500 hover:text-blue-700 hover:underline flex items-center whitespace-nowrap"
                                                >
                                                    {video.youtube_id}
                                                </a>
                                            </td>
                                            <td className="px-3 sm:px-4 py-3 text-center">
                                                <span
                                                    className={`inline-block text-[10px] font-bold px-2 sm:px-2.5 py-1 rounded-full uppercase tracking-wider ${
                                                        video.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                                                    }`}
                                                >
                                                    {video.is_published ? 'Yes' : 'Draft'}
                                                </span>
                                            </td>
                                            <td className="px-3 sm:px-4 py-3 text-xs font-medium text-gray-500 whitespace-nowrap">
                                                {video.uploader_name || 'Admin'}
                                            </td>
                                            <td className="px-3 sm:px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                                                {formatDateTime(video.created_at)}
                                            </td>
                                            <td className="px-3 sm:px-4 py-3 text-center">
                                                <Link
                                                    href={route('video.choose', { no_video: video.no_video })}
                                                    className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-600 text-white px-2.5 sm:px-3 py-1.5 rounded text-xs font-bold transition shadow-sm whitespace-nowrap"
                                                >
                                                    Pilih Video
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}

                                    {videos.length === 0 && (
                                        <tr>
                                            <td colSpan={8} className="px-6 py-12 text-center text-gray-400 italic text-sm">
                                                Belum ada data video.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Admin2>
    );
}