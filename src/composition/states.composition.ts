import { StateController } from "../controllers/StateController";
import prisma from "../lib/prisma";
import { RepositoryStatePrisma } from "../repositories/RepositoryStatePrisma";
import { StateService } from "../services/StateService";

export function createStateController(): StateController {
  const repository = new RepositoryStatePrisma(prisma);
  const service = new StateService(repository);
  return new StateController(service);
}
