import { Router } from "express";
import { createUserController } from "../../composition/users.composition";
import { validate } from "../../middlewares/validationMiddleware";
import {
  schemaCreateUser,
  schemaUpdateUser,
} from "../../validations/userValidation";

const router = Router();
const userController = createUserController();

router.get("/", userController.listUsers);
router.get("/:id", userController.listUser);
router.post("/", validate(schemaCreateUser, "body"), userController.create);
router.patch("/:id", validate(schemaUpdateUser, "body"), userController.update);
router.delete("/:id", userController.delete);

export const userRoutes = router;
