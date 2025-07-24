import { Decimal } from "../generated/prisma/runtime/library";
export interface ICategory {
  id: string;
  name: string;
  value: Decimal;
  creation_date: Date;
  update_date: Date;
}
