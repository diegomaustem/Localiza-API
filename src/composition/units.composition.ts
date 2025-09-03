import { UnitController } from "../controllers/UnitController";
import prisma from "../lib/prisma";
import { RepositoryGenericPrisma } from "../repositories/RepositoryGenericPrisma";
import { RepositoryUnitPrisma } from "../repositories/RepositoryUnitPrisma";
import { UnitService } from "../services/UnitService";

export function createUnitController(): UnitController {
  const repositoryUnit = new RepositoryUnitPrisma(prisma);
  const repositoryGeneric = new RepositoryGenericPrisma(prisma);
  const service = new UnitService(repositoryUnit, repositoryGeneric);
  return new UnitController(service);
}
