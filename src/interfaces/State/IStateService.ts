import { IState } from "./IState";

export interface IStateService {
  listStates(): Promise<IState[]>;
  listState(id: string): Promise<IState | null>;
}
