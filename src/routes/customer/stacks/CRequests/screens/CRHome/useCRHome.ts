import { useToastLocal } from "@app/hooks/useToastLocal";
import { usePaginationRefs } from "@app/hooks/usePaginationRefs";
import { CRequestsSN } from "../../types";
import type { ServiceCardModel } from "@app/lib/models/ServiceModel";
import type { CRHomeScreenProps, CRNewEditCallback } from "../../types";

export const useCRHome = ({ navigation }: CRHomeScreenProps) => {
  const newRefs = usePaginationRefs<ServiceCardModel>();
  const { toast, onHideToast, onShowToast } = useToastLocal();

  const handleEditCards: CRNewEditCallback = (data, callback) => {
    if (newRefs.setCardRef.current) {
      newRefs.setCardRef.current((prev) => [
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

  const handlePushNew = () => {
    navigation.navigate(CRequestsSN.NEW, {
      tabName: "new",
      tabRef: newRefs,
      initialData: null,
      onEditCards: handleEditCards,
    });
  };

  return {
    newRefs,
    toast,
    onHideToast,
    handlePushNew,
  };
};
