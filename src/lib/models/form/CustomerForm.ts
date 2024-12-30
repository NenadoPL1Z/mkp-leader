import type { CompanyModel } from "@app/lib/models/CompanyModel";
import type { CustomerDetailModel } from "@app/lib/models/CustomerModel";

type User = Pick<CustomerDetailModel, "username" | "password">;

type Company = Pick<CompanyModel, "name" | "only_weekdays">;

export type CustomerForm = User &
  Company & {
    address: string;
    opening_time: string;
    closing_time: string;
    personal_first_phone: string;
    personal_first_name: string;
    personal_second_phone: string;
    personal_second_name: string;
  };