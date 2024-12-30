import { apiInstance } from "@app/lib/http";
import { Api } from "@app/lib/constants/api";
import type { CustomerDetailModel } from "@app/lib/models/CustomerModel";

export type CustomerContactsData = {
  phone: string;
  person: string;
};

export type CustomerCreateData = {
  username: string;
  password: string;
  name: string;
  address: string;
  opening_time: string;
  closing_time: string;
  only_weekdays: boolean;
  contacts: CustomerContactsData[];
};

export const postCustomerCreate = (data: CustomerCreateData) => {
  return apiInstance.post<CustomerDetailModel>(Api.users.customer.create, data);
};
