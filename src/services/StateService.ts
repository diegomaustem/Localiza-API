import HttpError from "../errors/HttpError";
import { IState } from "../interfaces/State/IState";
import { IStateRepository } from "../interfaces/State/IStateRepository";
import { IStateService } from "../interfaces/State/IStateService";

export class StateService implements IStateService {
  constructor(private readonly repository: IStateRepository) {}

  async listStates(): Promise<IState[]> {
    try {
      return await this.repository.findMany();
    } catch (error) {
      console.error("[Service] - Failed to retrieve states.", error);
      throw error;
    }
  }

  async listState(id: string): Promise<IState | null> {
    try {
      const state = await this.repository.findUnique(id);
      if (!state) {
        throw new HttpError(
          "RESOURCE_NOT_FOUND",
          "State not found in our records.",
          404
        );
      }
      return state;
    } catch (error) {
      console.error("[Service] - Failed to retrieve state.", error);
      throw error;
    }
  }
}
