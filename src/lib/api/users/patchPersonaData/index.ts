import { apiInstance } from "@app/lib/http";
import { Api } from "@app/lib/constants/api";
import type { AxiosResponse } from "axios";
import type { UserModel, UserId } from "@app/lib/models/UserModel";
import type { ExecutorForm } from "@app/lib/models/form/ExecutorForm";

export type PatchPersonalData = Pick<ExecutorForm, "name" | "phone">;
export type PatchPersonalDataResponse = AxiosResponse<UserModel>;

export const patchPersonalData = (
  id: UserId,
  data: PatchPersonalData,
): Promise<PatchPersonalDataResponse> => {
  return apiInstance.patch<UserModel>(Api.users.personalData(id), data);
};
