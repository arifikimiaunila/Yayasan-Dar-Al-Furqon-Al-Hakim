<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Create some roles and users and permissions
     */
    public function run(): void
    {
   $this->call(PermissionSeeder::class);
    }
}
