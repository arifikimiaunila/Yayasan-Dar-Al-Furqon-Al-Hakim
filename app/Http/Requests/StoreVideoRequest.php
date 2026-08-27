<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreVideoRequest extends FormRequest
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
            'title' => 'required|string|min:5|max:255',
            'link' => 'required|string|min:3|max:2048',
            'published' => 'required|boolean',
            'upload_tanggal' => 'required|date',
        ];
    }

    protected function prepareForValidation(): void
    {
        $title = $this->input('title', $this->input('judul'));
        $link = $this->input('link', $this->input('youtube_id', $this->input('youtube_link')));
        $published = $this->input('published', $this->input('is_published', false));
        $uploadTanggal = $this->input('upload_tanggal', $this->input('tanggal_upload'));

        $this->merge([
            'title' => $title,
            'link' => $link,
            'published' => $published,
            'upload_tanggal' => $uploadTanggal,
        ]);
    }
}
