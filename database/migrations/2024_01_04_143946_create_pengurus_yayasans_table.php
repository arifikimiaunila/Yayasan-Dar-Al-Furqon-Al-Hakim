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
        Schema::create('pengurus_yayasans', function (Blueprint $table) {
            $table->id('id_pengurus');
			 $table->text('nama');
			 $table->text('dapukan');
			 $table->text('alamat')->nullable();
			 $table->tinyInteger('no_telp')->nullable();
     $table->text('kategori');
          $table->boolean('published');   
             $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengurus_yayasans');
    }
};
