<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;

class UserRoleController extends Controller
{
    // Assign role ke user (saat dicentang)
    public function assignRole(Request $request, int $user_id)
    {
        $user = User::findOrFail($user_id);
        $role = Role::findOrFail($request->role_id);

        // Tambahkan role ke user
        $user->roles()->attach($role->id, ['user_type' => User::class]);

        // Tambahkan semua permission dari role ke user
        foreach ($role->permissions as $permission) {
            $user->permissions()->attach($permission->id, ['user_type' => User::class]);
        }

        return response()->json([
            'message' => 'Role dan permission berhasil ditambahkan',
            'user'    => $user->load('roles', 'permissions')
        ]);
    }

    // Hapus role dari user (saat centang dihilangkan)
    public function removeRole(Request $request, int $user_id)
    {
        $user = User::findOrFail($user_id);
        $role = Role::findOrFail($request->role_id);

        // Hapus role dari user
        $user->roles()->detach($role->id);

        // Hapus semua permission yang berasal dari role tersebut
        foreach ($role->permissions as $permission) {
            $user->permissions()->detach($permission->id);
        }

        return response()->json([
            'message' => 'Role dan permission berhasil dihapus',
            'user'    => $user->load('roles', 'permissions')
        ]);
    }
}
