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
        Schema::create('presidential_applications', function (Blueprint $table) {
            $table->id();
            $table->string('full_name', 191);
            $table->unsignedTinyInteger('age')->index();
            $table->string('email', 191)->index();
            $table->string('phone', 50);
            $table->string('location', 191);
            $table->string('topic', 100)->index();
            $table->string('first_decree_title', 255);
            $table->mediumText('manifesto');
            $table->string('pitch_url', 500)->nullable();
            $table->string('linkedin', 500)->nullable();
            $table->string('social_handle', 100)->nullable();
            $table->enum('status', ['pending', 'shortlisted', 'scheduled', 'rejected'])->default('pending')->index();
            $table->timestamps();

            // Pipeline Filter Indices
            $table->index(['status', 'created_at'], 'idx_apps_status_date');
            $table->index(['topic', 'status'], 'idx_apps_topic_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('presidential_applications');
    }
};
