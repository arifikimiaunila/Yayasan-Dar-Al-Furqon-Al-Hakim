<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
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
           'post_id'=>'required',
 'title'   => 'required|min:5|max:50',
            'body' => 'required',
'published'=>'required|boolean',
            'published_at'=>'required|after:2024-01-09',
'key'=>'required|string',
'value'=>'required|text',
            'id'=>'required', 
 'nama_foto'=> 'required|string|min:5|max:50',
            'deksripsi' => 'required',
            'gambar'=>'required|image|mimes:jpg|max:2048',
            'nama_fotografer'=>'required|string|min:5|max:50'
        ];
    }
}
