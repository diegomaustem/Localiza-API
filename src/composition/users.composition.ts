import { UserController } from "../controllers/UserController";
import prisma from "../lib/prisma";
import { RepositoryGenericPrisma } from "../repositories/RepositoryGenericPrisma";
import { RepositoryUserPrisma } from "../repositories/RepositoryUserPrisma";
import { ServiceUser } from "../services/ServiceUser";

export function createUserController(): UserController {
  const repositoryUser = new RepositoryUserPrisma(prisma);
  const repositoryGeneric = new RepositoryGenericPrisma(prisma);
  const service = new ServiceUser(repositoryUser, repositoryGeneric);
  return new UserController(service);
}
