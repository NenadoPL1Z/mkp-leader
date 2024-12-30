import { apiInstance } from "@app/lib/http";
import { Api } from "@app/lib/constants/api";
import type { CompanyId } from "@app/lib/models/CompanyModel";
import type { PatchContactsData } from "@app/lib/api/users/patchContacts";

export const postContacts = (id: CompanyId, data: PatchContactsData) => {
  return apiInstance.post(Api.users.contactsCreate(id), {
    customer_id: +id,
    ...data,
  });
};
