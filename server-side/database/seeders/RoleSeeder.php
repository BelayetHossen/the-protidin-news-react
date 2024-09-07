<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create roles
        Role::create([
            'name' => 'Admin',
            'slug' => 'admin',
            'permissions' => json_encode([
                'Dashboard',
                'Users',
                'Settings',
                'Posts',
            ]),
        ]);
        Role::create([
            'name' => 'Editor',
            'slug' => 'editor',
            'permissions' => json_encode([
                'Dashboard',
                'Users',
            ]),
        ]);
        Role::create([
            'name' => 'Moderator',
            'slug' => 'moderator',
            'permissions' => json_encode([
                'Dashboard',
                'Users',
            ]),
        ]);
        Role::create([
            'name' => 'User',
            'slug' => 'user',
            'permissions' => json_encode([
                'Dashboard',
                'Users',
            ]),
        ]);

    }
}
