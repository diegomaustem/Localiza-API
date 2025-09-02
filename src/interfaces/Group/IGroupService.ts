import { IGroup } from "./IGroup";

export interface IGroupService {
  listGroups(): Promise<IGroup[]>;
  listGroup(id: string): Promise<IGroup | null>;
}
