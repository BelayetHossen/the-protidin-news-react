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
        Schema::create('ad_banners', function (Blueprint $table) {
            $table->id();
            $table->string('homead1')->nullable();
            $table->string('homead2')->nullable();
            $table->string('homead3')->nullable();
            $table->string('homead4')->nullable();
            $table->string('rightad1')->nullable();
            $table->string('rightad2')->nullable();
            $table->string('rightad3')->nullable();
            $table->string('rightad4')->nullable();
            $table->string('rightad5')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ad_banners');
    }
};
