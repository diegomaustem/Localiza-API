import { ICreateUser, IUser } from "../interfaces/IUser";
import prisma from "../lib/prisma";
import { v4 as uuidv4 } from "uuid";
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

  async getUser(userId: string): Promise<IUser> {
    try {
      return await UserRepository.findOne(userId);
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
      return await UserRepository.create(newUser);
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
