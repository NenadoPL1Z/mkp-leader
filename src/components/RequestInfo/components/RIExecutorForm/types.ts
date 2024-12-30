import type { Callback } from "@app/types/general";
import type { ServicesDetailModel } from "@app/lib/models/ServiceModel";

export type OnAssignExecutorArg = {
  data: ServicesDetailModel;
  isMoveStatus: boolean;
  callback: Callback;
};

export type RIExecutorFormProps = ServicesDetailModel & {
  isEditMode?: boolean;
  onAssignExecutor: (data: OnAssignExecutorArg) => void;
};
