<?php

namespace App\Http\Controllers;

use App\Models\posts;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use App\Http\Requests\StorePostRequest;
use Inertia\Response;
use App\Models\foto_post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;

class PostsController extends Controller implements HasMiddleware
{

 public function create()
 {
return inertia('posts/create');
 }

 /**
  * Store a newly created resource in storage.
  */
public function store(StorePostRequest $request): RedirectResponse
 {
  $validated=$request->validated();
   $posts = posts::create($validated);
$fotovalidated=$request->safe()->only([
            'nama_foto',
            'deksripsi' ,
            'gambar',
            'nama_fotografer',
            'post_id'
        ]);
        if ($request->hasFile('gambar')) {
 $nama_foto= $request->file->getClientOriginalName();
$image_path = $request->file('gambar')->storeAs('resources/foto_post/', $nama_foto);
        }
        foto_post::create($fotovalidated );
   return redirect()->route('posts.edit')->with('message', 'Postingan berhasil dibuat.');
 }
 public function index(Request $request): Response
    {
      	$titles = posts::select('title');
        return inertia('posts/edit', [
        'fles'=>$titles
        ]);
    }
    /**
     * Display a listing of the resource.
     */
    public function show(Request $request, int $post_id): Response
    {
 $post = posts::where('post_id', $post_id)->get();
 $foto_post = foto_post::where('post_id', $post_id);
		$foto_name=array_column($foto_post, 'nama_foto');
		foreach ($foto_name as $nama_file){
Storage::copy('resources/foto/'.$nama_file, 'public/foto/'.$nama_file);
$path=storage_path('public/foto/{$nama_file}');
if (file_exists($path)){
return Storage::download($path);
Storage::delete('public/foto/'.$nama_file);
} else{
    abort(404, 'File not found');
}
      return inertia('posts/show', [
'posts' =>$post
      ]);
}}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(posts $poststable)
    {
    $postsdata = posts::select('post_id', 'title')->get();
    $poststable = $postsdata->pluck('title', 'post_id');
    return inertia('posts/edit', [
            'posts' => $poststable
        ]);
    }

public function choose_one(int $post_id)
    {
$postdata = posts::select(['post_id', 'title', 'body', 'nama_pembuat','published_at','user_id'])->where('post_id', $post_id)->get();
		$fotodata = foto_post::select('foto_id','nama_foto')->where('post_id', $post_id)->get();
        $fototable= $fotodata->pluck('foto_id', 'nama_foto');
        return inertia('posts/choose_one', [
           'posts'=>$postdata,
           'foto_posts'=>$fototable
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StorePostRequest $request, posts $posts, bool $terbit, int $post_id)
    {
if($terbit = true){
$validated=$request->safe()->only([
'post_id'=>$post_id,
'published'=>$terbit
]);
} else {
$validated=$request->safe()->only([
    'post_id'=>$post_id,
	'title',
    'body',
    'published_at'
        ]);
}
   $posts->save($validated);
 return redirect()->route('posts.edit')->with('message', 'Post berhasil diupdate.');
    }

    /**
     * Remove the specified resource from storage.
     */

public function upload_foto(StorePostRequest $request, int $post_id){
$validated=$request->safe()->only([
            'nama_foto',
            'deksripsi' ,
            'gambar',
            'nama_fotografer',
            'post_id'
        ]);
        if ($request->hasFile('gambar')) {
 $nama_foto= $request->file->getClientOriginalName();
$image_path = $request->file('gambar')->storeAs('resources/foto_post/', $nama_foto);
        }
        foto_post::create($validated );
        sleep(1);
return redirect()->route('posts.edit')->with('message', 'Foto berhasil diupload.');
}

public function foto_edit(posts $poststable)
    {
    $fotodata = foto_post::select('foto_id', 'nama_foto')->get();
    $fototable = $fotodata->pluck('nama_foto', 'foto_id');
    return inertia('posts/foto_posts/edit', [
            'foto_posts' => $fototable
        ]);
    }

public function choose_one_foto(int $foto_id)
    {
		$fotodata = foto_post::select('foto_id','nama_foto', 'deskripsi', 'nama_fotografer', 'post_id')->where('foto_id', $foto_id)->get();
        return inertia('posts/foto_posts/choose_one_foto', [
           'foto_posts'=>$fotodata
        ]);
    }

public function update_foto(StorePostRequest $request, foto_post $foto_post, int $post_id, int $foto_id)
{
    $validated = $request->safe()->only([
            'foto_id',
            'nama_foto',
            'deksripsi',
            'nama_fotografer',
            'post_id'
        ]);
        $foto_post->save($validated);
        sleep(1);
return redirect()->route('posts.edit')->with('message', 'Foto berhasil diupdate.');
}

public function delete_foto(Request $request, int $post_id, int $foto_id){
$foto_post=foto_post::where('post_id', $post_id)->where('foto_id', $foto_id);
     $foto_name=array_column($foto_post, 'nama_foto');
Storage::delete('../resources/foto_post'.$foto_name);
        $foto_post->delete();
return redirect()->route('posts.edit')->with('message', 'Foto berhasil dihapus.');
}
}

