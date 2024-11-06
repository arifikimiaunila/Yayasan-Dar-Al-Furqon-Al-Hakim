<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Laravel\Scout\Searchable;

class CacheEntity extends Model
{
    use HasFactory, Searchable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'key',
        'value',
        'expiration',
        'owner'
    ];

    public function videos(): BelongsTo
    {
        return $this->belongsTo(videos::class);
    }

	public function toSearchableArray(): array
    {
       return[
'key'=>$this->key,
'value'=>$this->value,
'expiration'=>$this->expiration,
'owner'=>$this->owner
];
    }
}
