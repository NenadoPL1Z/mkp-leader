import { apiInstance } from "@app/lib/http";
import { Api } from "@app/lib/constants/api";
import type {
  ServicesDetailModel,
  ServiceId,
} from "@app/lib/models/ServiceModel.ts";

export const getServiceById = (id: ServiceId) => {
  return apiInstance
    .get<ServicesDetailModel>(Api.service.id(id))
    .then((r) => r.data);
};
