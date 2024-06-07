<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePengurusYayasanRequest extends FormRequest
{

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
       $stopOnFirstFailure = true;
   return [
           'id_pengurus'=>'required',
   'nama'   => 'required|min:5|max:50',
            'dapukan' => 'required|min:1|max:20',
            'alamat' => 'min:1|max:299',
            'no_telp'=>'required',
'kategori'=>'required',
           'published'=>'required|boolean'
        ];
    }
}
