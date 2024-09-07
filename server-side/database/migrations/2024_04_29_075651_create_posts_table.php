<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->integer('category_id');
            $table->integer('sub_category_id')->nullable();
            $table->integer('sub_sub_category_id')->nullable();
            $table->longText('description');
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->text('tags')->nullable();
            $table->integer('popular_count')->default(0);
            $table->string('photo')->nullable();
            $table->boolean('trash')->default(false);
            $table->boolean('status')->default(true);
            $table->boolean('is_headline')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
