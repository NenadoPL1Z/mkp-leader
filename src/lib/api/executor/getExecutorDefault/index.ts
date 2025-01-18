import { apiInstance } from "@app/lib/http";
import { Api } from "@app/lib/constants/api.ts";
import type { ExecutorModel } from "@app/lib/models/ExecutorModel.ts";

export const getExecutorDefault = () => {
  return apiInstance.get<ExecutorModel>(Api.users.executor.executorDefault);
};
