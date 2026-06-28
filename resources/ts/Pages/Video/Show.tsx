import { Link } from '@inertiajs/react';
import { route } from 'ziggy-js';

interface Video {
    no_video: number;
    judul: string;
    youtube_id: string;
    deskripsi?: string | null;
    created_at: string;
}

interface Props {
    video: Video;
}

const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

export default function Show({ video }: Props) {
    return (
        <div className="max-w-5xl mx-auto py-8">
            <div className="mb-6">
                <Link href={route('video.index')} className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Kembali ke Daftar Video
                </Link>
            </div>

            <div className="bg-black rounded-2xl shadow-2xl overflow-hidden border border-gray-800 aspect-video">
                <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${video.youtube_id}?autoplay=1&rel=0`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                />
            </div>

            <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h1 className="text-2xl font-extrabold text-gray-900 leading-tight">{video.judul}</h1>
                <div className="mt-4 flex items-center text-sm text-gray-500 border-t pt-4">
                    <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Dipublikasikan pada {formatDate(video.created_at)}
                    </span>
                    <span className="mx-3">•</span>
                    <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-600">ID: #{video.no_video}</span>
                </div>

                <div className="mt-6 text-gray-700 leading-relaxed">
                    {video.deskripsi ? <p>{video.deskripsi}</p> : <p className="italic text-gray-400 text-sm">Tidak ada deskripsi untuk video ini.</p>}
                </div>
            </div>
        </div>
    );
}
