<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

protected $stopOnFirstFailure = true;
    /**
     * Get the validation that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
 $stopOnFirstFailure = true;
        return [
        'id'=>'required',
            'name' => 'required',
            'email' => 'required|email|unique:users,email,'.$id
        ];
    }
}
