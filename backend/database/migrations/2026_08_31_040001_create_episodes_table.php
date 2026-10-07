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
        Schema::create('episodes', function (Blueprint $table) {
            $table->id();
            $table->string('slug', 191)->unique();
            $table->unsignedInteger('episode_number')->index();
            $table->string('title', 255);
            $table->string('guest_name', 191);
            $table->string('guest_role', 191);
            $table->string('guest_photo', 500)->nullable();
            $table->string('air_date', 100);
            $table->string('duration', 50);
            $table->enum('topic', ['Economy', 'Security', 'Education', 'Environment', 'Foreign Policy', 'Social Justice']);
            $table->text('executive_summary');
            $table->json('key_decrees');
            $table->string('youtube_id', 100)->index();
            $table->unsignedBigInteger('views_count')->default(0)->index();
            $table->boolean('featured')->default(false);
            $table->text('quote');
            $table->timestamps();

            // High-Scale Compound Indices
            $table->index(['featured', 'episode_number'], 'idx_episodes_featured_num');
            $table->index(['topic', 'created_at'], 'idx_episodes_topic_date');
            $table->index(['created_at', 'id'], 'idx_episodes_chronological');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('episodes');
    }
};
