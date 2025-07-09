import { ICustomer } from "../interfaces/ICustomer";
import prisma from "../lib/prisma";

class CustomerRepository {
  async findMany(): Promise<ICustomer[]> {
    try {
      return await prisma.customers.findMany();
    } catch (error) {
      console.error("Error fetching customers.", error);
      throw error;
    }
  }

  async findOne(customerId: string): Promise<ICustomer | null> {
    try {
      return await prisma.customers.findUnique({
        where: { id: customerId },
      });
    } catch (error) {
      console.error("Error fetching customer.", error);
      throw error;
    }
  }

  async create(customerData: ICustomer): Promise<ICustomer> {
    try {
      return await prisma.customers.create({
        data: customerData,
      });
    } catch (error) {
      console.error("Error creating client..", error);
      throw error;
    }
  }

  async update(
    customerId: string,
    customerData: ICustomer
  ): Promise<ICustomer> {
    try {
      return await prisma.customers.update({
        where: { id: customerId },
        data: customerData,
      });
    } catch (error) {
      console.error("Error updating customer.", error);
      throw error;
    }
  }
}

export const customerRepository = new CustomerRepository();
