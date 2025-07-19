import { IStatusUser } from "../interfaces/IStatusUser";
import prisma from "../lib/prisma";

class StatusUserRepository {
  async findMany(): Promise<IStatusUser[]> {
    try {
      return await prisma.status_users.findMany();
    } catch (error) {
      console.error("Error fetching statusUsers.", error);
      throw error;
    }
  }

  async findOne(statusUserId: string): Promise<IStatusUser | null> {
    try {
      return await prisma.status_users.findUnique({
        where: { id: statusUserId },
      });
    } catch (error) {
      console.error("Error fetching statusUser.", error);
      throw error;
    }
  }
}

export const statusUserRepository = new StatusUserRepository();
