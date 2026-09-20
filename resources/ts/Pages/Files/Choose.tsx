import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import BlueButton from '@/Components/Parts/BlueButton';
import RedButton from '@/Components/Parts/RedButton';
import Admin2 from '@/Layouts/Admin2';
import { initProgressBar } from '@/Layouts/ts-js part/progressbar';

initProgressBar();

interface FileFormData {
  nama_file: string;
  deskripsi: string;
  link: string;
  nama_pembuat: string;
  published: boolean;
  [key: string]: any;
}

interface EditFileProps {
  file: {
    file_id: number | string;
    nama_file: string;
    deskripsi: string;
    link: string;
    nama_pembuat: string;
    published: boolean;
  };
}

const EditFileForm: React.FC<EditFileProps> = ({ file }) => {
  const { data, setData, put, processing, errors } = useForm<FileFormData>({
    nama_file: file.nama_file || '',
    deskripsi: file.deskripsi || '',
    link: file.link || '',
    nama_pembuat: file.nama_pembuat || '',
    published: file.published ?? false,
  });

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    put(route('files.update', file.file_id));
  };

  return (
    <Admin2>
      <Head title="Edit File" />
      <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-white shadow rounded">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Edit Data File Yayasan</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nama File */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Nama File</label>
            <input
              type="text"
              value={data.nama_file}
              onChange={(e) => setData('nama_file', e.target.value)}
              className="mt-1 block w-full border rounded px-3 py-2"
              required
              minLength={3}
              maxLength={100}
            />
            {errors.nama_file && <p className="text-red-600 text-sm">{errors.nama_file}</p>}
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
            <textarea
              value={data.deskripsi}
              onChange={(e) => setData('deskripsi', e.target.value)}
              className="mt-1 block w-full border rounded px-3 py-2"
              required
            />
            {errors.deskripsi && <p className="text-red-600 text-sm">{errors.deskripsi}</p>}
          </div>

          {/* Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Link</label>
            <input
              type="url"
              value={data.link}
              onChange={(e) => setData('link', e.target.value)}
              className="mt-1 block w-full border rounded px-3 py-2"
              maxLength={1000}
            />
            {errors.link && <p className="text-red-600 text-sm">{errors.link}</p>}
          </div>

          {/* Nama Pembuat */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Nama Pembuat</label>
            <input
              type="text"
              value={data.nama_pembuat}
              onChange={(e) => setData('nama_pembuat', e.target.value)}
              className="mt-1 block w-full border rounded px-3 py-2"
              required
              minLength={3}
              maxLength={100}
            />
            {errors.nama_pembuat && <p className="text-red-600 text-sm">{errors.nama_pembuat}</p>}
          </div>

          {/* Published Toggle Switch */}
          <div className="flex items-center justify-between p-2 border rounded bg-gray-50">
            <label htmlFor="published" className="text-sm font-medium text-gray-700">
              Published
            </label>
            <div className="relative inline-flex items-center">
              <input
                type="checkbox"
                id="published"
                checked={data.published}
                onChange={(e) => setData('published', e.target.checked)}
                className="sr-only peer"
              />
              {/* Track */}
              <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-600 transition-colors"></div>
              {/* Thumb */}
              <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transform peer-checked:translate-x-5 transition-transform"></div>
            </div>
            {errors.published && <p className="text-red-600 text-sm">{errors.published}</p>}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <BlueButton disabled={processing}> Simpan Perubahan </BlueButton>
            <RedButton href={route('home')}> Batal </RedButton>
            <RedButton href={route('files.delete', file.file_id)}> Hapus File </RedButton>
          </div>
        </form>
      </div>
    </Admin2>
  );
};

export default EditFileForm;
