import { GroupController } from "../controllers/GroupController";
import prisma from "../lib/prisma";
import { RepositoryGroupPrisma } from "../repositories/RepositoryGroupPrisma";
import { GroupService } from "../services/GroupService";

export function createGroupController(): GroupController {
  const repository = new RepositoryGroupPrisma(prisma);
  const service = new GroupService(repository);
  return new GroupController(service);
}
