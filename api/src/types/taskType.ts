import { title } from 'node:process';
import * as z from 'zod'

export const TaskType = z.object({ 
    title: z.string().min(1, "Title is required").nonempty("Title cannot be empty"),
    content: z.string().min(1, "Content is required").nonempty("Content cannot be empty"),
    completed: z.boolean().optional().default(false),
});

export type TaskTypeInput = z.infer<typeof TaskType>;

export const TaskId = z.object({
  id:z.string().min(1,"ID is required").nonempty("ID cannot be empty").nonempty('Id cannot be left empty')
});
export type TaskIdInput = z.infer<typeof TaskId>