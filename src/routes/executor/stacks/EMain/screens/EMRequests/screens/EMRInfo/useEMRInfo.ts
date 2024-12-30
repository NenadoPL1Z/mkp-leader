import { useToastLocal } from "@app/hooks/useToastLocal";
import type { ServicesDetailModel } from "@app/lib/models/ServiceModel";
import type { RInfoChildrenOnUpdate } from "@app/components/RequestInfo/types";
import type { EMRInfoScreenProps } from "@app/routes/executor/stacks/EMain/screens/EMRequests/types";

export const useEMRInfo = ({ route }: EMRInfoScreenProps) => {
  const { params } = route;
  const { tabName, nextTabName } = params;
  const currenTabRef = params[`${tabName}Refs`];
  const nextTabRef = nextTabName ? params[`${nextTabName}Refs`] : null;

  const toast = useToastLocal();

  //? ONLY WORK TAB
  const handleVerify = (onUpdateData: RInfoChildrenOnUpdate) => {
    return (data: ServicesDetailModel) => {
      onUpdateData(data);
      toast.onShowToast({
        text1: "Заявка направлена в контроль качества",
      });
      currenTabRef.filterRef.current?.(data.id);
      nextTabRef?.setCardRef?.current?.((prevState) => [
        {
          id: data.id,
          title: data.title,
          status: data.status,
          emergency: Boolean(data.emergency),
          custom_position: Boolean(data.custom_position),
          viewed_admin: false,
          viewed_customer: false,
          viewed_executor: true,
          created_at: data.created_at,
          deadline_at: data.deadline_at,
        },
        ...prevState,
      ]);
    };
  };

  return {
    toast,
    currenTabRef,
    nextTabRef,
    handleVerify,
  };
};
