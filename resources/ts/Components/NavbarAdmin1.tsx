import { route } from 'ziggy-js';
import React, { useState, useRef, useEffect } from "react";

interface MenuItem {
  title: string;
  href?: string;
  subItems?: { title: string; href: string }[];
}

const userId = (window as any)?.Laravel?.user?.id ?? 0;

const navigationData: MenuItem[] = [
  { title: "Buat Pengurus Yayasan", href: route('pengurus_yayasan.create') },
  { title: "Edit Pengurus Yayasan", href: route('pengurus_yayasan.edit') },
  { title: "Buat Post", href: route('post.create') },
  { title: "Edit Post", href: route('post.edit') },
  { title: "Edit Profil", href: route('profile.show', userId) }
];

export const NavbarAdmin1: React.FC = () => {
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
      <div className="hidden md:flex">
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
        </div>
      )}
    </nav>
  );
};
