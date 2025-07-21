import { IState } from "../interfaces/IState";
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
}

export const stateService = new StateService();
