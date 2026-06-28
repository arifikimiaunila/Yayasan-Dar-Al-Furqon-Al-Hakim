import { useState } from 'react';
import { Link, router, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';

interface Video {
    no_video: number;
    judul: string;
    youtube_id: string;
    is_published: boolean;
    tanggal_upload: string;
}

interface Props {
    video: Video;
}

interface VideoFormData {
    title: string;
    link: string;
    published: boolean;
    upload_tanggal: string;
}

const extractYoutubeId = (url: string): string => {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
        return match[2];
    }

    if (url.length === 11) {
        return url;
    }

    return '';
};

export default function Choose({ video }: Props) {
    const [rawYoutubeLink, setRawYoutubeLink] = useState(`https://www.youtube.com/watch?v=${video.youtube_id}`);
    const form = useForm<VideoFormData>({
        title: video.judul,
        link: video.youtube_id,
        published: video.is_published,
        upload_tanggal: video.tanggal_upload,
    });

    const updateYoutubeLink = (value: string) => {
        setRawYoutubeLink(value);
        form.setData('link', extractYoutubeId(value));
    };

    const updateVideo = () => {
        if (!form.data.link) {
            alert('Link YouTube tidak valid. Harap periksa kembali.');
            return;
        }

        form.put(route('video.update', { no_video: video.no_video }), {
            preserveScroll: true,
        });
    };

    const hapusVideo = () => {
        if (confirm(`Peringatan: Apakah Anda yakin ingin menghapus video "${video.judul}" secara permanen? Data yang dihapus tidak bisa dikembalikan.`)) {
            router.delete(route('video.delete', { no_video: video.no_video }));
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-8">
            <div className="mb-6 flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Kelola Video #{video.no_video}</h2>
                    <p className="text-sm text-gray-500 mt-1">Perbarui informasi video atau hapus dari sistem.</p>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${form.data.published ? 'bg-green-100 text-green-800 border-green-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                    Status: {form.data.published ? 'TAYANG' : 'DRAFT'}
                </span>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <form onSubmit={(event) => { event.preventDefault(); updateVideo(); }} className="p-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="judul" className="block text-sm font-medium text-gray-700">Judul Video <span className="text-red-500">*</span></label>
                                <input id="judul" type="text" value={form.data.title} onChange={(event) => form.setData('title', event.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm" required />
                                {form.errors.title && <p className="mt-1 text-xs text-red-600">{form.errors.title}</p>}
                            </div>

                            <div>
                                <label htmlFor="youtube_link" className="block text-sm font-medium text-gray-700">Link YouTube <span className="text-red-500">*</span></label>
                                <input id="youtube_link" type="text" value={rawYoutubeLink} onChange={(event) => updateYoutubeLink(event.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm" required />
                                <p className="mt-1 text-xs text-gray-500">Ubah link jika ingin mengganti video.</p>
                                {form.errors.link && <p className="mt-1 text-xs text-red-600">{form.errors.link}</p>}
                            </div>

                            <div>
                                <label htmlFor="tanggal_upload" className="block text-sm font-medium text-gray-700">Tanggal Upload <span className="text-red-500">*</span></label>
                                <input id="tanggal_upload" type="date" value={form.data.upload_tanggal} onChange={(event) => form.setData('upload_tanggal', event.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm" required />
                                {form.errors.upload_tanggal && <p className="mt-1 text-xs text-red-600">{form.errors.upload_tanggal}</p>}
                            </div>

                            <div>
                                <span className="block text-sm font-medium text-gray-700 mb-2">Publikasi (Tayang di Website)</span>
                                <label className="flex items-center cursor-pointer">
                                    <input type="checkbox" checked={form.data.published} onChange={(event) => form.setData('published', event.target.checked)} className="sr-only peer" />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500" />
                                    <span className={`ml-3 text-sm font-bold ${form.data.published ? 'text-amber-600' : 'text-gray-500'}`}>{form.data.published ? 'ON (Publik)' : 'OFF (Draft)'}</span>
                                </label>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Preview Video Saat Ini</label>
                                <div className="w-full aspect-video bg-black rounded-lg border border-gray-800 flex items-center justify-center overflow-hidden shadow-md">
                                    {form.data.link ? (
                                        <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${form.data.link}?rel=0`} frameBorder="0" allowFullScreen />
                                    ) : (
                                        <div className="text-red-400 text-sm flex flex-col items-center">Link Video Tidak Valid</div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700">Deskripsi Singkat (Opsional)</label>
                                <textarea id="deskripsi" value="" onChange={() => undefined} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-5 border-t border-gray-200 flex flex-col-reverse md:flex-row items-center justify-between">
                        <button type="button" onClick={hapusVideo} className="w-full md:w-auto mt-3 md:mt-0 px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-200 rounded-md hover:bg-red-50 transition flex items-center justify-center">
                            Hapus Permanen
                        </button>

                        <div className="flex items-center space-x-3 w-full md:w-auto">
                            <Link href={route('video.edit')} className="flex-1 md:flex-none text-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition">Batal</Link>
                            <button type="submit" disabled={form.processing} className="flex-1 md:flex-none flex items-center justify-center px-6 py-2 text-sm font-bold text-white bg-amber-500 border border-transparent rounded-md hover:bg-amber-600 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm">
                                {form.processing ? 'Menyimpan...' : 'Update Data'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
