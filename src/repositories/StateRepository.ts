import { IState } from "../interfaces/IState";
import prisma from "../lib/prisma";

class StateRepository {
  async findMany(): Promise<IState[]> {
    try {
      return await prisma.states.findMany();
    } catch (error) {
      console.error("Error fetching states.", error);
      throw error;
    }
  }

  async findOne(stateId: string): Promise<IState | null> {
    try {
      return await prisma.states.findUnique({
        where: { id: stateId },
      });
    } catch (error) {
      console.error("Error fetching state.", error);
      throw error;
    }
  }

  async create(stateData: IState): Promise<IState> {
    try {
      return await prisma.states.create({
        data: stateData,
      });
    } catch (error) {
      console.error("Error creating state.", error);
      throw error;
    }
  }
}

export const stateRepository = new StateRepository();
