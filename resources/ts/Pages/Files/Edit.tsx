import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import Admin2 from '@/Layouts/Admin2';

interface FileItem {
  ID: number | string;
  'Nama File': string;
  Link: string;
  'Tanggal Upload': string;
}

interface EditFilesProps {
  files: FileItem[];
}

const EditFilesTable: React.FC<EditFilesProps> = ({ files }) => {
  return (
    <Admin2>
      <Head title="Daftar File" />
      <div className="max-w-6xl mx-auto px-2 sm:px-4 py-6">
        <h2 className="text-lg sm:text-2xl font-bold mb-4">Daftar File</h2>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 text-xs sm:text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-2 sm:px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-2 sm:px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                  Nama File
                </th>
                <th className="px-2 sm:px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                  Link
                </th>
                <th className="px-2 sm:px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal Upload
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {files && files.length > 0 ? (
                files.map((file) => (
                  <tr key={file.ID} className="hover:bg-gray-50">
                    <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-gray-500">
                      {file.ID}
                    </td>
                    <td className="px-2 sm:px-6 py-4 whitespace-nowrap font-medium text-blue-600 hover:underline">
                      <Link href={route('files.choose', file.ID)}>
                        {file['Nama File']}
                      </Link>
                    </td>
                    <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-gray-500">
                      {file.Link ? (
                        <a
                          href={file.Link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:underline break-all"
                        >
                          {file.Link}
                        </a>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-gray-500">
                      {file['Tanggal Upload']}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-2 sm:px-6 py-4 text-center text-gray-500"
                  >
                    Tiada data file tersedia.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Admin2>
  );
};

export default EditFilesTable;
