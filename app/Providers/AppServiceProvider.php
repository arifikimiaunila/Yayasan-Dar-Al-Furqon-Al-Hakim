<?php

namespace App\Providers;

use App\Models\PersonalAccessToken;
use Laravel\Sanctum\Sanctum;
use App\Models\User;
use App\Observers\UserObserver;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
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
        if (method_exists(User::class, 'laratrustObserve')) {
            User::laratrustObserve(UserObserver::class);
        } else {
            User::observe(UserObserver::class);
        }

        Sanctum::usePersonalAccessTokenModel(PersonalAccessToken::class);

        RateLimiter::for('sanctum-token', function (Request $request) {
            return Limit::perMinute(10)->by($request->input('email') ?: $request->ip());
        });
    }

}

