<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Http\Requests\StorePostRequest;
use Inertia\Response;
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

 public function index(Request $request): Response
    {
      	$titles = post::select('title');
        return inertia('posts/edit', [
        'fles'=>$titles
        ]);
    }
    /**
     * Display a listing of the resource.
     */
    public function show(Request $request, int $post_id): Response
    {
 $post = Post::where('post_id', $post_id)->get();
      return inertia('posts/show', [
'post' =>$post
      ]);
}}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(posts $poststable)
    {
    $postsdata= post::select('post_id', 'title')->get();
    $post = $postsdata->pluck('title', 'post_id');
    return inertia('posts/edit', [
            'post' => $post
        ]);
    }

public function choose_one(int $post_id)
    {
$post = post::select(['post_id', 'title', 'body', 'nama_pembuat','published_at','user_id'])->where('post_id', $post_id)->get();
        return inertia('posts/choose_one', [
           'post'=>$post
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
   $post->save($validated);
 return redirect()->route('posts.edit')->with('message', 'Post berhasil diupdate.');
    }
}

