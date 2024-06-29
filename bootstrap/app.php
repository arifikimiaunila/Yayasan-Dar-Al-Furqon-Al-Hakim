<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\PreventRequestsDuringMaintenance;
use App\Http\Middleware\RedirectIfAuthenticated;
use App\Http\Middleware\Authenticate;
use App\Http\Middleware\TrimStrings;
use App\Http\Middleware\TrustHosts;
use App\Http\Middleware\TrustProxies;
use App\Http\Middleware\ValidateSignature;
use App\Http\Middleware\VerifyCsrfToken;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )->withMiddleware(function (Middleware $middleware) {
	   $middleware->web(append: [
            HandleInertiaRequests::class,
            Authenticate::class,
		   PreventRequestsDuringMaintenance::class,
		   RedirectIfAuthenticated::class,
		   TrimStrings::class,
		   TrustProxies::class,
		   ValidateSignature::class,
		   VerifyCsrfToken::class,
        ]);
})
    ->withExceptions(function (Exceptions $exceptions) {
    $exceptions->renderable(function (NotFoundHttpException $e) {
            return response()->json([
                'message' => 'Record not found.'
            ], 404);
        });
})->create();
