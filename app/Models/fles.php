<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Laravel\Scout\Searchable;

class fles extends Model
{
    use HasFactory, Searchable;

    protected $fillable = [
        'nama_file',
        'deskripsi',
        'gambar',
        'nama_pembuat',
        'published',
        'id'
    ];

    protected $visible = [
        'nama_file',
        'deskripsi',
        'gambar',
        'nama_pembuat'
    ];

   protected $casts = [
        'published' => 'boolean',
    ];

    public function scopePublished(Builder $query)
    {
        return $query->where('published', 1);
    }

    public function users(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function toSearchableArray(): array
    {
        'file_id'=>$this->file_id,
        'nama_file'=>$this->nama_file,
        'deskripsi'=>$this->deskripsi,
        'gambar'=>$this->gambar,
        'nama_pembuat'=>$this->nama_pembuat,
        'published'=>$this->published,
        'id'=>$this->id
    }
}
