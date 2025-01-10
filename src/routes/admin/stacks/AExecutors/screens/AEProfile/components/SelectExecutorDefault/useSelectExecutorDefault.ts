import { useToggle } from "@app/hooks/useToggle.ts";
import { useToastLocal } from "@app/hooks/useToastLocal.ts";
import { useStatus } from "@app/hooks/useStatus.ts";
import { Response } from "@app/lib/constants/response.ts";
import { useEffect } from "react";
import { postExecutorDefault } from "@app/lib/api/executor/postExecutorDefault";
import type { SelectExecutorDefaultProps } from "./types.ts";

export const useSelectExecutorDefault = ({
  executor,
  handleSelectExecutorDefault,
}: SelectExecutorDefaultProps) => {
  const {
    isToggle: isOpen,
    handleToggleTrue: handleOpen,
    handleToggleFalse,
  } = useToggle();
  const { toast, onShowToast, onHideToast } = useToastLocal();
  const { isLoading, handleLoadingStatus, handleClearStatus } = useStatus({
    isLoading: false,
  });

  const handleClose = () => {
    onHideToast();
    handleToggleFalse();
  };

  const onSuccess = () => {
    handleLoadingStatus();
    postExecutorDefault(executor.id)
      .then(({ data }) => {
        handleClearStatus();
        handleClose();
        handleSelectExecutorDefault(data.executor_id);
      })
      .catch(() => {
        onShowToast({ text1: Response.UNKNOWN });
        handleClearStatus();
      });
  };

  useEffect(() => {
    return () => {
      onHideToast();
    };
  }, [isOpen]);

  return {
    isOpen,
    isLoading,
    toast,

    handleOpen,
    handleClose,
    onHideToast,

    onSuccess,
  };
};
