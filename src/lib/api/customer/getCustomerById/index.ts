import { apiInstance } from "@app/lib/http";
import { Api } from "@app/lib/constants/api";
import type { CustomerDetailModel } from "@app/lib/models/CustomerModel";
import type { UserId } from "@app/lib/models/UserModel";

export const getCustomerById = (id: UserId) => {
  return apiInstance
    .get<CustomerDetailModel>(Api.users.customer.id(id))
    .then((r) => r.data);
};
