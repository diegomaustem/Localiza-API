import prisma from "../lib/prisma";
import { StatusCustomerController } from "../controllers/StatusCustomerController";
import { RepositoryStatusCustomer } from "../repositories/RepositoryStatusCustomer";
import { StatusCustomerService } from "../services/StatusCustomerService";

export function createStatusCustomerController(): StatusCustomerController {
  const repository = new RepositoryStatusCustomer(prisma);
  const service = new StatusCustomerService(repository);
  return new StatusCustomerController(service);
}
