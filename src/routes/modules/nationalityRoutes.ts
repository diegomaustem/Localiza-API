import { Router } from "express";
import { createNationalityController } from "../../composition/nationalities.composition";

const router = Router();
const nationalityController = createNationalityController();

router.get("/", nationalityController.listNationalities);
router.get("/:id", nationalityController.listNationality);
router.post("/", nationalityController.create);
router.patch("/:id", nationalityController.update);
router.delete("/:id", nationalityController.delete);

export const nationalityRoutes = router;
