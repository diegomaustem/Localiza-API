import { ICreateUser, IUser } from "../interfaces/IUser";
import prisma from "../lib/prisma";

class UserRepository {
  async findMany() {
    try {
      return await prisma.users.findMany();
    } catch (error) {
      console.error("Error fetching users.", error);
      throw error;
    }
  }

  async findOne(userId: string): Promise<IUser> {
    try {
      const user = await prisma.users.findUnique({
        where: { id: userId },
      });
      return user;
    } catch (error) {
      console.error("Error fetching user.", error);
      throw error;
    }
  }

  async create(user: ICreateUser): Promise<IUser> {
    try {
      return await prisma.users.create({
        data: user,
      });
    } catch (error) {
      console.error("Error fetching users.", error);
      throw error;
    }
  }

  async delete(userId: string): Promise<void> {
    try {
      await prisma.users.delete({
        where: { id: userId },
      });
    } catch (error) {
      console.error("Error deleting user.", error);
      throw error;
    }
  }
}

export default new UserRepository();
