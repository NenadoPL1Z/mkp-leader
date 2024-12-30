import { useToastLocal } from "@app/hooks/useToastLocal";
import { useStatus } from "@app/hooks/useStatus";
import { postServiceClose } from "@app/lib/api/services/postServiceClose";
import { Response } from "@app/lib/constants/response";
import type { AMRICloseProps } from "./types";

export const useAMRIClose = ({ id, onClose }: AMRICloseProps) => {
  const { toast, onHideToast, onShowToast } = useToastLocal();
  const { isLoading, handleLoadingStatus, handleClearStatus } = useStatus({
    isLoading: false,
  });

  const onSubmit = () => {
    handleLoadingStatus();

    postServiceClose(id)
      .then((response) => {
        onClose(response.data, () => {
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
    onHideToast,

    isLoading,
    onSubmit,
  };
};
