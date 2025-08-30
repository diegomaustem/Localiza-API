import { IStatusUser } from "../interfaces/StatusUser/IStatusUser";
import { IStatusUserService } from "../interfaces/StatusUser/IStatusUserService";
import HttpError from "../errors/HttpError";
import { IStatusUserRepository } from "../interfaces/StatusUser/IStatusUserRepository";

export class StatusUserService implements IStatusUserService {
  constructor(private readonly repository: IStatusUserRepository) {}

  async listStatusUsers(): Promise<IStatusUser[]> {
    try {
      return await this.repository.findMany();
    } catch (error) {
      console.error("Failed to retrieve statusUsers.", error);
      throw error;
    }
  }

  async listStatusUser(id: string): Promise<IStatusUser | null> {
    try {
      const statusUser = await this.repository.findOne(id);
      if (!statusUser) {
        throw new HttpError("RESOURCE_NOT_FOUND", "statusUser not found.", 404);
      }
      return statusUser;
    } catch (error) {
      console.error("Failed to retrieve statusUser.", error);
      throw error;
    }
  }
}
