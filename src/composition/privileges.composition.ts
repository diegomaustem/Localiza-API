import { PrivilegeController } from "../controllers/PrivilegeController";
import prisma from "../lib/prisma";
import { RepositoryPrivilegePrisma } from "../repositories/RepositoryPrivilegePrisma";
import { ServicePrivilege } from "../services/PrivilegeService";

export function createPrivilegeController(): PrivilegeController {
  const repository = new RepositoryPrivilegePrisma(prisma);
  const service = new ServicePrivilege(repository);
  return new PrivilegeController(service);
}
