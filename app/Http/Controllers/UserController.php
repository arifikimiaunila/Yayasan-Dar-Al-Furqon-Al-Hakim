<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Spatie\Permission\Models\Role;
use DB;
use Hash;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;
use App\Requests\StoreUserRequest;

class UserController extends Controller
{
function __construct() {
  $this->middleware('permission:users.edit', ['only' => ['index', 'show', 'edit', 'update']]);
 }

   /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $data = User::orderBy('id','DESC')->paginate(2);
        return view('users.index',compact('data'))
            ->with('id', ($request->input('page', 1) - 1) * 5);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, string $id)
    {
$value = $request->session()->get('key', 'default');
        $user = User::find($id);
        return view('users.edit',compact('user'));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
   public function edit(string $id)
    {
return Inertia::render('users/edit', [
            'id' => $id
        ]);
}

 public function update(Request $request, string $id)
    {
        $validated = $request->all();
        $user = User::find($id);
      $user->update($validated);
        return redirect()->route('users.index')
                        ->with('success','User berhasil diperbarui');
    }

}
