<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Subscriber;
use Illuminate\Http\Request;

class NewsletterController extends Controller
{
    public function subscribe(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|max:255',
        ]);

        $subscriber = Subscriber::firstOrCreate(
            ['email' => $validated['email']],
            ['is_active' => true]
        );

        return response()->json([
            'success' => true,
            'message' => 'Successfully enrolled in the Cabinet newsletter.'
        ]);
    }
}
