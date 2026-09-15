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
        Schema::create('videos', function (Blueprint $table) {
            $table->id('no_video');
			$table->string('title', 2048);
			$table->string('link', 2048);
            $table->text('description')->nullable();
            $table->boolean('published')->default(false);
			$table->timestampTz('upload_tanggal', $precision = 0);
            $table->timestamps();	
            $table->foreignId('user_id')->constrained('users', 'user_id');		
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('videos');
    }
};
