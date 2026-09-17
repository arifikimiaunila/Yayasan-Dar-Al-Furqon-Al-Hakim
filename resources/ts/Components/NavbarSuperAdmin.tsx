import { route } from 'ziggy-js';
import React, { useState, useRef, useEffect } from "react";

interface MenuItem {
  title: string;
  href?: string;
  subItems?: { title: string; href: string }[];
}

const navigationData: MenuItem[] = [
  { title: "Buat Pengurus Yayasan", href: route('pengurus_yayasan.create') },
  { title: "Edit Pengurus Yayasan", href: route('pengurus_yayasan.edit') },
  { title: "Buat Post", href: route('post.create') },
  { title: "Edit Post", href: route('post.edit') },
  { title: "Buat Video", href: route('video.create') },
  { title: "Edit Video", href: route('video.edit') },
  { title: "Buat File", href: route('file.create') },
  { title: "Edit File", href: route('file.edit') },
  { title: "Buat Data Yayasan", href: route('data_yayasan.create') },
  { title: "Edit Data Yayasan", href: route('data_yayasan.edit') },
  { title: "Edit Admin", href: route('users.index') }
];

export const NavbarSuperAdmin: React.FC = () => {
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
