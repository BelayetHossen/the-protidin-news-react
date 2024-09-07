<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::create([
            'name' => 'জাতীয়',
            'slug' => Str::slug('জাতীয়'),
            'show_home' => 1,
        ]);
        Category::create([
            'name' => 'রাজনীতি',
            'slug' => Str::slug('রাজনীতি'),
            'show_home' => 1,
        ]);
        Category::create([
            'name' => 'আন্তর্জাতিক',
            'slug' => Str::slug('আন্তর্জাতিক'),
            'show_home' => 1,
        ]);
        Category::create([
            'name' => 'খেলা',
            'slug' => Str::slug('খেলা'),
            'show_home' => 1,
        ]);
        Category::create([
            'name' => 'বিনোদন',
            'slug' => Str::slug('বিনোদন'),
            'show_home' => 1,
        ]);
        Category::create([
            'name' => 'অর্থনীতি',
            'slug' => Str::slug('অর্থনীতি'),
            'show_home' => 1,
        ]);
        Category::create([
            'name' => 'সারাদেশ',
            'slug' => Str::slug('সারাদেশ'),
            'show_home' => 0,
        ]);
        Category::create([
            'name' => 'যোগাযোগ',
            'slug' => Str::slug('যোগাযোগ'),
            'show_home' => 0,
        ]);
        Category::create([
            'name' => 'অপরাধ',
            'slug' => Str::slug('অপরাধ'),
            'show_home' => 0,
        ]);
        Category::create([
            'name' => 'শিক্ষা',
            'slug' => Str::slug('শিক্ষা'),
            'show_home' => 0,
        ]);
        Category::create([
            'name' => 'নির্বাচন',
            'slug' => Str::slug('নির্বাচন'),
            'show_home' => 0,
        ]);
        Category::create([
            'name' => 'প্রবাস',
            'slug' => Str::slug('প্রবাস'),
            'show_home' => 0,
        ]);
        Category::create([
            'name' => 'বিজ্ঞান-প্রযুক্তি',
            'slug' => Str::slug('বিজ্ঞান-প্রযুক্তি'),
            'show_home' => 0,
        ]);
        Category::create([
            'name' => 'লাইফস্টাইল',
            'slug' => Str::slug('লাইফস্টাইল'),
            'show_home' => 0,
        ]);
        Category::create([
            'name' => 'রাজধানী',
            'slug' => Str::slug('রাজধানী'),
            'show_home' => 0,
        ]);
        Category::create([
            'name' => 'দুর্ঘটনা',
            'slug' => Str::slug('দুর্ঘটনা'),
            'show_home' => 0,
        ]);
        Category::create([
            'name' => 'স্বাস্থ্য',
            'slug' => Str::slug('স্বাস্থ্য'),
            'show_home' => 0,
        ]);
        Category::create([
            'name' => 'ইসলাম',
            'slug' => Str::slug('ইসলাম'),
            'show_home' => 0,
        ]);
        Category::create([
            'name' => 'সাহিত্য',
            'slug' => Str::slug('সাহিত্য'),
            'show_home' => 0,
        ]);
    }
}
