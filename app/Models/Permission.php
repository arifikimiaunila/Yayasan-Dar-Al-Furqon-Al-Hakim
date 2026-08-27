<?php

namespace App\Models;

use Laratrust\Models\Permission as PermissionModel;

class Permission extends PermissionModel
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
