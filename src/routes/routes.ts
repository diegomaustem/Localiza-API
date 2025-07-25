import { Router } from "express";
import { userController } from "../controllers/UserController";
import { vehicleController } from "../controllers/VehicleController";
import { privilegeController } from "../controllers/PrivilegeController";
import { nationalityController } from "../controllers/NationalityController";
import { validate } from "../middlewares/validationMiddleware";
import { auth } from "../middlewares/authMiddleware";
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
import { authController } from "../controllers/AuthController";
import { loginSchema } from "../validations/loginValidation";

const router = Router();

// Auth :::
router.post("/login", validate(loginSchema, "body"), authController.login);

// Users :::
router.get("/users", auth, userController.getUsers);
router.get("/user/:id", auth, userController.getUser);
router.post(
  "/user",
  validate(createUserSchema, "body"),
  auth,
  userController.createUser
);
router.patch(
  "/user/:id",
  validate(updateUserSchema, "body"),
  auth,
  userController.updateUser
);
router.delete("/user/:id", auth, userController.deleteUser);

// Privileges :::
router.get("/privileges", auth, privilegeController.getPrivileges);
router.get("/privilege/:id", auth, privilegeController.getPrivilege);

// Status users :::
router.get("/statusUsers", auth, statusUserController.getStatusUsers);
router.get("/statusUser/:id", auth, statusUserController.getStatusUser);

// Status customers :::
router.get(
  "/statusCustomers",
  auth,
  statusCustomerController.getStatusCustomers
);
router.get(
  "/statusCustomer/:id",
  auth,
  statusCustomerController.getStatusCustomer
);

// Nationalities :::
router.get("/nationalities", auth, nationalityController.getNationalities);
router.get("/nationality/:id", auth, nationalityController.getNationality);
router.post(
  "/nationality",
  validate(createNationalitySchema),
  auth,
  nationalityController.createNationality
);
router.patch(
  "/nationality/:id",
  validate(updateNationalitySchema),
  auth,
  nationalityController.updateNationality
);
router.delete(
  "/nationality/:id",
  auth,
  nationalityController.deleteNationality
);

// Customers :::
router.get("/customers", auth, customerController.getCustomers);
router.get("/customer/:id", auth, customerController.getCustomer);

router.post(
  "/customer",
  validate(createCustomerSchema),
  auth,
  customerController.createCustomer
);
router.patch(
  "/customer/:id",
  validate(updateCustomerSchema),
  auth,
  customerController.updateCustomer
);
router.delete("/customer/:id", auth, customerController.deleteCustomer);

// Vehicles :::
router.get("/vehicles", auth, vehicleController.getVehicles);
router.get("/vehicle/:id", auth, vehicleController.getVehicle);
router.post(
  "/vehicle",
  validate(createVehicleSchema, "body"),
  auth,
  vehicleController.createVehicle
);
router.patch(
  "/vehicle/:id",
  validate(updateVehicleSchema, "body"),
  auth,
  vehicleController.updateVehicle
);
router.delete("/vehicle/:id", auth, vehicleController.deleteVehicle);

// Honors :::
router.get("/honors", auth, honorController.getHonors);
router.get("/honor/:id", auth, honorController.getHonor);

// Categories :::
router.get("/categories", auth, categoryController.getCategories);
router.get("/category/:id", auth, categoryController.getCategory);

// Groups :::
router.get("/groups", auth, groupController.getGroups);
router.get("/group/:id", auth, groupController.getGroup);

// States :::
router.get("/states", auth, stateController.getStates);
router.get("/state/:id", auth, stateController.getState);

// Cities :::
router.get("/cities", auth, cityController.getCities);
router.get("/city/:id", auth, cityController.getCity);
router.post(
  "/city",
  validate(createCitySchema),
  auth,
  cityController.createCity
);
router.patch(
  "/city/:id",
  validate(updateCitySchema),
  auth,
  cityController.updateCity
);
router.delete("/city/:id", auth, cityController.deleteCity);

// Units :::
router.get("/units", auth, unitController.getUnits);
router.get("/unit/:id", auth, unitController.getUnit);
router.post(
  "/unit",
  validate(createUnitSchema),
  auth,
  unitController.createUnit
);
router.patch(
  "/unit/:id",
  validate(updateUnitSchema),
  auth,
  unitController.updateUnit
);
router.delete("/unit/:id", auth, unitController.deleteUnit);

// Reserves :::
router.get("/reserves", auth, reserveController.getReserves);
router.get("/reserve/:id", auth, reserveController.getReserve);
router.post(
  "/reserve",
  validate(createReserveSchema),
  auth,
  reserveController.createReserve
);
router.patch(
  "/reserve/:id",
  validate(updateReserveSchema),
  auth,
  reserveController.updateReserve
);
router.delete("/reserve/:id", auth, reserveController.deleteReserve);
export default router;
