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
            'alamat' => 'required|string|max:1000',
            'email' => 'required|email:rfc,dns',
            'garis_lintang' => 'required|numeric',
            'garis_bujur' => 'required|numeric',
            'no_telp1' => 'required|numeric',
            'no_telp2' => 'nullable|numeric',
            'no_fax' => 'nullable|numeric',
            'no_wa' => 'nullable|numeric',
            'youtube' => 'nullable|url:http,https',
            'facebook' => 'nullable|url:http,https',
        ];
    }
}
