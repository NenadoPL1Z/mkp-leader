import type { ExecutorId, ExecutorModel } from "@app/lib/models/ExecutorModel";
import type { CustomerDetailModel } from "@app/lib/models/CustomerModel";
import type { MediaFilesArr } from "@app/lib/models/MediaFileModel";
import type { Nullable } from "@app/types/general";

export type ServiceId = string;

// deprecated: статус "Новая" устарел
export type ServiceStatus =
  | "Новая"
  | "В работе"
  | "Контроль качества"
  | "Закрыта"
  | "Заказная позиция";

export interface ServiceCardModel {
  id: ServiceId;
  title: string;
  status: ServiceStatus;
  emergency: boolean;
  custom_position: boolean;
  created_at: string;
  deadline_at: Nullable<string>;
  viewed_admin: boolean;
  viewed_customer: boolean;
  viewed_executor: boolean;
}

export type ServicesDetailModel = {
  id: ServiceId;
  executor_default_id: ExecutorId;
  executor_additional_id: Nullable<ExecutorId>;
  executor_default: ExecutorModel;
  executor_additional: Nullable<ExecutorModel>;
  title: string;
  description: Nullable<string>;
  material_availability: Nullable<boolean>;
  emergency: Nullable<boolean>;
  custom_position: Nullable<boolean>;
  created_at: string;
  deadline_at: Nullable<string>;
  status: ServiceStatus;
  comment: Nullable<string>;
  customer_id: string;
  customer: CustomerDetailModel;
  media_files: Nullable<MediaFilesArr>;
};
