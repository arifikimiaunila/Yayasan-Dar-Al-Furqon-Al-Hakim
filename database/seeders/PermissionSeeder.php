<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use App\Models\User;
use Spatie\Permission\Models\Role;
     
        class PermissionSeeder extends Seeder { 
public function run(): void {
 //Some initially role configuration 
$roles = [
 'Admin 1' ,
'Admin 2',
 'Super Admin'
]; 
$permissions=[
 'video.create',
'video.edit',
 'video.delete',
  'file.create',
        'file.edit',
         'file.delete',
        'pengurus_yayasan.create',
       'pengurus_yayasan.edit',
        'pengurus_yayasan.delete',
         'post.edit',
        'post.update',
         'users.edit',
'token.delete'
 ];
foreach($roles as $role){
Role::create(['name'=>$role]);
};
foreach($permissions as $permission){
Permission::create(['name'=>$permission]);
};

$admin1 = Role::findByName('Admin 1');
$admin1->givePermissionTo([
 'pengurus_yayasan.create',
       'pengurus_yayasan.edit',
        'pengurus_yayasan.delete',
         'post.edit',
        'post.update',
'token.delete'
]);

$admin2 = Role::findByName('Admin 2');
$admin2->givePermissionTo([
 'video.create',
'video.edit',
 'video.delete',
  'file.create',
        'file.edit',
         'file.delete',
'token.delete'
]);

$superadmin=User::factory()->create([
'id'=>'018d4f70-d122-7132-a0b2-bacf7a94e57d',
  'name' => 'Arif Irawan', 
            'email' => 'arifikimiaunila@gmail.com',
            'password' => bcrypt('$supera20$')
        ]);

$superadmin->assignRole('Super Admin');
$role3=Role::findByName('Super Admin');
$role3->givePermissionTo([
'video.create',
'video.edit',
 'video.delete',
  'file.create',
        'file.edit',
         'file.delete',
      'pengurus_yayasan.create',
       'pengurus_yayasan.edit',
      'pengurus_yayasan.delete',
         'post.edit',
        'post.update',
         'users.edit',
'token.delete'
]);
} 
}