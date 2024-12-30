import { apiInstance } from "@app/lib/http";
import { Api } from "@app/lib/constants/api";

export const deleteUserMe = () => {
  return apiInstance.delete(Api.users.blockMe);
};
