import { useController, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { AMRequestsSN } from "@app/routes/admin/stacks/AMain/screens/AMRequests/types";
import { Response } from "@app/lib/constants/response";
import { useStatus } from "@app/hooks/useStatus";
import { fetchServicesAssign } from "@app/lib/api/services/assign";
import { useToastLocal } from "@app/hooks/useToastLocal";
import { Count } from "@app/lib/constants/count";
import type { AMRequestsSPL } from "@app/routes/admin/stacks/AMain/screens/AMRequests/types";
import type { NavigationProp } from "@react-navigation/native";
import type { ExecutorModel } from "@app/lib/models/ExecutorModel";
import type { RequestExecutorForm } from "@app/lib/models/form/RequestExecutorForm";
import type { RIExecutorFormProps } from "./types";

export const useRIExecutorForm = (props: RIExecutorFormProps) => {
  const {
    isEditMode,
    executor,
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
      executor: executor,
      deadline_at: deadline_at ?? "",
      comment: comment ?? "",
      emergency: emergency ?? false,
      custom_position: custom_position ?? false,
    },
  });
  const { control, handleSubmit } = methods;

  const executorController = useController({
    control,
    name: "executor",
    rules: {
      required: true,
    },
  });

  const deadlineAtController = useController({
    control,
    name: "deadline_at",
    rules: {
      required: true,
    },
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

  const handleExecutorSelect = (
    executor: ExecutorModel,
    callback: () => void,
  ) => {
    executorController.field.onChange(executor);
    callback();
  };

  const handlePushExecutorScreen = () => {
    navigation.navigate(AMRequestsSN.EXECUTOR, {
      ...props,
      handleExecutorSelect: handleExecutorSelect,
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
        executor_id: data?.executor?.id as number,
        deadline_at: new Date(data.deadline_at).toISOString(),
        comment: data.comment,
        emergency: data.emergency,
        custom_position: data.custom_position,
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
      if (
        errors.executor?.type === "required" ||
        errors.deadline_at?.type === "required"
      ) {
        onShowToast({ text1: "Заполните все обязательные поля" });
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
    executorController,
    deadlineAtController,
    commentController,
    customPositionController,
    emergencyController,
    handlePushExecutorScreen,
    handlePushCommentScreen,
    handleClearStatus,
    onSubmit,
    toast,
    onHideToast,
  };
};
