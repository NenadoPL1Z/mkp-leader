import { apiInstance } from "@app/lib/http";
import { Api } from "@app/lib/constants/api.ts";
import type { UserId } from "@app/lib/models/UserModel.ts";

export const postExecutorDefault = (id: UserId) => {
  return apiInstance.post<{ executor_id: number }>(
    Api.users.executor.selectExecutorDefault,
    { executor_id: id },
  );
};
