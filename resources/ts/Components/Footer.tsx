import { useMemo } from 'react';

export default function Footer() {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Left Section: Branding & Description */}
          <div className="space-y-6 xl:col-span-1">
            <div className="flex items-center">
              <img
                src="/logo.png"
                alt="Logo"
                className="h-10 w-auto mr-3 brightness-110"
              />
              <span className="text-white text-lg font-bold tracking-wider">
                Dar Al Furqon Al Hakim
              </span>
            </div>
            <p className="text-sm leading-6 text-gray-400">
              Membina generasi qur'ani yang berakhlak mulia, berilmu luas, dan
              bermanfaat bagi sesama berdasarkan nilai-nilai Al-Qur'an dan
              As-Sunnah.
            </p>
            <div className="flex space-x-6">
              {/* Social Links */}
              <a
                href="#"
                className="hover:text-white transition-colors text-sm"
              >
                Facebook
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors text-sm"
              >
                Instagram
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors text-sm"
              >
                YouTube
              </a>
            </div>
          </div>

          {/* Center & Right Section: Navigation & Contact */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {/* Yayasan Links */}
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase border-b border-slate-700 pb-2">
                  Yayasan
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a
                      href="/"
                      className="text-sm hover:text-white transition-colors"
                    >
                      Beranda
                    </a>
                  </li>
                  <li>
                    <a
                      href="/pengurus"
                      className="text-sm hover:text-white transition-colors"
                    >
                      Daftar Pengurus
                    </a>
                  </li>
                  <li>
                    <a
                      href="/yayasan/profil"
                      className="text-sm hover:text-white transition-colors"
                    >
                      Profil Singkat
                    </a>
                  </li>
                </ul>
              </div>

              {/* Content Links */}
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase border-b border-slate-700 pb-2">
                  Konten
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a
                      href="/video"
                      className="text-sm hover:text-white transition-colors"
                    >
                      Galeri Video
                    </a>
                  </li>
                  <li>
                    <a
                      href="/files"
                      className="text-sm hover:text-white transition-colors"
                    >
                      Unduh Dokumen
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Section */}
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase border-b border-slate-700 pb-2">
                Kontak
              </h3>
              <ul className="mt-4 space-y-4">
                <li className="text-sm text-gray-400">
                  Tangerang, Banten, Indonesia
                </li>
                <li className="text-sm text-gray-400 italic">
                  Email: info@daralfurqonalhakim.or.id
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="mt-12 border-t border-slate-800 pt-8 text-center md:text-left">
          <p className="text-xs text-gray-500">
            &copy; {currentYear} Yayasan Dar Al Furqon Al Hakim. Seluruh Hak
            Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
