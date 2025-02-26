import { useToastLocal } from "@app/hooks/useToastLocal";
import { useStatus } from "@app/hooks/useStatus";
import { Response } from "@app/lib/constants/response";
import { useToggle } from "@app/hooks/useToggle.ts";
import { deleteService } from "@app/lib/api/services/deleteService.ts";
import type { CRIDeleteProps } from "./types";

export const useCRIDelete = ({ id, onDelete }: CRIDeleteProps) => {
  const { toast, onHideToast, onShowToast } = useToastLocal();
  const {
    isToggle: isOpen,
    handleToggleTrue: handleOpen,
    handleToggleFalse: handleClose,
  } = useToggle();

  const { isLoading, handleLoadingStatus, handleClearStatus } = useStatus({
    isLoading: false,
  });

  const onSubmit = () => {
    handleLoadingStatus();

    deleteService(id)
      .then(() => {
        onDelete(() => {
          handleClearStatus();
          onHideToast();
          handleClose();
        });
      })
      .catch(() => {
        handleClearStatus();
        onShowToast({ text1: Response.UNKNOWN });
      });
  };

  return {
    toast,
    isOpen,
    isLoading,
    onSubmit,
    handleOpen,
    handleClose,
    onHideToast,
  };
};
