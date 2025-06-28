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
}

export default new UserRepository();
