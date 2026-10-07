<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'inquiry_type' => 'required|string|max:100',
            'message' => 'required|string',
        ]);

        $contact = Contact::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Dispatch transmitted to the executive desk.',
            'data' => $contact
        ], 201);
    }
}
