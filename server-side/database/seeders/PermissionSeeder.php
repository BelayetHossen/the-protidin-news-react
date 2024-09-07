<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::create([
            'name' => 'Dashboard',
            'slug' => 'dashboard',
        ]);

        Permission::create([
            'name' => 'Users',
            'slug' => 'users',
        ]);

        Permission::create([
            'name' => 'Settings',
            'slug' => 'settings',
        ]);
    }
}
