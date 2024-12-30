import { apiInstance } from "@app/lib/http";
import { Api } from "@app/lib/constants/api";
import type { ExecutorModel } from "@app/lib/models/ExecutorModel";
import type { ExecutorForm } from "@app/lib/models/form/ExecutorForm";

export const postExecutorCreate = (data: ExecutorForm) => {
  return apiInstance.post<ExecutorModel>(Api.users.executor.create, data);
};
