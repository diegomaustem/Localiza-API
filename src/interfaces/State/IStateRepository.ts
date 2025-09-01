import { IState } from "./IState";

export interface IStateRepository {
  findMany(): Promise<IState[]>;
  findUnique(id: string): Promise<IState | null>;
}
