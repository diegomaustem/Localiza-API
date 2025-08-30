import HttpError from "../errors/HttpError";
import { IStatusCustomer } from "../interfaces/StatusCustomer/IStatusCustomer";
import { IStatusCustomerRepository } from "../interfaces/StatusCustomer/IStatusCustomerRepository";
import { IStatusCustomerService } from "../interfaces/StatusCustomer/IStatusCustomerService";

export class StatusCustomerService implements IStatusCustomerService {
  constructor(private readonly repository: IStatusCustomerRepository) {}

  async listStatusCustomers(): Promise<IStatusCustomer[]> {
    try {
      return await this.repository.findMany();
    } catch (error) {
      console.error("Failed to retrieve statusCustomers.", error);
      throw error;
    }
  }

  async listStatusCustomer(id: string): Promise<IStatusCustomer | null> {
    try {
      const statusCustomer = await this.repository.findOne(id);
      if (!statusCustomer) {
        throw new HttpError(
          "RESOURCE_NOT_FOUND",
          "StatusCustomer not found in our records.",
          404
        );
      }
      return statusCustomer;
    } catch (error) {
      console.error("Failed to retrieve statusCustomer.", error);
      throw error;
    }
  }
}
