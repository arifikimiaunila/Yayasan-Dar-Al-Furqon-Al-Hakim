<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
  ->withMiddleware(function (Middleware $middleware) { 
$middleware->statefulApi();
$middleware->alias(
[ 'role' => \Spatie\Permission\Middleware\RoleMiddleware::class, 'permission' => \Spatie\Permission\Middleware\PermissionMiddleware::class, 'role_or_permission' => \Spatie\Permission\Middleware\RoleOrPermissionMiddleware::class, 
]); 
$middleware->group('web', [ \Illuminate\Cookie\Middleware\EncryptCookies::class, \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,        \Illuminate\Session\Middleware\StartSession::class,        \Illuminate\View\Middleware\ShareErrorsFromSession::class,        \Illuminate\Foundation\Http\Middleware\ValidateCsrfToken::class,        \Illuminate\Routing\Middleware\SubstituteBindings::class, \Illuminate\Session\Middleware\AuthenticateSession::class,
Http\Middleware\TeamsPermission::class
    ]); 
    $middleware->group('api', [
 \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
        // 'throttle:api',
     \Illuminate\Routing\Middleware\SubstituteBindings::class,
    ]);
$middleware->web(append: [
        HandleInertiaRequests::class,
    ]);
})
    ->withExceptions(function (Exceptions $exceptions) {
     //
})->create();
