<?php

namespace App\Http\Controllers;

use App\Models\posts;
use Illuminate\Http\Request;
use App\Http\Requests\StorePostRequest;
use Inertia\Response;
use App\Models\foto_post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;

class PostsController extends Controller 
{

 public function create(){
return inertia('posts/create');
 }

 /**
  * Store a newly created resource in storage.
  */
public function store(StorePostRequest $request): RedirectResponse
 {
  $validated=$request->validated();
   $posts = posts::create($validated);
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
        return inertia('posts/choose_one', [
           'posts'=>$postdata
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
}

