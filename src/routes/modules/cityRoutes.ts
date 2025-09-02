import { Router } from "express";
import { createCityController } from "../../composition/city.composition";

const router = Router();
const cityController = createCityController();

router.get("/", cityController.listCities);
router.get("/:id", cityController.listCity);
router.post("/", cityController.create);
router.patch("/:id", cityController.update);
router.delete("/:id", cityController.delete);

export const cityRoutes = router;
