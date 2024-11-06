<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Laravel\Scout\Searchable;

class posts extends Model
{
    use HasFactory, Searchable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
protected $table='posts';
  protected $primaryKey='post_id';
    protected $fillable = [
        'title',
        'body',
      'published',
        'published_at',
        'id'
    ];

    protected $visible = [
        'title',
        'body',
        'published_at'
    ];

    protected $casts = [
        'published' => 'boolean',
    ];

public function getRouteKeyName()
    {
        return 'slug';
    }

    public function scopePublished($query)
    {
        return $query->where('published', 1);
    }

    public function users(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

	public function toSearchableArray(): array
    {
       return[
'post_id'=>$this->post_id,
'title'=>$this->title,
'body'=>$this->body,
'published'=>$this->published,
'published_at'=>$this->published_at,
'id'=>$this->id
];
    }
}
