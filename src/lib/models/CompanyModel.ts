import type { ExecutorModel } from "@app/lib/models/ExecutorModel.ts";
import type { Nullable } from "@app/types/general";

export type CompanyId = number;
export type CompanyContactsId = number;

export interface CompanyContactsModel {
  id: CompanyContactsId;
  person: Nullable<string>;
  phone: string;
}

export interface CompanyModel {
  id: CompanyContactsId;
  name: string;
  address: Nullable<string>;
  executor_default_id: number;
  executor_additional_id: number | null;
  executor_default: ExecutorModel;
  executor_additional: ExecutorModel | null;
  opening_time: Nullable<string>;
  closing_time: Nullable<string>;
  only_weekdays: boolean;
  contacts: CompanyContactsModel[];
}
