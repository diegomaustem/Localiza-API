import { Router } from "express";
import { createStatusCustomerController } from "../../composition/statusCustomers.composition";

const router = Router();
const statusCustomerController = createStatusCustomerController();

router.get("/", statusCustomerController.listStatusCustomers);
router.get("/:id", statusCustomerController.listStatusCustomer);

export const statusCustomerRoutes = router;
