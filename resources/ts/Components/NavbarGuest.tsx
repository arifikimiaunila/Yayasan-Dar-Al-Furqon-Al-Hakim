import { route } from 'ziggy-js';
import React, { useState, useRef, useEffect } from "react";
import Login from '../Pages/Auth/Login';
import Register from '@/Pages/Auth/Register';

interface MenuItem {
  title: string;
  href?: string;
  subItems?: { title: string; href: string }[];
}

const navigationData: MenuItem[] = [
  { title: "Beranda", href: route('home') },
  {
    title: "Yayasan",
    subItems: [
      { title: "Profil", href: route('post.show', { id: 1 }) },
      { title: "Sejarah", href: route('post.show', { id: 2 }) },
      { title: "Visi", href: route('post.show', { id: 3 }) },
      { title: "Misi", href: route('post.show', { id: 4 }) },
      { title: "Struktur Organisasi", href: route('pengurus_yayasan.index') },
    ]
  },
  { title: "SMP AFBS", href: "https://smpafbs.sch.id/" },
  { title: "SMA AFBS", href: "https://smaafbs.sch.id/" },
  {
    title: "Media",
    subItems: [
      { title: "Info", href: route('files.index') },
      { title: "Video", href: route('video.index') },
    ]
  },
  { title: "Kontak", href: route('data_yayasan.show', 1) }
];

export const NavbarGuest: React.FC = () => {
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenuIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white border-b border-gray-200" ref={menuRef}>
      {/* Desktop Navbar */}
      <div className="hidden md:flex justify-between items-center px-4 h-16">
        <ul className="flex space-x-6 items-center">
          {navigationData.map((item, index) => (
            <li key={item.title} className="relative list-none">
              {item.subItems ? (
                <>
                  <button
                    onClick={() =>
                      setActiveMenuIndex(activeMenuIndex === index ? null : index)
                    }
                    className="text-gray-700 hover:text-blue-600"
                  >
                    {item.title}
                  </button>
                  {activeMenuIndex === index && (
                    <ul className="absolute mt-2 bg-white border rounded shadow">
                      {item.subItems.map((sub) => (
                        <li key={sub.title}>
                          <a
                            href={sub.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {sub.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <a
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600"
                >
                  {item.title}
                </a>
              )}
            </li>
          ))}
        </ul>
        <div className="flex items-center space-x-4">
          <Login />
          <Register />
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden px-4 py-2 flex justify-between items-center">
        <span className="font-bold text-gray-700">Menu</span>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-md border border-gray-300"
        >
          ☰
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <ul className="flex flex-col space-y-2 p-4">
            {navigationData.map((item, index) => (
              <li key={item.title} className="list-none">
                {item.subItems ? (
                  <>
                    <button
                      onClick={() =>
                        setActiveMenuIndex(activeMenuIndex === index ? null : index)
                      }
                      className="w-full text-left text-gray-700 hover:text-blue-600"
                    >
                      {item.title}
                    </button>
                    {activeMenuIndex === index && (
                      <ul className="ml-4 mt-1 space-y-1">
                        {item.subItems.map((sub) => (
                          <li key={sub.title}>
                            <a
                              href={sub.href}
                              className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              {sub.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <a
                    href={item.href}
                    className="block text-gray-700 hover:text-blue-600"
                  >
                    {item.title}
                  </a>
                )}
              </li>
            ))}
          </ul>
          <div className="flex flex-col space-y-2 px-4 pb-4">
            <Login />
            <Register />
          </div>
        </div>
      )}
    </nav>
  );
};
