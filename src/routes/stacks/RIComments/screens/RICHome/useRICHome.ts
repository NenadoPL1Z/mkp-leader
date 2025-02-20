import { useToastLocal } from "@app/hooks/useToastLocal.ts";

export const useRICHome = () => {
  const { toast, onHideToast, onShowToast } = useToastLocal();
  return {
    toast,
    onHideToast,
    onShowToast,
  };
};
