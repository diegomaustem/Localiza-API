import { Router } from "express";
import { userController } from "../controllers/UserController";
import { vehicleController } from "../controllers/VehicleController";
import { privilegeController } from "../controllers/PrivilegeController";
import { nationalityController } from "../controllers/NationalityController";
import { validate } from "../middlewares/validationMiddleware";
import {
  createUserSchema,
  updateUserSchema,
} from "../validations/userValidation";
import {
  createVehicleSchema,
  updateVehicleSchema,
} from "../validations/vehicleValidation";
import { homedir } from "os";
import { honorController } from "../controllers/HonorController";

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
router.get("/vehicle/:id", vehicleController.getVehicle);
router.post(
  "/vehicle",
  validate(createVehicleSchema, "body"),
  vehicleController.createVehicle
);

router.put(
  "/vehicle/:id",
  validate(updateVehicleSchema, "body"),
  vehicleController.updateVehicle
);
router.delete("/vehicle/:id", vehicleController.deleteVehicle);

// PRIVILEGE :::
router.get("/privileges", privilegeController.getPrivileges);
router.get("/privilege/:id", privilegeController.getPrivilege);
router.post("/privilege", privilegeController.createPrivilege);
router.put("/privilege/:id", privilegeController.updatePrivilege);
router.delete("/privilege/:id", privilegeController.deletePrivilege);

// NATIONALITIES :::
router.get("/nationalities", nationalityController.getNationalities);
router.get("/nationality/:id", nationalityController.getNationality);
router.post("/nationality", nationalityController.createNationality);
router.put("/nationality/:id", nationalityController.updateNationality);
router.delete("/nationality/:id", nationalityController.deleteNationality);

// HONORS
router.get("/honors", honorController.getHonors);
router.get("/honor/:id", honorController.getHonor);
router.post("/honor", honorController.createHonor);

export default router;
