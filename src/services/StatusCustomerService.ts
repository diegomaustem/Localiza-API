import { IStatusCustomer } from "../interfaces/IStatusCustomer";
import { statusCustomerRepository } from "../repositories/StatusCustomerRepository";

class StatusCustomerService {
  async getStatusCustomers(): Promise<IStatusCustomer[]> {
    try {
      return await statusCustomerRepository.findMany();
    } catch (error) {
      console.error("Failed to retrieve statusCustomers.", error);
      throw error;
    }
  }

  async getStatusCustomer(
    statusCustomerId: string
  ): Promise<IStatusCustomer | null> {
    try {
      return await statusCustomerRepository.findOne(statusCustomerId);
    } catch (error) {
      console.error("Failed to retrieve statusCustomer.", error);
      throw error;
    }
  }
}

export const statusCustomerService = new StatusCustomerService();
