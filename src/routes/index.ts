import { Router } from "express";
import { userRoutes } from "./modules/userRoutes";
import { privilegeRoutes } from "./modules/privilegeRoutes";
import { statusUserRoutes } from "./modules/statusUserRoutes";

const router = Router();

router.use("/users", userRoutes);
router.use("/privileges", privilegeRoutes);
router.use("/statusUsers", statusUserRoutes);

export default router;
