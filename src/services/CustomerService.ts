import { ICustomer } from "../interfaces/ICustomer";
import { customerRepository } from "../repositories/CustomerRepository";
import { passwordManager } from "../utils/PasswordManager";

class CustomerService {
  async getCustomers(): Promise<ICustomer[]> {
    try {
      return await customerRepository.findMany();
    } catch (error) {
      console.error("Failed to retrieve customers.", error);
      throw error;
    }
  }

  async getCustomer(customerId: string): Promise<ICustomer | null> {
    try {
      return await customerRepository.findOne(customerId);
    } catch (error) {
      console.error("Failed to retrieve customer.", error);
      throw error;
    }
  }

  async createCustomer(custumerData: ICustomer): Promise<ICustomer> {
    const newCustomer: ICustomer = {
      ...custumerData,
      password: await passwordManager.hashPassword(custumerData.password),
    };

    try {
      return await customerRepository.create(newCustomer);
    } catch (error) {
      console.error("Failed to create customer.", error);
      throw error;
    }
  }

  async updateCustomer(
    customerId: string,
    custumerData: ICustomer
  ): Promise<ICustomer> {
    const updatedData: ICustomer = {
      ...custumerData,
      password: await passwordManager.hashPassword(custumerData.password),
    };

    try {
      return await customerRepository.update(customerId, updatedData);
    } catch (error) {
      console.error("Failed to update customer.", error);
      throw error;
    }
  }

  async deleteCustomer(customerId: string): Promise<ICustomer> {
    try {
      return await customerRepository.delete(customerId);
    } catch (error) {
      console.error("Failed to delete customer.", error);
      throw error;
    }
  }
}

export const customerService = new CustomerService();
