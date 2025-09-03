import prisma from "../lib/prisma";
import { NationalityController } from "../controllers/NationalityController";
import { RepositoryNationalityPrisma } from "../repositories/RepositoryNationalityPrisma";
import { RepositoryGenericPrisma } from "../repositories/RepositoryGenericPrisma";
import { NationalityService } from "../services/NationalityService";

export function createNationalityController(): NationalityController {
  const repositoryNationality = new RepositoryNationalityPrisma(prisma);
  const repositoryGeneric = new RepositoryGenericPrisma(prisma);
  const service = new NationalityService(
    repositoryNationality,
    repositoryGeneric
  );
  return new NationalityController(service);
}
