import { ICustomer } from "../interfaces/ICustomer";
import { customerRepository } from "../repositories/CustomerRepository";
import { genericRepository } from "../repositories/GenericRepository";
import { passwordManager } from "../utils/PasswordManager";
import HttpError from "../errors/HttpError";

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

  async customerRulesValidation(
    customerData: ICustomer,
    customerId?: string
  ): Promise<void> {
    const hasCpf = await genericRepository.generateQuery(
      "customers",
      "cpf",
      customerData.cpf,
      customerId
    );
    if (hasCpf) {
      throw new HttpError("The CPF provided is already registered.", 409);
    }

    const hasCnhCode = await genericRepository.generateQuery(
      "customers",
      "cnh_code",
      customerData.cnh_code,
      customerId
    );
    if (hasCnhCode) {
      throw new HttpError("The CNH provided is already registered.", 409);
    }

    const hasNationality = await genericRepository.generateQuery(
      "nationalities",
      "id",
      customerData.nationalities_id,
      customerId
    );
    if (!hasNationality) {
      throw new HttpError("Nationality not found. Enter a valid one.", 404);
    }

    const hasHonor = await genericRepository.generateQuery(
      "honors",
      "id",
      customerData.honors_id,
      customerId
    );
    if (!hasHonor) {
      throw new HttpError("Honor not found. Enter a valid one.", 404);
    }
  }
}

export const customerService = new CustomerService();
