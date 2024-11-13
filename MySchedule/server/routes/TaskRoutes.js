import express from "express";
import { addTask, editTask, markTaskAsFinished, deleteTask, getAllTasks } from "../controllers/TaskController.js";

const router = express.Router();

// Route to add a new task
router.post("/addTask", addTask);

// Route to edit an existing task
router.put("/editTask/:id", editTask);

// Route to mark a task as finished
router.patch("/task-scheduler/:id/finish", markTaskAsFinished);

// Route to delete a task
router.delete("/task-scheduler/:id", deleteTask);

// Route to fetch all tasks
router.get("/task-scheduler", getAllTasks);

export default router;