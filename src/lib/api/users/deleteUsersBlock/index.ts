import { apiInstance } from "@app/lib/http";
import { Api } from "@app/lib/constants/api";
import type { UserId } from "@app/lib/models/UserModel";

export const deleteUsersBlock = (id: UserId) => {
  return apiInstance.delete(Api.users.block(id));
};
