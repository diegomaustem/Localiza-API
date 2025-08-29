import HttpError from "../errors/HttpError";
import { IGenericRepository } from "../interfaces/Generic/IGenericRepository";
import { IUser } from "../interfaces/User/IUser";
import { IUserCreation } from "../interfaces/User/IUserCreation";
import { IUserRepository } from "../interfaces/User/IUserRepository";
import { IUserService } from "../interfaces/User/IUserService";
import { IUserUpdate } from "../interfaces/User/IUserUpdate";
import { passwordManager } from "../utils/PasswordManager";

export class UserService implements IUserService {
  constructor(
    private repositoryUser: IUserRepository,
    private repositoryGeneric: IGenericRepository
  ) {}

  async listUsers(): Promise<IUser[]> {
    try {
      return await this.repositoryUser.findMany();
    } catch (error) {
      console.error("[Service] - Error listing users.", error);
      throw error;
    }
  }

  async listUser(id: string): Promise<IUser | null> {
    try {
      const user = await this.repositoryUser.findOne(id);
      if (!user) {
        throw new HttpError(
          "RESOURCE_NOT_FOUND",
          "User not found in our records.",
          404
        );
      }
      return user;
    } catch (error) {
      console.error("[Service] - Failed to retrieve user.", error);
      throw error;
    }
  }

  async create(user: IUserCreation): Promise<IUser> {
    try {
      await this.userRulesValidation(user);
      const passwordHash = await passwordManager.hashPassword(user.password);
      user.password = passwordHash;
      return await this.repositoryUser.create(user);
    } catch (error) {
      console.error("[Service] - Failed to create user.", error);
      throw error;
    }
  }

  async update(id: string, user: IUserUpdate): Promise<IUser> {
    try {
      const existingUser = await this.repositoryUser.findOne(id);

      if (!existingUser) {
        throw new HttpError(
          "RESOURCE_NOT_FOUND",
          "The user you are trying to update does not exist.",
          404
        );
      }

      await this.userRulesValidation(user, id);

      if (user.password) {
        const passwordHash = await passwordManager.hashPassword(user.password);
        user.password = passwordHash;
      }
      return await this.repositoryUser.update(id, user);
    } catch (error) {
      console.error("[Service] - Failed to update user.", error);
      throw error;
    }
  }

  async delete(id: string): Promise<IUser> {
    try {
      const existingUser = await this.repositoryUser.findOne(id);
      if (!existingUser) {
        throw new HttpError(
          "RESOURCE_NOT_FOUND",
          "The user you are trying to delete does not exist.",
          404
        );
      }

      return await this.repositoryUser.delete(id);
    } catch (error) {
      console.error("[Service] - Failed to delete user.", error);
      throw error;
    }
  }

  async findByEmail(email: string): Promise<IUser | null> {
    try {
      const user = await this.repositoryUser.findByEmail(email);
      if (!user) {
        throw new HttpError(
          "RESOURCE_NOT_FOUND",
          "User not found in our records.",
          404
        );
      }
      return user;
    } catch (error) {
      console.error("[Service] - Failed to retrieve user by email.", error);
      throw error;
    }
  }

  private async userRulesValidation(
    user: IUserCreation | IUserUpdate,
    id?: string
  ): Promise<void> {
    const { IdStatusUsers, IdPrivileges, email } = user;

    if (email) {
      const existingUser = await this.repositoryUser.findByEmail(email);

      if (existingUser && existingUser.id !== id) {
        throw new HttpError(
          "CONFLICT",
          "The email you provided is already in use. Please choose another one.",
          409
        );
      }
    }

    const [statusExists, privilegeExists] = await Promise.all([
      IdStatusUsers
        ? this.repositoryGeneric.genericQuery("statusUser", "id", IdStatusUsers)
        : Promise.resolve(false),

      IdPrivileges
        ? this.repositoryGeneric.genericQuery("privilege", "id", IdPrivileges)
        : Promise.resolve(false),
    ]);

    if (IdStatusUsers && !statusExists) {
      throw new HttpError(
        "RESOURCE_NOT_FOUND",
        "The provided IdStatusUsers is not in our records. Please try another one.",
        404
      );
    }
    if (IdPrivileges && !privilegeExists) {
      throw new HttpError(
        "RESOURCE_NOT_FOUND",
        "The provided IdPrivileges is not in our records. Please try another one.",
        404
      );
    }
  }
}
