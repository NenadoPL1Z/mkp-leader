import type { ExecutorModel } from "@app/lib/models/ExecutorModel.ts";

export type SelectExecutorDefaultProps = {
  executor: ExecutorModel;
  isDefaultExecutor: boolean;
  handleSelectExecutorDefault: (executorId: number) => void;
};
