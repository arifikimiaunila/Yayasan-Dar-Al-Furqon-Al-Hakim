<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Permission;
use App\Models\Role;

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
'admin2',
'Admin 2',
'Admin mengatur file dan video.'
],
[
'superadmin',
'Super Admin',
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
'video.store',
'Simpan video',
'Simpan video baru.'
],
[
'video.choose',
'Pilih video',
'Pilih video tertentu.'
],
[
'video.update',
'Update video',
'Simpan pembaruan video yang ada'
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
'file.store',
'Simpan file',
'Simpan file baru'
],
[
'file.choose',
'Pilih file',
'Pilih file tertentu'
],
[
'file.edit',
'Edit file',
'Perbarui file yang ada'
],
[
'file.update',
'Update file',
'Simpan pembaruan file yang ada'
],
[
'file.destroy',
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
'pengurus_yayasan.update',
'Update Pengurus Yayasan',
'Simpan pembaruan data pengurus yayasan.'
],
[
'pengurus_yayasan.choose',
'Pilih Pengurus Yayasan',
'Pilih pengurus yayasan tertentu.'
],
[
'pengurus_yayasan.store',
'Simpan Pengurus Yayasan',
'Simpan data pengurus yayasan baru.'
],
[
 'post.create',
'Buat post',
'Buat post baru.'
],
[
'post.store',
'Simpan post',
'Simpan post baru.'
],
[
 'post.choose',
'Pilih post',
'Pilih post tertentu.'
],
[
 'post.update',
'Update post',
'Simpan pembaruan post yang ada'
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
'data_yayasan.store',
'Simpan Data Yayasan',
'Simpan data yayasan baru.'
],
[
'data_yayasan.edit',
'Edit Data Yayasan',
'Perbarui data yayasan.'
],
[
'data_yayasan.update',
'Update Data Yayasan',
'Simpan pembaruan data yayasan.'
],
 [
'user.show',
'Lihat Pengguna',
'Lihat data para admin.'
 ],
 [
'user.index',
'Perbarui Pengguna',
'Perbarui data para admin.'
 ],
 [
'user.delete',
'Hapus Pengguna',
'Hapus data para admin.'
 ]
 );

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
'pengurus_yayasan.update',
'pengurus_yayasan.store',
'pengurus_yayasan.choose',
'post.create',
'post.edit',
'post.store',
'post.choose',
'post.update',
'profile.show', 
'profile.update',
'profile.delete',
'team-invitations.accept',
'team-invitations.reject'
]);

$admin2 = Role::find(2);
$admin2->givePermissions([
'video.create',
'video.edit', 
'video.store',
'video.update',
'video.delete',
'video.choose',
'files.create', 
'files.edit',
'files.store',
'files.choose',
'files.update',
'files.delete',
'profile.show',
'profile.update',
'profile.delete',
'team-invitations.accept'
,'team-invitations.reject'
]);

$role3=Role::find(3);
$role3->givePermissions([
'video.create',
'video.edit', 
'video.delete',
'video.store',
'video.update',
'video.choose',
'files.create', 
'files.edit',
'files.store',
'files.choose',
'files.update',
'files.delete',
'pengurus_yayasan.create', 
'pengurus_yayasan.edit', 
'pengurus_yayasan.delete',
'pengurus_yayasan.update',
'pengurus_yayasan.store',
'pengurus_yayasan.choose',
'post.create',
'post.edit',
'post.store',
'post.choose',
'post.update', 
'data_yayasan.create',
'data_yayasan.edit',
'data_yayasan.store',
'data_yayasan.update',
'user.index',
'user.show',
'user.delete',
'team.index',
'team.role_store',
'team.role_update',
'team.show',
'team.delete',
'profile.show',
'profile.update',
'profile.delete',
'team-invitations.store',
'team-invitations.accept',
'team-invitations.reject',
'users.roles.assign', 
'users.roles.remove'
]);
}
}
