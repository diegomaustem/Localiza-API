import { Decimal } from "../generated/prisma/runtime/library";
export interface IReserve {
  id: string;
  daily_amount: number;
  withdrawn: Date;
  return: Date;
  value: Decimal;
  status: string;
  customers_id: string;
  vehicles_id: string;
  creation_date: Date;
  update_date: Date;
}
