import { FormEvent, useEffect, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import BlueButton from './Parts/BlueButton';

export default function Login() {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const [isVisible, setIsVisible] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    post(route('login'), {
      onFinish: () => reset('password'),
    });
  };

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key.toLowerCase() === 'm') {
        event.preventDefault();
        setIsVisible((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleShortcut);
    return () => {
      window.removeEventListener('keydown', handleShortcut);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <Head title="Login" />
      {/* Overlay blur */}
      <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
        {/* Card */}
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-2xl">
          <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">Login</h1>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                autoComplete="username"
                autoFocus
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                autoComplete="current-password"
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={data.remember}
                onChange={(e) => setData('remember', e.target.checked)}
              />
              Ingat saya
            </label>

            <div className="text-right">
              <Link href={route('password.request')} className="text-sm text-blue-600 hover:underline">
                Lupa password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              Masuk
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Belum punya akun?{' '}
            <Link href={route('register')} className="text-blue-600 hover:underline">
              Daftar
            </Link>
          </p>

          {/* Tombol Cancel */}
          <div className="mt-6 text-center">
            <Link
              href={route('home')}
              className="inline-block rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
