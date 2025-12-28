import Task from "../model/Task.ts";
import { createTask,findTask,findTaskById,deleteTaskById,updateTaskById } from "../services/taskService.ts";
import { TaskType, TaskId } from "../types/taskType.ts";
import  type { Request, Response, NextFunction} from "express";

export const createTaskHandler = async(req:Request, res:Response, next:NextFunction) => {
 try {
    const validate = TaskType.parse(req.body);
    if(!validate){
        return res.status(400).json({ error: "Invalid task data" });
     }
     const result = await createTask(validate);
     if(!result){
        return res.status(400).json({success:false})
     }
        return res.status(201).json({success: true, data: result});
 } catch (error) {
    next(error);
 }
}

export const findTaskHandler = async(req:Request,res:Response, next:NextFunction)=> {
   try {
    const result = await findTask();
    if(!result){
        return  res.status(404).json({ success: false, message: "No tasks found" });
    }
    return res.status(200).json({ success: true, data: result });
   } catch (error) {
    next(error);
   }
}

export const findTaskByIdHandler = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const validate = TaskId.parse(req.params);
        const result = await findTaskById(validate);
        if(!result){
            return  res.status(404).json({ success: false, message: "Task not found" });
        }
        return res.status(200).json({ success: true, data: result }); 
    } catch (error) {
        next(error);
    }
}

export const deleteTaskByIdHandler = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const validate = TaskId.parse(req.params);
        const result = await deleteTaskById(validate);
        if(!result.success){
            return  res.status(404).json({ success: false, message: result.message });
        }
        return res.status(200).json({ success: true, message: "Task deleted successfully" });
    } catch (error) {
        next(error);
    }
}

export const updateTaskByIdHandler = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const validate = TaskId.parse(req.params);
        const updateData = req.body;
        const result = await updateTaskById(validate, updateData);
        if(!result.success){
            return  res.status(404).json({ success: false, message: result.message });
        }
        return res.status(200).json({ success: true, message: "Task updated successfully" });
    } catch (error) {
        next(error);
    }
}