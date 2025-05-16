<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        // ログインユーザーのタスク一覧取得
        $user = $request->user();
        $tasks = Task::where('user_id', $user->id)->orderBy('due_date', 'asc')->get();

        return Inertia::render('Tasks/page', [
            'tasks' => $tasks,
        ]);
    }

    public function store(Request $request)
{
    $user = $request->user();

    $task = Task::create([
        'title' => $request->input('title'),
        'description' => $request->input('description'),
        'due_date' => $request->input('due_date'),
        'status' => $request->input('status'),
        'user_id' => $user->id,
    ]);

    return redirect()->route('Tasks');
}
}
