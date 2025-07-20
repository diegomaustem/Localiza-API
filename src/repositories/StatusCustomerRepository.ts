import { IStatusCustomer } from "../interfaces/IStatusCustomer";
import prisma from "../lib/prisma";

class StatusCustomerRepository {
  async findMany(): Promise<IStatusCustomer[]> {
    try {
      return await prisma.status_customers.findMany();
    } catch (error) {
      console.error("Error fetching statusCustomers.", error);
      throw error;
    }
  }

  async findOne(statusCustomerId: string): Promise<IStatusCustomer | null> {
    try {
      return await prisma.status_customers.findUnique({
        where: { id: statusCustomerId },
      });
    } catch (error) {
      console.error("Error fetching statusCustomer.", error);
      throw error;
    }
  }
}

export const statusCustomerRepository = new StatusCustomerRepository();
