import { IGroup } from "../interfaces/IGroup";
import { groupRepository } from "../repositories/GroupRepository";
class GroupService {
  async getGroups(): Promise<IGroup[]> {
    try {
      return await groupRepository.findMany();
    } catch (error) {
      console.error("Failed to retrieve groups.", error);
      throw error;
    }
  }

  async getGroup(groupId: string): Promise<IGroup | null> {
    try {
      return await groupRepository.findOne(groupId);
    } catch (error) {
      console.error("Failed to retrieve group.", error);
      throw error;
    }
  }
}

export const groupService = new GroupService();
