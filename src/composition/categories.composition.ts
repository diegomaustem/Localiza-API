import prisma from "../lib/prisma";
import { CategoryController } from "../controllers/CategoryController";
import { RepositoryCategoryPrisma } from "../repositories/RepositoryCategoryPrisma";
import { CategoryService } from "../services/CategoryService";

export function createCategoryController(): CategoryController {
  const repository = new RepositoryCategoryPrisma(prisma);
  const service = new CategoryService(repository);
  return new CategoryController(service);
}
