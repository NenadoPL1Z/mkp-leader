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
  opening_time: Nullable<string>;
  closing_time: Nullable<string>;
  only_weekdays: boolean;
  contacts: CompanyContactsModel[];
}
