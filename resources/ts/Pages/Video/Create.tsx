import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { initProgressBar } from '@/Layouts/ts-js part/progressbar';
import Admin2 from '@/Layouts/Admin2';
import RedButton from '@/Components/Parts/RedButton'; // Sesuaikan path import komponen RedButton jika berbeda
import BlueButton from '@/Components/Parts/BlueButton'; // Sesuaikan path import komponen BlueButton jika berbeda

initProgressBar();

interface VideoFormData {
    title: string;
    link: string;
    published: boolean;
    upload_tanggal: string;
}

const today = new Date().toISOString().split('T')[0];

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

export default function Create() {
    const [rawYoutubeLink, setRawYoutubeLink] = useState('');
    const form = useForm<VideoFormData>({
        title: '',
        link: '',
        published: true,
        upload_tanggal: today,
    });

    const handleYoutubeChange = (value: string) => {
        setRawYoutubeLink(value);
        form.setData('link', extractYoutubeId(value));
    };

    const submit = () => {
        if (!form.data.link) {
            alert('Link YouTube tidak valid. Harap masukkan link yang benar sebelum mempublikasikan.');
            return;
        }

        form.post(route('video.store'), {
            preserveScroll: true,
            onSuccess: () => {
                form.reset();
                setRawYoutubeLink('');
            },
        });
    };

    return (
        <Admin2>
            <Head title='Upload Video Baru'/>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                {/* Header Section */}
                <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Upload Video Baru</h2>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">Masukkan detail video YouTube yang ingin ditampilkan di website yayasan.</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <form onSubmit={(event) => { event.preventDefault(); submit(); }} className="p-4 sm:p-6 md:p-8">
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
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                                        placeholder="Masukkan judul video..."
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
                                        onChange={(event) => handleYoutubeChange(event.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                                        placeholder="https://www.youtube.com/watch?v=..."
                                        required
                                    />
                                    <p className="mt-1 text-xs text-gray-500">Paste link YouTube. Sistem otomatis membaca ID-nya.</p>
                                    {form.errors.link && <p className="mt-1 text-xs text-red-600">{form.errors.link}</p>}
                                </div>

                                <div>
                                    <label htmlFor="tanggal_upload" className="block text-sm font-medium text-gray-700">
                                        Tanggal Upload Video <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="tanggal_upload"
                                        type="date"
                                        value={form.data.upload_tanggal}
                                        onChange={(event) => form.setData('upload_tanggal', event.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                                        required
                                    />
                                    <p className="mt-1 text-xs text-gray-500">Sesuaikan dengan tanggal rilis video di YouTube.</p>
                                    {form.errors.upload_tanggal && <p className="mt-1 text-xs text-red-600">{form.errors.upload_tanggal}</p>}
                                </div>

                                {/* Bagian Toggle Switch Published (True/False) */}
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
                                            <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                    {form.errors.published && <p className="mt-1 text-xs text-red-600">{form.errors.published}</p>}
                                </div>
                            </div>

                            {/* Kolom Kanan: Preview & Deskripsi */}
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Preview Video</label>
                                    <div className="w-full aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden shadow-inner">
                                        {form.data.link ? (
                                            <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${form.data.link}?rel=0`} frameBorder="0" allowFullScreen />
                                        ) : (
                                            <div className="text-gray-400 text-sm flex flex-col items-center p-4 text-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                </svg>
                                                Preview akan muncul setelah link dimasukkan
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700">Deskripsi Singkat (Opsional)</label>
                                    <textarea
                                        id="deskripsi"
                                        value={''}
                                        onChange={() => undefined}
                                        rows={3}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                                        placeholder="Tambahkan keterangan singkat..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Tombol Aksi (Sejajar/Berdampingan di Mobile & Desktop) */}
                        <div className="mt-8 pt-5 border-t border-gray-200 flex flex-row items-center justify-between gap-3">
                            <div>
                                <RedButton href={route('home')}>
                                    Batal
                                </RedButton>
                            </div>
                            <div>
                                <BlueButton 
                                    as="button" 
                                    disabled={form.processing}
                                >
                                    {form.processing ? 'Menyimpan...' : 'Create Video'}
                                </BlueButton>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Admin2>
    );
}