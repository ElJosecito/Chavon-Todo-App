import { Router } from "express";
import TodoController from "../controllers/TodoController.js";

const router = Router();

router.get("/task/:id", TodoController.getTodo);
router.get("/tasks", TodoController.getTodos);
router.post("/tasks/create", TodoController.createTodo);
router.put("/task/update/:id", TodoController.updateTodo);
router.delete("/task/delete/:id", TodoController.deleteTodo);


export default router;