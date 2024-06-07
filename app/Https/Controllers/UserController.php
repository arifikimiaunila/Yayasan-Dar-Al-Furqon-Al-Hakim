<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class UserController extends Controller implements HasMiddleware
{

   /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = User::orderBy('id','DESC')->paginate(5);
        return inertia('users/index', [
        'user'=>$user
        ])
            ->with('id', ($request->input('page', 1) - 1) * 5);
    }

    public function role_store(string $role, $id): RedirectResponse
    {
      $id->assignRole($role);
      return redirect()->route('user.edit')->with('message', 'Peran telah berhasil dibuat.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function role_update($id, string $role): RedirectResponse
    {
    $previous_role=Role::where('model_id', $id);
    $id->removeRole($previous_role);
    $id->assignRole($role);
return redirect()->route('user.edit')->with('message', 'Izin telah berhasil diperbarui.');
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
      $a1=User::find($id);
      $a2 = Role::where('model_id', $id);
        $user = array_merge($a1, $a2);
        return inertia('users/edit', [
         'user'=>$user
        ] );
    }
public function destroy(string $id): RedirectResponse
    {
        $role=Role::all();
        $user=User::where('id', $id);
        $user->removeRole($role);
        $user->delete();
        return redirect()->route('user.edit')->with('message', 'Peran berhasil dihapus.');
    }

}
