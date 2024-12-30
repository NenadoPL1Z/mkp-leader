import type { ExecutorId, ExecutorModel } from "@app/lib/models/ExecutorModel";
import type { CustomerDetailModel } from "@app/lib/models/CustomerModel";
import type { MediaFilesArr } from "@app/lib/models/MediaFileModel";
import type { Nullable } from "@app/types/general";

export type ServiceId = string;

export type ServiceStatus =
  | "Новая"
  | "В работе"
  | "Контроль качества"
  | "Закрыта"
  | "Заказная позиция";

export interface ServiceModel {
  readonly id: ServiceId;
  readonly title: string;
  readonly description: Nullable<string>;
  readonly material_availability: boolean;
  readonly emergency: boolean;
  readonly deadline_at: Nullable<string>;
  readonly comment: Nullable<string>;
  readonly status: ServiceStatus;
  readonly media_files: MediaFilesArr;
  readonly created_at: string;
  readonly executor: { name: string };
  viewed_admin: boolean;
  viewed_customer: boolean;
  viewed_executor: boolean;
  readonly custom_position: boolean;
}

export type ServicesDetailModel = {
  id: ServiceId;
  customer_id: string;
  executor_id: Nullable<ExecutorId>;
  title: string;
  description: Nullable<string>;
  material_availability: Nullable<boolean>;
  emergency: Nullable<boolean>;
  custom_position: Nullable<boolean>;
  created_at: string;
  deadline_at: Nullable<string>;
  status: ServiceStatus;
  comment: Nullable<string>;
  customer: CustomerDetailModel;
  executor: Nullable<ExecutorModel>;
  media_files: Nullable<MediaFilesArr>;
};

export type ServiceCardModel = Pick<
  ServiceModel,
  | "id"
  | "title"
  | "status"
  | "emergency"
  | "custom_position"
  | "viewed_admin"
  | "viewed_customer"
  | "viewed_executor"
  | "created_at"
  | "deadline_at"
>;
