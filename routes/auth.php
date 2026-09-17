<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\TwoFactorLoginController;
use Illuminate\Support\Facades\Mail;
use App\Mail\RecoveryCodesMail;

Route::post('/login', [AuthenticatedSessionController::class, 'store'])
    ->name('login');

Route::post('/register', function (Request $request, CreatesNewUsers $creator) {
    $user = $creator->create($request->all());
    // optional: langsung buat token Sanctum
    $token = $user->createToken($request->device_name ?? 'default');
    return response()->json([
        'token' => $token->plainTextToken,
        'token_type' => 'Bearer',
        'user' => $user,
    ]);
})->name('register');

Route::get('/two-factor-challenge', function () {
    return Inertia::render('Auth/TwoFactorChallenge');
})->name('two-factor.login');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/user/profile', [ProfileController::class, 'show'])->name('profile.show');
    Route::delete('/user', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::post('/two-factor-challenge', [TwoFactorLoginController::class, 'store'])// user harus login dulu
    ->name('two-factor.login');

Route::get('/two-factor-challenge', function () {
    return Inertia::render('Auth/TwoFactorChallenge');
})->name('two-factor.challenge');

Route::post('/two-factor-verification', [TwoFactorLoginController::class, 'verification'])
    ->name('two-factor.verification');
    
Route::post('/email/verification-notification', function (Request $request) {
    if ($request->user()->hasVerifiedEmail()) {
        // Ambil kode pemulihan dari database
        $user = $request->user();
        $recoveryCodes = [];
        if ($user->two_factor_recovery_codes) {
            $recoveryCodes = json_decode(decrypt($user->two_factor_recovery_codes), true);
        }
        // Kirim kode pemulihan ke email user
        if (!empty($recoveryCodes)) {
            Mail::to($user->email)->send(new RecoveryCodesMail($recoveryCodes));
        }
        // diarahkan ke route('home')
        return redirect()->intended(route('home'));
    }
    $request->user()->sendEmailVerificationNotification();
    return back()->with('status', 'verification-link-sent');
})->middleware(['auth', 'throttle:6,1'])->name('verification.send');

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->name('logout');

Route::middleware(['auth'])->group(function () {
    Route::get('/profile', function () {
        return Inertia::render('Profile');
    })->name('profile.show');
});

Route::middleware(['auth', 'verified', 'role:superadmin'])->group(function () {
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::get('/users/{user_id}', [UserController::class, 'show'])->name('users.show');
    Route::put('/users/{user_id}', [UserController::class, 'update'])->name('users.update');
    Route::delete('/users/{user_id}', [UserController::class, 'destroy'])->name('users.destroy');
    Route::post('/users/{user_id}/roles', [UserRoleController::class, 'assignRole'])->name('users.roles.assign');
    Route::delete('/users/{user_id}/roles/{role}', [UserRoleController::class, 'removeRole'])->name('users.roles.remove');
});

