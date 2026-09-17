<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use App\Http\Middleware\CheckRoleOrPermission;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;
use App\Mail\TwoFactorCodeMail;

class TwoFactorLoginController extends Controller
{
public function store(): RedirectResponse
{
    $user = Auth::user(); // user sudah login dari proses sebelumnya

    // Generate kode OTP (autentikasi sekali pakai)
    $code = rand(100000, 999999);

    $user->forceFill([
        'two_factor_code' => $code,
        'two_factor_expires_at' => now()->addMinutes(10),
    ])->save();

    // Kirim OTP ke email user
    Mail::to($user->email)->send(new TwoFactorCodeMail($code));

    // Redirect ke halaman challenge (React/Inertia)
    return redirect()->route('two-factor.challenge');
}



public function verification(Request $request)
{
    $request->validate([
        'code' => 'nullable|string',
        'recovery_code' => 'nullable|string',
    ]);

    $user = Auth::user();

    // Jika ada kode autentikasi
    if ($request->filled('code')) {
        if (! $user->verifyTwoFactorCode($request->code)) {
            throw ValidationException::withMessages([
                'code' => ['Kode autentikasi salah.'],
            ]);
        }
    }

    // Jika ada kode pemulihan
    if ($request->filled('recovery_code')) {
        if (! $user->verifyRecoveryCode($request->recovery_code)) {
            throw ValidationException::withMessages([
                'recovery_code' => ['Kode pemulihan salah.'],
            ]);
        }
    }

    // Jika tidak ada kode sama sekali
    if (! $request->filled('code') && ! $request->filled('recovery_code')) {
        throw ValidationException::withMessages([
            'code' => ['Harap masukkan kode autentikasi atau kode pemulihan.'],
        ]);
    }

    // ✅ Jika verifikasi berhasil, cek role user
    $middleware = new CheckRoleOrPermission();
    $role = $middleware->handleRole($user); 
    // Asumsikan kamu menambahkan fungsi handleRole($user) di middleware untuk mengembalikan role string

    switch ($role) {
        case 'admin1':
            return redirect()->intended(route('post.create'));
        case 'admin2':
            return redirect()->intended(route('video.create'));
        case 'superadmin':
            return redirect()->intended(route('data_yayasan.create'));
        default:
            return redirect()->intended(route('home'));
    }
}
}
