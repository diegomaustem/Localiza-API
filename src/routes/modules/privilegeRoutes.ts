import { Router } from "express";
import { createPrivilegeController } from "../../composition/privileges.composition";

const router = Router();
const privilegeController = createPrivilegeController();

router.get("/", privilegeController.listPrivileges);
router.get("/:id", privilegeController.listPrivilege);

export const privilegeRoutes = router;
