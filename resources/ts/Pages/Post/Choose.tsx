import { Head, useForm, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import TexEditor from '@/Components/TexEditor';
import React from 'react';
import Admin1 from '@/Layouts/Admin1';
import RedButton from '@/Components/Parts/RedButton';
import BlueButton from '@/Components/Parts/BlueButton';
import { initProgressBar } from '@/Layouts/ts-js part/progressbar';

initProgressBar();

interface Post {
  id: number;
  title: string;
  body: string;
  published: boolean;
  published_at: string;
}

interface Props {
  post: Post;
}

interface PostFormData {
  title: string;
  body: string;
  published: boolean;
  published_at: string;
}

const ValidationError: React.FC<{ message?: string | string[] }> = ({ message }) => {
  if (!message) return null;
  const messages = Array.isArray(message) ? message : [message];
  return (
    <div className="mt-2 rounded-lg bg-red-50 border border-red-200 p-3">
      {messages.map((msg, i) => (
        <p key={i} className="text-red-600 text-sm font-semibold">{msg}</p>
      ))}
    </div>
  );
};

const Alert: React.FC<{ message?: string }> = ({ message }) => {
  if (!message) return null;
  return (
    <div className="mb-4 rounded-lg bg-green-50 border border-green-200 p-3">
      <p className="text-green-700 text-sm font-semibold">{message}</p>
    </div>
  );
};

export default function Choose({ post }: Props) {
  const form = useForm<PostFormData>({
    title: post.title,
    body: post.body,
    published: Boolean(post.published),
    published_at: post.published_at ? post.published_at.substring(0, 16) : '',
  });

  const updatePost = () => {
    form.put(route('post.update', { post_id: post.id }));
  };

  return (
    <Admin1>
      <Head title="Edit artikel" />
      <div className="max-w-5xl mx-auto py-6 sm:py-10 px-3 sm:px-4">
        <Alert message={form.recentlySuccessful ? 'Artikel berhasil diperbarui!' : undefined} />

        <div className="mb-6 sm:mb-8">
          <Link
            href={route('post.edit')}
            className="text-sm text-blue-600 hover:underline flex items-center mb-2"
          >
            Kembali ke Daftar Artikel
          </Link>
          <h2 className="text-lg sm:text-2xl font-bold mb-2">Edit Artikel</h2>
        </div>

        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              updatePost();
            }}
            className="p-4 sm:p-8 md:p-12 space-y-6 sm:space-y-8"
          >
            {/* Judul Artikel */}
            <div>
              <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">
                Judul Artikel
              </label>
              <input
                type="text"
                value={form.data.title}
                onChange={(event) => form.setData('title', event.target.value)}
                minLength={5}
                maxLength={100}
                required
                className="w-full px-3 sm:px-5 py-2 sm:py-4 bg-gray-50 border-transparent rounded-xl sm:rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-base sm:text-xl font-bold"
              />
              <ValidationError message={form.errors.title} />
            </div>

            {/* Isi Artikel */}
            <div>
              <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">
                Isi Artikel
              </label>
              <TexEditor
                {...({
                  value: form.data.body,
                  onChange: (html: string) => form.setData('body', html),
                } as any)}
              />
              <ValidationError message={form.errors.body} />
            </div>

            {/* Status Publikasi & Tanggal Terbit */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-6 border-t border-gray-50">
              <div>
                <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-4">
                  Status Publikasi
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    onClick={() => form.setData('published', !form.data.published)}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none ${
                      form.data.published ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform shadow-md ${
                        form.data.published ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <span
                    className={`font-bold text-sm ${
                      form.data.published ? 'text-green-600' : 'text-gray-400'
                    }`}
                  >
                    {form.data.published ? 'PUBLISHED (Aktif)' : 'DRAFT (Tersembunyi)'}
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
                  onChange={(event) => form.setData('published_at', event.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border-transparent rounded-lg sm:rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-bold"
                />
                <ValidationError message={form.errors.published_at} />
              </div>
            </div>

            {/* Tombol Aksi */}
            <div className="pt-8 sm:pt-10 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
                <RedButton href={route('post.edit')}>
                  Batal
                </RedButton>
                <BlueButton as="button" disabled={form.processing}>
                  {form.processing ? 'Memperbarui...' : 'Update Artikel'}
                </BlueButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Admin1>
  );
}
