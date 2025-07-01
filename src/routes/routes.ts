import { Router } from "express";
import { userController } from "../controllers/UserController";
import { validate } from "../middlewares/validationMiddleware";
import {
  createUserSchema,
  updateUserSchema,
} from "../validations/userValidation";

const router = Router();

router.get("/users", userController.getUsers);
router.get("/user/:id", userController.getUser);
router.post(
  "/user",
  validate(createUserSchema, "body"),
  userController.createUser
);
router.put(
  "/user/:id",
  validate(updateUserSchema, "body"),
  userController.updateUser
);
router.delete("/user/:id", userController.deleteUser);

export default router;
