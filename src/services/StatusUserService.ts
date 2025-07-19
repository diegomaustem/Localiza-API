import { IStatusUser } from "../interfaces/IStatusUser";
import { statusUserRepository } from "../repositories/StatusUserRepository";

class StatusUserService {
  async getStatusUsers(): Promise<IStatusUser[]> {
    try {
      return await statusUserRepository.findMany();
    } catch (error) {
      console.error("Failed to retrieve statusUsers.", error);
      throw error;
    }
  }

  async getStatusUser(statusUserId: string): Promise<IStatusUser | null> {
    try {
      return await statusUserRepository.findOne(statusUserId);
    } catch (error) {
      console.error("Failed to retrieve statusUser.", error);
      throw error;
    }
  }
}

export const statusUserService = new StatusUserService();
