import { useToastLocal } from "@app/hooks/useToastLocal";
import type { EMRHomeScreenProps } from "../../types";

export const useEMRHome = ({ route }: EMRHomeScreenProps) => {
  const { toast, onHideToast, onShowToast } = useToastLocal();
  const headerTitle = route.params.company.value.name;

  return {
    headerTitle,
    toast,
    onHideToast,
    onShowToast,
  };
};
