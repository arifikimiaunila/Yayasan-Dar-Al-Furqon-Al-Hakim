import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import App2 from '@/Layouts/App2';

export default function ForgotPassword() {
    const { status } = usePage<{ status?: string }>().props;
    const { data, setData, post, processing, errors } = useForm({ email: '' });

    const submit = (e: React.SubmitEvent) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <>
        <App2>
            <Head title="Lupa Password" />

            <h2 className="text-2xl font-bold mb-2">Lupa Password</h2>
            <p className="mb-6 text-center text-sm text-gray-600">
                Masukkan email Anda dan kami akan mengirim link untuk mereset password.
            </p>

            {status && <p className="mb-4 text-sm text-green-600">{status}</p>}

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

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                >
                    Kirim Link Reset
                </button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
                <Link href={route('home')} className="text-blue-600 hover:underline">
                    Kembali ke halaman pembuka.
                </Link>
            </p>
            </App2>
        </>
    );
}