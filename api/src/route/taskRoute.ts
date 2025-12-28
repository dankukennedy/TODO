import express, { Router} from "express";
import  type { Request, Response, NextFunction} from "express";
import { createTaskHandler, deleteTaskByIdHandler,updateTaskByIdHandler,findTaskHandler } from "../controller/taskController.ts";

//Explicitly typing the router
const router: Router = express.Router();
// BLOCK 2: GET all tasks
router.get("/tasks", (req: Request, res: Response, next:NextFunction) => {
   findTaskHandler(req, res, next);
});

router.post("/tasks",  (req: Request,  res: Response, next:NextFunction) => {
  createTaskHandler(req, res, next)
});

router.patch("/tasks/:id", (req: Request, res: Response,next:NextFunction) => {
    updateTaskByIdHandler(req, res, next);
});

router.delete("/tasks/:id",  (req: Request, res: Response,next:NextFunction) => {
      deleteTaskByIdHandler(req, res, next);
});


export default router;