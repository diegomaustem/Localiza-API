import HttpError from "../errors/HttpError";
import { IUser } from "../interfaces/IUser";
import { genericRepository } from "../repositories/GenericRepository";
import UserRepository from "../repositories/UserRepository";
import { passwordManager } from "../utils/PasswordManager";

class UserService {
  async getUsers(): Promise<IUser[]> {
    try {
      return await UserRepository.findMany();
    } catch (error) {
      console.error("Failed to retrieve users.", error);
      throw error;
    }
  }

  async getUser(userId: string): Promise<IUser | null> {
    try {
      return await UserRepository.findOne(userId);
    } catch (error) {
      console.error("Failed to retrieve user.", error);
      throw error;
    }
  }

  async createUser(user: IUser): Promise<IUser> {
    try {
      const hashedPassword = await passwordManager.hashPassword(user.password);

      const newUser: IUser = {
        ...user,
        password: hashedPassword,
      };

      return await UserRepository.create(newUser);
    } catch (error) {
      console.error("Failed to create user.", error);
      throw error;
    }
  }

  async updateUser(userId: string, userData: IUser): Promise<IUser> {
    try {
      const updatedData: IUser = { ...userData };

      if (userData.password) {
        updatedData.password = await passwordManager.hashPassword(
          userData.password
        );
      }

      return await UserRepository.update(userId, updatedData);
    } catch (error) {
      console.error("Failed to update user.", error);
      throw error;
    }
  }

  async deleteUser(userId: string): Promise<IUser> {
    try {
      return await UserRepository.delete(userId);
    } catch (error) {
      console.error("Failed to delete user.", error);
      throw error;
    }
  }

  async userRulesValidation(userData: IUser, userId?: string): Promise<void> {
    const [hasStatusUser, hasPrivilege, hasEmail] = await Promise.all([
      genericRepository.generateQuery(
        "status_users",
        "id",
        userData.status_users_id
      ),
      genericRepository.generateQuery(
        "privileges",
        "id",
        userData.privileges_id
      ),
      genericRepository.generateQuery("users", "email", userData.email),
    ]);

    if (!hasStatusUser) {
      throw new HttpError(
        "O status_user informado não consta em nossos registros. Tente outro.",
        404
      );
    }
    if (!hasPrivilege) {
      throw new HttpError(
        "O privilégio informado não consta em nossos registros. Tente outro.",
        404
      );
    }
    if (hasEmail) {
      throw new HttpError(
        "O e-mail informado já está cadastrado. Tente outro.",
        409
      );
    }
  }
}
export const userService = new UserService();
