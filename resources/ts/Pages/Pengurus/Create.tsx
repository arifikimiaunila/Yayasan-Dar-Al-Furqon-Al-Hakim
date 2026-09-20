import React from 'react';
import { route } from 'ziggy-js';
import { Head, useForm } from '@inertiajs/react';
import BlueButton from "@/Components/Parts/BlueButton";
import RedButton from '@/Components/Parts/RedButton';
import Admin1 from '@/Layouts/Admin1';
import { initProgressBar } from '@/Layouts/ts-js part/progressbar';

initProgressBar();

const PengurusYayasanForm: React.FC = () => {
  const { data, setData, post, processing, errors } = useForm({
    nama: '',
    dapukan: '',
    alamat: '',
    no_telp: '',
    kategori: '',
    published: false,
    link_foto: null as File | null,
    nama_file: '',
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    post(route('pengurus_yayasan.create'));
  };

  return (
    <Admin1>
      <Head title="Buat Data Pengurus" />
      <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-white shadow rounded">
        {/* Judul Form */}
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Buat Data Pengurus</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nama */}
          <div>
            <label className="block text-sm font-medium">Nama</label>
            <input
              type="text"
              value={data.nama}
              onChange={(e) => setData('nama', e.target.value)}
              className="mt-1 block w-full border rounded p-2"
              minLength={3}
              maxLength={100}
              required
            />
            {errors.nama && <div className="text-red-500">{errors.nama}</div>}
          </div>

          {/* Dapukan */}
          <div>
            <label className="block text-sm font-medium">Dapukan</label>
            <input
              type="text"
              value={data.dapukan}
              onChange={(e) => setData('dapukan', e.target.value)}
              className="mt-1 block w-full border rounded p-2"
              minLength={2}
              maxLength={100}
              required
            />
            {errors.dapukan && <div className="text-red-500">{errors.dapukan}</div>}
          </div>

          {/* Alamat */}
          <div>
            <label className="block text-sm font-medium">Alamat</label>
            <textarea
              value={data.alamat}
              onChange={(e) => setData('alamat', e.target.value)}
              className="mt-1 block w-full border rounded p-2"
              maxLength={300}
            />
            {errors.alamat && <div className="text-red-500">{errors.alamat}</div>}
          </div>

          {/* No Telp */}
          <div>
            <label className="block text-sm font-medium">No. Telp</label>
            <input
              type="number"
              value={data.no_telp}
              onChange={(e) => setData('no_telp', e.target.value)}
              className="mt-1 block w-full border rounded p-2"
            />
            {errors.no_telp && <div className="text-red-500">{errors.no_telp}</div>}
          </div>

          {/* Kategori */}
          <div>
            <label className="block text-sm font-medium">Kategori</label>
            <input
              type="text"
              value={data.kategori}
              onChange={(e) => setData('kategori', e.target.value)}
              className="mt-1 block w-full border rounded p-2"
              maxLength={100}
              required
            />
            {errors.kategori && <div className="text-red-500">{errors.kategori}</div>}
          </div>

          {/* Published Toggle Switch */}
          <div>
            <label className="block text-sm font-medium mb-2">Published</label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={data.published}
                onChange={(e) => setData('published', e.target.checked)}
                className="sr-only peer"
              />
              {/* Track */}
              <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 transition-colors"></div>
              {/* Thumb */}
              <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transform peer-checked:translate-x-5 transition-transform"></div>
              {/* Label True/False */}
              <span className="ml-3 text-sm text-gray-700">
                {data.published ? 'True' : 'False'}
              </span>
            </label>
          </div>

          {/* Nama File Foto */}
          <div>
            <label className="block text-sm font-medium">Nama File Foto</label>
            <input
              type="text"
              value={data.nama_file}
              onChange={(e) => setData('nama_file', e.target.value)}
              className="mt-1 block w-full border rounded p-2"
            />
          </div>

          {/* Upload Foto */}
          <div>
            <label className="block text-sm font-medium">Upload Foto Biodata</label>
            <input
              type="file"
              accept="image/jpg,image/jpeg,image/png"
              onChange={(e) =>
                setData('link_foto', e.target.files ? e.target.files[0] : null)
              }
              className="mt-1 block w-full"
            />
            <p className="text-xs text-gray-500 mt-1">
              Syarat: JPG/JPEG/PNG, max 2MB, resolusi min 400x600, background polos,
              wajah jelas, tanpa aksesoris berlebihan, foto terbaru.
            </p>
            {errors.link_foto && <div className="text-red-500">{errors.link_foto}</div>}
          </div>

          {/* Tombol Submit & Cancel */}
          <div className="flex flex-col sm:flex-row gap-3">
            <BlueButton method="post" as="button" disabled={processing}>
              Simpan
            </BlueButton>
            <RedButton href={route('home')}>
              Batal
            </RedButton>
          </div>
        </form>
      </div>
    </Admin1>
  );
};

export default PengurusYayasanForm;
