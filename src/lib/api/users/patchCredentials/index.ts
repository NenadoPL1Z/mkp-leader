import { apiInstance } from "@app/lib/http";
import { Api } from "@app/lib/constants/api";
import type { CustomerDetailModel } from "@app/lib/models/CustomerModel";
import type { AxiosResponse } from "axios";
import type { UserModel, UserId } from "@app/lib/models/UserModel";
import type { ExecutorForm } from "@app/lib/models/form/ExecutorForm";

export type PatchCredentialData = Partial<
  Pick<ExecutorForm | CustomerDetailModel, "username" | "password">
>;

export type PatchCredentialResponse = AxiosResponse<UserModel>;

export const patchCredential = (
  id: UserId,
  data: PatchCredentialData,
): Promise<PatchCredentialResponse> => {
  return apiInstance.patch<UserModel>(Api.users.credentials(id), data);
};
