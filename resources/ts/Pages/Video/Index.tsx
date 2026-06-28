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

export default function Index({ videos }: Props) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-800">Daftar Video Yayasan</h3>
                <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-blue-100 text-blue-800">
                    {videos.length} Video Tersedia
                </span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-bold text-center w-20">No. Video</th>
                            <th className="px-6 py-4 font-bold">Judul Video</th>
                            <th className="px-6 py-4 font-bold">Tanggal Upload</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {videos.map((video) => (
                            <tr key={video.no_video} className="hover:bg-blue-50/50 transition-colors group">
                                <td className="px-6 py-4 text-center font-mono text-gray-400">#{video.no_video}</td>
                                <td className="px-6 py-4">
                                    <Link
                                        href={route('video.show', { no_video: video.no_video })}
                                        className="text-gray-900 font-semibold hover:text-blue-600 transition-colors flex items-center"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-300 group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {video.judul}
                                    </Link>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{formatDateTime(video.created_at)}</td>
                            </tr>
                        ))}

                        {videos.length === 0 && (
                            <tr>
                                <td colSpan={3} className="px-6 py-10 text-center text-gray-400 italic">
                                    Belum ada video yang diunggah.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
