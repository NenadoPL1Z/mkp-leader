import { useForm } from "react-hook-form";
import { useToastLocal } from "@app/hooks/useToastLocal";
import { Response } from "@app/lib/constants/response";
import { useEffect, useState } from "react";

import { getTime } from "@app/lib/functions/getTime";
import { postCustomerCreate } from "@app/lib/api/customer/postCustomerCreate";
import { isAxiosError } from "axios";
import { FIRST_EXECUTOR_NAME_SELECT } from "@app/lib/constants/executors.ts";
import type {
  CustomerContactsData,
  CustomerCreateData,
} from "@app/lib/api/customer/postCustomerCreate";
import type { CustomerForm } from "@app/lib/models/form/CustomerForm";
import type { ACNewProps } from "@app/routes/admin/stacks/ACustomers/types";
import type { FieldErrors, SubmitHandler } from "react-hook-form";
import type { DetailString } from "@app/types/general";

export const useACNew = ({
  navigation,
  route: {
    params: { callbackAdd },
  },
}: ACNewProps) => {
  const methods = useForm<CustomerForm>({
    defaultValues: {
      username: "",
      password: "",
      name: "",
      address: "",
      opening_time: "",
      closing_time: "",
      only_weekdays: false,
      personal_first_phone: "",
      personal_first_name: "",
      personal_second_phone: "",
      personal_second_name: "",
    },
  });

  const { toast, onShowToast, onHideToast } = useToastLocal();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const errorRequest = (error?: string) => {
    setIsLoading(false);
    onShowToast({ text1: error || Response.UNKNOWN });
  };

  const onSuccess: SubmitHandler<CustomerForm> = async (data) => {
    try {
      onHideToast();
      setIsLoading(true);

      const contacts: CustomerContactsData[] = [
        {
          phone: data.personal_first_phone,
          person: data.personal_first_name,
        },
      ];

      if (data.personal_second_phone) {
        contacts.push({
          phone: data.personal_second_phone,
          person: data.personal_second_name || "",
        });
      }

      const result: CustomerCreateData = {
        username: data.username,
        password: data.password,
        name: data.name,
        address: data.address || "",
        executor_default_id: data.executor_default.id,
        executor_additional_id: data.executor_additional?.id ?? null,
        opening_time: getTime(data.opening_time),
        closing_time: getTime(data.closing_time),
        only_weekdays: data.only_weekdays,
        contacts,
      };

      const response = await postCustomerCreate(result);

      if (response.status === 201) {
        const callback = () => {
          setIsLoading(false);
          navigation.goBack();
        };

        callbackAdd({
          user: response.data,
          callback: callback,
          toast: `Заказчик ${result.name} создан`,
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

  const onReject = (errors: FieldErrors<Required<CustomerForm>>) => {
    if (
      errors.username?.type === "required" &&
      errors.password?.type === "required" &&
      errors.name?.type === "required" &&
      errors.address?.type === "required" &&
      errors.executor_default?.type === "required" &&
      errors.personal_first_phone?.type === "required" &&
      errors.personal_first_name?.type === "required"
    ) {
      onShowToast({ text1: "Заполните все обязательные поля" });
      return;
    }
    if (errors.username?.type === "required") {
      onShowToast({ text1: `Заполните логин пользователя` });
      return;
    }
    if (errors.password?.type === "required") {
      onShowToast({ text1: `Заполните пароль пользователя` });
      return;
    }
    if (errors.name?.type === "required") {
      onShowToast({ text1: `Заполните название компании` });
      return;
    }
    if (errors.address?.type === "required") {
      onShowToast({ text1: `Заполните адрес компании` });
      return;
    }
    if (errors.executor_default?.type === "required") {
      onShowToast({ text1: `Выберите ${FIRST_EXECUTOR_NAME_SELECT}` });
      return;
    }
    if (errors.personal_first_phone?.type === "required") {
      onShowToast({ text1: `Заполните телефон контактного лица` });
      return;
    }
    if (errors.personal_first_name?.type === "required") {
      onShowToast({ text1: `Заполните Ф.И.О контактного лица` });
      return;
    }
    if (errors.personal_second_phone?.type === "required") {
      onShowToast({ text1: `Заполните телефон второго контактного лица` });
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
        text1: `Название.: ${errors.name.message?.toLowerCase()}`,
      });
      return;
    }
    if (errors.address?.type === "maxLength") {
      onShowToast({
        text1: `Адрес.: ${errors.address.message?.toLowerCase()}`,
      });
      return;
    }
    if (errors.personal_first_phone?.type === "maxLength") {
      onShowToast({
        text1: `Телефон: ${errors.personal_first_phone.message?.toLowerCase()}`,
      });
      return;
    }
    if (errors.personal_first_name?.type === "maxLength") {
      onShowToast({
        text1: `ФИО: ${errors.personal_first_name.message?.toLowerCase()}`,
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
