import { UserController } from "../controllers/UserController";
import prisma from "../lib/prisma";
import { RepositoryGenericPrisma } from "../repositories/RepositoryGenericPrisma";
import { RepositoryUserPrisma } from "../repositories/RepositoryUserPrisma";
import { UserService } from "../services/UserService";

export function createUserController(): UserController {
  const repositoryUser = new RepositoryUserPrisma(prisma);
  const repositoryGeneric = new RepositoryGenericPrisma(prisma);
  const service = new UserService(repositoryUser, repositoryGeneric);
  return new UserController(service);
}
