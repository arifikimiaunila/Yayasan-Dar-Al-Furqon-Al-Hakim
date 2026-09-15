import { useMemo } from 'react';

export default function Footer() {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
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
