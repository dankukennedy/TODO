import * as z from 'zod'

export const TaskType = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    content: z.string().min(1, { message: "Content is required" }),
    completed: z.boolean().optional().default(false),
});
export type TaskTypeInput = z.infer<typeof TaskType>;

export const TaskId = z.object({
    id: z.string().nonempty({ message: "ID is required" }),
});
export type TaskIdInput = z.infer<typeof TaskId>;

export const TaskUpdateType = TaskId.extend(
    TaskType.shape
);
export type TaskUpdateTypeInput = z.infer<typeof TaskUpdateType>;