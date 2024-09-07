<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SubCategory extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function mainCategory()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }
    public function subSubCategory()
    {
        return $this->hasMany(SubSubCategory::class, 'sub_category_id', 'id');
    }
}
