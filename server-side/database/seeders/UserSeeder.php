<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
    //    User::create([
    //         'fname' => 'Admin',
    //         'lname' => 'User',
    //         'email' => 'admin@gmail.com',
    //         'phone' => '01788036222',
    //         'username' => 'admin',
    //         'gender' => 'Male',
    //         'role_id' => 1,
    //         'password' => bcrypt('123456'),
    //     ]);
        User::create([
            'fname' => 'Admin',
            'lname' => 'User',
            'email' => 'admin@gmail.com',
            'phone' => '01788036222',
            'username' => 'admin',
            'gender' => 'Male',
            'password' => bcrypt('123456'),
            'role_id' => 1,
        ]);
    }
}
