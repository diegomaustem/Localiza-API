import { Router } from "express";
import { userController } from "../controllers/UserController";

const router = Router();

router.get("/users", userController.getUsers);
router.get("/user/:id", userController.getUser);
router.post("/user", userController.createUser);

export default router;
