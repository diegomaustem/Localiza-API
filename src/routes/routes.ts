import { Router } from "express";
import { userController } from "../controllers/UserController";

const router = Router();

router.get("/users", userController.getUsers);

export default router;
