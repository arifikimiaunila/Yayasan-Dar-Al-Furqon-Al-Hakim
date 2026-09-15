import { FormEvent } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';

interface TwoFactorAuthProps {
    enabled: boolean;
    confirmed: boolean;
    qr_code: string | null;
    recovery_codes: string[];
}

interface PageProps {
    auth?: { user?: { name?: string; email?: string } | null };
    twoFactorAuth?: TwoFactorAuthProps;
}

export default function Profile() {
    const { auth, twoFactorAuth } = usePage<PageProps>().props;
    const user = auth?.user;
    const twoFactor = twoFactorAuth ?? {
        enabled: false,
        confirmed: false,
        qr_code: null,
        recovery_codes: [] as string[],
    };

    const profileForm = useForm({
        name: user?.name ?? '',
        email: user?.email ?? '',
    });

    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const twoFactorForm = useForm({ code: '' });
    const disableForm = useForm({ password: '' });
    const deleteForm = useForm({ password: '' });

    const updateProfile = (e: FormEvent) => {
        e.preventDefault();
        profileForm.put(route('user-profile-information.update'), {
            onSuccess: () => profileForm.clearErrors(),
        });
    };

    const updatePassword = (e: FormEvent) => {
        e.preventDefault();
        passwordForm.put(route('user-password.update'), {
            onSuccess: () => passwordForm.reset(),
        });
    };

    const enableTwoFactor = () => {
        twoFactorForm.post(route('two-factor.enable'));
    };

    const confirmTwoFactor = (e: FormEvent) => {
        e.preventDefault();
        twoFactorForm.post(route('two-factor.confirm'));
    };

    const disableTwoFactor = (e: FormEvent) => {
        e.preventDefault();
        disableForm.delete(route('two-factor.disable'), {
            onSuccess: () => disableForm.reset(),
        });
    };

    const deleteAccount = (e: FormEvent) => {
        e.preventDefault();
        deleteForm.delete(route('profile.destroy'));
    };

    return (
        <>
            <Head title="Profil" />

            <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
                <h1 className="text-2xl font-bold text-gray-800">Profil</h1>

                {/* Update Profile Information */}
                <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-lg font-semibold text-gray-800">Informasi Profil</h2>
                    <form onSubmit={updateProfile} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Nama
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={profileForm.data.name}
                                onChange={(e) => profileForm.setData('name', e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                            />
                            {profileForm.errors.name && (
                                <p className="mt-1 text-sm text-red-600">{profileForm.errors.name}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={profileForm.data.email}
                                onChange={(e) => profileForm.setData('email', e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                            />
                            {profileForm.errors.email && (
                                <p className="mt-1 text-sm text-red-600">{profileForm.errors.email}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={profileForm.processing}
                            className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            Simpan
                        </button>
                    </form>
                </section>

                {/* Update Password */}
                <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-lg font-semibold text-gray-800">Ubah Password</h2>
                    <form onSubmit={updatePassword} className="space-y-4">
                        <div>
                            <label htmlFor="current_password" className="block text-sm font-medium text-gray-700">
                                Password Saat Ini
                            </label>
                            <input
                                id="current_password"
                                type="password"
                                value={passwordForm.data.current_password}
                                onChange={(e) => passwordForm.setData('current_password', e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                                autoComplete="current-password"
                            />
                            {passwordForm.errors.current_password && (
                                <p className="mt-1 text-sm text-red-600">{passwordForm.errors.current_password}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password Baru
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={passwordForm.data.password}
                                onChange={(e) => passwordForm.setData('password', e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                                autoComplete="new-password"
                            />
                            {passwordForm.errors.password && (
                                <p className="mt-1 text-sm text-red-600">{passwordForm.errors.password}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                                Konfirmasi Password
                            </label>
                            <input
                                id="password_confirmation"
                                type="password"
                                value={passwordForm.data.password_confirmation}
                                onChange={(e) => passwordForm.setData('password_confirmation', e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                                autoComplete="new-password"
                            />
                            {passwordForm.errors.password_confirmation && (
                                <p className="mt-1 text-sm text-red-600">
                                    {passwordForm.errors.password_confirmation}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={passwordForm.processing}
                            className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            Simpan
                        </button>
                    </form>
                </section>

                {/* Two-Factor Authentication */}
                <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-lg font-semibold text-gray-800">Verifikasi Dua Langkah</h2>

                    {!twoFactor.enabled && (
                        <div>
                            <p className="mb-4 text-sm text-gray-600">
                                Tambahkan keamanan ekstra pada akun Anda dengan verifikasi dua langkah.
                            </p>
                            <button
                                onClick={enableTwoFactor}
                                disabled={twoFactorForm.processing}
                                className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                            >
                                Aktifkan
                            </button>
                        </div>
                    )}

                    {twoFactor.enabled && !twoFactor.confirmed && (
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Pindai kode QR berikut menggunakan aplikasi autentikator (mis. Google Authenticator),
                                lalu masukkan kode untuk mengonfirmasi.
                            </p>

                            {twoFactor.qr_code && (
                                <div
                                    className="inline-block rounded-md border border-gray-200 p-2 bg-white"
                                    dangerouslySetInnerHTML={{ __html: twoFactor.qr_code }}
                                />
                            )}

                            {twoFactor.recovery_codes.length > 0 && (
                                <div>
                                    <p className="mb-2 text-sm font-medium text-gray-700">Kode Pemulihan:</p>
                                    <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                                        {twoFactor.recovery_codes.map((code) => (
                                            <li
                                                key={code}
                                                className="rounded bg-gray-100 px-3 py-1 font-mono text-xs text-gray-700"
                                            >
                                                {code}
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="mt-2 text-xs text-gray-500">
                                        Simpan kode pemulihan ini di tempat yang aman.
                                    </p>
                                </div>
                            )}

                            <form onSubmit={confirmTwoFactor} className="space-y-4">
                                <div>
                                    <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                                        Kode Autentikasi
                                    </label>
                                    <input
                                        id="code"
                                        type="text"
                                        inputMode="numeric"
                                        value={twoFactorForm.data.code}
                                        onChange={(e) => twoFactorForm.setData('code', e.target.value)}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                                        autoFocus
                                    />
                                    {twoFactorForm.errors.code && (
                                        <p className="mt-1 text-sm text-red-600">{twoFactorForm.errors.code}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={twoFactorForm.processing}
                                    className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                                >
                                    Konfirmasi
                                </button>
                            </form>
                        </div>
                    )}

                    {twoFactor.enabled && twoFactor.confirmed && (
                        <div className="space-y-4">
                            <p className="text-sm text-green-600">
                                Verifikasi dua langkah aktif pada akun Anda.
                            </p>

                            <form onSubmit={disableTwoFactor} className="space-y-4">
                                <div>
                                    <label htmlFor="disable_password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <input
                                        id="disable_password"
                                        type="password"
                                        value={disableForm.data.password}
                                        onChange={(e) => disableForm.setData('password', e.target.value)}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                                    />
                                    {disableForm.errors.password && (
                                        <p className="mt-1 text-sm text-red-600">{disableForm.errors.password}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={disableForm.processing}
                                    className="rounded-md bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                                >
                                    Nonaktifkan
                                </button>
                            </form>
                        </div>
                    )}
                </section>

                {/* Delete Account */}
                <section className="rounded-xl border border-red-200 bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-lg font-semibold text-red-600">Hapus Akun</h2>
                    <p className="mb-4 text-sm text-gray-600">
                        Setelah akun dihapus, semua data akun akan hilang secara permanen.
                    </p>

                    <form onSubmit={deleteAccount} className="space-y-4">
                        <div>
                            <label htmlFor="delete_password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="delete_password"
                                type="password"
                                value={deleteForm.data.password}
                                onChange={(e) => deleteForm.setData('password', e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:outline-none"
                            />
                            {deleteForm.errors.password && (
                                <p className="mt-1 text-sm text-red-600">{deleteForm.errors.password}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={deleteForm.processing}
                            className="rounded-md bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                        >
                            Hapus Akun
                        </button>
                    </form>
                </section>
            </div>
        </>
    );
}
