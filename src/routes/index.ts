import { Router } from "express";
import { userRoutes } from "./modules/userRoutes";
import { privilegeRoutes } from "./modules/privilegeRoutes";
import { statusUserRoutes } from "./modules/statusUserRoutes";
import { statusCustomerRoutes } from "./modules/statusCustomerRoutes";
import { categoryRoutes } from "./modules/catagoryRoutes";

const router = Router();

router.use("/users", userRoutes);
router.use("/privileges", privilegeRoutes);
router.use("/statusUsers", statusUserRoutes);
router.use("/statusCustomers", statusCustomerRoutes);
router.use("/categories", categoryRoutes);

export default router;
