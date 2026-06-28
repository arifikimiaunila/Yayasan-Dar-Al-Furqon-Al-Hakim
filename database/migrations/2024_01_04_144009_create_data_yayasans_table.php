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
        Schema::create('data_yayasans', function (Blueprint $table) {
            $table->id('yayasan_id');          $table->text('alamat')->noActionOnUpdate();
            $table->tinytext('email');
            $table->double('garis_lintang', 6, 2)->noActionOnUpdate();
            $table->double('garis_bujur', 6, 2)->noActionOnUpdate();	$table->unsignedTinyInteger('no_telp1')->noActionOnUpdate();	$table->unsignedTinyInteger('no_telp2')->nullable()->noActionOnUpdate();	$table->unsignedTinyInteger('no_fax')->nullable()->noActionOnUpdate();	$table->unsignedTinyInteger('no_wa')->nullable()->noActionOnUpdate();	$table->tinyText('youtube')->nullable()->noActionOnUpdate();	$table->tinyText('facebook')->nullable()->noActionOnUpdate();
		});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_yayasans');
    }
};
