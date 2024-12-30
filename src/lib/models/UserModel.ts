import type { Nullable } from "@app/types/general";
import type { CompanyModel } from "./CompanyModel";

export type UseRole = "admin" | "executor" | "customer";

export type UserId = number;

export interface UserModel {
  readonly id: UserId;
  readonly username: string;
  readonly name: Nullable<string>;
  readonly phone: Nullable<string>;
  readonly role: UseRole;
  readonly is_active: boolean;
  readonly is_admin: boolean;
  readonly is_customer: boolean;
  readonly is_executor: boolean;
  readonly customer_company: Nullable<CompanyModel[]>;
}
