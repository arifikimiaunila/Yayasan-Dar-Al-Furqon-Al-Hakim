import { FormEvent } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({ password: '' });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Konfirmasi Password" />

            <h1 className="mb-4 text-center text-2xl font-bold text-gray-800">Konfirmasi Password</h1>

            <p className="mb-6 text-sm text-gray-600">
                Ini adalah area aman aplikasi. Harap konfirmasi password Anda sebelum melanjutkan.
            </p>

            <form onSubmit={submit} className="space-y-4">
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
                        autoFocus
                    />
                    {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                >
                    Konfirmasi
                </button>
            </form>
        </>
    );
}
