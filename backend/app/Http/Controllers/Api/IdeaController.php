<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Idea;
use App\Services\CacheService;
use App\Services\UpvoteService;
use Illuminate\Http\Request;

class IdeaController extends Controller
{
    /**
     * High-Throughput Ideas Leaderboard
     */
    public function index(Request $request)
    {
        $topic = $request->query('topic', 'All');
        $cacheKey = "ideas:approved:t_{$topic}";

        $ideas = CacheService::remember($cacheKey, CacheService::TTL_SHORT, function () use ($topic) {
            $query = Idea::where('is_approved', true);

            if ($topic !== 'All') {
                $query->where('topic', $topic);
            }

            return $query->orderBy('upvotes', 'desc')->limit(50)->get();
        });

        $etag = CacheService::generateEtag($ideas);
        if ($request->header('If-None-Match') === $etag) {
            return response(null, 304);
        }

        return response()->json([
            'success' => true,
            'data' => $ideas
        ])
        ->header('ETag', $etag)
        ->header('Cache-Control', 'public, max-age=15, s-maxage=60, stale-while-revalidate=120');
    }

    /**
     * Submit Policy Idea
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'author_name' => 'required|string|max:191',
            'author_role' => 'required|string|max:191',
            'location' => 'required|string|max:191',
            'topic' => 'required|string|max:100',
            'title' => 'required|string|max:255',
            'content' => 'required|string|max:2000',
        ]);

        $idea = Idea::create($validated);
        CacheService::forgetIdeas();

        return response()->json([
            'success' => true,
            'message' => 'Policy decree published to the manifesto wall.',
            'data' => $idea
        ], 201);
    }

    /**
     * High-Concurrency Upvote with Atomic Lock Elimination
     */
    public function upvote(Request $request, $id)
    {
        $identifier = $request->ip() . '_' . substr($request->userAgent() ?? '', 0, 32);
        $result = UpvoteService::processUpvote((int)$id, $identifier);

        return response()->json($result);
    }
}
