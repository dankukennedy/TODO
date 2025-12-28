import Task from "../model/Task.ts";
import type { TaskIdInput, TaskTypeInput } from "../types/taskType.ts";

export const createTask = async(input:TaskTypeInput): Promise<{success:boolean,newTask:InstanceType<typeof Task>}> => {
  try {
    const newTask = await new Task(input);
    await newTask.save();
    return { success: true, newTask };
  } catch (error:unknown) {
    throw error;
  }
}

export const findTask = async(): Promise<{success:boolean, message:string ,tasks:InstanceType<typeof Task>[]}> => {
    try {
        const tasks = await Task.find();
        if(!tasks || tasks.length === 0){
            return { success: false, message: "No tasks found" ,tasks: []};
        }
        return { success: true, message: "Tasks found successfully", tasks };
    } catch (error:unknown) {
        throw error;
    }
}

export const findTaskById = async(input:TaskIdInput): Promise<{success:boolean,message:string}> => {
    try {
        const task = await Task.findById(input.id);
        if (!task) {
            return { success: false, message: "Task not found" };
        }
        return { success: true, message: "Task found successfully" };
    } catch (error:unknown) {
        throw error;
    }
}

export const deleteTaskById = async(input:TaskIdInput): Promise<{success:boolean, message:string}> => {
    try {
        const result = await Task.findByIdAndDelete(input.id);
        if (result) {
            return { success: true, message: "Task deleted successfully" };
        }
        return { success: false, message: "Task not found" };
    } catch (error:unknown) {
        throw error;
    }
}

export const updateTaskById = async(input:TaskIdInput, updateData:Partial<TaskTypeInput>): Promise<{success:boolean, title?:string, content?:string, completed?:boolean, message?:string}> => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(input.id, updateData, { new: true });
        if (updatedTask) {
            return { success: true, title: updatedTask.title, content: updatedTask.content, completed: updatedTask.completed };
        }
        return { success: false, message: "Task not found" };
    } catch (error:unknown) {
        throw error;
    }
}