import { apiInstance } from "@app/lib/http";
import { Api } from "@app/lib/constants/api.ts";
import type {
  ServiceId,
  ServicesDetailModel,
} from "@app/lib/models/ServiceModel.ts";

export const deleteService = (id: ServiceId) => {
  return apiInstance.delete<ServicesDetailModel>(Api.service.delete(id));
};
