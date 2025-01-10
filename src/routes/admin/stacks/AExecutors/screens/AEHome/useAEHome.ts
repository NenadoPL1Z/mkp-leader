import { useCallback, useRef, useState } from "react";
import { AExecutorsSN } from "@app/routes/admin/stacks/AExecutors/types";
import { useToastLocal } from "@app/hooks/useToastLocal";
import { useSearch } from "@app/hooks/useSearch";
import { useFocusEffect } from "@react-navigation/native";
import { getExecutorDefault } from "@app/lib/api/executor/getExecutorDefault";
import type { ExecutorModel } from "@app/lib/models/ExecutorModel";
import type {
  PaginationFilterRef,
  PaginationSetCardRef,
} from "@app/components/PaginationList/types";
import type {
  AEHomeProps,
  ExecutorProfileDeleteCallback,
  ExecutorNewAddCallback,
  ExecutorDefaultIdEditCallback,
} from "@app/routes/admin/stacks/AExecutors/types";

export const useAEHome = ({ navigation }: AEHomeProps) => {
  const setCardRef = useRef<PaginationSetCardRef<ExecutorModel>>(null);
  const filterRef = useRef<PaginationFilterRef>(null);

  const { resetRef, query, handleChangeSearch } = useSearch();
  const { toast, onShowToast, onHideToast } = useToastLocal();

  const [executorDefaultId, setExecutorDefaultId] = useState<number | null>(
    null,
  );

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

  const callbackEditExecutorDefaultId: ExecutorDefaultIdEditCallback = (id) => {
    setExecutorDefaultId(id);
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
      executorDefaultId,
      callbackEditExecutorDefaultId,
    });
  };

  const fetchExecutorDefault = () => {
    getExecutorDefault().then(({ data: executor }) =>
      setExecutorDefaultId(executor.id),
    );
  };

  useFocusEffect(useCallback(fetchExecutorDefault, []));

  return {
    executorDefaultId,

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
