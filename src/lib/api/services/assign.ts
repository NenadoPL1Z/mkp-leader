import { apiInstance } from "@app/lib/http";
import { Api } from "@app/lib/constants/api";
import type { ExecutorId } from "@app/lib/models/ExecutorModel";
import type {
  ServiceId,
  ServicesDetailModel,
} from "@app/lib/models/ServiceModel";

type Data = {
  service_id: ServiceId;
  executor_id: ExecutorId;
  deadline_at: string;
  comment: string;
  emergency: boolean;
  custom_position: boolean;
};
export const fetchServicesAssign = (data: Data) => {
  return apiInstance.post<ServicesDetailModel>(Api.service.assign, data);
};
