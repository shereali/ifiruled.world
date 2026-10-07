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
        Schema::create('contacts', function (Blueprint $table) {
            $table->id();
            $table->string('name', 191);
            $table->string('email', 191);
            $table->string('inquiry_type', 100)->index();
            $table->mediumText('message');
            $table->timestamps();

            $table->index(['inquiry_type', 'created_at'], 'idx_contacts_type_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contacts');
    }
};
