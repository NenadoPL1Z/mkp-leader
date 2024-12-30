import { useForm } from "react-hook-form";
import { useToastLocal } from "@app/hooks/useToastLocal";
import { Response } from "@app/lib/constants/response";
import { useEffect, useState } from "react";

import { postExecutorCreate } from "@app/lib/api/executor/postExecutorCreate";
import { isAxiosError } from "axios";
import type { DetailString } from "@app/types/general";
import type { ExecutorForm } from "@app/lib/models/form/ExecutorForm";
import type { FieldErrors, SubmitHandler } from "react-hook-form";
import type { AENewProps } from "@app/routes/admin/stacks/AExecutors/types";
import type { ExecutorModelRequired } from "@app/lib/models/ExecutorModel";

export const useAENew = ({ route, navigation }: AENewProps) => {
  const { callbackAdd } = route.params;
  const methods = useForm<ExecutorForm>();
  const { toast, onShowToast, onHideToast } = useToastLocal();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const errorRequest = (error?: string) => {
    setIsLoading(false);
    onShowToast({ text1: error || Response.UNKNOWN });
  };

  const onSuccess: SubmitHandler<ExecutorForm> = async (data) => {
    try {
      onHideToast();
      setIsLoading(true);

      //? IS NOT EDIT
      if (
        data.username === "" &&
        data.password === "" &&
        data.name === "" &&
        data.phone === ""
      ) {
        setIsLoading(false);
        onShowToast({ text1: Response.EMPTY });
        return;
      }

      const response = await postExecutorCreate(data);

      if (response.status === 201) {
        const callback = () => {
          setIsLoading(false);
          navigation.goBack();
        };

        callbackAdd({
          user: response.data,
          callback: callback,
          toast: "Исполнитель создан",
        });
        return;
      }

      errorRequest();
    } catch (e) {
      if (isAxiosError<DetailString>(e)) {
        errorRequest(e.response?.data.detail || "");
        return;
      }

      errorRequest();
    }

    return data;
  };

  const onReject = (errors: FieldErrors<Required<ExecutorModelRequired>>) => {
    if (
      errors.username?.type === "required" &&
      errors.password?.type === "required" &&
      errors.name?.type === "required" &&
      errors.phone?.type === "required"
    ) {
      onShowToast({ text1: "Заполните все обязательные поля" });
      return;
    }
    if (errors.username?.type === "required") {
      onShowToast({ text1: `Заполните поле "Логин"` });
      return;
    }
    if (errors.password?.type === "required") {
      onShowToast({ text1: `Заполните поле "Пароль"` });
      return;
    }
    if (errors.name?.type === "required") {
      onShowToast({ text1: `Заполните поле "Ф.И.О"` });
      return;
    }
    if (errors.phone?.type === "required") {
      onShowToast({ text1: `Заполните поле "Телефон"` });
      return;
    }
    if (errors.username?.type === "maxLength") {
      onShowToast({
        text1: `Логин: ${errors.username.message?.toLowerCase()}`,
      });
      return;
    }
    if (errors.password?.type === "maxLength") {
      onShowToast({
        text1: `Пароль: ${errors.password.message?.toLowerCase()}`,
      });
      return;
    }
    if (errors.name?.type === "maxLength") {
      onShowToast({
        text1: `ФИО: ${errors.name.message?.toLowerCase()}`,
      });
      return;
    }
    if (errors.phone?.type === "maxLength") {
      onShowToast({
        text1: `Телефон: ${errors.phone.message?.toLowerCase()}`,
      });
      return;
    }
  };

  const onSubmit = methods.handleSubmit(onSuccess, onReject);

  useEffect(() => {
    return () => {
      onHideToast();
    };
  }, []);

  return {
    methods,
    toast,
    isLoading,
    onHideToast,
    onSubmit,
  };
};
