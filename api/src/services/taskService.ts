import Task from "../model/Task.ts";
import type { TaskIdInput, TaskTypeInput, TaskUpdateTypeInput } from "../types/taskType.ts";

export const createTask = async (input: TaskTypeInput) => {
    const newTask = new Task(input);
    await newTask.save();
    return { success: true, data: newTask };
};

export const findTask = async () => {
    const tasks = await Task.find();
    if (!tasks || tasks.length === 0) {
        return { success: false, message: "No tasks found", data: [] };
    }
    return { success: true, data: tasks };
};

export const findTaskById = async (input: TaskIdInput) => {
    const task = await Task.findById(input.id); 
    if (!task) {
        return { success: false, message: "Task not found" };
    }
    return { success: true, data: task };
};

export const updateTaskById = async (input: TaskUpdateTypeInput) => {
    const { id, ...dataToUpdate } = input;
    const updatedTask = await Task.findByIdAndUpdate(
        id,
        dataToUpdate,
        { new: true, runValidators: true }
    );

    if (!updatedTask) {
        return { success: false, message: "Task not found" };
    }
    return { success: true, data: updatedTask };
};

export const deleteTaskById = async (input: TaskIdInput) => {
    const result = await Task.findByIdAndDelete(input.id);
    if (!result) {
        return { success: false, message: "Task not found" };
    }
    return { success: true, message: "Task deleted successfully" };
};

export const deleteTaskBy = async () => {
    await Task.deleteMany({});
    return { success: true, message: "All tasks deleted successfully" };
};