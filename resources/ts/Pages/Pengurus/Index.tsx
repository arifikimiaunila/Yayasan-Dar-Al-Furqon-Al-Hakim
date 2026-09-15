import { route } from 'ziggy-js';
import { Link } from '@inertiajs/react';
import App from '../../Layouts/App';

interface Pengurus {
  id_pengurus: number;
  nama: string;
  dapukan: string;
  alamat?: string;
  no_telp?: number;
  kategori: string;
  published: boolean;
  link_foto?: string;
}

interface Props {
  pengurus: Pengurus[];
}

export default function Index({ pengurus }: Props) {
  return (
    <App>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Pengurus Yayasan</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Nama</th>
                <th className="px-4 py-2 border">Dapukan</th>
                <th className="px-4 py-2 border">Alamat</th>
                <th className="px-4 py-2 border">No. Telp</th>
                <th className="px-4 py-2 border">Kategori</th>
              </tr>
            </thead>
            <tbody>
              {pengurus
                .filter((p) => p.published) // hanya tampilkan yang published = true
                .map((p) => (
                  <tr key={p.id_pengurus} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border text-blue-600 font-semibold">
                      <Link
                        href={route('pengurus_yayasan.show', p.id_pengurus)}
                        className="hover:underline"
                      >
                        {p.nama}
                      </Link>
                    </td>
                    <td className="px-4 py-2 border">{p.dapukan}</td>
                    <td className="px-4 py-2 border">{p.alamat}</td>
                    <td className="px-4 py-2 border">{p.no_telp}</td>
                    <td className="px-4 py-2 border">{p.kategori}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </App>
  );
}
