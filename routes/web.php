<?php

use App\Http\Controllers\PostsController;
use App\Http\Controllers\FlesController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DataYayasanController;
use App\Http\Controllers\PengurusYayasanController;

Route::get('/', function () {
    return inertia('Beranda', [
        'canLogin' => Route::has('login'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::middleware(['auth', 'verified', 'role:admin1|admin2|superadmin'])->group(function () {
Route::get('/profile/{user_id}', [ProfileController::class, 'show'])
    ->name('profile.show');
});

Route::prefix('video')->group(function () {
    Route::view('/index', [VideoController::class, 'index'])->name('video.index');
    Route::view('/{no_video}', [VideoController::class, 'show'])->name('video.show');
    Route::middleware(['auth', 'verified', 'role:admin2|superadmin'])->group(function () {
        Route::view('/create', [VideoController::class, 'create'])->name('video.create');
        Route::post('/store', [VideoController::class, 'store'])->name('video.store');
        Route::view('/edit', [VideoController::class, 'edit'])->name('video.edit');
        Route::view('/{no_video}/choose', [VideoController::class, 'choose_one'])->name('video.choose');
        Route::put('/{no_video}/update', [VideoController::class, 'update'])->name('video.update');
        Route::delete('/{no_video}/delete', [VideoController::class, 'destroy'])->name('video.delete');
    });
});

Route::prefix('post')->group(function () {
    Route::view('/{post_id}', [PostsController::class, 'show'])->name('post.show');
    Route::middleware(['auth', 'verified', 'role:admin1|superadmin'])->group(function () {
        Route::view('/create', [PostsController::class, 'create'])->name('post.create');
        Route::post('/store', [PostsController::class, 'store'])->name('post.store');
        Route::view('/edit', [PostsController::class, 'edit'])->name('post.edit');
        Route::view('/{post_id}/choose', [PostsController::class, 'choose_one'])->name('post.choose');
        Route::put('/{post_id}/update', [PostsController::class, 'update'])->name('post.update');
    });
});

Route::prefix('data_yayasan')->group(function () {
    Route::view('/{yayasan_id}', [DataYayasanController::class, 'show'])->name('data_yayasan.show', 1);
    Route::view('/{yayasan_id}', [DataYayasanController::class, 'showcookies'])->name('data_yayasan.showcookies', 1);
    Route::middleware(['auth', 'verified', 'role:superadmin'])->group(function () {
        Route::view('/create', [DataYayasanController::class, 'create'])->name('data_yayasan.create');
        Route::post('/store', [DataYayasanController::class, 'store'])->name('data_yayasan.store');
        Route::view('/edit', [DataYayasanController::class, 'edit'])->name('data_yayasan.edit');
        Route::put('/{yayasan_id}/update', [DataYayasanController::class, 'update'])->name('data_yayasan.update');
});
});

Route::prefix('files')->group(function () {
    Route::view('/index', [FlesController::class, 'index'])->name('files.index');
    Route::view('/{file_id}', [FlesController::class, 'show'])->name('files.show');
    Route::get('/{file_id}/download', [FlesController::class, 'download'])->name('files.download');
    Route::middleware(['auth', 'verified', 'role:admin2|superadmin'])->group(function () {
        Route::view('/create', [FlesController::class, 'create'])->name('files.create');
        Route::post('/store', [FlesController::class, 'store'])->name('files.store');
        Route::view('/edit', [FlesController::class, 'edit'])->name('files.edit');
        Route::view('/{file_id}/choose', [FlesController::class, 'choose_one'])->name('files.choose');
        Route::put('/{file_id}/update', [FlesController::class, 'update'])->name('files.update');
        Route::delete('/{file_id}/delete', [FlesController::class, 'destroy'])->name('files.destroy');
    });
});

Route::prefix('pengurus_yayasan')->group(function () {
    Route::view('/index', [PengurusYayasanController::class, 'index'])->name('pengurus_yayasan.index');
    Route::view('/{id_pengurus}', [PengurusYayasanController::class, 'show'])->name('pengurus_yayasan.show');
    Route::middleware(['auth', 'verified', 'role:admin1|superadmin'])->group(function () {
        Route::view('/create', [PengurusYayasanController::class, 'create'])->name('pengurus_yayasan.create');
        Route::post('/store', [PengurusYayasanController::class, 'store'])->name('pengurus_yayasan.store');
        Route::view('/{id_pengurus}/edit', [PengurusYayasanController::class, 'edit'])->name('pengurus_yayasan.edit');
        Route::view('/{id_pengurus}/choose', [PengurusYayasanController::class, 'choose_one'])->name('pengurus_yayasan.choose');
        Route::put('/{id_pengurus}/update', [PengurusYayasanController::class, 'update'])->name('pengurus_yayasan.update');
        Route::delete('/{id_pengurus}/delete', [PengurusYayasanController::class, 'destroy'])->name('pengurus_yayasan.destroy');
    });
});
