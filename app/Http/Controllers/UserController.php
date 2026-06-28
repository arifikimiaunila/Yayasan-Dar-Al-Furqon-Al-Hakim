<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;

class UserController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(User::query()->latest('id')->paginate(10));
    }

    public function role_store(string $role, int $id): RedirectResponse
    {
        $user = User::query()->findOrFail($id);

        if (method_exists($user, 'assignRole')) {
            $user->assignRole($role);
        }

        return redirect()->route('home')->with('message', 'Peran berhasil ditambahkan.');
    }

    public function role_update(int $id, string $role): RedirectResponse
    {
        $user = User::query()->findOrFail($id);

        if (method_exists($user, 'syncRoles')) {
            $user->syncRoles([$role]);
        } elseif (method_exists($user, 'assignRole')) {
            $user->assignRole($role);
        }

        return redirect()->route('home')->with('message', 'Peran berhasil diperbarui.');
    }

    public function show(int $id): JsonResponse
    {
        $user = User::query()->findOrFail($id);

        return response()->json($user);
    }

    public function destroy(int $id): RedirectResponse
    {
        $user = User::query()->findOrFail($id);
        $user->delete();

        return redirect()->route('home')->with('message', 'User berhasil dihapus.');
    }
}
