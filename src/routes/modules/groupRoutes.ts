import { Router } from "express";
import { createGroupController } from "../../composition/groups.composition";

const router = Router();
const groupController = createGroupController();

router.get("/", groupController.listGroups);
router.get("/:id", groupController.listGroup);

export const groupRoutes = router;
