<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(): JsonResponse
    {
        // Gunakan collection resource agar setiap item diformat oleh UserResource
        $users = User::query()->latest('id')->paginate(10);

        return UserResource::collection($users)->response();
    }

    public function show(int $user_id): JsonResponse
    {
        $user = User::query()->findOrFail($user_id);

        // Bungkus dengan UserResource
        return (new UserResource($user))->response();
    }

    public function update(Request $request, int $user_id): JsonResponse
    {
        $user = User::query()->findOrFail($user_id);

        $validated = $request->validate([
            'name'  => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user_id,
        ]);

        $user->update($validated);

        // Return dengan UserResource agar hasil update tetap difilter
        return (new UserResource($user))->additional([
            'message' => 'User berhasil diupdate.',
        ])->response();
    }
}
