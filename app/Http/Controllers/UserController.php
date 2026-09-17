<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

class UserController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(User::query()->latest('id')->paginate(10));
    }

    public function show(int $user_id): JsonResponse
    {
        $user = User::query()->findOrFail($user_id);

        return response()->json($user);
    }

    public function update(Request $request, int $user_id): JsonResponse
    {
        $user = User::query()->findOrFail($user_id);

        // Validasi sederhana (bisa disesuaikan)
        $validated = $request->validate([
            'name'  => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user_id,
        ]);

        // Update data user
        $user->update($validated);

        return response()->json([
            'message' => 'User berhasil diupdate.',
            'user'    => $user,
        ]);
    }

    public function destroy(int $user_id): RedirectResponse
    {
        $user = User::query()->findOrFail($user_id);
        $user->delete();

        return redirect()->route('home')->with('message', 'User berhasil dihapus.');
    }
}
