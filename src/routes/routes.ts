import { Router } from "express";
import { userController } from "../controllers/UserController";
import { vehicleController } from "../controllers/VehicleController";
import { validate } from "../middlewares/validationMiddleware";
import {
  createUserSchema,
  updateUserSchema,
} from "../validations/userValidation";

const router = Router();

// USERS :::
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

// VEHICLES :::
router.get("/vehicles", vehicleController.getVehicles);
router.post("/vehicle", vehicleController.createVehicle);

export default router;
