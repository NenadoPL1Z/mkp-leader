import type { Nullable } from "@app/types/general";
import type { CompanyModel } from "./CompanyModel";

export type UserRole = "admin" | "executor" | "customer";

export const UserRoles: Record<UserRole, string> = {
  admin: "Админ",
  customer: "Заказчик",
  executor: "Исполнитель",
} as const;

export type UserId = number;

export interface UserModel {
  readonly id: UserId;
  readonly username: string;
  readonly name: Nullable<string>;
  readonly phone: Nullable<string>;
  readonly role: UserRole;
  readonly is_active: boolean;
  readonly is_admin: boolean;
  readonly is_customer: boolean;
  readonly is_executor: boolean;
  readonly customer_company: Nullable<CompanyModel[]>;
}
