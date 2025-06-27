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
}

export default new UserRepository();
