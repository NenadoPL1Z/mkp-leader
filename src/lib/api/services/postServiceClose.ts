import { apiInstance } from "@app/lib/http";
import { Api } from "@app/lib/constants/api";
import type {
  ServiceId,
  ServicesDetailModel,
} from "@app/lib/models/ServiceModel";

export const postServiceClose = (id: ServiceId) => {
  return apiInstance.post<ServicesDetailModel>(Api.service.close(id));
};
