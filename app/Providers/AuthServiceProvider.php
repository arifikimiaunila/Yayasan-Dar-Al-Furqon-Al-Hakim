<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Illuminate\Auth\Notifications\ResetPassword;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
Gate::before(function ($user, $ability) {
            return $user->hasRole('Super Admin') ? true : null;
        });
       Gate::before(function ($user, $ability) {
        return $user->hasTokenPermission($ability) ?: null;
    });
ResetPassword::createUrlUsing(function ($user, string $token) {
        return env('SPA_URL') . '/reset-password?token=' . $token;
    });
    }
}