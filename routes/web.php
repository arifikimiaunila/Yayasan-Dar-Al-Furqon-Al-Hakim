<?php

use App\Http\Controllers\PostsController;
use App\Http\Controllers\VideoController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('Beranda', [
        'canLogin' => Route::has('login'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', fn () => inertia('Dashboard'))->name('dashboard');
});

Route::prefix('video')->group(function () {
    Route::get('/index', [VideoController::class, 'index'])->name('video.index');
    Route::get('/create', [VideoController::class, 'create'])->name('video.create');
    Route::post('/store', [VideoController::class, 'store'])->name('video.store');
    Route::get('/edit', [VideoController::class, 'edit'])->name('video.edit');
    Route::get('/{no_video}/choose', [VideoController::class, 'choose_one'])->name('video.choose');
    Route::get('/{no_video}', [VideoController::class, 'show'])->name('video.show');
    Route::put('/{no_video}/update', [VideoController::class, 'update'])->name('video.update');
    Route::delete('/{no_video}/delete', [VideoController::class, 'destroy'])->name('video.delete');
});

Route::prefix('post')->group(function () {
    Route::get('/create', [PostsController::class, 'create'])->name('post.create');
    Route::post('/store', [PostsController::class, 'store'])->name('post.store');
    Route::get('/edit', [PostsController::class, 'edit'])->name('post.edit');
    Route::get('/{post_id}/choose', [PostsController::class, 'choose_one'])->name('post.choose');
    Route::get('/{post_id}', [PostsController::class, 'show'])->name('post.show');
    Route::put('/{post_id}/update', [PostsController::class, 'update'])->name('post.update');
    Route::delete('/{post_id}/delete', [PostsController::class, 'destroy'])->name('post.destroy');
});

Route::get('/data_yayasan/{yayasan_id}/show', function (int $yayasan_id) {
    return inertia('Beranda', ['yayasan_id' => $yayasan_id]);
})->name('datayayasan.show');

Route::redirect('/posts', '/post/edit')->name('posts.index');
