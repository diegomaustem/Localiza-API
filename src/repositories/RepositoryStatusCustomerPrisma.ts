import { IStatusCustomer } from "../interfaces/StatusCustomer/IStatusCustomer";
import { IStatusCustomerRepository } from "../interfaces/StatusCustomer/IStatusCustomerRepository";
import { PrismaClient } from "../generated/prisma";

export class RepositoryStatusCustomerPrisma
  implements IStatusCustomerRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  async findMany(): Promise<IStatusCustomer[]> {
    try {
      return await this.prisma.statusCustomer.findMany();
    } catch (error) {
      console.error("[Repository] - Error fetching statusCustomers.", error);
      throw error;
    }
  }

  async findUnique(id: string): Promise<IStatusCustomer | null> {
    try {
      return await this.prisma.statusCustomer.findUnique({
        where: { id },
      });
    } catch (error) {
      console.error("[Repository] - Error fetching statusCustomer.", error);
      throw error;
    }
  }
}
