import prisma from "../lib/prisma";
import { StatusCustomerController } from "../controllers/StatusCustomerController";
import { RepositoryStatusCustomerPrisma } from "../repositories/RepositoryStatusCustomerPrisma";
import { StatusCustomerService } from "../services/StatusCustomerService";

export function createStatusCustomerController(): StatusCustomerController {
  const repository = new RepositoryStatusCustomerPrisma(prisma);
  const service = new StatusCustomerService(repository);
  return new StatusCustomerController(service);
}
