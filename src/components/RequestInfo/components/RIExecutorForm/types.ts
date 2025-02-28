import type { UseControllerReturn } from "react-hook-form";
import type { Callback } from "@app/types/general";
import type { ServicesDetailModel } from "@app/lib/models/ServiceModel";
import type { RequestExecutorForm } from "@app/lib/models/form/RequestExecutorForm.ts";

export type OnAssignExecutorArg = {
  data: ServicesDetailModel;
  isMoveStatus: boolean;
  callback: Callback;
};

export type RIExecutorFormProps = ServicesDetailModel & {
  tabName: "work" | "quality" | "closed" | "refused";
  isEditMode?: boolean;
  onAssignExecutor: (data: OnAssignExecutorArg) => void;
};

export type ExecutorController =
  | UseControllerReturn<RequestExecutorForm, "executor_default">
  | UseControllerReturn<RequestExecutorForm, "executor_additional">;
