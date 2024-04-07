<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;


class data_yayasan extends Model
{
    use HasFactory, Searchable;
    protected $visible=[
        'alamat',
        'email',
        'garis_lintang',
        'garis_bujur',
        'no_telp1',
        'no_telp2',
        'no_fax',
        'no_wa',
        'youtube',
        'facebook' 
    ];
protected $casts = [
        'published' => 'boolean',
    ];
    public function toSearchableArray(): array
    {
       return [
'alamat'=>$this->alamat,
        'email'=>$this->email,
        'garis_lintang'=>$this->garis_lintang,
        'garis_bujur'=>$this->garis_bujur,
        'no_telp1'=>$this->no_telp1,
        'no_telp2'=>$this->no_telp2,
        'no_fax'=>$this->no_telp2,
        'no_wa'=>$this->no_wa,
        'youtube'=>$this->YouTube,
        'facebook'=>$this->facebook
];
    }
}
