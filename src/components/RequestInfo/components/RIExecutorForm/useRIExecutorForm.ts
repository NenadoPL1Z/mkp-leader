import { useController, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { AMRequestsSN } from "@app/routes/admin/stacks/AMain/screens/AMRequests/types";
import { Response } from "@app/lib/constants/response";
import { useStatus } from "@app/hooks/useStatus";
import { fetchServicesAssign } from "@app/lib/api/services/assign";
import { useToastLocal } from "@app/hooks/useToastLocal";
import { Count } from "@app/lib/constants/count";
import {
  FIRST_EXECUTOR_NAME,
  FIRST_EXECUTOR_NAME_SELECT,
  SECOND_EXECUTOR_NAME,
  SECOND_EXECUTOR_NAME_SELECT,
} from "@app/lib/constants/executors.ts";
import type { AMRequestsSPL } from "@app/routes/admin/stacks/AMain/screens/AMRequests/types";
import type { NavigationProp } from "@react-navigation/native";
import type { RequestExecutorForm } from "@app/lib/models/form/RequestExecutorForm";
import type { RIExecutorFormProps } from "./types";

export const useRIExecutorForm = (props: RIExecutorFormProps) => {
  const {
    tabName,
    isEditMode,
    executor_default,
    executor_additional,
    deadline_at,
    comment,
    custom_position,
    emergency,
    onAssignExecutor,
  } = props;

  const {
    isLoading,
    isError,
    handleLoadingStatus,
    handleErrorStatus,
    handleClearStatus,
  } = useStatus({ isLoading: false });

  const navigation = useNavigation<NavigationProp<AMRequestsSPL>>();

  const { toast, onHideToast, onShowToast } = useToastLocal();

  const methods = useForm<RequestExecutorForm>({
    defaultValues: {
      executor_default: executor_default,
      executor_additional: executor_additional,
      deadline_at: deadline_at ?? "",
      comment: comment ?? "",
      emergency: emergency ?? false,
      custom_position: custom_position ?? false,
    },
  });
  const { control, handleSubmit } = methods;

  const executorDefaultController = useController({
    control,
    name: "executor_default",
    rules: {
      required: true,
    },
  });

  const executorAdditionalController = useController({
    control,
    name: "executor_additional",
  });

  const deadlineAtController = useController({
    control,
    name: "deadline_at",
  });

  const commentController = useController({
    control,
    name: "comment",
    rules: {
      maxLength: { value: Count.DESCRIPTION, message: "" },
    },
  });

  const customPositionController = useController({
    control,
    name: "custom_position",
  });

  const emergencyController = useController({
    control,
    name: "emergency",
  });

  const handlePushExecutorDefaultScreen = () => {
    navigation.navigate(AMRequestsSN.EXECUTOR, {
      ...props,
      executorTitle: FIRST_EXECUTOR_NAME,
      callbackSelectExecutor: (executor, onShowToast, goBack) => {
        if (executor.id === executorAdditionalController.field.value?.id) {
          onShowToast({
            text1: `Исполнитель "${executor.name}" уже выбран в качестве ${SECOND_EXECUTOR_NAME_SELECT}`,
          });
        } else {
          executorDefaultController.field.onChange(executor);
          goBack();
        }
      },
    });
  };

  const handlePushExecutorAdditionalScreen = () => {
    navigation.navigate(AMRequestsSN.EXECUTOR, {
      ...props,
      executorTitle: SECOND_EXECUTOR_NAME,
      callbackSelectExecutor: (executor, onShowToast, goBack) => {
        if (executor.id === executorDefaultController.field.value?.id) {
          onShowToast({
            text1: `Исполнитель "${executor.name}" уже выбран в качестве ${FIRST_EXECUTOR_NAME_SELECT}`,
          });
        } else {
          executorAdditionalController.field.onChange(executor);
          goBack();
        }
      },
    });
  };

  const handlePushCommentScreen = () => {
    navigation.navigate(AMRequestsSN.COMMENT, {
      initialValue: commentController.field.value,
      onChange: commentController.field.onChange,
    });
  };

  const onSubmit = handleSubmit(
    (data) => {
      handleLoadingStatus();

      fetchServicesAssign({
        service_id: props.id,
        executor_default_id: data?.executor_default?.id as number,
        executor_additional_id: data?.executor_additional?.id ?? null,
        deadline_at: data.deadline_at
          ? new Date(data.deadline_at).toISOString()
          : null,
        comment: data.comment,
        emergency: data.emergency,
        custom_position: data.custom_position,
        is_edit: tabName === "quality",
      })
        .then(({ data }) => {
          onAssignExecutor({
            data,
            isMoveStatus: Boolean(!isEditMode && data),
            callback: handleClearStatus,
          });
        })
        .catch(() => {
          handleErrorStatus(Response.UNKNOWN);
        });
    },
    (errors) => {
      if (errors.executor_default?.type === "required") {
        onShowToast({ text1: "Заполните все обязательные поля" });
        return;
      }
      if (errors.executor_default?.type === "required") {
        onShowToast({ text1: `Выберите ${FIRST_EXECUTOR_NAME_SELECT}` });
        return;
      }
      if (errors.comment?.type === "maxLength") {
        onShowToast({ text1: "Слишком большой комментарий" });
        return;
      }
      onShowToast({ text1: Response.UNKNOWN });
    },
  );

  return {
    isLoading,
    isError,
    executorDefaultController,
    executorAdditionalController,
    deadlineAtController,
    commentController,
    customPositionController,
    emergencyController,
    handlePushExecutorDefaultScreen,
    handlePushExecutorAdditionalScreen,
    handlePushCommentScreen,
    handleClearStatus,
    onSubmit,
    toast,
    onHideToast,
  };
};
