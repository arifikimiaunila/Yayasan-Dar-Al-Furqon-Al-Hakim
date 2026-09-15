import { route } from 'ziggy-js';
import React, { useState, useRef, useEffect } from "react";

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
      <ul className="flex space-x-6 px-4 h-16 items-center">
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
    </nav>
  );
};
