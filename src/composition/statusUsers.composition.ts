import prisma from "../lib/prisma";
import { StatusUserController } from "../controllers/StatusUserController";
import { RepositoryStatusUserPrisma } from "../repositories/RepositoryStatusUserPrisma";
import { StatusUserService } from "../services/StatusUserService";

export function createStatusUserController(): StatusUserController {
  const repository = new RepositoryStatusUserPrisma(prisma);
  const service = new StatusUserService(repository);
  return new StatusUserController(service);
}
