import { AExecutorsSN } from "@app/routes/admin/stacks/AExecutors/types";
import { useCallback, useEffect, useState } from "react";
import { getExecutorById } from "@app/lib/api/executor/getExecutorById";
import { useToastLocal } from "@app/hooks/useToastLocal";
import { Timing } from "@app/lib/constants/timing";
import { useFocusEffect } from "@react-navigation/native";
import type {
  ExecutorModelRequired,
  ExecutorModel,
} from "@app/lib/models/ExecutorModel";
import type {
  AEProfileProps,
  ExecutorProfileCallback,
} from "@app/routes/admin/stacks/AExecutors/types";

export const useAEProfile = ({
  navigation,
  route: { params },
}: AEProfileProps) => {
  const { toast, onShowToast, onHideToast } = useToastLocal();
  const [userInfo, setUserInfo] = useState<ExecutorModelRequired>(() =>
    initialUser(params),
  );

  const handleChangeUser = (data: ExecutorModelRequired) => {
    setUserInfo(data);
  };

  const handleDeleteUser = () => {
    params.callbackDelete({
      user: userInfo,
      callback: navigation.goBack,
    });
  };

  const callbackChange: ExecutorProfileCallback = ({
    user,
    callback,
    toast,
  }) => {
    handleChangeUser(user);
    callback();
    if (toast.length) {
      onShowToast({ text1: toast, visibilityTime: Timing.TOAST_ANIMATION * 2 });
    }
    params.callbackEdit(user);
  };
  const onPushEdit = () => {
    navigation.navigate(AExecutorsSN.EDIT, {
      ...userInfo,
      callbackChange,
    });
  };

  useEffect(() => {
    getExecutorById(params.id)
      .then((response) => {
        handleChangeUser(response);
      })
      .catch(() => {});
  }, []);

  useFocusEffect(
    useCallback(() => {
      onHideToast();
    }, []),
  );

  return {
    userInfo,
    toast,
    onHideToast,
    onPushEdit,
    handleDeleteUser,
  };
};

const initialUser = (initial: ExecutorModel): ExecutorModelRequired => {
  return {
    id: initial.id,
    name: initial.name || "",
    password: initial.password || "",
    username: initial.username || "",
    phone: initial.phone || "",
  };
};
