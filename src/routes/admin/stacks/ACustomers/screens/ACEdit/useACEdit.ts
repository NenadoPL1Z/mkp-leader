import { useForm } from "react-hook-form";
import { useToastLocal } from "@app/hooks/useToastLocal";
import { useEffect, useState } from "react";
import { Response } from "@app/lib/constants/response";
import { getTime, getTimeToDate } from "@app/lib/functions/getTime";
import { patchCredential } from "@app/lib/api/users/patchCredentials";
import { patchCompany } from "@app/lib/api/users/patchCompany";
import { patchContacts } from "@app/lib/api/users/patchContacts";
import { Timing } from "@app/lib/constants/timing";
import { isAxiosError } from "axios";
import { postContacts } from "@app/lib/api/users/postContacts";
import type { CustomerDetailModel } from "@app/lib/models/CustomerModel";
import type { PatchContactsData } from "@app/lib/api/users/patchContacts";
import type { PatchCompanyData } from "@app/lib/api/users/patchCompany";
import type { PatchCredentialData } from "@app/lib/api/users/patchCredentials";
import type { ACEditProps } from "@app/routes/admin/stacks/ACustomers/types";
import type { FieldErrors, SubmitHandler } from "react-hook-form";
import type { CustomerForm } from "@app/lib/models/form/CustomerForm";
import type { DetailString } from "@app/types/general";

type SuccessResult = "personal" | "company" | "personFirst" | "personLast";

export const useACEdit = ({ navigation, route }: ACEditProps) => {
  const { callbackChange, ...initialData } = route.params;
  const initialCompany = initialData.customer_company;
  const initialContacts = initialCompany.contacts || [];
  const initialFistPerson = initialContacts[0] || {
    id: "",
    phone: "",
    person: "",
  };
  const initialSecondPerson = initialContacts[1] || {
    id: "",
    phone: "",
    person: "",
  };

  const methods = useForm<CustomerForm>({
    defaultValues: {
      username: initialData.username,
      password: initialData.password,
      name: initialCompany.name,
      address: initialCompany.address || "",
      opening_time: getTimeToDate(initialCompany.opening_time),
      closing_time: getTimeToDate(initialCompany.closing_time),
      only_weekdays: initialCompany.only_weekdays,
      personal_first_phone: initialFistPerson?.phone || "",
      personal_first_name: initialFistPerson?.person || "",
      personal_second_phone: initialSecondPerson?.phone || "",
      personal_second_name: initialSecondPerson?.person || "",
    },
  });

  const { toast, onShowToast, onHideToast } = useToastLocal();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const errorRequest = (error?: string) => {
    setIsLoading(false);
    onShowToast({ text1: error || Response.UNKNOWN });
  };

  const successCallback = () => {
    setIsLoading(false);
    navigation.goBack();
  };

  const onSuccess: SubmitHandler<CustomerForm> = async (data) => {
    try {
      setIsLoading(true);
      data.opening_time = getTime(data.opening_time);
      data.closing_time = getTime(data.closing_time);

      let newCustomer: CustomerDetailModel = JSON.parse(
        JSON.stringify(initialData),
      );

      //? CREDENTIAL
      const isCredential =
        data.username !== initialData.username ||
        data.password !== initialData.password;

      if (isCredential) {
        const personal: Partial<PatchCredentialData> = {};
        if (data.username !== initialData.username) {
          personal.username = data.username;
        }
        if (data.password !== initialData.password) {
          personal.password = data.password;
        }
        await patchCredential(initialData.id, personal)
          .then(() => {
            statuses.personal.state = "success";
            newCustomer = { ...newCustomer, ...personal };
          })
          .catch((e) => {
            statuses.personal.state = "error";
            if (isAxiosError<DetailString>(e)) {
              const detail = e.response?.data?.detail;
              if (typeof detail === "string") {
                statuses.personal.error = detail;
              }
            }
          });
      }

      //? COMPANY
      const isCompany =
        data.name !== initialCompany.name ||
        data.address !== initialCompany.address ||
        data.only_weekdays !== initialCompany.only_weekdays ||
        data.opening_time !== initialCompany.opening_time ||
        data.closing_time !== initialCompany.closing_time;

      if (isCompany) {
        const company: PatchCompanyData = {};
        if (data.name !== initialCompany.name) {
          company.name = data.name;
        }
        if (data.address !== initialCompany.address) {
          company.address = data.address;
        }
        if (data.only_weekdays !== initialCompany.only_weekdays) {
          company.only_weekdays = data.only_weekdays;
        }
        if (data.opening_time !== initialCompany.opening_time) {
          company.opening_time = data.opening_time;
        }
        if (data.closing_time !== initialCompany.closing_time) {
          company.closing_time = data.closing_time;
        }
        await patchCompany(initialData.id, company)
          .then(() => {
            statuses.company.state = "success";
            newCustomer.customer_company = {
              ...newCustomer.customer_company,
              ...company,
            };
          })
          .catch((e) => {
            statuses.company.state = "error";
            if (isAxiosError<DetailString>(e)) {
              const detail = e.response?.data?.detail;
              if (typeof detail === "string") {
                statuses.company.error = detail;
              }
            }
          });
      }

      //? FIRST
      const isFirst =
        data.personal_first_phone !== initialFistPerson.phone ||
        data.personal_first_name !== initialFistPerson.person;

      if (isFirst) {
        const first: PatchContactsData = {
          phone: data.personal_first_phone,
          person: data.personal_first_name,
        };

        await patchContacts(initialFistPerson.id, first)
          .then(() => {
            statuses.personFirst.state = "success";
            if (newCustomer.customer_company.contacts[0]) {
              newCustomer.customer_company.contacts[0] = {
                ...newCustomer.customer_company.contacts[0],
                ...first,
              };
            }
          })
          .catch((e) => {
            statuses.personFirst.state = "error";
            if (isAxiosError<DetailString>(e)) {
              const detail = e.response?.data?.detail;
              if (typeof detail === "string") {
                statuses.personFirst.error = detail;
              }
            }
          });
      }

      //? SECOND
      const isSecond =
        data.personal_second_phone !== initialSecondPerson.phone ||
        data.personal_second_name !== initialSecondPerson.person;

      if (isSecond) {
        const second: PatchContactsData = {
          phone: data.personal_second_phone,
          person: data.personal_second_name,
        };

        const api = initialSecondPerson.id ? patchContacts : postContacts;
        const id = initialSecondPerson.id
          ? initialSecondPerson.id
          : initialData.id;

        await api(id, second)
          .then(() => {
            statuses.personLast.state = "success";
            newCustomer.customer_company.contacts[1] = {
              ...newCustomer.customer_company.contacts[1],
              ...second,
            };
          })
          .catch((e) => {
            statuses.personLast.state = "error";
            if (isAxiosError<DetailString>(e)) {
              const detail = e.response?.data?.detail;
              if (typeof detail === "string") {
                statuses.personLast.error = detail;
              }
            }
          });
      }

      const isAllSuccess =
        statuses.personal.state !== "error" &&
        statuses.company.state !== "error" &&
        statuses.personFirst.state !== "error" &&
        statuses.personLast.state !== "error";

      if (isAllSuccess) {
        //? UPDATE
        callbackChange({
          user: newCustomer,
          toast: "Информация отредактирована",
          callback: successCallback,
        });
        return;
      }

      if (!isAllSuccess) {
        setIsLoading(false);

        const values = Object.values(statuses);
        const success = [...values]
          .filter((item) => item.state === "success")
          .map((item) => item.success);

        const errors = [...values]
          .filter((item) => item.state === "error")
          .map((item) => item.error);

        onShowToast({
          text1: [...errors, ...success].join("\n"),
          visibilityTime: Timing.TOAST_ANIMATION * 4,
        });
        callbackChange({
          user: newCustomer,
          toast: "",
          callback: () => {},
        });

        return;
      }

      errorRequest();
    } catch {
      errorRequest();
    }
  };

  const onReject = (errors: FieldErrors<Required<CustomerForm>>) => {
    if (
      errors.username?.type === "required" &&
      errors.password?.type === "required" &&
      errors.name?.type === "required" &&
      errors.address?.type === "required" &&
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
    errorRequest,
  };
};

const statuses: Record<
  SuccessResult,
  { state: "" | "success" | "error"; success: string; error: string }
> = {
  personal: {
    state: "",
    success: "Успешное редактирование персональной информации",
    error: "Ошибка редактирования персональной информации",
  },
  company: {
    state: "",
    success: "Успешное редактирование информации о компании",
    error: "Ошибка редактирования информации о компании",
  },
  personFirst: {
    state: "",
    success: "Успешное редактирование информации о первом контактном лице",
    error: "Ошибка редактирования информации о первом контактном лице",
  },
  personLast: {
    state: "",
    success: "Успешное редактирование информации о втором контактном лице",
    error: "Ошибка редактирования информации о втором контактном лице",
  },
};
