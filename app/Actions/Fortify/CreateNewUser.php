<?php

namespace App\Actions\Fortify;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;
use Illuminate\Support\Str;
use Illuminate\Auth\Events\Registered;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    public function create(array $input): User
    {
        Validator::make($input, [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class),
            ],
            'password' => $this->passwordRules(),
        ])->validate();

        // Generate recovery codes (misalnya 8 kode acak)
        $recoveryCodes = collect(range(1, 8))->map(fn () => Str::random(10))->toArray();

        $user = User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'password' => Hash::make($input['password']),
            'two_factor_recovery_codes' => encrypt(json_encode($recoveryCodes)),
        ]);

        // Kirim email verifikasi pertama kali
        event(new Registered($user));

        // Catatan: Fortify akan otomatis arahkan ke route('verification.notice')
        // setelah registrasi jika fitur email verification diaktifkan.
        // Jadi kamu tidak perlu manual redirect di sini.

        return $user;
    }
}
