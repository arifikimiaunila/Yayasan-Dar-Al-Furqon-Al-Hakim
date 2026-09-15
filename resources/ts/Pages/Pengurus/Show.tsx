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

export default function ShowPengurus({ pengurus }: Props) {
  return (
    <App>
      <h2 className="text-2xl font-bold mb-6">Data Pengurus</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">Nama</th>
              <th className="px-4 py-2">Dapukan</th>
              <th className="px-4 py-2">Alamat</th>
              <th className="px-4 py-2">No. Telp</th>
              <th className="px-4 py-2">Kategori</th>
              <th className="px-4 py-2">Foto</th>
            </tr>
          </thead>
          <tbody>
            {pengurus
              .filter((p) => p.published) // hanya tampilkan yang published = true
              .map((p) => (
                <tr key={p.id_pengurus} className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-semibold text-gray-800">{p.nama}</td>
                  <td className="px-4 py-2">{p.dapukan}</td>
                  <td className="px-4 py-2">{p.alamat}</td>
                  <td className="px-4 py-2">{p.no_telp}</td>
                  <td className="px-4 py-2">{p.kategori}</td>
                  <td className="px-4 py-2">
                    {p.link_foto && (
                      <div className="bg-white shadow-md rounded-lg w-48 transition-transform transform hover:scale-105">
                        <img
                          src={`/storage/${p.link_foto}`}
                          alt={p.nama}
                          className="w-full h-32 object-cover rounded-t-lg"
                        />
                        <div className="p-3">
                          <h4 className="font-bold text-gray-900">{p.nama}</h4>
                          <p className="text-sm text-gray-600">{p.dapukan}</p>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </App>
  );
}
