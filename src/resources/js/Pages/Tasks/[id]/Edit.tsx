import { router, usePage } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import "@/sass/style.css";
import type { Task } from "@/types/FormData";
import { taskSchema } from "@/types/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

type EditTaskPageProps = {
	task: Task;
};

type TaskInput = z.infer<typeof taskSchema>;

export default function EditTaskPage() {
	const { task } = usePage<EditTaskPageProps>().props;

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<TaskInput>({
		resolver: zodResolver(taskSchema),
		defaultValues: {
			title: task.title || "",
			description: task.description || "",
			due_date: task.due_date ? task.due_date.slice(0, 10) : "",
			status: task.status || "not_started",
		},
	});

	const onSubmit = (data: TaskInput) => {
		router.post(`/tasks/${task.id}/edit`, {
			title: data.title,
			description: data.description,
			date: data.due_date,
			status: data.status,
		});
	};

	const handleCancel = () => {
		router.visit("/tasks");
	};

	return (
		<div className="tasks-container">
			<div className="tasks-box">
				<h1 className="tasks-title">タスク編集ページ</h1>
				<form onSubmit={handleSubmit(onSubmit)} className="tasks-form">
					<div>
						<label htmlFor="title" className="tasks-label">
							タイトル（必須）
						</label>
						<input
							id="title"
							type="text"
							{...register("title", { required: "タイトルは必須です" })}
							placeholder="タイトル"
							className="tasks-input"
						/>
						{errors.title && (
							<span className="form-error">{errors.title.message}</span>
						)}
					</div>
					<div>
						<label htmlFor="description" className="tasks-label">
							詳細
						</label>
						<input
							id="description"
							type="text"
							{...register("description")}
							placeholder="詳細"
							className="tasks-input"
						/>
						{errors.description && (
							<span className="form-error">{errors.description.message}</span>
						)}
					</div>
					<div>
						<label htmlFor="date" className="tasks-label">
							締め切り
						</label>
						<input
							id="date"
							type="date"
							{...register("due_date")}
							className="tasks-input"
						/>
						{errors.due_date && (
							<span className="form-error">{errors.due_date.message}</span>
						)}
					</div>
					<div>
						<label htmlFor="status" className="tasks-label">
							ステータス
						</label>
						<select id="status" {...register("status")} className="tasks-input">
							<option value="not_started">未着手</option>
							<option value="in_progress">進行中</option>
							<option value="completed">完了</option>
						</select>
						{errors.status && (
							<span className="form-error">{errors.status.message}</span>
						)}
					</div>
					<div className="flex gap-2 mt-4">
						<button type="submit" className="tasks-add-btn">
							保存
						</button>
						<button
							type="button"
							onClick={handleCancel}
							className="tasks-add-btn tasks-cancel-btn"
						>
							キャンセル
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
