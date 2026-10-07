<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Episode;
use App\Models\PresidentialApplication;
use App\Models\Idea;
use App\Models\Subscriber;
use App\Models\Contact;
use App\Models\Setting;
use App\Services\CacheService;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Dashboard Overview Metrics & Real-time Stats
     */
    public function stats()
    {
        $stats = CacheService::remember('admin:stats', CacheService::TTL_MICRO, function () {
            return [
                'total_episodes' => Episode::count(),
                'total_applications' => PresidentialApplication::count(),
                'pending_applications' => PresidentialApplication::where('status', 'pending')->count(),
                'shortlisted_applications' => PresidentialApplication::where('status', 'shortlisted')->count(),
                'total_ideas' => Idea::count(),
                'pending_ideas' => Idea::where('is_approved', false)->count(),
                'total_subscribers' => Subscriber::count(),
                'total_contacts' => Contact::count(),
                'is_live' => Setting::get('is_live', 'false') === 'true',
                'live_stream_url' => Setting::get('live_stream_url', 'https://youtube.com/live/dQw4w9WgXcQ'),
                'next_broadcast_datetime' => Setting::get('next_broadcast_datetime', '2026-09-03 20:00:00'),
                'broadcast_notice' => Setting::get('broadcast_notice', 'Every Thursday • 8:00 PM BST on ifiruled.world'),
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $stats
        ]);
    }

    /**
     * Episodes Management (Full CRUD with Auto Cache-Invalidation)
     */
    public function episodes()
    {
        $episodes = Episode::orderBy('episode_number', 'desc')->get();
        return response()->json([
            'success' => true,
            'data' => $episodes
        ]);
    }

    public function storeEpisode(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'episode_number' => 'required|integer',
            'guest_name' => 'required|string|max:255',
            'guest_role' => 'required|string|max:255',
            'guest_photo' => 'nullable|url',
            'air_date' => 'required|string',
            'duration' => 'required|string',
            'topic' => 'required|in:Economy,Security,Education,Environment,Foreign Policy,Social Justice',
            'executive_summary' => 'required|string',
            'key_decrees' => 'required|array',
            'youtube_id' => 'required|string',
            'quote' => 'required|string',
            'featured' => 'boolean',
        ]);

        $validated['slug'] = 'ep-' . $validated['episode_number'] . '-' . \Illuminate\Support\Str::slug($validated['guest_name']);
        
        if ($validated['featured'] ?? false) {
            Episode::where('featured', true)->update(['featured' => false]);
        }

        $episode = Episode::create($validated);
        CacheService::forgetEpisodes();

        return response()->json([
            'success' => true,
            'message' => 'Episode published successfully to archive',
            'data' => $episode
        ], 201);
    }

    public function updateEpisode(Request $request, $id)
    {
        $episode = Episode::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'episode_number' => 'sometimes|required|integer',
            'guest_name' => 'sometimes|required|string|max:255',
            'guest_role' => 'sometimes|required|string|max:255',
            'guest_photo' => 'nullable|url',
            'air_date' => 'sometimes|required|string',
            'duration' => 'sometimes|required|string',
            'topic' => 'sometimes|required|in:Economy,Security,Education,Environment,Foreign Policy,Social Justice',
            'executive_summary' => 'sometimes|required|string',
            'key_decrees' => 'sometimes|required|array',
            'youtube_id' => 'sometimes|required|string',
            'quote' => 'sometimes|required|string',
            'featured' => 'boolean',
        ]);

        if (isset($validated['featured']) && $validated['featured']) {
            Episode::where('id', '!=', $id)->update(['featured' => false]);
        }

        $episode->update($validated);
        CacheService::forgetEpisodes();

        return response()->json([
            'success' => true,
            'message' => 'Episode updated successfully',
            'data' => $episode
        ]);
    }

    public function toggleFeatured($id)
    {
        $episode = Episode::findOrFail($id);
        $newFeatured = !$episode->featured;

        if ($newFeatured) {
            Episode::where('featured', true)->update(['featured' => false]);
        }

        $episode->featured = $newFeatured;
        $episode->save();
        CacheService::forgetEpisodes();

        return response()->json([
            'success' => true,
            'message' => $newFeatured ? 'Marked as Featured Episode' : 'Removed from Featured status',
            'data' => $episode
        ]);
    }

    public function deleteEpisode($id)
    {
        $episode = Episode::findOrFail($id);
        $episode->delete();
        CacheService::forgetEpisodes();

        return response()->json([
            'success' => true,
            'message' => 'Episode deleted successfully'
        ]);
    }

    /**
     * Candidate Applications Pipeline
     */
    public function applications(Request $request)
    {
        $query = PresidentialApplication::query();

        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        $applications = $query->orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $applications
        ]);
    }

    public function updateApplicationStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,shortlisted,scheduled,rejected'
        ]);

        $app = PresidentialApplication::findOrFail($id);
        $app->status = $validated['status'];
        $app->save();
        CacheService::forgetEpisodes();

        return response()->json([
            'success' => true,
            'message' => 'Application status updated to: ' . strtoupper($app->status),
            'data' => $app
        ]);
    }

    public function deleteApplication($id)
    {
        $app = PresidentialApplication::findOrFail($id);
        $app->delete();
        CacheService::forgetEpisodes();

        return response()->json([
            'success' => true,
            'message' => 'Application record deleted'
        ]);
    }

    /**
     * Ideas / Manifesto Moderation
     */
    public function allIdeas()
    {
        $ideas = Idea::orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $ideas
        ]);
    }

    public function toggleIdeaApproval($id)
    {
        $idea = Idea::findOrFail($id);
        $idea->is_approved = !$idea->is_approved;
        $idea->save();
        CacheService::forgetIdeas();

        return response()->json([
            'success' => true,
            'message' => $idea->is_approved ? 'Idea approved for public wall' : 'Idea hidden from public wall',
            'data' => $idea
        ]);
    }

    public function deleteIdea($id)
    {
        $idea = Idea::findOrFail($id);
        $idea->delete();
        CacheService::forgetIdeas();

        return response()->json([
            'success' => true,
            'message' => 'Policy idea removed'
        ]);
    }

    /**
     * Subscribers & Contacts
     */
    public function subscribers()
    {
        return response()->json([
            'success' => true,
            'data' => Subscriber::orderBy('created_at', 'desc')->get()
        ]);
    }

    public function deleteSubscriber($id)
    {
        Subscriber::findOrFail($id)->delete();
        CacheService::forgetEpisodes();
        return response()->json([
            'success' => true,
            'message' => 'Subscriber removed'
        ]);
    }

    public function contacts()
    {
        return response()->json([
            'success' => true,
            'data' => Contact::orderBy('created_at', 'desc')->get()
        ]);
    }

    public function deleteContact($id)
    {
        Contact::findOrFail($id)->delete();
        CacheService::forgetEpisodes();
        return response()->json([
            'success' => true,
            'message' => 'Dispatch removed'
        ]);
    }

    /**
     * Broadcast & Site Settings
     */
    public function getSettings()
    {
        $settings = CacheService::remember('site:settings', CacheService::TTL_SHORT, function () {
            return [
                'is_live' => Setting::get('is_live', 'false') === 'true',
                'live_stream_url' => Setting::get('live_stream_url', 'https://youtube.com/live/dQw4w9WgXcQ'),
                'next_broadcast_datetime' => Setting::get('next_broadcast_datetime', '2026-09-03 20:00:00'),
                'broadcast_notice' => Setting::get('broadcast_notice', 'Every Thursday • 8:00 PM BST'),
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $settings
        ]);
    }

    public function updateSettings(Request $request)
    {
        $validated = $request->validate([
            'is_live' => 'required|boolean',
            'live_stream_url' => 'nullable|string',
            'next_broadcast_datetime' => 'nullable|string',
            'broadcast_notice' => 'nullable|string',
        ]);

        Setting::set('is_live', $validated['is_live'] ? 'true' : 'false');
        if (isset($validated['live_stream_url'])) {
            Setting::set('live_stream_url', $validated['live_stream_url']);
        }
        if (isset($validated['next_broadcast_datetime'])) {
            Setting::set('next_broadcast_datetime', $validated['next_broadcast_datetime']);
        }
        if (isset($validated['broadcast_notice'])) {
            Setting::set('broadcast_notice', $validated['broadcast_notice']);
        }

        CacheService::forgetSettings();

        return response()->json([
            'success' => true,
            'message' => 'Broadcast configuration successfully saved to database',
            'data' => $this->getSettings()->getData()->data
        ]);
    }
}
