<?php

namespace App\Models;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Admin extends User
{
    use HasFactory;
    protected $guarded = [];

    public function getRole()
    {
        return $this->belongsTo(Role::class, 'role_id', "id");
    }
}
