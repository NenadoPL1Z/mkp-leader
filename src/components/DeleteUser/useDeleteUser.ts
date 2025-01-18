import { useToggle } from "@app/hooks/useToggle";
import { useStatus } from "@app/hooks/useStatus";
import { deleteUsersBlock } from "@app/lib/api/users/deleteUsersBlock";
import { useToastLocal } from "@app/hooks/useToastLocal";
import { useEffect } from "react";
import { getErrorText } from "@app/lib/utils/requestUtils.ts";
import type { DeleteUserProps } from "@app/components/DeleteUser/types";

export const useDeleteUser = ({ user, callback }: DeleteUserProps) => {
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
    deleteUsersBlock(user.id)
      .then(() => {
        handleClearStatus();
        handleClose();
        callback();
      })
      .catch((error) => {
        onShowToast({ text1: getErrorText(error) });
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
