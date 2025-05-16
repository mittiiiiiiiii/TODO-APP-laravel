import { router, usePage } from '@inertiajs/react';
import "@/sass/style.css";

type Task = {
    id: number;
    title: string;
    description?: string;
    status: string;
    due_date?: string;
};

type PageProps = {
    tasks: Task[];
};

export default function Tasks() {
    const { tasks } = usePage<PageProps>().props;

    const handleAddTask = () => {
        router.visit('/tasks/new');
    };

    const handleEditTask = (taskId: number) => {
        router.visit(`/tasks/${taskId}/edit`);
    };

    const handleDeleteTask = (taskId: number) => {
        router.delete(`/tasks/${taskId}`);
    };

    return (
        <div className="tasks-container">
            <div className="tasks-box">
                <h1 className="tasks-title">タスク一覧ページ</h1>
                <ul className="tasks-list">
                    {tasks.map((task) => (
                        <li key={task.id} className="tasks-list-item">
                            <span className="tasks-list-text">
                                {task.title}（{task.status}）
                                {task.description && ` 詳細: ${task.description}`}{" "}
                                {task.due_date && ` 締切: ${task.due_date}`}
                            </span>
                            <div className="tasks-list-actions">
                                <button
                                    type="button"
                                    onClick={() => handleEditTask(task.id)}
                                    className="tasks-edit-btn"
                                >
                                    編集
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleDeleteTask(task.id)}
                                    className="tasks-delete-btn"
                                >
                                    削除
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                <button
                    type="button"
                    onClick={handleAddTask}
                    className="tasks-add-btn"
                >
                    タスクを追加
                </button>
            </div>
        </div>
    );
}
