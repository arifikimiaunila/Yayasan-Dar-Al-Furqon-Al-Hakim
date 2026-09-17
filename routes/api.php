<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Tighten\Ziggy\Ziggy;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\User;

Route::get('/ziggy', fn () => response()->json(new Ziggy));

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/sanctum/token', function (Request $request) {
    $request->validate([
        'email' => ['required', 'email'],
        'password' => ['required'],
        'device_name' => ['required', 'string', 'max:255'],
    ]);

    $user = User::where('email', $request->email)->first();

    if (! $user || ! Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'email' => ['Kredensial tidak memenuhi syarat.'],
        ]);
    }

    $token = $user->createToken($request->device_name);

    return response()->json([
        'token' => $token->plainTextToken,
        'token_type' => 'Bearer',
        'abilities' => $token->accessToken->abilities,
    ]);
})->middleware('sanctum-token');


Route::group(['middleware' => ['ability:superadministrator, user.edit, require_all']], function () {
    Route::controller(UserController::class)->group(function () {
        Route::get('user/index', 'index')->name('user.index');
        Route::get('user/{id}', 'show')->name('user.show');
        Route::delete('user/{id}/delete', 'destroy')->name('user.delete');
    });
});


