import { Router } from "express";
import { userRoutes } from "./modules/userRoutes";
import { privilegeRoutes } from "./modules/privilegeRoutes";
import { statusUserRoutes } from "./modules/statusUserRoutes";
import { StatusCustomerController } from "../controllers/StatusCustomerController";
import { statusCustomerRoutes } from "./modules/statusCustomerRoutes";

const router = Router();

router.use("/users", userRoutes);
router.use("/privileges", privilegeRoutes);
router.use("/statusUsers", statusUserRoutes);
router.use("/statusCustomers", statusCustomerRoutes);

export default router;
