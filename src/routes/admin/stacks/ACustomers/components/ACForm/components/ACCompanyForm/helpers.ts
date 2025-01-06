import type { UseControllerReturn } from "react-hook-form";
import type { CustomerForm } from "@app/lib/models/form/CustomerForm.ts";

export const getExecutorControllerValue = (
  executorController:
    | UseControllerReturn<CustomerForm, "executor_default">
    | UseControllerReturn<CustomerForm, "executor_additional">,
) => {
  return (
    executorController.field.value?.name ||
    executorController.field.value?.phone
  );
};
