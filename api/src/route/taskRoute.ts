import express, { Router} from "express";
import  type { Request, Response, NextFunction} from "express";
import { createTaskHandler, deleteTaskByIdHandler,updateTaskByIdHandler,findTaskHandler,deleteTaskByHandler,findTaskByIdHandler } from "../controller/taskController.ts";

//Explicitly typing the router
const router: Router = express.Router();
// BLOCK 2: GET all tasks
router.get("/getTasks", (req: Request, res: Response, next:NextFunction) => {
   findTaskHandler(req, res, next);
});
router.get("/getTaskId/:id", (req: Request, res: Response, next:NextFunction) => {
   findTaskByIdHandler(req, res, next);
});

router.post("/tasks",  (req: Request,  res: Response, next:NextFunction) => {
  createTaskHandler(req, res, next)
});

router.patch("/updateTasks/:id", (req: Request, res: Response,next:NextFunction) => {
    updateTaskByIdHandler(req, res, next);
});

router.delete("/deleteTask/:id",  (req: Request, res: Response,next:NextFunction) => {
      deleteTaskByIdHandler(req, res, next);
});
router.delete("/deleteTasks/all",  (req: Request, res: Response,next:NextFunction) => {
      deleteTaskByHandler(req, res, next);
});


export default router;