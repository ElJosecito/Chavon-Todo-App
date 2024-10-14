import { Router } from "express";
import UserController from "../controllers/UserController.js";

const router = Router();


router.get("/user/:id", UserController.getUser);
router.put("/user/update/:id", UserController.updateUser);
router.delete("/user/delete/:id", UserController.deleteUser);

export default router;