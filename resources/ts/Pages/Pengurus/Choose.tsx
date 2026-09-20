import React from 'react';
import { route } from 'ziggy-js';
import { Head, useForm } from '@inertiajs/react';
import BlueButton from "@/Components/Parts/BlueButton";
import RedButton from '@/Components/Parts/RedButton';
import Admin1 from '@/Layouts/Admin1';
import { initProgressBar } from '@/Layouts/ts-js part/progressbar';

initProgressBar();

interface Props {
  pengurus: {
    id_pengurus: number;
    nama: string;
    dapukan: string;
    alamat?: string;
    no_telp?: number;
    kategori: string;
    published: boolean;
    link_foto?: string | null;
    nama_file?: string;
  };
}

const PengurusYayasanEditForm: React.FC<Props> = ({ pengurus }) => {
  const { data, setData, put, processing, errors } = useForm({
    nama: pengurus.nama || '',
    dapukan: pengurus.dapukan || '',
    alamat: pengurus.alamat || '',
    no_telp: pengurus.no_telp?.toString() || '',
    kategori: pengurus.kategori || '',
    published: pengurus.published || false,
    link_foto: null as File | null,
    nama_file: pengurus.nama_file || '',
  });

  return (
    <Admin1>
      <Head title="Edit Data Pengurus" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">
          Edit Data Pengurus
        </h2>

        <div className="space-y-6 bg-white shadow-sm sm:rounded-lg p-4 sm:p-6 border border-gray-100">
          
          {/* Nama & Dapukan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama</label>
              <input
                type="text"
                value={data.nama}
                onChange={(e) => setData('nama', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2.5 text-sm focus:ring-blue-500 focus:border-blue-500"
                minLength={3}
                maxLength={100}
                required
              />
              {errors.nama && <div className="text-red-500 text-xs mt-1">{errors.nama}</div>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Dapukan</label>
              <input
                type="text"
                value={data.dapukan}
                onChange={(e) => setData('dapukan', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2.5 text-sm focus:ring-blue-500 focus:border-blue-500"
                minLength={2}
                maxLength={100}
                required
              />
              {errors.dapukan && <div className="text-red-500 text-xs mt-1">{errors.dapukan}</div>}
            </div>
          </div>

          {/* Alamat */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Alamat</label>
            <textarea
              value={data.alamat}
              onChange={(e) => setData('alamat', e.target.value)}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2.5 text-sm focus:ring-blue-500 focus:border-blue-500"
              maxLength={300}
            />
            {errors.alamat && <div className="text-red-500 text-xs mt-1">{errors.alamat}</div>}
          </div>

          {/* No Telp & Kategori */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">No. Telp</label>
              <input
                type="number"
                value={data.no_telp}
                onChange={(e) => setData('no_telp', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2.5 text-sm focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.no_telp && <div className="text-red-500 text-xs mt-1">{errors.no_telp}</div>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Kategori</label>
              <input
                type="text"
                value={data.kategori}
                onChange={(e) => setData('kategori', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2.5 text-sm focus:ring-blue-500 focus:border-blue-500"
                maxLength={100}
                required
              />
              {errors.kategori && <div className="text-red-500 text-xs mt-1">{errors.kategori}</div>}
            </div>
          </div>

          {/* Published Toggle Switch & Nama File Foto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Published Status</label>
              <div className="flex items-center">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.published}
                    onChange={(e) => setData('published', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
                <span className="ml-3 text-sm font-medium text-gray-700">
                  {data.published ? 'True' : 'False'}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Nama File Foto</label>
              <input
                type="text"
                value={data.nama_file}
                onChange={(e) => setData('nama_file', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2.5 text-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Upload Foto */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Foto Biodata</label>
            <input
              type="file"
              accept="image/jpg,image/jpeg,image/png"
              onChange={(e) => setData('link_foto', e.target.files ? e.target.files[0] : null)}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <p className="text-xs text-gray-500 mt-1">
              Syarat: JPG/JPEG/PNG, max 2MB, resolusi min 400x600, background polos, wajah jelas, tanpa aksesoris berlebihan, foto terbaru.
            </p>
            {errors.link_foto && <div className="text-red-500 text-xs mt-1">{errors.link_foto}</div>}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
            <BlueButton
              method="put"
              as="button"
              disabled={processing}
              onClick={() => put(route('pengurus_yayasan.update', pengurus.id_pengurus))}            >
              Simpan
            </BlueButton>
            <RedButton href={route('home')}>
              Batal
            </RedButton>
            <RedButton href={route('pengurus_yayasan.delete', pengurus.id_pengurus)}>
              Hapus
            </RedButton>
          </div>

        </div>
      </div>
    </Admin1>
  );
};

export default PengurusYayasanEditForm;