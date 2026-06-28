<?php

namespace App\Providers;

use Illuminate\Http\Request;
use Illuminate\Support\ServiceProvider;
use Laravel\Fortify\Fortify;
use Laravel\Jetstream\Jetstream;

class JetstreamServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        Jetstream::inertia()->whenRendering('Profile/Show', function (Request $request, array $data) {
            return $data;
        });

        Fortify::loginView(fn () => view('auth.login'));
    }
}
