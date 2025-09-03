import prisma from "../lib/prisma";
import { CityController } from "../controllers/CityController";
import { RepositoryCityPrisma } from "../repositories/RepositoryCityPrisma";
import { CityService } from "../services/CityService";
import { RepositoryGenericPrisma } from "../repositories/RepositoryGenericPrisma";

export function createCityController(): CityController {
  const repositoryCity = new RepositoryCityPrisma(prisma);
  const repositoryGeneric = new RepositoryGenericPrisma(prisma);
  const service = new CityService(repositoryCity, repositoryGeneric);
  return new CityController(service);
}
