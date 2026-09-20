<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\TwoFactorLoginController;
use App\Http\Controllers\TeamInvitationController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserRoleController;
use App\Mail\RecoveryCodesMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::post('/login', [AuthenticatedSessionController::class, 'store'])
    ->name('login');

Route::post('/register', [ProfileController::class, 'store'])->name('register');

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

Route::middleware(['auth', 'password.confirm', 'verified', 'role:admin1|admin2|superadmin'])->group(function () {
Route::get('/profile/{user_id}', [ProfileController::class, 'show'])
    ->name('profile.show');
Route::put('/user/{user_id}/profile-information', [ProfileController::class, 'update'])
    ->name('profile.update');
Route::delete('/profile/{user_id}', [ProfileController::class, 'destroy'])
    ->name('profile.delete');
// Menerima undangan
Route::get('/team-invitations/{invitationId}/accept', [TeamInvitationController::class, 'accept'])
    ->name('team-invitations.accept');

// Menolak undangan
Route::get('/team-invitations/{invitationId}/reject', [TeamInvitationController::class, 'reject'])
    ->name('team-invitations.reject');
});

Route::middleware(['auth', 'verified', 'role:superadmin'])->group(function () {
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::get('/users/{user_id}', [UserController::class, 'show'])->name('users.show');
    Route::put('/users/{user_id}', [UserController::class, 'update'])->name('users.update');
    Route::delete('/users/{user_id}', [UserController::class, 'destroy'])->name('users.delete');
    Route::post('/users/{user_id}/roles', [UserRoleController::class, 'assignRole'])->name('users.roles.assign');
    Route::delete('/users/{user_id}/roles/{role}', [UserRoleController::class, 'removeRole'])->name('users.roles.remove');
    Route::post('/team-invitations', [TeamInvitationController::class, 'store'])
    ->name('team-invitations.store');
});

