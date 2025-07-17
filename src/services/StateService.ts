import HttpError from "../errors/HttpError";
import { IState } from "../interfaces/IState";
import { genericRepository } from "../repositories/GenericRepository";
import { stateRepository } from "../repositories/StateRepository";

class StateService {
  async getStates(): Promise<IState[]> {
    try {
      return await stateRepository.findMany();
    } catch (error) {
      console.error("Failed to retrieve states.", error);
      throw error;
    }
  }

  async getState(stateId: string): Promise<IState | null> {
    try {
      return await stateRepository.findOne(stateId);
    } catch (error) {
      console.error("Failed to retrieve state.", error);
      throw error;
    }
  }

  async createState(stateData: IState): Promise<IState> {
    try {
      return await stateRepository.create(stateData);
    } catch (error) {
      console.error("Failed to create state.", error);
      throw error;
    }
  }

  async stateRulesValidation(
    stateData: IState,
    stateId?: string
  ): Promise<void> {
    const hasState = await genericRepository.generateQuery(
      "states",
      "name",
      stateData.name
    );
    if (hasState) {
      throw new HttpError(
        "The state provided is already registered. Enter another name.",
        409
      );
    }
  }
}

export const stateService = new StateService();
