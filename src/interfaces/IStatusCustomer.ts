export interface IStatusCustomer {
  id: string;
  status: string;
  description?: string | null;
  creation_date: Date;
  update_date: Date;
}
