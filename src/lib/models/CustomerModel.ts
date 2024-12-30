import type { CompanyModel } from "@app/lib/models/CompanyModel";

export interface CustomerModel {
  id: number;
  customer_company: Pick<CompanyModel, "id" | "name" | "address">;
}

export interface CustomerDetailModel
  extends Omit<CustomerModel, "customer_company"> {
  username: string;
  password: string;
  customer_company: CompanyModel;
}
