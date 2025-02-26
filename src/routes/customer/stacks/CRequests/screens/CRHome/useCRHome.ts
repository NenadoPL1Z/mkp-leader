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
      workRefs.setCardRef.current((prev): ServiceCardModel[] => [
        {
          id: data.id,
          title: data.title,
          status: data.status,
          emergency: Boolean(data.emergency),
          custom_position: Boolean(data.custom_position),
          created_at: data.created_at,
          deadline_at: data.deadline_at,
          viewed_admin: false,
          viewed_customer: true,
          viewed_executor: false,
        },
        ...prev,
      ]);
    }
    callback();
    onShowToast({ text1: "Заявка успешно создана" });
  };

  const handleDisplayToast = (text: string) => {
    onShowToast({ text1: text });
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
    handleDisplayToast,
    handlePushWork,
  };
};
