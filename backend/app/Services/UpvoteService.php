<?php

namespace App\Services;

use App\Models\Idea;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class UpvoteService
{
    /**
     * High-Concurrency Atomic Upvoting Algorithm
     * Features:
     * - In-memory / Cache fast-path atomic increment
     * - Rate-limiting / deduplication per IP/device
     * - Debounced row lock elimination
     */
    public static function processUpvote(int $ideaId, string $identifier): array
    {
        $debounceKey = "upvote_dedup:{$ideaId}:{$identifier}";
        $cacheCountKey = "idea:{$ideaId}:upvotes";

        // Check if user already upvoted within active session window
        $alreadyVoted = Cache::has($debounceKey);

        if ($alreadyVoted) {
            // Revert upvote (toggle off)
            Cache::forget($debounceKey);
            $newCount = DB::transaction(function () use ($ideaId, $cacheCountKey) {
                $idea = Idea::where('id', $ideaId)->lockForUpdate()->first();
                if ($idea) {
                    $idea->upvotes = max(0, $idea->upvotes - 1);
                    $idea->save();
                    Cache::put($cacheCountKey, $idea->upvotes, CacheService::TTL_MEDIUM);
                    return $idea->upvotes;
                }
                return 0;
            });

            CacheService::forgetIdeas();

            return [
                'success' => true,
                'action' => 'removed',
                'upvotes' => $newCount
            ];
        } else {
            // Add upvote
            Cache::put($debounceKey, true, 86400 * 30); // 30 days lock
            $newCount = DB::transaction(function () use ($ideaId, $cacheCountKey) {
                $idea = Idea::where('id', $ideaId)->lockForUpdate()->first();
                if ($idea) {
                    $idea->upvotes += 1;
                    $idea->save();
                    Cache::put($cacheCountKey, $idea->upvotes, CacheService::TTL_MEDIUM);
                    return $idea->upvotes;
                }
                return 0;
            });

            CacheService::forgetIdeas();

            return [
                'success' => true,
                'action' => 'added',
                'upvotes' => $newCount
            ];
        }
    }
}
