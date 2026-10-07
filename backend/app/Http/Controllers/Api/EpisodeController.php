<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Episode;
use App\Services\CacheService;
use Illuminate\Http\Request;

class EpisodeController extends Controller
{
    /**
     * Highly Scalable Episode Listing with Cache-Aside & ETag Optimization
     */
    public function index(Request $request)
    {
        $topic = $request->query('topic', 'All');
        $search = trim($request->query('search', ''));
        $cacheKey = "episodes:list:t_{$topic}:s_" . md5($search);

        $episodes = CacheService::remember($cacheKey, CacheService::TTL_MEDIUM, function () use ($topic, $search) {
            $query = Episode::query();

            if ($topic !== 'All' && in_array($topic, ['Economy', 'Security', 'Education', 'Environment', 'Foreign Policy', 'Social Justice'])) {
                $query->where('topic', $topic);
            }

            if (!empty($search)) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                      ->orWhere('guest_name', 'like', "%{$search}%")
                      ->orWhere('executive_summary', 'like', "%{$search}%");
                });
            }

            return $query->orderBy('episode_number', 'desc')->get();
        });

        $etag = CacheService::generateEtag($episodes);
        if ($request->header('If-None-Match') === $etag) {
            return response(null, 304);
        }

        return response()->json([
            'success' => true,
            'data' => $episodes
        ])
        ->header('ETag', $etag)
        ->header('Cache-Control', 'public, max-age=60, s-maxage=300, stale-while-revalidate=600');
    }

    /**
     * Single Episode with Cache-Aside
     */
    public function show(Request $request, $slug)
    {
        $cacheKey = "episode:slug:{$slug}";

        $episode = CacheService::remember($cacheKey, CacheService::TTL_LONG, function () use ($slug) {
            return Episode::where('slug', $slug)->first();
        });

        if (!$episode) {
            return response()->json([
                'success' => false,
                'message' => 'Episode not found'
            ], 404);
        }

        $etag = CacheService::generateEtag($episode);
        if ($request->header('If-None-Match') === $etag) {
            return response(null, 304);
        }

        return response()->json([
            'success' => true,
            'data' => $episode
        ])
        ->header('ETag', $etag)
        ->header('Cache-Control', 'public, max-age=120, s-maxage=600, stale-while-revalidate=1200');
    }

    /**
     * Featured Episode for Homepage Hero
     */
    public function featured(Request $request)
    {
        $featured = CacheService::remember('episodes:featured', CacheService::TTL_LONG, function () {
            return Episode::where('featured', true)->first() ?? Episode::orderBy('episode_number', 'desc')->first();
        });

        $etag = CacheService::generateEtag($featured);
        if ($request->header('If-None-Match') === $etag) {
            return response(null, 304);
        }

        return response()->json([
            'success' => true,
            'data' => $featured
        ])
        ->header('ETag', $etag)
        ->header('Cache-Control', 'public, max-age=60, s-maxage=300');
    }
}
