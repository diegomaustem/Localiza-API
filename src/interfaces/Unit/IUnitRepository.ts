import { IUnit } from "./IUnit";
import { IUnitCreation } from "./IUnitCreation";
import { IUnitUpdate } from "./IUnitUpdate";

export interface IUnitRepository {
  findMany(): Promise<IUnit[]>;
  findUnique(id: string): Promise<IUnit | null>;
  create(unit: IUnitCreation): Promise<IUnit>;
  update(id: string, unit: IUnitUpdate): Promise<IUnit>;
  delete(id: string): Promise<IUnit>;
}
