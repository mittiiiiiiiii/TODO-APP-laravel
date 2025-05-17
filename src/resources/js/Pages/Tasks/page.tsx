import { router, usePage } from "@inertiajs/react";
import "@/sass/style.css";
import type { TaskProps } from "@/types/FormData";
import { useState } from "react";

export default function Tasks() {
	const { tasks } = usePage<TaskProps>().props;

	const [filter, setFilter] = useState<
		"all" | "not_started" | "in_progress" | "completed"
	>("all");

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

	function formatDate(dateStr?: string) {
		if (!dateStr) return "（未設定）";
		const date = new Date(dateStr);
		if (Number.isNaN(date.getTime())) return "（未設定）";
		return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
	}

	const filteredTasks = tasks.filter((task) => {
		if (filter === "all") return true;
		return task.status === filter;
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
						<select
							value={filter}
							onChange={(e) =>
								setFilter(
									e.target.value as
										| "all"
										| "not_started"
										| "in_progress"
										| "completed",
								)
							}
						>
							<option value="all">すべて</option>
							<option value="not_started">未着手のみ</option>
							<option value="in_progress">進行中のみ</option>
							<option value="completed">完了のみ</option>
						</select>
					</label>
					<label style={{ marginLeft: "1rem" }}>
						期限順:　
						<select
							value={sortOrder}
							onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
						>
							<option value="asc">昇順</option>
							<option value="desc">降順</option>
						</select>
					</label>
				</div>
				<ul className="tasks-list">
					{sortedTasks.map((task) => (
						<li key={task.id} className="tasks-list-item">
							<div className="task-info">
								<div className="task-row">
									<span className="task-label">タイトル：</span>
									<span className="task-value">{task.title}</span>
								</div>
								<div className="task-row">
									<span className="task-label">詳細：</span>
									<span className="task-value">
										{task.description || "（なし）"}
									</span>
								</div>
								<div className="task-row">
									<span className="task-label">期限：</span>
									<span className="task-value">
										{formatDate(task.due_date)}
									</span>
								</div>
								<div className="task-row">
									<span className="task-label">ステータス：</span>
									<span className="task-value">
										{task.status === "completed"
											? "完了"
											: task.status === "in_progress"
												? "進行中"
												: "未着手"}
									</span>
								</div>
							</div>
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
