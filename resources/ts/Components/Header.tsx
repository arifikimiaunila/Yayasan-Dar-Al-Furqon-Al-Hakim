import { useMemo } from 'react';
import Navigasi from './Navigasi';

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
  const pageTitle = useMemo(() => {
    if (titleMap[currentRoute]) {
      return titleMap[currentRoute];
    }
    
    // Fallback: Auto-format like 'video.index' -> 'Video Index'
    if (currentRoute) {
      return currentRoute
        .split('.')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    
    return 'Halaman Yayasan';
  }, [currentRoute]);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left Section: Logo & Title */}
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="Logo Yayasan"
              className="h-10 w-auto mr-3"
            />
            <h1 className="text-xl font-bold text-gray-800">
              Yayasan Dar Al Furqon Al Hakim
            </h1>
          </div>

          {/* Right Section: Navigation */}
          <Navigasi />
        </div>
      </div>

      {/* Page Title Bar (Optional) */}
      <div className="hidden md:block bg-gray-50 border-t py-2 px-4">
        <div className="max-w-7xl mx-auto text-sm text-gray-600">
          <title>{pageTitle}</title>
          {pageTitle}
        </div>
      </div>
    </header>
  );
}
