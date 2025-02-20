import { apiInstance } from "@app/lib/http";
import { Api } from "@app/lib/constants/api.ts";
import type { ServiceId } from "@app/lib/models/ServiceModel.ts";

export const postServiceComment = async (id: ServiceId, comment: string) => {
  return apiInstance.post(Api.service.postComments(id), { comment });
};
