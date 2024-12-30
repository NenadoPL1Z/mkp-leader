import { useToastLocal } from "@app/hooks/useToastLocal";
import type { AMHomeScreenProps } from "@app/routes/admin/stacks/AMain/screens/AMRequests/types";

export const useAMRHome = ({ route }: AMHomeScreenProps) => {
  const { toast, onShowToast, onHideToast } = useToastLocal();
  const headerTitle = route.params.company.value.name;

  return {
    toast,
    headerTitle,
    onShowToast,
    onHideToast,
  };
};
