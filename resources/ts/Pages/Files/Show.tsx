import React from 'react';
import App from '../../Layouts/App';

interface FileData {
  file_id: number;
  nama_file: string;
  deskripsi: string;
  nama_pembuat: string;
  created_at: string;
  updated_at: string;
}

interface Props {
  files: FileData[];
}

const FilesList: React.FC<Props> = ({ files }) => {
  return (
    <App>
      <div className="max-w-2xl mx-auto p-6">
        <ul className="space-y-4">
          {files.map((file) => (
            <li
              key={file.file_id}
              className="flex items-center justify-between border p-3 rounded shadow-sm"
            >
              {/* Hanya menampilkan file_id */}
              <span className="font-semibold text-gray-800">
                File ID: {file.file_id}
              </span>

              {/* Tombol Download */}
              <a
                href={`/files/download/${file.file_id}`}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Download
              </a>
            </li>
          ))}
        </ul>
      </div>
    </App>
  );
};

export default FilesList;
