import { useMemo } from 'react';
import { usePage, Head } from '@inertiajs/react';
import Navigasi from './Navigasi';
import Login from './Login'; // 👉 tambahkan import Login

const titleMap: Record<string, string> = {
  'home': 'Beranda - Yayasan',
  'dashboard': 'Dashboard Admin',
  'video.index': 'Daftar Video',
  'video.create': 'Tambah Video',
  'video.edit': 'Edit Video',
  'video.show': 'Detail Video',
  'fles.index': 'Manajemen File',
  'file.show': 'Detail File',
  'pengurus_yayasan.index': 'Daftar Pengurus',
  'pengurus_yayasan.create': 'Tambah Pengurus',
  'post.create': 'Buat Artikel Baru',
  'post.edit': 'Edit Artikel',
  'posts.show': 'Baca Artikel',
  'datayayasan.show': 'Profil Yayasan',
  'datayayasan.create': 'Input Data Yayasan',
};

interface HeaderProps {
  currentRoute?: string;
}

export default function Header({ currentRoute = 'home' }: HeaderProps) {
  const { component } = usePage();
  const routeKey = currentRoute !== 'home' ? currentRoute : component;

  const pageTitle = useMemo(() => {
    if (titleMap[routeKey]) {
      return titleMap[routeKey];
    }
    if (routeKey) {
      return String(routeKey)
        .split(/[./]/)
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    return 'Halaman Yayasan';
  }, [routeKey]);

  return (
    <>
      {/* Inject ke <head> */}
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Left Section: Logo & Title */}
            <div className="flex items-center">
              <img src="/logo.png" alt="Logo Yayasan" className="h-10 w-auto mr-3" />
              <h1 className="text-xl font-bold text-gray-800">
                Yayasan Dar Al Furqon Al Hakim
              </h1>
            </div>

            {/* Right Section: Navigation + Login */}
            <div className="flex items-center space-x-4">
              <Navigasi />
              <Login /> {/* 👉 login form tersembunyi, muncul dengan Ctrl+M */}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
