<?php

namespace App\Http\Controllers;

use App\Models\posts;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use App\Http\Requests\StorePostRequest;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\foto_post;
use EcomDev\CacheKey\Normalizer\EncodeNormalizer;
use EcomDev\CacheKey\Generator;
use Illuminate\Support\Facades\Storage;

class PostsController extends Controller
{
function __construct() {
 $this->middleware('permission:post.create', ['only' => ['create', 'store', 'upload_foto' ]]);
 $this->middleware('permission:post.edit', ['only' => ['edit','update', 'upload_foto', 'update_foto', 'choose_one', 'choose_one_foto', 'delete_foto']]);
 $this->middleware('permission:post.delete', ['only' => ['destroy']]);
 }

public function index(Request $request): Response
    {
      	$titles = DB::select('select title from posts');
        return Inertia::render('posts/index', [
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
$path=Storage::disk('public/foto/')->assertExists($nama_file);
return Storage::download($path);
Storage::delete('public/foto/'.$nama_file);
}
      return Inertia::render('posts/show', [
'posts' =>$post
      ]);
}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(posts $poststable)
    {
    $postsdata = posts::select('post_id', 'title')->get();
    $poststable = $postsdata->pluck('title', 'post_id');
    return Inertia::render('posts/edit', [
            'posts' => $poststable
        ]);
    }

public function choose_one(int $post_id)
    {
$postdata = posts::select(['post_id', 'title', 'body', 'nama_pembuat','published_at','user_id'])->where('post_id', $post_id)->get();
		$fotodata = foto_post::select('foto_id','nama_foto')->where('post_id', $post_id)->get();
        $fototable= $fotodata->pluck('foto_id', 'nama_foto');
        return Inertia::render('posts/choose_one', [
           'posts'=>$postdata,
           'foto_posts'=>$fototable
        ]);
    }

public function choose_latest(){
$cache = videos::cache()->get('latest');
return $cache;
}

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, posts $posts, bool $terbit, integer $post_id)
    {
if($terbit = true){
$validated=$request->safe()->only(
'post_id'=>$post_id,
'published'=>$terbit
);
} else {
$validated=$request->safe()->only([
    'post_id'=>$post_id,
	'title',
    'body',
    'published_at'
        ]);
}
   $posts->save($validated);
 redirect()->route('posts.index')->with('message', 'Post berhasil diupdate.');
    }

    /**
     * Remove the specified resource from storage.
     */

public function upload_foto(Request $request, int $post_id){
$validated=$request->safe()->only([
            'nama_foto',
            'deksripsi' ,
            'gambar',
            'nama_fotografer',
            'post_id'
        ]);
        if ($request->hasFile('gambar')) {
 $nama_foto= time().'.'.$request->file->extension();
$image_path = $request->file('gambar')->storeAs('resources/foto_post/', $nama_foto);
        }
        foto_post::create($validated );
        sleep(1);
redirect()->route('posts.edit')->with('message', 'Foto berhasil diupload.');
}

public function foto_edit(posts $poststable)
    {
    $fotodata = foto_post::select('foto_id', 'nama_foto')->get();
    $fototable = $fotodata->pluck('nama_foto', 'foto_id');
    return Inertia::render('posts/foto_posts/edit', [
            'foto_posts' => $fototable
        ]);
    }

public function choose_one_foto(int $foto_id)
    {
		$fotodata = foto_post::select('foto_id','nama_foto', 'deskripsi', 'nama_fotografer', 'post_id')->where('foto_id', $foto_id)->get();
        return Inertia::render('posts/foto_posts/choose_one_foto', [
           'foto_posts'=>$fotodata
        ]);
    }

public function update_foto(Request $request, foto_post $foto_post)
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
redirect()->route('posts.edit')->with('message', 'Foto berhasil diupdate.');
}

public function delete_foto(Request $request, int $post_id, int $foto_id){
$foto_post=foto_post::where('post_id', $post_id)->where('foto_id', $foto_id);
     $foto_name=array_column($foto_post, 'nama_foto');
Storage::delete('../resources/foto_post'.$foto_name);
        $foto_post->delete();
redirect()->route('posts.edit')->with('message', 'Foto berhasil dihapus.');
}
}

