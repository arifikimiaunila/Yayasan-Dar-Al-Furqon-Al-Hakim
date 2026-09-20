import { Head, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import BlueButton from '@/Components/Parts/BlueButton';
import App2 from '@/Layouts/App2';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({ password: '' });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
        <App2>
            <Head title="Konfirmasi Password" />

            <h2 className="text-2xl font-bold mb-2">Konfirmasi Password</h2>

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

                 <BlueButton
                    as="button"
                    disabled={processing}
                >
                    Konfirmasi
                </BlueButton>
            </form>
            </App2>
        </>
    );
}