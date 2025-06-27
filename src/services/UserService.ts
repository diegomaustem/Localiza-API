import { ICreateUser, IUser } from "../interfaces/IUser";
import prisma from "../lib/prisma";
import { v4 as uuidv4 } from "uuid";
import UserRepository from "../repositories/UserRepository";

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
}

export const userService = new UserService();
