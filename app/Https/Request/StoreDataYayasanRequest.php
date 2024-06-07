<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDataYayasanRequest extends FormRequest
{

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
     
   return false;
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
            'yayasan_id'=> 'required|integer|max:3',
'alamat'=> 'required|string|max:1000',
'email'=> 'email:rfc,dns',
 'garis_lintang'=> 'required|integer|min:6|max:6',
'garis_bujur'=> 'required|integer|min:6|max:6', 'no_tep1'=> 'required|integer|max:15', 
'no_tep2'=> 'integer|max:15',
 'no_wa'=> 'integer|max:15',
 'youtube'=> 'url:http,https',
 'facebook'=> 'url:http,https'
        ];
    }
}
