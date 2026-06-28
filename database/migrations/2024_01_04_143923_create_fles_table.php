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
        Schema::create('fles', function (Blueprint $table) {
            $table->id('file_id');
            $table->char('nama_file', 100);
			$table->text('deskripsi');
			$table->string('nama_pembuat', 100);
      $table->boolean('published');
			$table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fles');
    }
};
