import { apiInstance } from "@app/lib/http";
import { Api } from "@app/lib/constants/api";
import type {
  CompanyContactsId,
  CompanyContactsModel,
} from "@app/lib/models/CompanyModel";

export type PatchContactsData = Partial<Omit<CompanyContactsModel, "id">>;

export const patchContacts = (
  id: CompanyContactsId,
  data: PatchContactsData,
) => {
  return apiInstance.patch(Api.users.contactsEdit(id), data);
};
