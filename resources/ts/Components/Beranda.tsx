import { useMemo } from 'react';

export default function Beranda() {
  const islamicGreeting = "Assalamu'alaikum Warahmatullahi Wabarakatuh";

  const timeGreeting = useMemo(() => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 11) {
      return 'Selamat Pagi';
    } else if (hour >= 11 && hour < 15) {
      return 'Selamat Siang';
    } else if (hour >= 15 && hour < 18) {
      return 'Selamat Sore';
    } else {
      return 'Selamat Malam';
    }
  }, []);

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        {/* Greeting Card */}
        <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg p-8 text-center border-b-4 border-blue-600">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            {islamicGreeting}
          </h1>
          <p className="text-xl text-blue-600 font-medium">
            {timeGreeting}, Selamat Datang di Sistem Informasi
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mt-2">
            Yayasan Dar Al Furqon Al Hakim
          </h2>

          <div className="mt-8 flex justify-center">
            <div className="h-1 w-24 bg-gray-200 rounded"></div>
          </div>

          <p className="mt-6 text-gray-500 max-w-2xl mx-auto leading-relaxed">
            "Membina generasi qur'ani yang berakhlak mulia, berilmu luas, dan
            bermanfaat bagi sesama."
          </p>
        </div>

        {/* Quick Stats or Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* Add dashboard content or quick links here */}
        </div>
      </div>
    </div>
  );
}
