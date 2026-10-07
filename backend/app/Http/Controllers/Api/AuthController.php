<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Authenticate Admin User & Issue Sanctum API Token
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        $email = trim(strtolower($request->email));
        // Support login via email or username 'admin'
        $user = User::where('email', $email)->first();
        if (!$user && $email === 'admin') {
            $user = User::where('email', 'admin@ifiruled.world')->first();
        }

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid executive credentials. Access denied.'
            ], 401);
        }

        // Revoke older tokens if needed and create fresh token
        $token = $user->createToken('admin-command-token')->plainTextToken;

        $userData = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
        ];

        return response()->json([
            'success' => true,
            'message' => 'Authentication successful. Welcome to the Executive Desk.',
            'token' => $token,
            'user' => $userData,
            'data' => [
                'token' => $token,
                'user' => $userData,
            ]
        ]);
    }

    /**
     * Get Authenticated User Details
     */
    public function user(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'success' => true,
            'user' => $user,
            'data' => $user
        ]);
    }

    /**
     * Revoke Current Token / Logout
     */
    public function logout(Request $request)
    {
        if ($request->user()) {
            $request->user()->currentAccessToken()->delete();
        }

        return response()->json([
            'success' => true,
            'message' => 'Successfully logged out of executive session.'
        ]);
    }
}
