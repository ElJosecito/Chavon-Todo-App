import { Router } from "express";
import TodoController from "../controllers/TodoController.js";
import { validateToken } from "../libs/jsonwebtoken.js";

const router = Router();

router.get("/task/:id", validateToken, TodoController.getTodo);
router.get("/tasks/:id", validateToken, TodoController.getTodos);
router.post("/tasks/create/:id", validateToken, TodoController.createTodo);
router.put("/task/update/:id", validateToken, TodoController.updateTodo);
router.delete("/task/delete/:id", validateToken, TodoController.deleteTodo);


export default router;