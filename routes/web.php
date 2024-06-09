<?php

use App\Http\Controllers\DataYayasanController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FlesController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\PengurusYayasanController;
use Illuminate\Http\Request;
use Illuminate\Foundation\Application;
use Inertia\Inertia;
use Tighten\Ziggy\Ziggy;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', fn ()=>
     inertia('Welcome', [
        'canLogin' => Route::has('login'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ])
)->name('home');

Route::middleware([
'auth:sanctum',
config('jetstream.auth_session'),
'verified'
])->group(function () {
Route::get('/dashboard', function () {
return inertia('dashboard');
})->name('dashboard');
});

Route::get('posts/{$post_id}', fn (int $post_id) =>(
[PostsController::class, 'show']
))->name('posts.show');

Route::get('video/index', fn ()=>(
[VideoController::class, 'index']
))->name('video.index');
Route::get('pengurus_yayasan/index', fn ()=>(
[PengurusYayasanController::class, 'index']
))->name('pengurus_yayasan.index');
Route::get('file/index', fn ()=>(
[FlesController::class, 'index']
))->name('fles.index');
Route::get('video/{$no_video}', fn (int $no_video)=>(
[VideoController::class, 'show']
))->name('video.show');
Route::get('file/{$file_id}', fn (int $file_id)=>(
[FlesController::class, 'show']
))->name('file.show');
Route::get('file/{$file_id}/download', fn (int $file_id)=>(
[FlesController::class, 'download']
))->name('file.download');
Route::get('data_yayasan/{$yayasan_id}/show', fn ()=>(
[DataYayasanController::class, 'show']
))->name('datayayasan.show');


Route::group(['middleware' => ['role:superadministration|Admin2']], function() {
Route::group(['middleware' =>['permission:video.create']], function(){
Route::get('video/create', fn ()=>(
[VideoController::class, 'create']
))->name('video.create');
Route::controller(VideoController::class)->group(function () {
Route::post('video/store', 'store')->name('video.store');
});
Route::group(['middleware' =>['permission:video.edit']], function(){
Route::controller(VideoController::class)->group(function () {
Route::get('video/edit', 'edit')->name('video.edit');
Route::get('video/{$no_video}/choose', 'choose_one')->name('video.choose');
Route::put('/video/{$no_video}/update', 'update')->name('video.update');
});
});
Route::group(['middleware' =>['permission:video.delete']], function(){
Route::controller(VideoController::class)->group(function () {
Route::delete('video/{$no_video}/delete', 'destroy')->name('video.delete');
});
});
Route::group(['middleware' =>['permission:file.create']], function(){
Route::controller(FlesController::class)->group(function () {
Route::post('file/create', 'create')->name('file.create');
Route::post('file/store', 'store')->name('file.store');
});
});
Route::group(['middleware' =>['permission:file.edit']], function(){
Route::controller(FlesController::class)->group(function () {
Route::get('file/edit', 'edit')->name('file.edit');
Route::get('file/{$file_id}/choose', 'choose_one')->name('file.choose');
Route::put('file/{$file_id}/update', 'update')->name('file.update');
});
});
Route::group(['middleware' =>['permission:file.delete']], function(){
Route::controller(FlesController::class)->group(function () {
Route::delete('/file/{$file_id}/delete', 'destroy')->name('file.delete');
});
});
});
});

Route::group(['middleware' => ['role:superadministration|Admin1']], function() {
Route::group(['middleware' =>['permission:pengurus_yayasan.create']], function(){
Route::controller(PengurusYayasanController::class)->group(function () {
Route::post('pengurus_yayasan/create', 'create')->name('pengurus_yayasan.create');
Route::post('pengurus_yayasan/store', 'store')->name('pengurus_yayasan.store');
});
});
Route::group(['middleware' =>['permission:pengurus_yayasan.edit']], function(){
Route::controller(PengurusYayasanController::class)->group(function () {
Route::get('pengurus_yayasan/edit', 'edit')->name('pengurus_yayasan.edit');
Route::get('pengurus_yayasan/{$id_pengurus}/choose', 'choose_one')->name('pengurus_yayasan.choose');
Route::put('pengurus_yayasan/{$id_pengurus}/update', 'update')->name('pengurus_yayasan.update');
});
});
Route::group(['middleware' =>['permission:pengurus_yayasan.delete']], function(){
Route::controller(PengurusYayasanController::class)->group(function () {
Route::delete('pengurus_yayasan/{$id_pengurus}/delete', 'destroy')->name('pengurus_yayasan.delete');
});
});

Route::group(['middleware' =>['permission:post.create']], function(){
Route::controller(PostsController::class)->group(function () {
Route::get('post/create', 'create')->name('post.create');
Route::post('post/store', 'store')->name('post.store');
});
});


Route::group(['middleware' =>['permission:post.edit']], function(){
Route::controller(PostsController::class)->group(function () {
Route::get('post/edit', 'edit')->name('post.edit');
Route::get('post/{$post_id}/choose', 'choose_one')->name('post.choose');
Route::put('post/{$post_id}/update', 'update')->name('post.update');
});
});

Route::group(['middleware' =>['permission:post.edit']], function(){
Route::controller(PostsController::class)->group(function () {
Route::get('post/foto_edit', 'foto_edit')->name('foto.edit');
Route::post('post/{$post_id}/upload_foto', 'upload_foto')->name('foto.upload');
Route::get('post/{$foto_id}/foto_choose', 'choose_one_foto')->name('foto.choose');
Route::put('post/{$foto_id}/foto_update', 'update_foto')->name('foto.update');
Route::delete('post/{$foto_id}/foto_delete', 'delete_foto')->name('foto.delete');
});
});
});


Route::group(['middleware' => ['role:superadministration']], function() {
Route::group(['middleware' =>['permission:data_yayasan.create']], function(){
Route::controller(DataYayasanController::class)->group(function () {
Route::get('data_yayasan/create', 'create')->name('data_yayasan.create');
Route::post('data_yayasan/store', 'store')->name('data_yayasan.store');
});
});
Route::group(['middleware' =>['permission:data_yayasan.edit']], function(){
Route::controller(DataYayasanController::class)->group(function () {
Route::get('data_yayasan/edit', 'edit')->name('data_yayasan.edit');
Route::get('data_yayasan/{$yayasan_id}/choose', 'choose_one')->name('data_yayasan.choose');
Route::put('data_yayasan/{$yayasan_id}/update', 'update')->name('data_yayasan.update');
});
});
});
