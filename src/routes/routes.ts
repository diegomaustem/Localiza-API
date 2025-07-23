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
  createCustomerSchema,
  updateCustomerSchema,
} from "../validations/customerValidation";
import { customerController } from "../controllers/CustomerController";

import { categoryController } from "../controllers/CategoryController";
import { groupController } from "../controllers/GroupController";
import { stateController } from "../controllers/StateController";
import { cityController } from "../controllers/CityController";
import {
  createCitySchema,
  updateCitySchema,
} from "../validations/cityValidation";
import { unitController } from "../controllers/UnitController";
import {
  createUnitSchema,
  updateUnitSchema,
} from "../validations/unitValidation";
import { reserveController } from "../controllers/ReserveController";
import {
  createReserveSchema,
  updateReserveSchema,
} from "../validations/reserveValidation";
import { statusUserController } from "../controllers/StatusUserController";
import { statusCustomerController } from "../controllers/StatusCustomerController";

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

// Status users :::
router.get("/statusUsers", statusUserController.getStatusUsers);
router.get("/statusUser/:id", statusUserController.getStatusUser);

// Status customers :::
router.get("/statusCustomers", statusCustomerController.getStatusCustomers);
router.get("/statusCustomer/:id", statusCustomerController.getStatusCustomer);

// Nationalities :::
router.get("/nationalities", nationalityController.getNationalities);
router.get("/nationality/:id", nationalityController.getNationality);
router.post(
  "/nationality",
  validate(createNationalitySchema),
  nationalityController.createNationality
);
router.patch(
  "/nationality/:id",
  validate(updateNationalitySchema),
  nationalityController.updateNationality
);
router.delete("/nationality/:id", nationalityController.deleteNationality);

// Customers :::
router.get("/customers", customerController.getCustomers);
router.get("/customer/:id", customerController.getCustomer);

router.post(
  "/customer",
  validate(createCustomerSchema),
  customerController.createCustomer
);
router.patch(
  "/customer/:id",
  validate(updateCustomerSchema),
  customerController.updateCustomer
);
router.delete("/customer/:id", customerController.deleteCustomer);

// Vehicles :::
router.get("/vehicles", vehicleController.getVehicles);
router.get("/vehicle/:id", vehicleController.getVehicle);
router.post(
  "/vehicle",
  validate(createVehicleSchema, "body"),
  vehicleController.createVehicle
);
router.patch(
  "/vehicle/:id",
  validate(updateVehicleSchema, "body"),
  vehicleController.updateVehicle
);
router.delete("/vehicle/:id", vehicleController.deleteVehicle);

// Honors :::
router.get("/honors", honorController.getHonors);
router.get("/honor/:id", honorController.getHonor);

// Categories :::
router.get("/categories", categoryController.getCategories);
router.get("/category/:id", categoryController.getCategory);

// Groups :::
router.get("/groups", groupController.getGroups);
router.get("/group/:id", groupController.getGroup);

// States :::
router.get("/states", stateController.getStates);
router.get("/state/:id", stateController.getState);

// Cities :::
router.get("/cities", cityController.getCities);
router.get("/city/:id", cityController.getCity);
router.post("/city", validate(createCitySchema), cityController.createCity);
router.patch(
  "/city/:id",
  validate(updateCitySchema),
  cityController.updateCity
);
router.delete("/city/:id", cityController.deleteCity);

// Units :::
router.get("/units", unitController.getUnits);
router.get("/unit/:id", unitController.getUnit);
router.post("/unit", validate(createUnitSchema), unitController.createUnit);
router.patch(
  "/unit/:id",
  validate(updateUnitSchema),
  unitController.updateUnit
);
router.delete("/unit/:id", unitController.deleteUnit);

// Reserves :::
router.get("/reserves", reserveController.getReserves);
router.get("/reserve/:id", reserveController.getReserve);
router.post(
  "/reserve",
  validate(createReserveSchema),
  reserveController.createReserve
);
router.patch(
  "/reserve/:id",
  validate(updateReserveSchema),
  reserveController.updateReserve
);
router.delete("/reserve/:id", reserveController.deleteReserve);
export default router;
