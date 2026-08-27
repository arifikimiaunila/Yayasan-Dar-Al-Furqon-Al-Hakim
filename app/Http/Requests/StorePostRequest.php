<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
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
            'title' => 'required|string|min:5|max:100',
            'body' => 'required',
            'published' => 'required|boolean',
            'published_at' => 'nullable|date',
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'published' => $this->input('published', $this->input('is_published', false)),
        ]);
    }
}
