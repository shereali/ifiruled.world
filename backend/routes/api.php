<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Http\Request;
use Illuminate\Cache\RateLimiting\Limit;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\EpisodeController;
use App\Http\Controllers\Api\ApplicationController;
use App\Http\Controllers\Api\IdeaController;
use App\Http\Controllers\Api\NewsletterController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\AdminController;

// Configure High-Throughput Rate Limiters
RateLimiter::for('api-read', function (Request $request) {
    return Limit::perMinute(1000)->by($request->ip());
});

RateLimiter::for('api-write', function (Request $request) {
    return Limit::perMinute(60)->by($request->ip());
});

RateLimiter::for('api-upvote', function (Request $request) {
    return Limit::perMinute(120)->by($request->ip());
});

RateLimiter::for('api-auth', function (Request $request) {
    return Limit::perMinute(15)->by($request->ip());
});

// Authentication Endpoints (Sanctum)
Route::prefix('auth')->group(function () {
    Route::middleware(['throttle:api-auth'])->post('/login', [AuthController::class, 'login']);
    Route::middleware(['auth:sanctum'])->get('/user', [AuthController::class, 'user']);
    Route::middleware(['auth:sanctum'])->post('/logout', [AuthController::class, 'logout']);
});

// 1. Public Read-Only Endpoints (High Throughput & Cached)
Route::middleware(['throttle:api-read'])->group(function () {
    Route::get('/episodes', [EpisodeController::class, 'index']);
    Route::get('/episodes/featured', [EpisodeController::class, 'featured']);
    Route::get('/episodes/{slug}', [EpisodeController::class, 'show']);
    Route::get('/settings', [AdminController::class, 'getSettings']);
    Route::get('/ideas', [IdeaController::class, 'index']);
});

// 2. High-Concurrency Upvote Endpoint
Route::middleware(['throttle:api-upvote'])->group(function () {
    Route::post('/ideas/{id}/upvote', [IdeaController::class, 'upvote']);
});

// 3. Public Ingestion Endpoints (Throttled for Spam & DoS Protection)
Route::middleware(['throttle:api-write'])->group(function () {
    Route::post('/applications', [ApplicationController::class, 'store']);
    Route::post('/ideas', [IdeaController::class, 'store']);
    Route::post('/newsletter/subscribe', [NewsletterController::class, 'subscribe']);
    Route::post('/contact', [ContactController::class, 'store']);
});

// 4. Executive Admin Management Endpoints (Can be protected with auth:sanctum)
Route::prefix('admin')->group(function () {
    Route::get('/stats', [AdminController::class, 'stats']);
    Route::get('/settings', [AdminController::class, 'getSettings']);
    Route::post('/settings', [AdminController::class, 'updateSettings']);
    
    // Episodes CMS
    Route::get('/episodes', [AdminController::class, 'episodes']);
    Route::post('/episodes', [AdminController::class, 'storeEpisode']);
    Route::put('/episodes/{id}', [AdminController::class, 'updateEpisode']);
    Route::post('/episodes/{id}/toggle-featured', [AdminController::class, 'toggleFeatured']);
    Route::delete('/episodes/{id}', [AdminController::class, 'deleteEpisode']);
    
    // Candidate Applications
    Route::get('/applications', [AdminController::class, 'applications']);
    Route::put('/applications/{id}/status', [AdminController::class, 'updateApplicationStatus']);
    Route::delete('/applications/{id}', [AdminController::class, 'deleteApplication']);
    
    // Manifesto Moderation
    Route::get('/ideas', [AdminController::class, 'allIdeas']);
    Route::put('/ideas/{id}/toggle-approval', [AdminController::class, 'toggleIdeaApproval']);
    Route::delete('/ideas/{id}', [AdminController::class, 'deleteIdea']);
    
    // Subscribers & Contacts
    Route::get('/subscribers', [AdminController::class, 'subscribers']);
    Route::delete('/subscribers/{id}', [AdminController::class, 'deleteSubscriber']);
    Route::get('/contacts', [AdminController::class, 'contacts']);
    Route::delete('/contacts/{id}', [AdminController::class, 'deleteContact']);
});
