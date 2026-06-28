import { Link } from '@inertiajs/react';
import { route } from 'ziggy-js';

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
        <div className="max-w-7xl mx-auto py-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-4 md:space-y-0">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Pilih Video</h2>
                    <p className="text-sm text-gray-500 mt-1">Silakan pilih video dari daftar di bawah ini untuk melihat detail, mengupdate, atau menghapusnya.</p>
                </div>

                <div className="flex space-x-3">
                    <Link href={route('video.create')} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Buat Video Baru
                    </Link>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-600">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100 border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-4 font-bold text-center">ID</th>
                                <th className="px-4 py-4 font-bold text-center">No. Video</th>
                                <th className="px-4 py-4 font-bold">Judul</th>
                                <th className="px-4 py-4 font-bold">Link (YT ID)</th>
                                <th className="px-4 py-4 font-bold text-center">Published</th>
                                <th className="px-4 py-4 font-bold">Uploader</th>
                                <th className="px-4 py-4 font-bold">Tanggal</th>
                                <th className="px-4 py-4 font-bold text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {videos.map((video) => (
                                <tr key={video.no_video} className="hover:bg-amber-50/50 transition-colors">
                                    <td className="px-4 py-3 text-center font-mono text-gray-400">{video.id}</td>
                                    <td className="px-4 py-3 text-center font-bold text-gray-700">#{video.no_video}</td>
                                    <td className="px-4 py-3 font-medium text-gray-900 truncate max-w-xs" title={video.judul}>{video.judul}</td>
                                    <td className="px-4 py-3 font-mono text-xs">
                                        <a href={`https://youtube.com/watch?v=${video.youtube_id}`} target="_blank" rel="noreferrer" className="text-blue-500 hover:text-blue-700 hover:underline flex items-center">
                                            {video.youtube_id}
                                        </a>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${video.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                                            {video.is_published ? 'Yes' : 'Draft'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-xs font-medium text-gray-500">{video.uploader_name || 'Admin'}</td>
                                    <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{formatDateTime(video.created_at)}</td>
                                    <td className="px-4 py-3 text-center">
                                        <Link href={route('video.choose', { no_video: video.no_video })} className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded text-xs font-bold transition shadow-sm whitespace-nowrap">
                                            Pilih Video
                                        </Link>
                                    </td>
                                </tr>
                            ))}

                            {videos.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="px-6 py-12 text-center text-gray-400 italic">
                                        Belum ada data video. Silakan klik &quot;Buat Video Baru&quot;.
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
