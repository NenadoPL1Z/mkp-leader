import { apiInstance } from "@app/lib/http";
import { Api } from "@app/lib/constants/api";
import type { CompanyId, CompanyModel } from "@app/lib/models/CompanyModel";

export type PatchCompanyData = Partial<
  Pick<
    CompanyModel,
    | "name"
    | "address"
    | "executor_default"
    | "executor_additional"
    | "opening_time"
    | "closing_time"
    | "only_weekdays"
  >
>;

export const patchCompany = (id: CompanyId, data: PatchCompanyData) => {
  return apiInstance.patch(Api.users.company(id), data);
};
