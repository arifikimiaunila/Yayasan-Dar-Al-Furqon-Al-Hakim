<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Permission;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Collection;

        class PermissionSeeder extends Seeder {
public function run(): void {
 //Some initially role configuration

$roles=array(
[
'admin1',
'Admin 1',
'Admin mengatur postingan dan pengurus yayasan.'
],
[
'admim2',
'Admin 2',
'Admin mengatur file dan video.'
],
[
'superadministrator',
'Super Admin1',
'Admin pengawas.'
]
);

foreach ($roles as $role) {
$kunci=collect(['name', 'display_name', 'description']);
$collection = $kunci->combine($role);
$x=$collection->all();
Role::create($x);
};

$permissions= array([
 'video.create',
'Buat video',
'Buat video baru.'
],
[
'video.edit',
'Edit video',
'Perbarui data video.'
],
[
'video.delete',
'Hapus video',
'Hapus video tertentu.'
],
[
'file.create',
'Buat file',
'Buat file baru'
],
[
'file.edit',
'Edit file',
'Perbarui file yang ada'
],
[
'file.delete',
'Hapus file',
'Hapus file yang ada.'
],
[
'pengurus_yayasan.create', 
'Buat Pengurus Yayasan',
'Buat data pengurus yayasan yang baru'
],
[
'pengurus_yayasan.edit', 
'Edit pengurus yayasan',
'Perbarui data pengurus yayasan'
],
[
'pengurus_yayasan.delete',
'Hapus Pengurus Yayasan',
'Hapus data pengurus yayasan.'
],
[
 'post.create',
'Buat post',
'Buat post baru.'
],
[
'post.edit', 
'Edit post',
'Edit post yang sudah ada.'
],
[
'data_yayasan.create',
'Buat Data Yayasan',
'Buat data yayasan baru.'
],
[
 'data_yayasan.edit',
'Edit Data Yayasan',
'Perbarui data yayasan.'
],
[
'users.edit',
'Edit Pengguna',
'Perbarui data para admin.'
 ]);

foreach ($permissions as $permission) {
$kunci=collect(['name', 'display_name', 'description']);
$collection = $kunci->combine($permission);
$x=$collection->all();
Permission::create($x);
};

$admin1 = Role::find(1);
$admin1->givePermissions([
'pengurus_yayasan.create', 
'pengurus_yayasan.edit', 
'pengurus_yayasan.delete',
'post.create',
'post.edit'
]);

$admin2 = Role::find(2);
$admin2->givePermissions([
'video.create',
'video.edit', 
'video.delete',
'file.create', 
'file.edit',
'file.delete'
]);

$role3=Role::find(3);
$role3->givePermissions([
'video.create',
'video.edit', 
'video.delete',
'file.create', 
'file.edit',
'file.delete',
'pengurus_yayasan.create', 
'pengurus_yayasan.edit', 
'pengurus_yayasan.delete',
 'post.create',
'post.edit', 
'data_yayasan.create',
 'data_yayasan.edit',
         'users.edit'
]);
}
}
