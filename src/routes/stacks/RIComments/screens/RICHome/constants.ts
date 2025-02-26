import type { ServiceStatus } from "@app/lib/models/ServiceModel.ts";

export const ACTIVE_COMMENTS_BY_STATUS = new Set<ServiceStatus>([
  "В работе",
  "Контроль качества",
]);
