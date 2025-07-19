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
import { honorController } from "../controllers/HonorController";
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

import { categoryController } from "../controllers/CategoryController";
import { createCategorySchema } from "../validations/categoryValidation";
import { createGroupSchema } from "../validations/groupValidation";
import { groupController } from "../controllers/GroupController";
import { createStateSchema } from "../validations/stateValidation";
import { stateController } from "../controllers/StateController";
import { cityController } from "../controllers/CityController";
import { createCitySchema } from "../validations/cityValidation";
import { unitController } from "../controllers/UnitController";
import { createUnitSchema } from "../validations/unitValidation";
import { reserveController } from "../controllers/ReserveController";
import { createReserveSchema } from "../validations/reserveValidation";

const router = Router();
// Users :::
router.get("/users", userController.getUsers);
router.get("/user/:id", userController.getUser);
router.post(
  "/user",
  validate(createUserSchema, "body"),
  userController.createUser
);
router.patch(
  "/user/:id",
  validate(updateUserSchema, "body"),
  userController.updateUser
);
router.delete("/user/:id", userController.deleteUser);

// Privileges :::
router.get("/privileges", privilegeController.getPrivileges);
router.get("/privilege/:id", privilegeController.getPrivilege);

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
router.delete("/customer/:id", customerController.deleteCustomer);

// CATEGORIES
router.get("/categories", categoryController.getCategories);
router.get("/category/:id", categoryController.getCategory);

router.post(
  "/category",
  validate(createCategorySchema),
  categoryController.createCategory
);

// GROUPS
router.get("/groups", groupController.getGroups);
router.get("/group/:id", groupController.getGroup);

router.post("/group", validate(createGroupSchema), groupController.createGroup);

// STATES
router.get("/states", stateController.getStates);
router.get("/state/:id", stateController.getState);

router.post("/state", validate(createStateSchema), stateController.createState);

// CITIES
router.get("/cities", cityController.getCities);
router.get("/city/:id", cityController.getCity);

router.post("/city", validate(createCitySchema), cityController.createCity);

// UNITS
router.get("/units", unitController.getUnits);
router.get("/unit/:id", unitController.getUnit);

router.post("/unit", validate(createUnitSchema), unitController.createUnit);

// RESERVES
router.get("/reserves", reserveController.getReserves);
router.get("/reserve/:id", reserveController.getReserve);

router.post(
  "/reserve",
  validate(createReserveSchema),
  reserveController.createReserve
);

export default router;
