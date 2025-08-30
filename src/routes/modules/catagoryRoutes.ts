import { Router } from "express";
import { createCategoryController } from "../../composition/categories.composition";

const router = Router();
const catagoryController = createCategoryController();

router.get("/", catagoryController.listCategories);
router.get("/:id", catagoryController.listCategory);

export const categoryRoutes = router;
