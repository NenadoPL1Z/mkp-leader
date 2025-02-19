import { apiInstance } from "@app/lib/http";
import { Api } from "@app/lib/constants/api";
import type { CommentModel } from "@app/lib/models/CommentModel.ts";
import type { ServiceId } from "@app/lib/models/ServiceModel.ts";

export const getServiceCommentsById = (id: ServiceId) => {
  return apiInstance
    .get<CommentModel[]>(Api.service.comments(id))
    .then((r) => r.data);
};
