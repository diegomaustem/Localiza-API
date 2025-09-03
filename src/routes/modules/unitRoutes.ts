import { Router } from "express";
import { createUnitController } from "../../composition/units.composition";

const router = Router();
const unitController = createUnitController();

router.get("/", unitController.listUnits);
router.get("/:id", unitController.listUnit);
router.post("/", unitController.create);
router.patch("/:id", unitController.update);
router.delete("/:id", unitController.delete);

export const unitRoutes = router;
