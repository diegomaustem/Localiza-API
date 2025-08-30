import { Router } from "express";
import { createStatusUserController } from "../../composition/statusUsers.composition";

const router = Router();
const statusUserController = createStatusUserController();

router.get("/", statusUserController.listStatusUsers);
router.get("/:id", statusUserController.listStatusUser);

export const statusUserRoutes = router;
