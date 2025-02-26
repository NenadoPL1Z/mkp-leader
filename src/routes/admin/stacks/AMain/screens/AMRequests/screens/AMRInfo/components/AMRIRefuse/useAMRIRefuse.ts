import { useToastLocal } from "@app/hooks/useToastLocal";
import { useStatus } from "@app/hooks/useStatus";
import { postServiceRefuse } from "@app/lib/api/services/postServiceRefuse";
import { Response } from "@app/lib/constants/response";
import { useToggle } from "@app/hooks/useToggle.ts";
import type { AMRIRefuseProps } from "./types";

export const useAMRIRefuse = ({ id, onRefuse }: AMRIRefuseProps) => {
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

    postServiceRefuse(id)
      .then((response) => {
        onRefuse(response.data, () => {
          handleClearStatus();
          onHideToast();
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
