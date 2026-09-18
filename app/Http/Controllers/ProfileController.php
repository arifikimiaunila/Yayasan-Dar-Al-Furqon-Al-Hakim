<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Show profile dari satu user tertentu.
     */
    public function show(int $user_id): Response
    {
        $user = User::findOrFail($user_id);

        return Inertia::render('Profile/Show', [
            'user' => $user,
            'twoFactorAuth' => $this->twoFactorAuthData($user),
        ]);
    }

    /**
     * Form create user baru.
     */
    public function create(): Response
    {
        return Inertia::render('Profile/Create');
    }

    /**
     * Simpan user baru.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        return redirect()->route('home')->with('message', 'User berhasil dibuat.');
    }

    /**
     * Form edit user tertentu.
     */
    public function edit(int $user_id): Response
    {
        $user = User::findOrFail($user_id);

        return Inertia::render('Profile/Edit', [
            'user' => $user,
        ]);
    }

    /**
     * Update data user tertentu.
     */
    public function update(Request $request, int $user_id): RedirectResponse
    {
        $user = User::findOrFail($user_id);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'unique:users,email,'.$user->id],
            'password' => ['nullable', 'string', 'min:8'],
        ]);

        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password']
                ? Hash::make($validated['password'])
                : $user->password,
        ]);

        return redirect()->route('home')->with('message', 'User berhasil diupdate.');
    }

    /**
     * Two-factor auth helper.
     */
    private function twoFactorAuthData(User $user): array
    {
        $enabled = ! is_null($user->two_factor_secret);
        $confirmed = ! is_null($user->two_factor_confirmed_at);

        $qrCode = null;
        $recoveryCodes = [];

        if ($enabled && ! $confirmed) {
            $qrCode = $user->twoFactorQrCodeSvg();

            if ($user->two_factor_recovery_codes) {
                $recoveryCodes = json_decode(decrypt($user->two_factor_recovery_codes), true);
            }
        }

        return [
            'enabled' => $enabled,
            'confirmed' => $confirmed,
            'qr_code' => $qrCode,
            'recovery_codes' => $recoveryCodes,
        ];
    }
    /**
 * Tampilkan daftar semua user.
 */
public function index(): Response
{
    $users = User::paginate(10); // bisa juga pakai all() atau simplePaginate()

    return Inertia::render('Profile/Index', [
        'users' => $users,
    ]);
}

/**
 * Hapus user tertentu.
 */
public function destroy(int $user_id): RedirectResponse
{
    $user = User::findOrFail($user_id);
    $user->delete();

    return redirect()->route('home')->with('message', 'User berhasil dihapus.');
}
}
