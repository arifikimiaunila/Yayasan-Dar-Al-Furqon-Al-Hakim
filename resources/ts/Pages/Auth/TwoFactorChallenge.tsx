import { FormEvent } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function TwoFactorChallenge() {
    const { data, setData, post, processing, errors } = useForm({
        code: '',
        recovery_code: '',
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post(route('two-factor.login'));
    };

    return (
        <>
            <Head title="Verifikasi Dua Langkah" />

            <h1 className="mb-4 text-center text-2xl font-bold text-gray-800">Verifikasi Dua Langkah</h1>

            <p className="mb-6 text-sm text-gray-600">
                Masukkan kode autentikasi dari aplikasi autentikator Anda, atau gunakan kode pemulihan.
            </p>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                        Kode Autentikasi
                    </label>
                    <input
                        id="code"
                        type="text"
                        inputMode="numeric"
                        value={data.code}
                        onChange={(e) => setData('code', e.target.value)}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                        autoComplete="one-time-code"
                        autoFocus
                    />
                    {errors.code && <p className="mt-1 text-sm text-red-600">{errors.code}</p>}
                </div>

                <div>
                    <label htmlFor="recovery_code" className="block text-sm font-medium text-gray-700">
                        Kode Pemulihan
                    </label>
                    <input
                        id="recovery_code"
                        type="text"
                        value={data.recovery_code}
                        onChange={(e) => setData('recovery_code', e.target.value)}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                    />
                    {errors.recovery_code && (
                        <p className="mt-1 text-sm text-red-600">{errors.recovery_code}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                >
                    Verifikasi
                </button>
            </form>
        </>
    );
}
