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
import {
  createPrivilegeSchema,
  updatePrivilegeSchema,
} from "../validations/privilegeValidation";
import {
  createNationalitySchema,
  updateNationalitySchema,
} from "../validations/nationaliryValidation";
import {
  createHonorSchema,
  updateHonorSchema,
} from "../validations/honorValidation";
import {
  createCustomerSchema,
  updateCustomerSchema,
} from "../validations/customerValidation";
import { customerController } from "../controllers/CustomerController";

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
router.post(
  "/privilege",
  validate(createPrivilegeSchema),
  privilegeController.createPrivilege
);
router.put(
  "/privilege/:id",
  validate(updatePrivilegeSchema),
  privilegeController.updatePrivilege
);
router.delete("/privilege/:id", privilegeController.deletePrivilege);

// NATIONALITIES :::
router.get("/nationalities", nationalityController.getNationalities);
router.get("/nationality/:id", nationalityController.getNationality);
router.post(
  "/nationality",
  validate(createNationalitySchema),
  nationalityController.createNationality
);
router.put(
  "/nationality/:id",
  validate(updateNationalitySchema),
  nationalityController.updateNationality
);
router.delete("/nationality/:id", nationalityController.deleteNationality);

// HONORS
router.get("/honors", honorController.getHonors);
router.get("/honor/:id", honorController.getHonor);
router.post("/honor", validate(createHonorSchema), honorController.createHonor);
router.put(
  "/honor/:id",
  validate(updateHonorSchema),
  honorController.updateHonor
);
router.delete("/honor/:id", honorController.deleteHonor);

// CUSTOMERS
router.get("/customers", customerController.getCustomers);
router.get("/customer/:id", customerController.getCustomer);

router.post(
  "/customer",
  validate(createCustomerSchema),
  customerController.createCustomer
);
router.put(
  "/customer/:id",
  validate(updateCustomerSchema),
  customerController.updateCustomer
);
// router.delete("/customer/:id", customerController.deleteCustomer);

export default router;
