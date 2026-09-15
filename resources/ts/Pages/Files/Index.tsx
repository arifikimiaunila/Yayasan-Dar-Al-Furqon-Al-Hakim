import React from 'react';
import App from '../../Layouts/App';

interface FileData {
  file_id: number;
  nama_file: string;
  deskripsi: string;
  nama_pembuat: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

interface Props {
  files: FileData[];
}

const FilesTable: React.FC<Props> = ({ files }) => {
  const publishedFiles = files.filter((file) => file.published);

  return (
    <App>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse">
          <tbody>
            {publishedFiles.map((file) => (
              <tr key={file.file_id} className="border-b">
                <td className="p-2">
                  {/* Link ke route files.show */}
                  <a
                    href={`/files/show/${file.file_id}`}
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    {file.nama_file}
                  </a>
                  <div className="text-sm text-gray-700 mt-1">
                    {file.deskripsi}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Dibuat oleh: {file.nama_pembuat}
                  </div>
                  <div className="text-xs text-gray-400">
                    Created at: {file.created_at}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </App>
  );
};

export default FilesTable;
