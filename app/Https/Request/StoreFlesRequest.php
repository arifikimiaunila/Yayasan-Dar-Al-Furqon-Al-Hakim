<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFlesRequest extends FormRequest
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
'file_id'=>'required|integer',
            'nama_file'=> 'required|string|min:5|max:50',
            'deksripsi' => 'required',
            'gambar'=>'required|image|mimes:pdf|max:2048',
            'nama_pembuat'=>'required|string|min:5|max:50',
'published'=>'required|boolean'
        ];
    }
}
