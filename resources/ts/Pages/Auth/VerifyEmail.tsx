import { Head, Link, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function VerifyEmail() {
    const { post, processing } = useForm({});

    return (
        <>
            <Head title="Verifikasi Email" />

            <h1 className="mb-4 text-center text-2xl font-bold text-gray-800">Verifikasi Email</h1>

            <p className="mb-6 text-sm text-gray-600">
                Sebelum melanjutkan, silakan periksa email Anda untuk tautan verifikasi.
                Jika Anda tidak menerima email, klik tombol di bawah ini untuk mengirim ulang.
            </p>

            <button
                onClick={() => post(route('verification.send'))}
                disabled={processing}
                className="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
                Kirim Ulang Email Verifikasi
            </button>

            <div className="mt-4 text-center">
                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                    Keluar
                </Link>
            </div>
        </>
    );
}
