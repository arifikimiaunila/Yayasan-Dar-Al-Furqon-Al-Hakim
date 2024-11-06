<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class pengurus_yayasans extends Model
{
    use HasFactory, Searchable;

	protected $table='pengurus_yayasans';
  protected $primaryKey='id_pengurus';
    protected $fillable = [
        'nama',
		'dapukan',
		'alamat',
        'no_telp',
'kategori',
    'published',
'id'
    ];

    protected $visible = [
        'nama',
		'dapukan',
		'alamat',
        'no_telp', 
'kategori'
    ];
protected $casts = [
        'published' => 'boolean',
    ];

public function getRouteKeyName()
{
 return 'slug';
 }

    public function toSearchableArray(): array
    {
        return[
'id_pengurus'=>$this->id_pengurus,
'nama'=>$this->nama,
'dapukan'=>$this->dapukan,
'alamat'=>$this->dapukan,
'no_telp'=>$this->no_telp,
'kategori'=>$this->kategori,
'published'=>$this->published,
'id'=>$this->id
];
    }
}
