import { router } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import "@/sass/style.css";
import type { Task } from "@/types/FormData";
import { taskSchema } from "@/types/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

type TaskInput = z.infer<typeof taskSchema>;

export default function TasksNewPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TaskInput>({
        resolver: zodResolver(taskSchema),
		defaultValues: {
			title: "",
			description: "",
			due_date: "",
			status: "not_started",
		},
	});

	const onSubmit = (data: TaskInput) => {
		console.log("タスクを作成するよー", data);
		router.post("/tasks/new", {
			title: data.title,
			description: data.description,
			due_date: data.due_date,
			status: data.status,
		});
	};

	const handleCancel = () => {
		console.log("キャンセルボタンが押されたよー");
		router.visit("/tasks");
	};

	return (
		<div className="tasks-container">
			<div className="tasks-box">
				<h1 className="tasks-title">タスク追加ページ</h1>
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
