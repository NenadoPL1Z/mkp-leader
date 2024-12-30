import { useForm } from "react-hook-form";
import { useToastLocal } from "@app/hooks/useToastLocal";
import { patchCredential } from "@app/lib/api/users/patchCredentials";
import { patchPersonalData } from "@app/lib/api/users/patchPersonaData";
import { Response } from "@app/lib/constants/response";
import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { Timing } from "@app/lib/constants/timing";
import type { DetailString } from "@app/types/general";
import type { UserModel } from "@app/lib/models/UserModel";
import type {
  PatchPersonalData,
  PatchPersonalDataResponse,
} from "@app/lib/api/users/patchPersonaData";
import type {
  PatchCredentialData,
  PatchCredentialResponse,
} from "@app/lib/api/users/patchCredentials";
import type { ExecutorForm } from "@app/lib/models/form/ExecutorForm";
import type { FieldErrors, SubmitHandler } from "react-hook-form";
import type { AEEditProps } from "@app/routes/admin/stacks/AExecutors/types";
import type { ExecutorModelRequired } from "@app/lib/models/ExecutorModel";

export const useAEEdit = ({ route, navigation }: AEEditProps) => {
  const { callbackChange, ...initialUser } = route.params;
  const methods = useForm<ExecutorForm>({ defaultValues: initialUser });
  const { toast, onShowToast, onHideToast } = useToastLocal();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const displayToast = (toast: string[]) => {
    return toast.join("\n");
  };

  const successRequest = (user: ExecutorModelRequired, toast: string) => {
    const callback = () => {
      setIsLoading(false);
      navigation.goBack();
    };

    callbackChange({
      user,
      toast,
      callback,
    });
  };

  const errorRequest = (error?: string) => {
    setIsLoading(false);
    onShowToast({
      text1: error || Response.UNKNOWN,
      visibilityTime: Timing.TOAST_ANIMATION * 2,
    });
  };

  const onSuccess: SubmitHandler<ExecutorForm> = async (data) => {
    try {
      onHideToast();
      setIsLoading(true);

      const resultUser: ExecutorModelRequired = initialUser;
      const allPromises = [];
      const toastText: string[] = [];
      let isError: boolean = false;
      let isEditModel: boolean = false;

      //? edit state
      const edit: Record<
        keyof ExecutorForm,
        { name: string; state: boolean; confirm: boolean }
      > = {
        username: { name: "Логин", state: false, confirm: false },
        password: { name: "Пароль", state: false, confirm: false },
        name: { name: "Ф.И.О", state: false, confirm: false },
        phone: { name: "Телефон", state: false, confirm: false },
      };

      //? update result model
      const userUpdate = (newUser: UserModel) => {
        resultUser.username = newUser.username;
        resultUser.password = data.password;
        resultUser.name = newUser.name || "";
        resultUser.phone = newUser.phone || "";
      };

      //? IS NOT EDIT
      if (
        data.username === initialUser.username &&
        data.password === initialUser.password &&
        data.name === initialUser.name &&
        data.phone === initialUser.phone
      ) {
        successRequest(initialUser, "Информация отредактирована");
        return;
      }

      //? EDIT CREDENTIAL
      if (
        data.username !== initialUser.username ||
        data.password !== initialUser.password
      ) {
        const result = {} as PatchCredentialData;

        if (data.username !== initialUser.username) {
          result.username = data.username;
          edit.username.state = true;
        }

        if (data.password !== initialUser.password) {
          result.password = data.password;
          edit.password.state = true;
        }
        allPromises.push(() => patchCredential(initialUser.id, result));
      } else {
        allPromises.push(Promise.resolve);
      }

      //? EDIT PERSONAL DATA
      if (data.name !== initialUser.name || data.phone !== initialUser.phone) {
        const result = {} as PatchPersonalData;

        if (data.name !== initialUser.name) {
          result.name = data.name;
          edit.name.state = true;
        }

        if (data.phone !== initialUser.phone) {
          result.phone = data.phone;
          edit.phone.state = true;
        }
        allPromises.push(() => patchPersonalData(initialUser.id, result));
      } else {
        allPromises.map(Promise.resolve);
      }

      const [credential, personalData] = await Promise.allSettled(
        allPromises.map((promise) => promise()),
      );

      if (credential?.status === "fulfilled" && credential.value) {
        const checkValue = (
          result: typeof credential.value,
        ): result is PatchCredentialResponse => !!result;

        if (checkValue(credential.value)) {
          const user = credential.value.data;
          const isConfirm = user.id;
          if (isConfirm) {
            isEditModel = true;
            if (edit.username.state) {
              edit.username.confirm = true;
            }
            if (edit.password.state) {
              edit.password.confirm = true;
            }
          }
          userUpdate(user);
        }
      }

      if (credential?.status === "rejected") {
        if (isAxiosError<DetailString>(credential.reason)) {
          const detail = credential.reason.response?.data.detail;
          if (detail) {
            toastText.push(detail);
          }
          isError = true;
        }
      }

      if (personalData?.status === "fulfilled" && personalData.value) {
        const checkValue = (
          result: typeof personalData.value,
        ): result is PatchPersonalDataResponse => !!result;

        if (checkValue(personalData.value)) {
          const user = personalData.value.data;
          const isConfirm = user.id;
          if (isConfirm) {
            isEditModel = true;
            if (edit.name.state) {
              edit.name.confirm = true;
            }
            if (edit.phone.state) {
              edit.phone.confirm = true;
            }
          }
          userUpdate(user);
        }
      }

      if (personalData?.status === "rejected") {
        if (isAxiosError<DetailString>(personalData.reason)) {
          const detail = personalData.reason.response?.data.detail;
          if (detail) {
            toastText.push(detail);
          }
          isError = true;
        }
      }

      for (const [, value] of Object.entries(edit)) {
        if (value.state) {
          const status = value.confirm ? "изменен" : "не удалось изменить";
          toastText.push(`${value.name} - ${status}`);
        }
      }

      if (isError) {
        if (isEditModel) {
          callbackChange({
            user: resultUser,
            callback: () => {},
            toast: "",
          });
        }
        errorRequest(displayToast(toastText));
        return;
      }

      successRequest(resultUser, displayToast(toastText));
    } catch {
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
