import { Router } from "express";
import { userRoutes } from "./modules/userRoutes";
import { privilegeRoutes } from "./modules/privilegeRoutes";
import { statusUserRoutes } from "./modules/statusUserRoutes";
import { statusCustomerRoutes } from "./modules/statusCustomerRoutes";
import { categoryRoutes } from "./modules/catagoryRoutes";
import { stateRoutes } from "./modules/stateRoutes";
import { groupRoutes } from "./modules/groupRoutes";
import { cityRoutes } from "./modules/cityRoutes";
import { nationalityRoutes } from "./modules/nationalityRoutes";
import { unitRoutes } from "./modules/unitRoutes";

const router = Router();

router.use("/users", userRoutes);
router.use("/privileges", privilegeRoutes);
router.use("/statusUsers", statusUserRoutes);
router.use("/statusCustomers", statusCustomerRoutes);
router.use("/categories", categoryRoutes);
router.use("/states", stateRoutes);
router.use("/groups", groupRoutes);
router.use("/cities", cityRoutes);
router.use("/nationalities", nationalityRoutes);
router.use("/units", unitRoutes);

export default router;
