import { useToastLocal } from "@app/hooks/useToastLocal.ts";

export const useRIComments = () => {
  const { toast, onHideToast, onShowToast } = useToastLocal();
  return {
    toast,
    onHideToast,
    onShowToast,
  };
};
