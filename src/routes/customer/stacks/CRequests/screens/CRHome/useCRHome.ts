import { useToastLocal } from "@app/hooks/useToastLocal";
import { usePaginationRefs } from "@app/hooks/usePaginationRefs";
import { CRequestsSN } from "../../types";
import type { ServiceCardModel } from "@app/lib/models/ServiceModel";
import type { CRHomeScreenProps, CRNewEditCallback } from "../../types";

export const useCRHome = ({ navigation }: CRHomeScreenProps) => {
  const workRefs = usePaginationRefs<ServiceCardModel>();
  const { toast, onHideToast, onShowToast } = useToastLocal();

  const handleEditCards: CRNewEditCallback = (data, callback) => {
    if (workRefs.setCardRef.current) {
      workRefs.setCardRef.current((prev) => [
        {
          id: data.id,
          title: data.title,
          status: data.status,
          emergency: Boolean(data.emergency),
          custom_position: Boolean(data.custom_position),
          viewed_customer: true,
          viewed_admin: false,
          viewed_executor: false,
          created_at: data.created_at,
          deadline_at: data.deadline_at,
        },
        ...prev,
      ]);
    }
    callback();
    onShowToast({ text1: "Заявка успешно создана" });
  };

  const handlePushWork = () => {
    navigation.navigate(CRequestsSN.NEW, {
      tabName: "work",
      tabRef: workRefs,
      initialData: null,
      onEditCards: handleEditCards,
    });
  };

  return {
    workRefs,
    toast,
    onHideToast,
    handlePushWork,
  };
};
