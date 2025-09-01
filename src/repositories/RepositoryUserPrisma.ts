import { PrismaClient } from "../generated/prisma";
import { IUser } from "../interfaces/User/IUser";
import { IUserCreation } from "../interfaces/User/IUserCreation";
import { IUserRepository } from "../interfaces/User/IUserRepository";
import { IUserUpdate } from "../interfaces/User/IUserUpdate";

export class RepositoryUserPrisma implements IUserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findMany(): Promise<IUser[]> {
    try {
      return await this.prisma.user.findMany();
    } catch (error) {
      console.error("[Repository] - Error fetching users.", error);
      throw error;
    }
  }

  async findUnique(id: string): Promise<IUser | null> {
    try {
      return await this.prisma.user.findUnique({
        where: { id },
      });
    } catch (error) {
      console.error("[Repository] - Error fetching user.", error);
      throw error;
    }
  }

  async create(user: IUserCreation): Promise<IUser> {
    try {
      return await this.prisma.user.create({
        data: user,
      });
    } catch (error) {
      console.error("[Repository] - Error creating user.", error);
      throw error;
    }
  }

  async update(id: string, user: IUserUpdate): Promise<IUser> {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: user,
      });
    } catch (error) {
      console.error("[Repository] - Error updating user.", error);
      throw error;
    }
  }

  async delete(id: string): Promise<IUser> {
    try {
      return await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      console.error("[Repository] - Error deleting user.", error);
      throw error;
    }
  }

  async findByEmail(email: string): Promise<IUser | null> {
    try {
      return await this.prisma.user.findFirst({
        where: {
          email: {
            equals: email,
            mode: "insensitive",
          },
        },
      });
    } catch (error) {
      console.error("[Repository] - Error fetching user by email.", error);
      throw error;
    }
  }
}
