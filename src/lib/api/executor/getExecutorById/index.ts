import { apiInstance } from "@app/lib/http";
import { Api } from "@app/lib/constants/api";
import type { ExecutorModelRequired } from "@app/lib/models/ExecutorModel";
import type { UserId } from "@app/lib/models/UserModel";
//? FIX_COMMIT

export const getExecutorById = (id: UserId) => {
  return apiInstance
    .get<ExecutorModelRequired>(Api.users.executor.id(id))
    .then((r) => r.data);
};
