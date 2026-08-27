<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;


class data_yayasan extends Model
{
    use HasFactory, Searchable;

    protected $table = 'data_yayasans';
    protected $primaryKey = 'yayasan_id';

    protected $fillable = [
        'alamat',
        'email',
        'garis_lintang',
        'garis_bujur',
        'no_telp1',
        'no_telp2',
        'no_fax',
        'no_wa',
        'youtube',
        'facebook',
    ];

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

    public function toSearchableArray(): array
    {
       return [
'alamat'=>$this->alamat,
        'email'=>$this->email,
        'garis_lintang'=>$this->garis_lintang,
        'garis_bujur'=>$this->garis_bujur,
        'no_telp1'=>$this->no_telp1,
        'no_telp2'=>$this->no_telp2,
        'no_fax'=>$this->no_fax,
        'no_wa'=>$this->no_wa,
        'youtube'=>$this->youtube,
        'facebook'=>$this->facebook
];
    }
}
