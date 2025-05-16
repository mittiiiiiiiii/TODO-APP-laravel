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
}
