import HttpError from "../errors/HttpError";
import { IGroup } from "../interfaces/IGroup";
import { genericRepository } from "../repositories/GenericRepository";
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

  async createGroup(groupData: IGroup): Promise<IGroup> {
    try {
      return await groupRepository.create(groupData);
    } catch (error) {
      console.error("Failed to create group.", error);
      throw error;
    }
  }

  async groupRulesValidation(
    groupData: IGroup,
    groupId?: string
  ): Promise<void> {
    const hasGroup = await genericRepository.generateQuery(
      "groups",
      "name",
      groupData.name
    );
    if (hasGroup) {
      throw new HttpError(
        "The group provided is already registered. Enter another name.",
        409
      );
    }
  }
}

export const groupService = new GroupService();
