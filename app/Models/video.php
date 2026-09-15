<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Laravel\Scout\Searchable;
use Mostafaznv\LaraCache\Traits\LaraCache;
use App\Models\CacheEntity;
use Illuminate\Database\Eloquent\Relations\HasOne;

class videos extends Model
{

    use HasFactory, Searchable, LaraCache;

    public static function cacheEntities(): array
    {
        return [
            CacheEntity::make('list.forever')
                ->cache(function() {
                    return videos::query()->latest()->get();
                }),

            CacheEntity::make('latest')
                ->validForRestOfDay()
                ->cache(function() {
                    return videos::query()->latest()->first();
                })
        ];
    }
	
	protected $table='videos';
    protected $primaryKey='no_video';
	protected $fillable = [
        'no_video',
        'title',
		'link',
        'description',
        'published',
		'upload_tanggal'
    ];

	protected $visible= [
        'title',
		'link',
        'description',
        'published',
		'upload_tanggal'
    ];

    protected $casts = [
        'published' => 'boolean',
    ];

public function getRouteKeyName()
    {
    return 'no_video';
    }

	public function scopePublished(Builder $query)
    {
        return $query->where('published', 1);
    }

	public function cacheentity(): HasOne
    {
        return $this->hasOne(CacheEntity::class);
    }
	public function toSearchableArray(): array
    {
        return[
    'no_video'=>$this->no_video,
    'title'=>$this->title,
    'link'=>$this->link,
    'description'=>$this->description,
    'published'=>$this->published,
    'upload_tanggal'=>$this->upload_tanggal,
    'user_id'=>$this->user_id
    ];
    }
	protected function makeAllSearchableUsing(Builder $query): Builder
{
    return $query->with('title');
}
    }

