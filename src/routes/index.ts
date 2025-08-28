import { Router } from "express";
import { userRoutes } from "./modules/userRoutes";
import { privilegeRoutes } from "./modules/privilegeRoutes";

const router = Router();

router.use("/users", userRoutes);
router.use("/privileges", privilegeRoutes);

export default router;
