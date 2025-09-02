import { IGroup } from "./IGroup";

export interface IGroupRepository {
  findMany(): Promise<IGroup[]>;
  findUnique(id: string): Promise<IGroup | null>;
}
