import HttpError from "../errors/HttpError";
import { IGroup } from "../interfaces/Group/IGroup";
import { IGroupRepository } from "../interfaces/Group/IGroupRepository";
import { IGroupService } from "../interfaces/Group/IGroupService";

export class GroupService implements IGroupService {
  constructor(private readonly repository: IGroupRepository) {}

  async listGroups(): Promise<IGroup[]> {
    try {
      return await this.repository.findMany();
    } catch (error) {
      console.error("[Service] - Failed to retrieve groups.", error);
      throw error;
    }
  }

  async listGroup(id: string): Promise<IGroup | null> {
    try {
      const group = await this.repository.findUnique(id);
      if (!group) {
        throw new HttpError(
          "RESOURCE_NOT_FOUND",
          "Group not found in our records.",
          404
        );
      }
      return group;
    } catch (error) {
      console.error("[Service] - Failed to retrieve group.", error);
      throw error;
    }
  }
}
