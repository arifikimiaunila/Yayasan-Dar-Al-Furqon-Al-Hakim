import { Link, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import TextEditor from '../../Components/TextEditor';

interface PostFormData {
    title: string;
    body: string;
    published: boolean;
    published_at: string;
}

export default function Create() {
    const form = useForm<PostFormData>({
        title: '',
        body: '',
        published: false,
        published_at: new Date().toISOString().slice(0, 16),
    });

    const submit = () => {
        form.post(route('post.store'), {
            preserveScroll: true,
            onSuccess: () => form.reset(),
        });
    };

    return (
        <div className="max-w-5xl mx-auto py-10 px-4">
            <div className="mb-8">
                <Link
                    href={route('post.edit')}
                    className="text-sm text-blue-600 hover:underline flex items-center mb-2"
                >
                    Kembali ke Daftar Artikel
                </Link>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                    Tulis Artikel Baru
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Lengkapi informasi artikel di bawah ini lalu publikasikan.
                </p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        submit();
                    }}
                    className="p-8 md:p-12 space-y-8"
                >
                    <div>
                        <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">
                            Judul Artikel
                        </label>
                        <input
                            type="text"
                            value={form.data.title}
                            onChange={(event) =>
                                form.setData('title', event.target.value)
                            }
                            className="w-full px-5 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-xl font-bold"
                            placeholder="Masukkan judul artikel..."
                        />
                        {form.errors.title && (
                            <div className="text-red-500 text-xs mt-2 font-bold">
                                {form.errors.title}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">
                            Isi Artikel
                        </label>
                        <TextEditor
                            value={form.data.body}
                            onChange={(html) => form.setData('body', html)}
                        />
                        {form.errors.body && (
                            <div className="text-red-500 text-xs mt-2 font-bold">
                                {form.errors.body}
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-gray-50">
                        <div>
                            <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-4">
                                Status Publikasi
                            </label>
                            <div className="flex items-center space-x-4">
                                <button
                                    type="button"
                                    onClick={() =>
                                        form.setData(
                                            'published',
                                            !form.data.published,
                                        )
                                    }
                                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none ${
                                        form.data.published
                                            ? 'bg-green-500'
                                            : 'bg-gray-300'
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform shadow-md ${
                                            form.data.published
                                                ? 'translate-x-7'
                                                : 'translate-x-1'
                                        }`}
                                    />
                                </button>
                                <span
                                    className={`font-bold text-sm ${
                                        form.data.published
                                            ? 'text-green-600'
                                            : 'text-gray-400'
                                    }`}
                                >
                                    {form.data.published
                                        ? 'PUBLISHED (Aktif)'
                                        : 'DRAFT (Tersembunyi)'}
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">
                                Tanggal Terbit
                            </label>
                            <input
                                type="datetime-local"
                                value={form.data.published_at}
                                onChange={(event) =>
                                    form.setData(
                                        'published_at',
                                        event.target.value,
                                    )
                                }
                                className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-bold"
                            />
                            {form.errors.published_at && (
                                <div className="text-red-500 text-xs mt-2 font-bold">
                                    {form.errors.published_at}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-4">
                        <Link
                            href={route('post.edit')}
                            className="px-8 py-4 text-gray-400 font-bold hover:text-gray-600 transition-colors"
                        >
                            Batal
                        </Link>

                        <button
                            type="submit"
                            disabled={form.processing}
                            className="w-full md:w-auto px-10 py-4 bg-gray-900 text-white rounded-2xl font-black shadow-xl shadow-gray-200 hover:bg-blue-600 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center"
                        >
                            {form.processing ? 'Menyimpan...' : 'Publikasikan Artikel'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
