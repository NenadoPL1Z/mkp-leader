import { useRef } from "react";
import { AExecutorsSN } from "@app/routes/admin/stacks/AExecutors/types";
import { useToastLocal } from "@app/hooks/useToastLocal";
import { useSearch } from "@app/hooks/useSearch";
import type { ExecutorModel } from "@app/lib/models/ExecutorModel";
import type {
  PaginationFilterRef,
  PaginationSetCardRef,
} from "@app/components/PaginationList/types";
import type {
  AEHomeProps,
  ExecutorProfileDeleteCallback,
  ExecutorNewAddCallback,
} from "@app/routes/admin/stacks/AExecutors/types";

export const useAEHome = ({ navigation }: AEHomeProps) => {
  //? REFS
  const setCardRef = useRef<PaginationSetCardRef<ExecutorModel>>(null);
  const filterRef = useRef<PaginationFilterRef>(null);

  const { resetRef, query, handleChangeSearch } = useSearch();

  //? STATES
  const { toast, onShowToast, onHideToast } = useToastLocal();

  const callbackEdit = (userModel: ExecutorModel) => {
    if (setCardRef.current) {
      setCardRef.current((prevState) => {
        const result: ExecutorModel[] = [];
        for (let i = 0; i < prevState.length; i++) {
          if (prevState[i].id === userModel.id) {
            result.push(userModel);
            continue;
          }
          result.push(prevState[i]);
        }
        return result;
      });
    }
  };

  const callbackDelete: ExecutorProfileDeleteCallback = ({
    user,
    callback,
  }) => {
    if (filterRef.current) {
      filterRef.current(user.id);
    }
    callback();
    onShowToast({ text1: `Исполнитель "${user.name}" удален` });
  };

  const callbackAdd: ExecutorNewAddCallback = ({ user, callback }) => {
    if (setCardRef.current) {
      setCardRef.current((prevState) => [user, ...prevState]);
    }
    callback();
    onShowToast({ text1: `Исполнитель "${user.name}" добавлен` });
    return;
  };

  const handlePushNew = () => {
    navigation.navigate(AExecutorsSN.NEW, {
      callbackAdd,
    });
  };

  const handlePushProfile = (model: ExecutorModel) => {
    navigation.navigate(AExecutorsSN.PROFILE, {
      ...model,
      callbackEdit,
      callbackDelete,
    });
  };

  return {
    setCardRef,
    filterRef,
    resetRef,

    query,
    handleChangeSearch,

    toast,
    onHideToast,

    handlePushProfile,
    handlePushNew,
  };
};
