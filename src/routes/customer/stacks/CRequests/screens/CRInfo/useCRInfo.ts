import { useToastLocal } from "@app/hooks/useToastLocal";
import { CRequestsSN } from "@app/routes/customer/stacks/CRequests/types";
import type { RInfoChildrenOnUpdate } from "@app/components/RequestInfo/types";
import type {
  ServiceCardModel,
  ServicesDetailModel,
} from "@app/lib/models/ServiceModel";
import type {
  CRInfoScreenProps,
  CRNewEditCallback,
} from "@app/routes/customer/stacks/CRequests/types";

export const useCRInfo = ({ route, navigation }: CRInfoScreenProps) => {
  const { params } = route;
  const { tabName, nextTabName, cardIndex, card, onDisplayToast } = params;
  const currenTabRef = params[`${tabName}Refs`];
  const nextTabRef = nextTabName ? params[`${nextTabName}Refs`] : null;
  const isEdit = tabName === "work";
  const setCurrentCard = currenTabRef.setCardRef.current;

  const toast = useToastLocal();

  const handleChangeCard = (data: ServicesDetailModel) => {
    if (setCurrentCard) {
      setCurrentCard((prevState): ServiceCardModel[] => [
        ...prevState.slice(0, cardIndex),
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
        ...prevState.slice(cardIndex + 1),
      ]);
    }
  };

  const handleDelete = (callback: () => void) => {
    callback();
    currenTabRef.filterRef?.current?.(card.id);
    setTimeout(() => {
      navigation.goBack();
      onDisplayToast("Заявка успешно удалена");
    });
  };

  const registerEdit = (onUpdateData: RInfoChildrenOnUpdate) => {
    const edit: CRNewEditCallback = (data, callback) => {
      onUpdateData(data);
      callback();
      toast.onShowToast({ text1: "Заявка успешно изменена" });
      handleChangeCard(data);
    };

    return edit;
  };

  const handlePush = (
    data: ServicesDetailModel,
    onUpdateData: RInfoChildrenOnUpdate,
  ) => {
    navigation.navigate(CRequestsSN.NEW, {
      tabName,
      tabRef: currenTabRef,
      initialData: data,
      onEditCards: registerEdit(onUpdateData),
    });
  };

  return {
    isEdit,
    toast,
    currenTabRef,
    nextTabRef,
    handleDelete,
    handlePush,
  };
};
