import { router, usePage } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import "@/sass/style.css";

type FormData = {
	name: string;
	email: string;
	password: string;
};

type PageProps = {
	user: {
		name: string;
		email: string;
	};
};

export default function ProfilePage() {
	const { user } = usePage<PageProps>().props;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues: {
			name: user.name || "",
			email: user.email || "",
			password: "",
		},
	});

	const onSubmit = (data: FormData) => {
		router.post("/profile", data);
	};

	return (
		<div className="form-container">
			<div className="form-box">
				<h1 className="page-title">プロフィール編集</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					<input
						type="text"
						{...register("name", { required: "名前は必須です" })}
						placeholder="名前"
						className="form-input"
					/>
					{errors.name && (
						<span className="form-error">{errors.name.message}</span>
					)}
					<input
						type="email"
						{...register("email", { required: "メールアドレスは必須です" })}
						placeholder="メールアドレス"
						className="form-input"
					/>
					{errors.email && (
						<span className="form-error">{errors.email.message}</span>
					)}
					<input
						type="password"
						{...register("password")}
						placeholder="パスワード（変更時のみ入力）"
						className="form-input"
					/>
					{errors.password && (
						<span className="form-error">{errors.password.message}</span>
					)}
					<button type="submit" className="form-button">
						保存
					</button>
				</form>
			</div>
		</div>
	);
}
