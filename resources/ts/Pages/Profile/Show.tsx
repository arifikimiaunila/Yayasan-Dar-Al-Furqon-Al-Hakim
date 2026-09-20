import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import SuperAdmin from '@/Layouts/SuperAdmin';
import { route } from 'ziggy-js';

interface User {
  user_id: number;
  name: string;
  email: string;
}

interface PageProps {
  [key: string]: any;
  users: User[];
}

const Index: React.FC = () => {
  const { props } = usePage<PageProps>();
  const users = props.users;

  return (
    <SuperAdmin>
      <Head title="Daftar Admin" />
      <div className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-2xl font-bold mb-2">Daftar User</h2>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full border border-gray-300 rounded-lg text-xs sm:text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-2 sm:px-4 py-2 border">User ID</th>
                <th className="px-2 sm:px-4 py-2 border">Nama</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.user_id} className="hover:bg-gray-50">
                  <td className="px-2 sm:px-4 py-2 border text-center">
                    {user.user_id}
                  </td>
                  <td className="px-2 sm:px-4 py-2 border">
                    <Link
                      href={route('users.show', user.user_id)}
                      className="text-blue-600 hover:underline break-words"
                    >
                      {user.name}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SuperAdmin>
  );
};

export default Index;
