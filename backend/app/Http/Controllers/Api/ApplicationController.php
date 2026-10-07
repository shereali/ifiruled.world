<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PresidentialApplication;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'age' => 'required|integer|min:18|max:30',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:50',
            'location' => 'required|string|max:255',
            'topic' => 'required|string|max:100',
            'first_decree_title' => 'required|string|max:255',
            'manifesto' => 'required|string',
            'pitch_url' => 'nullable|url|max:500',
            'linkedin' => 'nullable|url|max:500',
            'social_handle' => 'nullable|string|max:255',
        ]);

        $application = PresidentialApplication::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Presidential candidacy application successfully registered.',
            'data' => $application
        ], 201);
    }
}
