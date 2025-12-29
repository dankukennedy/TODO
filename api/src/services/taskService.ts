import Task from "../model/Task.ts";
import type { TaskIdInput, TaskTypeInput, TaskUpdateTypeInput } from "../types/taskType.ts";

export const createTask = async (input: TaskTypeInput):Promise<{success:boolean,message:string,task:InstanceType<typeof Task>}>=> {
    const newTask = new Task(input);
    await newTask.save();
    return { success: true, message: "Task created successfully", task: newTask };
};

export const findTask = async ():Promise<{success:boolean,message:string,tasks:InstanceType<typeof Task>[]}> => {
    const tasks = await Task.find();
    if (!tasks || tasks.length === 0) {
        return { success: false, message: "No tasks found", tasks: [] };
    }
    return { success: true, message: "Tasks found", tasks: tasks };
};

export const findTaskById = async (input: TaskIdInput): Promise<{success:boolean,message?:string,task:InstanceType<typeof Task>}> => {
    const task = await Task.findById(input.id);
    if (!task) {
        return { success: false, message: "Task not found", task: null as unknown as InstanceType<typeof Task> };
    }
    return { success: true, message: "Task found", task: task };
};

export const updateTaskById = async (input: TaskUpdateTypeInput):Promise<{success:boolean,message?:string,task:InstanceType<typeof Task>}> => {
    const { id, ...dataToUpdate } = input;
    const updatedTask = await Task.findByIdAndUpdate(
        id,
        dataToUpdate,
        { new: true, runValidators: true }
    );

    if (!updatedTask) {
        return { success: false, message: "Task not found", task: null as unknown as InstanceType<typeof Task> };
    }
    return { success: true, message: "Task updated", task: updatedTask };
};

export const deleteTaskById = async (input: TaskIdInput):Promise<{success:boolean, message:string,task:InstanceType<typeof Task>}>  => {
    const result = await Task.findByIdAndDelete(input.id);
    if (!result) {
        return { success: false, message: "Task not found",task: null as unknown as InstanceType<typeof Task> };
    }
    return { success: true, message: "Task deleted successfully", task: result };
};

export const deleteTaskBy = async ():Promise<{success:boolean, message:string}> => {
    await Task.deleteMany({});
    return { success: true, message: "All tasks deleted successfully" };
};