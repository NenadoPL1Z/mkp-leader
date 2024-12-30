import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@app/store/hooks";
import { user } from "@app/store/reducers";
import { useToastLocal } from "@app/hooks/useToastLocal";

export const useSessionLimit = () => {
  const isSessionLimit = useAppSelector(user.selectors.selectSession);
  const dispatch = useAppDispatch();

  const { toast, onShowToast, onHideToast } = useToastLocal();

  const handleClose = () => {
    dispatch(user.actions.closeSession());
  };

  useEffect(() => {
    if (isSessionLimit) {
      onShowToast({
        text1:
          "Ваша сессия истекла! Заново пройдите авторизацию, чтобы использовать все функции приложения.",
      });
    } else {
      onHideToast();
    }
  }, [isSessionLimit]);

  return {
    toast,
    handleClose,
  };
};
