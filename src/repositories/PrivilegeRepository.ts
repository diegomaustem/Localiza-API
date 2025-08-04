import { IPaginated } from "../interfaces/IPaginated";
import { IPrivilege } from "../interfaces/IPrivilege";
import { IPaginatedResult } from "../interfaces/IPaginatedResult";
import prisma from "../lib/prisma";

class PrivilegeRepository {
  async findMany(paginated: IPaginated): Promise<IPaginatedResult<IPrivilege>> {
    const { page, limit } = paginated;
    try {
      const skip = (page - 1) * limit;

      const [data, total] = await Promise.all([
        prisma.privileges.findMany({
          skip,
          take: limit,
        }),
        prisma.privileges.count(),
      ]);

      const totalPages = Math.ceil(total / limit);

      return {
        data,
        meta: {
          total,
          page,
          limit,
          totalPages,
        },
      };
    } catch (error) {
      console.error("Error fetching privileges.", error);
      throw error;
    }
  }

  async findOne(privilegeId: string): Promise<IPrivilege | null> {
    try {
      return await prisma.privileges.findUnique({
        where: { id: privilegeId },
      });
    } catch (error) {
      console.error("Error fetching privilege.", error);
      throw error;
    }
  }
}

export const privilegeRepository = new PrivilegeRepository();
