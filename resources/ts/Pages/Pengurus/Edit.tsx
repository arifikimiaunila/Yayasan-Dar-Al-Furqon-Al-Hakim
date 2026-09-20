import React from 'react';
import { route } from 'ziggy-js';
import { Head } from '@inertiajs/react';
import Admin1 from '@/Layouts/Admin1';

interface Pengurus {
  id_pengurus: number;
  nama: string;
}

interface Props {
  pengurus: Pengurus[];
}

const PengurusTable: React.FC<Props> = ({ pengurus }) => {
  return (
    <Admin1>
      <Head title="Daftar Pengurus Yayasan" />
      <div className="max-w-6xl mx-auto px-2 sm:px-4 py-6">
        <h2 className="text-lg sm:text-2xl font-bold mb-4">Daftar Pengurus Yayasan</h2>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full border border-gray-300 rounded-lg text-xs sm:text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-2 sm:px-4 py-2 border-b text-left">ID Pengurus</th>
                <th className="px-2 sm:px-4 py-2 border-b text-left">Nama</th>
              </tr>
            </thead>
            <tbody>
              {pengurus.length > 0 ? (
                pengurus.map((p) => (
                  <tr key={p.id_pengurus} className="hover:bg-gray-50">
                    <td className="px-2 sm:px-4 py-2 border-b">{p.id_pengurus}</td>
                    <td className="px-2 sm:px-4 py-2 border-b">
                      <a
                        href={route('pengurus_yayasan.choose', p.id_pengurus)}
                        className="text-blue-600 hover:underline break-words"
                      >
                        {p.nama}
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={2}
                    className="px-2 sm:px-4 py-4 text-center text-gray-500"
                  >
                    Tidak ada data pengurus tersedia.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Admin1>
  );
};

export default PengurusTable;
