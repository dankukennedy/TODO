import express, { Router} from "express";
import  type { Request, Response} from "express";
import Task from "../model/Task.ts";
import {TaskType } from "../types/taskType.ts";

//Explicitly typing the router
const router: Router = express.Router();
// BLOCK 2: GET all tasks
router.get("/tasks", async (req: Request, res: Response) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
});

router.post("/tasks", async (req: Request,  res: Response) => { 
    try {
        const result = TaskType.parse(req.body);
        if(!result){
            return res.status(400).json({ error: "Invalid task data" });
         }
        const newTask = new Task(result);
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(500).json({ error: "Failed to create task" });
    }
});

export default router;