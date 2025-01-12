import type { Nullable } from "@app/types/general";
import type { ExecutorModel } from "@app/lib/models/ExecutorModel";

export type RequestExecutorForm = {
  executor_default: Nullable<ExecutorModel>;
  executor_additional: Nullable<ExecutorModel>;
  deadline_at: string;
  comment: string;
  emergency: boolean;
  custom_position: boolean;
};
