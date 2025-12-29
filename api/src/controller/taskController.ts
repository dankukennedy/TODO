import type{ Request, Response } from "express";
import { createTask, findTask, findTaskById, deleteTaskById, deleteTaskBy, updateTaskById } from "../services/taskService.ts";
import { TaskType, TaskId, TaskUpdateType } from "../types/taskType.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";

export const createTaskHandler = asyncHandler(async (req: Request, res: Response) => {
    // Zod throws error automatically if validation fails; asyncHandler catches it.
    const validate = TaskType.parse(req.body);
    const result = await createTask(validate);
    return res.status(201).json(result);
});

export const findTaskHandler = asyncHandler(async (req: Request, res: Response) => {
    const result = await findTask();
    if (!result.success) {
        return res.status(404).json(result);
    }
    return res.status(200).json(result);
});

export const findTaskByIdHandler = asyncHandler(async (req: Request, res: Response) => {
  console.log("Params received:", req.params||req.query);
    const validate = TaskId.parse(req.params||req.query);
    const result = await findTaskById(validate);
    if (!result.success) {
        return res.status(404).json(result);
    }
    return res.status(200).json(result);
});

export const deleteTaskByIdHandler = asyncHandler(async (req: Request, res: Response) => {
    console.log("Params received:", req.params||req.query);
    const validate = TaskId.parse(req.params||req.query);
    const result = await deleteTaskById(validate);
    if (!result.success) {
        return res.status(404).json(result);
    }
    return res.status(200).json(result);
});

export const deleteTaskByHandler = asyncHandler(async (req: Request, res: Response) => {
    const result = await deleteTaskBy();
    return res.status(200).json(result);
});

export const updateTaskByIdHandler = asyncHandler(async (req: Request, res: Response) => {
    const validate = TaskUpdateType.parse({ ...req.params, ...req.body });
    const result = await updateTaskById(validate);
    if (!result.success) {
        return res.status(404).json(result);
    }
    return res.status(200).json(result);
});