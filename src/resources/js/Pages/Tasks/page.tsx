import { router, usePage } from "@inertiajs/react";
import "@/sass/style.css";
import type { TaskProps } from "@/types/FormData";
import { useState } from "react";

export default function Tasks() {
	const { tasks } = usePage<TaskProps>().props;

    const [filter, setFilter] = useState<"all" | "completed" | "not_completed"|"in_progress">("all");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

	const handleAddTask = () => {
		router.visit("/tasks/new");
	};

	const handleEditTask = (taskId: number) => {
		router.visit(`/tasks/${taskId}/edit`);
	};

	const handleDeleteTask = (taskId: number) => {
		// console.log(taskId);
		router.post(`/tasks/${String(taskId)}`);
	};

    const filteredTasks = tasks.filter((task) => {
        if (filter === "completed") return task.status === "completed";
        if (filter === "not_completed") return task.status !== "completed";
        return true;
    });

    const sortedTasks = [...filteredTasks].sort((a, b) => {
        if (!a.due_date) return 1;
        if (!b.due_date) return -1;
        if (sortOrder === "asc") {
            return a.due_date.localeCompare(b.due_date);
        }
        return b.due_date.localeCompare(a.due_date);
    });

	return (
		<div className="tasks-container">
			<div className="tasks-box">
				<h1 className="tasks-title">タスク一覧ページ</h1>
                <div style={{ marginBottom: "1rem" }}>
                    <label>
                        絞り込み:
                        <select value={filter} onChange={e => setFilter(e.target.value as "all" | "completed" | "not_completed"|"in_progress")}>
                            <option value="all">すべて</option>
                            <option value="completed">完了のみ</option>
                            <option value="in_progress">進行中のみ</option>
                            <option value="not_completed">未完了のみ</option>
                        </select>
                    </label>
                    <label style={{ marginLeft: "1rem" }}>
                        期限順:
                        <select value={sortOrder} onChange={e => setSortOrder(e.target.value as "asc" | "desc")}>
                            <option value="asc">昇順</option>
                            <option value="desc">降順</option>
                        </select>
                    </label>
                </div>
				<ul className="tasks-list">
                    {sortedTasks.map((task) => (
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
				<button type="button" onClick={handleAddTask} className="tasks-add-btn">
					タスクを追加
				</button>
			</div>
		</div>
	);
}
