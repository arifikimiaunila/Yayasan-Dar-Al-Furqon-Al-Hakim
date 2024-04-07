<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePengurusYayasanRequest extends FormRequest
{
protected $stopOnFirstFailure = true;
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
              'nama'   => 'required|min:5|max:50',
            'dapukan' => 'required|min:1|max:20',
            'alamat' => 'min:1|max:299',
            'no_telp'=>'required',
           'published'=>'required|boolean',
            'id'=>'required'
        ];
    }
}
