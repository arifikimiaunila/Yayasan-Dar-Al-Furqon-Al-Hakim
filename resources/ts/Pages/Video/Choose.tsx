import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { initProgressBar } from '@/Layouts/ts-js part/progressbar';
import Admin2 from '@/Layouts/Admin2';
import RedButton from '@/Components/Parts/RedButton';
import BlueButton from '@/Components/Parts/BlueButton';

initProgressBar();

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
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
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

    return (
        <Admin2>
            <Head title='Edit Video'/>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                {/* Header Section */}
                <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Kelola Video #{video.no_video}</h2>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">Perbarui informasi video atau hapus dari sistem.</p>
                    </div>
                    <span className={`self-start sm:self-auto text-xs font-bold px-3 py-1 rounded-full border ${form.data.published ? 'bg-green-100 text-green-800 border-green-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                        Status: {form.data.published ? 'TAYANG (true)' : 'DRAFT (false)'}
                    </span>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <form onSubmit={(event) => { event.preventDefault(); updateVideo(); }} className="p-4 sm:p-6 md:p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                            {/* Kolom Kiri: Form Input */}
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="judul" className="block text-sm font-medium text-gray-700">
                                        Judul Video <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        id="judul" 
                                        type="text" 
                                        value={form.data.title} 
                                        onChange={(event) => form.setData('title', event.target.value)} 
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 text-sm" 
                                        required 
                                    />
                                    {form.errors.title && <p className="mt-1 text-xs text-red-600">{form.errors.title}</p>}
                                </div>

                                <div>
                                    <label htmlFor="youtube_link" className="block text-sm font-medium text-gray-700">
                                        Link YouTube <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        id="youtube_link" 
                                        type="text" 
                                        value={rawYoutubeLink} 
                                        onChange={(event) => updateYoutubeLink(event.target.value)} 
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 text-sm" 
                                        required 
                                    />
                                    <p className="mt-1 text-xs text-gray-500">Ubah link jika ingin mengganti video.</p>
                                    {form.errors.link && <p className="mt-1 text-xs text-red-600">{form.errors.link}</p>}
                                </div>

                                <div>
                                    <label htmlFor="tanggal_upload" className="block text-sm font-medium text-gray-700">
                                        Tanggal Upload <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        id="tanggal_upload" 
                                        type="date" 
                                        value={form.data.upload_tanggal} 
                                        onChange={(event) => form.setData('upload_tanggal', event.target.value)} 
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 text-sm" 
                                        required 
                                    />
                                    {form.errors.upload_tanggal && <p className="mt-1 text-xs text-red-600">{form.errors.upload_tanggal}</p>}
                                </div>

                                {/* Toggle Switch Published (True/False) */}
                                <div>
                                    <span className="block text-sm font-medium text-gray-700 mb-2">Publikasi (Tayang di Website)</span>
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                                        <div className="flex flex-col pr-2">
                                            <span className="text-xs sm:text-sm font-semibold text-gray-700">
                                                Status: <span className={form.data.published ? 'text-green-600 font-bold' : 'text-gray-500 font-bold'}>
                                                    {form.data.published ? 'true (Published)' : 'false (Draft)'}
                                                </span>
                                            </span>
                                            <span className="text-[11px] sm:text-xs text-gray-500 mt-0.5">Aktifkan untuk menampilkan video ke publik.</span>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer shrink-0">
                                            <input 
                                                type="checkbox" 
                                                checked={form.data.published} 
                                                onChange={(event) => form.setData('published', event.target.checked)} 
                                                className="sr-only peer" 
                                            />
                                            <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-amber-600"></div>
                                        </label>
                                    </div>
                                    {form.errors.published && <p className="mt-1 text-xs text-red-600">{form.errors.published}</p>}
                                </div>
                            </div>

                            {/* Kolom Kanan: Preview & Deskripsi */}
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Preview Video Saat Ini</label>
                                    <div className="w-full aspect-video bg-black rounded-lg border border-gray-800 flex items-center justify-center overflow-hidden shadow-md">
                                        {form.data.link ? (
                                            <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${form.data.link}?rel=0`} frameBorder="0" allowFullScreen />
                                        ) : (
                                            <div className="text-red-400 text-sm flex flex-col items-center p-4 text-center">Link Video Tidak Valid</div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700">Deskripsi Singkat (Opsional)</label>
                                    <textarea 
                                        id="deskripsi" 
                                        value="" 
                                        onChange={() => undefined} 
                                        rows={3} 
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 text-sm" 
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Tombol Aksi (Responsive: Stack di Mobile, Sejajar di Desktop) */}
                        <div className="mt-8 pt-5 border-t border-gray-200 flex flex-col-reverse sm:flex-row items-center justify-between gap-3 sm:gap-4">
                            <div className="w-full sm:w-auto">
                                <RedButton 
                                    href={route('video.delete', { no_video: video.no_video })}>
                                    Hapus
                                </RedButton>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                                <BlueButton 
                                    href={route('home')}>
                                    Batal
                                </BlueButton>

                                <BlueButton 
                                    disabled={form.processing}>
                                    {form.processing ? 'Menyimpan...' : 'Update Data'}
                                </BlueButton>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Admin2>
    );
}