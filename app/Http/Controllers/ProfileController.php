<?php

namespace App\Http\Controllers;

use App\Mail\RecoveryCodeMail;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
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
     * Simpan user baru.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
            'device_name' => ['nullable', 'string'],
        ]);

        // Buat user baru
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        // Buat token Sanctum
        $token = $user->createToken($validated['device_name'] ?? 'default')->plainTextToken;

        // Buat recovery code (misalnya random string 10 karakter)
        $recoveryCode = strtoupper(str()->random(10));

        // Simpan recovery code ke database
        $user->forceFill([
            'recovery_code' => $recoveryCode,
        ])->save();

        // Kirim recovery code via email
        Mail::to($user->email)->send(new RecoveryCodeMail($recoveryCode));

        // Redirect dengan flash message + token
        return redirect()
            ->route('home')
            ->with('status', 'Registrasi berhasil, token dan recovery code sudah dikirim ke email.')
            ->with('token', $token);
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
     * Hapus user tertentu.
     */
    public function destroy(int $user_id): RedirectResponse
    {
        $user = User::findOrFail($user_id);
        $user->delete();

        return redirect()->route('home')->with('message', 'User berhasil dihapus.');
    }
}
