import type { ServicesDetailModel } from "@app/lib/models/ServiceModel";
import type { CRNewScreenProps } from "@app/routes/customer/stacks/CRequests/types";

export const useCRNew = ({ route, navigation }: CRNewScreenProps) => {
  const { params } = route;
  const { tabName, initialData, tabRef, onEditCards } = params;

  const isEdit =
    Boolean(initialData) && tabName !== "closed" && tabName !== "refusal";
  const isDisplayDate = isEdit || (Boolean(initialData) && !isEdit);
  const isCreate = !initialData;

  const handleEditCards = (data: ServicesDetailModel | null) => {
    //? EXTRA EXIT
    if (!data) {
      navigation.goBack();
      return;
    }

    onEditCards(data, () => setTimeout(navigation.goBack));
  };

  return {
    initialData,
    tabRef,
    isEdit,
    isDisplayDate,
    isCreate,
    handleEditCards,
  };
};
