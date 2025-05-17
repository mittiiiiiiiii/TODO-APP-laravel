import { z } from "zod";

export const userDataSchema = z.object({
    name: z.string().min(1, "名前は必須です"),
    email: z.string().email("有効なメールアドレスを入力してください"),
    password: z.string().min(6, "パスワードは6文字以上で入力してください"),
});

export const taskSchema = z.object({
    id: z.number().optional(),
    title: z.string().min(1, "タイトルは必須です"),
    description: z.string().optional(),
    status: z.enum(["not_started", "in_progress", "completed"]),
    due_date: z.string().optional(),
    userId: z.number().optional(),
});
