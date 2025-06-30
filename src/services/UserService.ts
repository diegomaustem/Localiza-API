import { ICreateUser, IUser } from "../interfaces/IUser";
import prisma from "../lib/prisma";
import { v4 as uuidv4 } from "uuid";
import UserRepository from "../repositories/UserRepository";
import { passwordManager } from "../utils/PasswordManager";

class UserService {
  async getUsers(): Promise<IUser[]> {
    try {
      const users = await UserRepository.findMany();
      if (users.length === 0) {
        return [];
      }
      return users;
    } catch (error) {
      console.error("Failed to retrieve users.", error);
      throw error;
    }
  }

  async getUser(userId: string): Promise<IUser> {
    try {
      const users = await UserRepository.findOne(userId);
      return users;
    } catch (error) {
      console.error("Failed to retrieve user.", error);
      throw error;
    }
  }

  async createUser(user: ICreateUser): Promise<IUser> {
    const newUser: ICreateUser = {
      ...user,
      id: uuidv4(),
      senha: await passwordManager.hashPassword(user.senha),
    };

    try {
      const createdUser = await UserRepository.create(newUser);
      return createdUser;
    } catch (error) {
      console.error("Failed to create user.", error);
      throw error;
    }
  }

  async updateUser(userId: string, userData: ICreateUser): Promise<IUser> {
    const updatedData: ICreateUser = {
      ...userData,
      senha: await passwordManager.hashPassword(userData.senha),
    };

    try {
      const updatedUser = await UserRepository.update(userId, updatedData);
      return updatedUser;
    } catch (error) {
      console.error("Failed to update user.", error);
      throw error;
    }
  }

  async deleteUser(userId: string): Promise<void> {
    try {
      await UserRepository.delete(userId);
    } catch (error) {
      console.error("Failed to delete user.", error);
      throw error;
    }
  }
}
export const userService = new UserService();
