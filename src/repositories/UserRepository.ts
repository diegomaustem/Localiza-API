import { IUser } from "../interfaces/IUser";
import prisma from "../lib/prisma";

class UserRepository {
  async findMany(): Promise<IUser[]> {
    try {
      return await prisma.users.findMany();
    } catch (error) {
      console.error("Error fetching users.", error);
      throw error;
    }
  }

  async findOne(userId: string): Promise<IUser | null> {
    try {
      return await prisma.users.findUnique({
        where: { id: userId },
      });
    } catch (error) {
      console.error("Error fetching user.", error);
      throw error;
    }
  }

  async create(user: IUser) {
    console.log(user);
    // try {
    //   return await prisma.users.create({
    //     data: user,
    //   });
    // } catch (error) {
    //   console.error("Error creating user.", error);
    //   throw error;
    // }
  }

  async update(userId: string, userData: IUser): Promise<IUser> {
    try {
      return await prisma.users.update({
        where: { id: userId },
        data: userData,
      });
    } catch (error) {
      console.error("Error updating user.", error);
      throw error;
    }
  }

  async delete(userId: string): Promise<IUser> {
    try {
      return await prisma.users.delete({
        where: { id: userId },
      });
    } catch (error) {
      console.error("Error deleting user.", error);
      throw error;
    }
  }
}

export default new UserRepository();
