<?php 
namespace App\Observers; 

use App\Models\User; 

class UserObserver { 
public function roleAdded(User $user, $role, $team) {
 //
 } 
public function roleSynced(User $user, $changes, $team) { 
//
 } 
}
