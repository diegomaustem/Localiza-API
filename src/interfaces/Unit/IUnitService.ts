import { IUnit } from "./IUnit";
import { IUnitCreation } from "./IUnitCreation";
import { IUnitUpdate } from "./IUnitUpdate";

export interface IUnitService {
  listUnits(): Promise<IUnit[]>;
  listUnit(id: string): Promise<IUnit | null>;
  create(unit: IUnitCreation): Promise<IUnit>;
  update(id: string, unit: IUnitUpdate): Promise<IUnit>;
  delete(id: string): Promise<IUnit>;
}
