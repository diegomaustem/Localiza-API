import { IStatusCustomer } from "./IStatusCustomer";

export interface IStatusCustomerService {
  listStatusCustomers(): Promise<IStatusCustomer[]>;
  listStatusCustomer(id: string): Promise<IStatusCustomer | null>;
}
