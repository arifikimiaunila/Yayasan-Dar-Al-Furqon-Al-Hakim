import App2 from '@/Layouts/App2';
import { Head, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import RedButton from '@/Components/Parts/RedButton';
import BlueButton from '@/Components/Parts/BlueButton';

export default function VerifyEmail() {
    const { processing } = useForm({});

    return (
        <>
            <App2>
            <Head><title>Verifikasi Email</title></Head>
            <h2 className="text-2xl font-bold mb-2">Verifikasi Email</h2>
            <p className="mb-6 text-sm text-gray-600">
                Sebelum melanjutkan, silakan periksa email Anda untuk tautan verifikasi.
                Jika Anda tidak menerima email, klik tombol di bawah ini untuk mengirim ulang.
            </p>

            <BlueButton href={route('verification.send')} method="post" as="button" disabled={processing}>
            Kirim Ulang Email Verifikasi
            </BlueButton>

            <div className="mt-4 text-center">
                <RedButton href={route('logout')}>
                    Keluar
                </RedButton>
            </div>
            </App2>
        </>
    );
}
