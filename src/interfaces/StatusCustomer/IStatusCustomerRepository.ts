import { IStatusCustomer } from "./IStatusCustomer";

export interface IStatusCustomerRepository {
  findMany(): Promise<IStatusCustomer[]>;
  findOne(id: string): Promise<IStatusCustomer | null>;
}
