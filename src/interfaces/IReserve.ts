export interface ICategory {
  id: string;
  daily_amount: number;
  withdrawn: Date;
  return: Date;
  value: number;
  status: string;
  customers_id: string;
  vehicles_id: string;
  creation_date: Date;
  update_date: Date;
}
