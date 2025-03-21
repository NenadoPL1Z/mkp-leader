import { useToastLocal } from "@app/hooks/useToastLocal";
import { useToggle } from "@app/hooks/useToggle";
import { useRef } from "react";
import type {
  ServiceCardModel,
  ServicesDetailModel,
} from "@app/lib/models/ServiceModel";
import type { OnAssignExecutorArg } from "@app/components/RequestInfo/components/RIExecutorForm/types";
import type { AMRInfoScreenProps } from "../../types";
import type { RInfoChildrenOnUpdate } from "@app/components/RequestInfo/types";

export const useAMRInfo = ({ route }: AMRInfoScreenProps) => {
  //? PROPS
  const { params } = route;
  const { tabName, nextTabName, company } = params;
  const currenTabRef = params[`${tabName}Refs`];
  const nextTabRef = nextTabName ? params[`${nextTabName}Refs`] : null;

  //? REFS
  const isNextTab = useRef(false);

  //? STATES
  const toast = useToastLocal();
  const editMode = useToggle();
  const isEdit = editMode.isToggle;

  //? HANDLERS
  const handleChangeEditMode = () => {
    toast.onHideToast();
    editMode.handleToggle();
  };

  const handleUpdateCardModel = (
    data: ServicesDetailModel,
    ref = nextTabRef,
  ) => {
    ref?.filterRef.current?.(data.id);
    ref?.setCardRef.current?.((item): ServiceCardModel[] => [
      {
        id: data.id,
        title: data.title,
        status: data.status,
        emergency: Boolean(data.emergency),
        custom_position: Boolean(data.custom_position),
        created_at: data.created_at,
        deadline_at: data.deadline_at,
        viewed_admin: true,
        viewed_customer: false,
        viewed_executor: false,
      },
      ...item,
    ]);
  };

  const handleMoveNextStatus = (data: ServicesDetailModel) => {
    toast.onShowToast({ text1: "Исполнитель назначен" });
    editMode.handleToggleFalse();
    currenTabRef.filterRef.current?.(data.id);
    handleUpdateCardModel(data, nextTabRef);
  };

  const handleUpdateCurrentStatus = (data: ServicesDetailModel) => {
    toast.onShowToast({ text1: "Заявка изменена" });
    editMode.handleToggleFalse();

    //? Обновляем nextTab (текущий таб + 1)
    if (isNextTab.current) {
      handleUpdateCardModel(data, nextTabRef);
    }
    //? Обновляем текущий таб (с которого перешли)
    if (!isNextTab.current) {
      handleUpdateCardModel(data, currenTabRef);
    }
  };

  const handleChangePrevScreenInfo = (onUpdateData: RInfoChildrenOnUpdate) => {
    return ({ data, isMoveStatus, callback }: OnAssignExecutorArg) => {
      onUpdateData(data);
      callback();

      if (isMoveStatus) {
        isNextTab.current = true;
      }

      //? ЕСЛИ ДО ЭТОГО НЕБЫЛО ИСПОЛНИТЕЛЕЙ (ПЕРВАЯ ПРИВЯЗКА ИСТОЛНИТЕЛЯ К ЗАЯВКЕ),
      if (!isEdit) {
        handleMoveNextStatus(data);
      }
      //? РЕДАКТИРОВАНИЕ
      if (isEdit) {
        handleUpdateCurrentStatus(data);
      }
    };
  };

  const handleClose = (onUpdateData: RInfoChildrenOnUpdate) => {
    return (data: ServicesDetailModel, callback: () => void) => {
      callback();
      onUpdateData(data);
      toast.onShowToast({ text1: "Заявка успешно закрыта" });
      currenTabRef.filterRef?.current?.(data.id);
      nextTabRef?.setCardRef?.current?.((prevState): ServiceCardModel[] => [
        {
          id: data.id,
          title: data.title,
          status: data.status,
          emergency: Boolean(data.emergency),
          custom_position: Boolean(data.custom_position),
          created_at: data.created_at,
          deadline_at: data.deadline_at,
          viewed_admin: true,
          viewed_executor: false,
          viewed_customer: false,
        },
        ...prevState,
      ]);
      company.handleUpdateStatusCounter("verifying");
    };
  };

  const handleRefuse = (onUpdateData: RInfoChildrenOnUpdate) => {
    return (data: ServicesDetailModel, callback: () => void) => {
      callback();
      onUpdateData(data);
      toast.onShowToast({ text1: "Заявка успешно отклонена" });
      currenTabRef.filterRef?.current?.(data.id);
      nextTabRef?.setCardRef?.current?.((prevState): ServiceCardModel[] => [
        {
          id: data.id,
          title: data.title,
          status: data.status,
          emergency: Boolean(data.emergency),
          custom_position: Boolean(data.custom_position),
          created_at: data.created_at,
          deadline_at: data.deadline_at,
          viewed_admin: true,
          viewed_executor: false,
          viewed_customer: false,
        },
        ...prevState,
      ]);
      company.handleUpdateStatusCounter("working");
    };
  };

  return {
    toast,
    editMode,
    currenTabRef,
    handleChangeEditMode,
    handleChangePrevScreenInfo,
    handleClose,
    handleRefuse,
  };
};
