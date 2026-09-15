<?php

namespace App\Models;

use Laratrust\Models\Team as LaratrustTeam;

class Team extends LaratrustTeam
{
    public $guarded = [
'name',
'display_name',
'description'
];
public $visible = [
'display_name',
'description'
];
}
