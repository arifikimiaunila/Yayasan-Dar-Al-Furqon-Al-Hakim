<?php

namespace App\Models;

use Laratrust\Models\Role as RoleModel;

class Role extends RoleModel
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
