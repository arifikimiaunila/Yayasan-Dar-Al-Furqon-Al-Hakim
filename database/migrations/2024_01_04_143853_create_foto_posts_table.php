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
        Schema::create('foto_posts', function (Blueprint $table) {
            $table->id('foto_id');
			$table->char('nama_foto', 100);
			 $table->text('deskripsi');
			$table->string('gambar',2048);
			 $table->string('nama_fotografer', 100);
			$table->timestamps();
			$table->foreignid('post_id')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('foto_posts');
    }
};
