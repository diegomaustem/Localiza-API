import { IGroup } from "../interfaces/IGroup";
import prisma from "../lib/prisma";

class GroupRepository {
  async findMany(): Promise<IGroup[]> {
    try {
      return await prisma.groups.findMany();
    } catch (error) {
      console.error("Error fetching groups.", error);
      throw error;
    }
  }

  async findOne(groupId: string): Promise<IGroup | null> {
    try {
      return await prisma.groups.findUnique({
        where: { id: groupId },
      });
    } catch (error) {
      console.error("Error fetching group.", error);
      throw error;
    }
  }

  async create(groupData: IGroup): Promise<IGroup> {
    try {
      return await prisma.groups.create({
        data: groupData,
      });
    } catch (error) {
      console.error("Error creating group.", error);
      throw error;
    }
  }
}

export const groupRepository = new GroupRepository();
