<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Task;
use App\Http\Controllers\RegisterController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/Preview', function () {
    return Inertia::render('Preview');
});

Route::get('/register', function () {
    return Inertia::render('Register');
})->name('Register');

Route::post('/register', [RegisterController::class, 'store']);

Route::get('/login', function () {
    return Inertia::render('Login');
})->name('Login');

Route::prefix('tasks')->group(function () {
    Route::get('/tasks', function () {
        return Inertia::render('Tasks');
    })->name('Tasks');

    Route::get('/tasks/:id/edit', function () {
        return Inertia::render('Tasks/[id]/Edit');
    })->name('Tasks.Edit');

    Route::get('/tasks/new', function () {
        return Inertia::render('Tasks');
    })->name('Tasks.New');
});

Route::get('/profile', function () {
    return Inertia::render('Profile');
})->name('Profile');
