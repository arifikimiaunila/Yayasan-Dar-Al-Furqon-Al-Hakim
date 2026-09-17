<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Actions\Fortify\PasswordValidationRules;

class AuthenticatedSessionController extends Controller
{
    use PasswordValidationRules;
    /**
     * Proses login user.
     */
    public function store(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'email'    => ['required', 'string', 'email'],
            'password' => $this->passwordRules(), // gunakan trait Fortify
        ]);

        $user = User::where('email', $credentials['email'])->first();

        // Jika kredensial salah → arahkan ke home
        if (! $user || ! Hash::check($credentials['password'], $user->password)) {
            return redirect()->route('home')
                ->withErrors(['email' => 'Email atau password salah.']);
        }

        // Login user dengan session
        Auth::login($user, $request->boolean('remember'));
        $request->session()->regenerate();

        // Jika user punya 2FA aktif → arahkan ke TwoFactorChallenge
        if (! empty($user->two_factor_secret)) {
            return redirect()->route('two-factor.login');
        }

        // Jika tidak ada 2FA → langsung ke dashboard
        return redirect()->intended(route('home'));
    }


    /**
     * Logout user.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // Redirect ke dashboard (Inertia render Dashboard.tsx)
        return redirect()->route('home');
    }
}
