import { Router } from "express";
import { createStateController } from "../../composition/states.composition";

const router = Router();
const stateController = createStateController();

router.get("/", stateController.listStates);
router.get("/:id", stateController.listState);

export const stateRoutes = router;
