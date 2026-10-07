<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;

class CacheService
{
    const TTL_LONG = 3600;      // 1 hour for static records
    const TTL_MEDIUM = 300;     // 5 minutes for listings
    const TTL_SHORT = 30;       // 30 seconds for live counters/metrics
    const TTL_MICRO = 5;        // 5 seconds for volatile feeds

    /**
     * Cache-Aside Fetch or Store Pattern
     */
    public static function remember(string $key, int $ttl, \Closure $callback)
    {
        return Cache::remember($key, $ttl, $callback);
    }

    /**
     * Selective Invalidation Tags / Keys
     */
    public static function forgetEpisodes()
    {
        Cache::forget('episodes:all');
        Cache::forget('episodes:featured');
        Cache::forget('admin:stats');
    }

    public static function forgetIdeas()
    {
        Cache::forget('ideas:approved:all');
        Cache::forget('admin:ideas');
        Cache::forget('admin:stats');
    }

    public static function forgetSettings()
    {
        Cache::forget('site:settings');
        Cache::forget('admin:stats');
    }

    /**
     * Generate Strong HTTP ETag for 304 Not Modified Caching
     */
    public static function generateEtag($data): string
    {
        return '"' . md5(json_encode($data)) . '"';
    }
}
