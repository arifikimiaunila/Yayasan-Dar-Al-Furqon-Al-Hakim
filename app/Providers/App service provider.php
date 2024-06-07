<?php

namespace App\Providers;

use Illuminate\Support\Facades\Schedule;
use App\Models\PersonalAccessToken;
use Laravel\Sanctum\Sanctum;
use App\Models\User;
use App\Models\posts;
use Illuminate\Support\Facades\Route;
use App\Observers\UserObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        if ($this->app->environment('local')) {
 $this->app->register(\Laravel\Telescope\TelescopeServiceProvider::class); 
$this->app->register(TelescopeServiceProvider::class);
$this->app->register(FortifyServiceProvider::class);
    }
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
User::laratrustObserve(UserObserver::class);
Sanctum::usePersonalAccessTokenModel(PersonalAccessToken::class);
Schedule::command('telescope:prune --hours=48')->daily();
    }


        
    }

