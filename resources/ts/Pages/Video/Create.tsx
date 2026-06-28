import { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';

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
        <div className="max-w-4xl mx-auto py-8">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Upload Video Baru</h2>
                <p className="text-sm text-gray-500 mt-1">Masukkan detail video YouTube yang ingin ditampilkan di website yayasan.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <form onSubmit={(event) => { event.preventDefault(); submit(); }} className="p-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="judul" className="block text-sm font-medium text-gray-700">Judul Video <span className="text-red-500">*</span></label>
                                <input
                                    id="judul"
                                    type="text"
                                    value={form.data.title}
                                    onChange={(event) => form.setData('title', event.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    placeholder="Masukkan judul video..."
                                    required
                                />
                                {form.errors.title && <p className="mt-1 text-xs text-red-600">{form.errors.title}</p>}
                            </div>

                            <div>
                                <label htmlFor="youtube_link" className="block text-sm font-medium text-gray-700">Link YouTube <span className="text-red-500">*</span></label>
                                <input
                                    id="youtube_link"
                                    type="text"
                                    value={rawYoutubeLink}
                                    onChange={(event) => handleYoutubeChange(event.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    required
                                />
                                <p className="mt-1 text-xs text-gray-500">Paste link YouTube. Sistem otomatis membaca ID-nya.</p>
                                {form.errors.link && <p className="mt-1 text-xs text-red-600">{form.errors.link}</p>}
                            </div>

                            <div>
                                <label htmlFor="tanggal_upload" className="block text-sm font-medium text-gray-700">Tanggal Upload Video <span className="text-red-500">*</span></label>
                                <input
                                    id="tanggal_upload"
                                    type="date"
                                    value={form.data.upload_tanggal}
                                    onChange={(event) => form.setData('upload_tanggal', event.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    required
                                />
                                <p className="mt-1 text-xs text-gray-500">Sesuaikan dengan tanggal rilis video di YouTube.</p>
                                {form.errors.upload_tanggal && <p className="mt-1 text-xs text-red-600">{form.errors.upload_tanggal}</p>}
                            </div>

                            <div>
                                <span className="block text-sm font-medium text-gray-700 mb-2">Status Publikasi</span>
                                <label className="flex items-center cursor-pointer">
                                    <input type="checkbox" checked={form.data.published} onChange={(event) => form.setData('published', event.target.checked)} className="sr-only peer" />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
                                    <span className={`ml-3 text-sm font-bold ${form.data.published ? 'text-blue-600' : 'text-gray-500'}`}>
                                        {form.data.published ? 'ON (Tayang)' : 'OFF (Draft)'}
                                    </span>
                                </label>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Preview Video</label>
                                <div className="w-full aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden shadow-inner">
                                    {form.data.link ? (
                                        <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${form.data.link}?rel=0`} frameBorder="0" allowFullScreen />
                                    ) : (
                                        <div className="text-gray-400 text-sm flex flex-col items-center">
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
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    placeholder="Tambahkan keterangan singkat..."
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-5 border-t border-gray-200 flex items-center justify-end space-x-3">
                        <Link href={route('video.edit')} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition">
                            Batal
                        </Link>
                        <button type="submit" disabled={form.processing} className="px-6 py-2 text-sm font-bold text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center shadow-sm">
                            {form.processing ? 'Menyimpan Data...' : 'Create Video'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
