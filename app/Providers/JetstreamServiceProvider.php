<?php

namespace App\Providers;

use App\Models\User; 
use Illuminate\Support\Facades\Hash;
use Laravel\Fortify\Actions\AttemptToAuthenticate;
use Laravel\Fortify\Actions\CanonicalizeUsername;
use Laravel\Fortify\Actions\EnsureLoginIsNotThrottled;
use Laravel\Fortify\Actions\PrepareAuthenticatedSession;
use Laravel\Fortify\Actions\RedirectIfTwoFactorAuthenticatable;
use Laravel\Fortify\Features;
use Laravel\Fortify\Fortify;
use Illuminate\Http\Request;
use App\Actions\Jetstream\DeleteUser;
use Illuminate\Support\ServiceProvider;
use Laravel\Jetstream\Jetstream;

class JetstreamServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
Fortify::registerView(function () {
 return Inertia::render('Auth/Register');
 });
Fortify::confirmPasswordsUsing(function (User $user, string $password) {
        return Hash::check($password, $user->password);
    });
        Fortify::authenticateUsing(function (Request $request) {
 $user = User::where('email', $request->email)->first(); 
if ($user && Hash::check($request->password, $user->password)) {
 return $user;
 }
 });
Fortify::authenticateThrough(function (Request $request) {
    return array_filter([
            config('fortify.limiters.login') ? null : EnsureLoginIsNotThrottled::class,
            config('fortify.lowercase_usernames') ? CanonicalizeUsername::class : null,
            Features::enabled(Features::twoFactorAuthentication()) ? RedirectIfTwoFactorAuthenticatable::class : null,
            AttemptToAuthenticate::class,
            PrepareAuthenticatedSession::class,
    ]);
});
          $this->configurePermissions();

        Jetstream::deleteUsersUsing(DeleteUser::class);
        }
    });
    }

    /**
     * Configure the permissions that are available within the application.
     */
    protected function configurePermissions(): void
    {
        Jetstream::defaultApiTokenPermissions(['post:edit']);

        Jetstream::permissions([
            'post:edit',
            'data_yayasan:create',
            'data_yayasan:edit',
            'video:create',
            'video:edit',
            'video:delete',
            'file:create',
            'file:edit',
            'file:delete',
            'pengurus_yayasan:create',
            'pengurus _yayasan:edit',
            'pengurus_yayasan:delete',
            'users:edit',
        ]);
    }
}
