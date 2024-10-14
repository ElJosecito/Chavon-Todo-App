import { Router } from "express";
import UserController from "../controllers/UserController.js";
import { validateToken } from "../libs/jsonwebtoken.js";

const router = Router();


router.get("/user/:id", validateToken, UserController.getUser);
router.put("/user/update/:id", validateToken, UserController.updateUser);
router.delete("/user/delete/:id", validateToken, UserController.deleteUser);

export default router;