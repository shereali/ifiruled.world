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
        Schema::create('ideas', function (Blueprint $table) {
            $table->id();
            $table->string('author_name', 191);
            $table->string('author_role', 191);
            $table->string('location', 191);
            $table->string('topic', 100);
            $table->string('title', 255);
            $table->mediumText('content');
            $table->unsignedBigInteger('upvotes')->default(1);
            $table->boolean('is_approved')->default(true);
            $table->timestamps();

            // Covering Indices for High-Throughput Leaderboard Queries
            $table->index(['is_approved', 'topic', 'upvotes'], 'idx_ideas_leaderboard_topic');
            $table->index(['is_approved', 'upvotes'], 'idx_ideas_leaderboard_all');
            $table->index(['created_at', 'is_approved'], 'idx_ideas_recent');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ideas');
    }
};
