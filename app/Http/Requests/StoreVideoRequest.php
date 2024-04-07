<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreVideoRequest extends FormRequest
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
              'title'   => 'required|min:5|max:50',
            'link' => 'required|min:1|max:20',
            'published' => 'required|boolean',
            'upload_tanggal'=>'required|after:2024-01-09',
            'id'=>'required'
        ];
    }
}
