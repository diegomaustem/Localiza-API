import { IStatusCustomer } from "./IStatusCustomer";

export interface IStatusCustomerRepository {
  findMany(): Promise<IStatusCustomer[]>;
  findUnique(id: string): Promise<IStatusCustomer | null>;
}
