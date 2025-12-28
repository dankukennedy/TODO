import express, { Router, Request, Response} from "express";
import type { Express } from "express";
import Task from "../model/Task.ts";

//Explicitly typing the router
const router: Router = express.Router();

router.get("/tasks", async (req: Request, res: Response) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
});

export default router;