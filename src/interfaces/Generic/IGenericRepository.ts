import { ValidPrismaTable } from "../../types/PrismaTables";

export interface IGenericRepository {
  genericQuery(
    table: ValidPrismaTable,
    field: string,
    value: string,
    id?: string
  ): Promise<Boolean>;
}
