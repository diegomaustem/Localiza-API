import { ICity } from "./ICity";
import { ICityCreation } from "./ICityCreation";
import { ICityUpdate } from "./ICityUpdate";

export interface ICityRepository {
  findMany(): Promise<ICity[]>;
  findUnique(id: string): Promise<ICity | null>;
  create(city: ICityCreation): Promise<ICity>;
  update(id: string, city: ICityUpdate): Promise<ICity>;
  delete(id: string): Promise<ICity>;
}
