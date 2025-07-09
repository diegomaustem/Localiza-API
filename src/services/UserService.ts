import { IUser } from "../interfaces/IUser";
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
    const newUser: IUser = {
      ...user,
      password: await passwordManager.hashPassword(user.password),
    };

    try {
      return await UserRepository.create(newUser);
    } catch (error) {
      console.error("Failed to create user.", error);
      throw error;
    }
  }

  async updateUser(userId: string, userData: IUser): Promise<IUser> {
    const updatedData: IUser = {
      ...userData,
      password: await passwordManager.hashPassword(userData.password),
    };

    try {
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
}
export const userService = new UserService();
