import { useCallback, useEffect, useState } from "react";
import { useToastLocal } from "@app/hooks/useToastLocal";
import { Timing } from "@app/lib/constants/timing";
import { useFocusEffect } from "@react-navigation/native";
import { getCustomerById } from "@app/lib/api/customer/getCustomerById";
import { ACustomersSN } from "@app/routes/admin/stacks/ACustomers/types";
import { useStatus } from "@app/hooks/useStatus";
import { Response } from "@app/lib/constants/response";
import type { Nullable } from "@app/types/general";
import type { CustomerDetailModel } from "@app/lib/models/CustomerModel";
import type {
  ACProfileProps,
  CustomerProfileCallback,
} from "@app/routes/admin/stacks/ACustomers/types";

export const useACProfile = ({
  navigation,
  route: { params },
}: ACProfileProps) => {
  const { toast, onShowToast, onHideToast } = useToastLocal();

  const [userInfo, setUserInfo] = useState<Nullable<CustomerDetailModel>>(null);

  const {
    isLoading,
    isError,
    handleLoadingStatus,
    handleErrorStatus,
    handleClearStatus,
  } = useStatus();

  const loadData = () => {
    handleLoadingStatus();

    getCustomerById(params.id)
      .then((response) => {
        handleClearStatus();
        handleChangeUser(response);
      })
      .catch(() => {
        handleErrorStatus(Response.UNKNOWN);
      });
  };

  const handleChangeUser = (data: CustomerDetailModel) => {
    setUserInfo(data);
  };

  const handleDeleteUser = () => {
    if (userInfo) {
      params.callbackDelete({
        user: userInfo,
        callback: navigation.goBack,
      });
    }
  };

  const callbackChange: CustomerProfileCallback = ({
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
    if (userInfo) {
      navigation.navigate(ACustomersSN.EDIT, {
        ...userInfo,
        callbackChange,
      });
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      onHideToast();
    }, []),
  );

  return {
    userInfo,
    isLoading,
    isError,
    toast,
    loadData,
    onHideToast,
    onPushEdit,
    handleDeleteUser,
  };
};
