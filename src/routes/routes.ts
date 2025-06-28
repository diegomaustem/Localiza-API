import { Router } from "express";
import { userController } from "../controllers/UserController";

const router = Router();

router.get("/users", userController.getUsers);
router.post("/user", userController.createUser);

export default router;
