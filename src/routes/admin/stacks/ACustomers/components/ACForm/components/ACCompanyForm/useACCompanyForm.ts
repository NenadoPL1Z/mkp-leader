import { useController, useFormContext } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { ACustomersSN } from "@app/routes/admin/stacks/ACustomers/types";
import { Count } from "@app/lib/constants/count";
import {
  FIRST_EXECUTOR_NAME,
  FIRST_EXECUTOR_NAME_SELECT,
  SECOND_EXECUTOR_NAME,
  SECOND_EXECUTOR_NAME_SELECT,
} from "./constants";
import type { CustomerForm } from "@app/lib/models/form/CustomerForm";
import type { NavigationProp } from "@react-navigation/native";
import type {
  ACustomersSPL,
  AdminCustomerAddressCallback,
} from "@app/routes/admin/stacks/ACustomers/types";

export const useACCompanyForm = () => {
  const { control } = useFormContext<CustomerForm>();
  const navigation = useNavigation<NavigationProp<ACustomersSPL>>();

  const name = useController({
    name: "name",
    control,
    rules: {
      required: true,
      maxLength: {
        value: Count.FORM_MAX_LENGTH,
        message: `Макс. количество символов ${Count.FORM_MAX_LENGTH}`,
      },
    },
  });

  const address = useController({
    name: "address",
    control,
    rules: {
      required: true,
      maxLength: {
        value: Count.FORM_MAX_BIG_LENGTH,
        message: `Макс. количество символов ${Count.FORM_MAX_BIG_LENGTH}`,
      },
    },
  });

  const executorDefault = useController({
    name: "executor_default",
    control,
    rules: {
      required: true,
    },
  });

  const executorAdditional = useController({
    name: "executor_additional",
    control,
  });

  const openingTime = useController({
    name: "opening_time",
    control,
  });

  const closingTime = useController({
    name: "closing_time",
    control,
  });

  const onlyWeekdays = useController({
    name: "only_weekdays",
    control,
    defaultValue: false,
  });

  const callbackAddress: AdminCustomerAddressCallback = (data, callback) => {
    address.field.onChange(data);
    callback();
  };

  const handlePressAddress = () => {
    navigation.navigate(ACustomersSN.ADDRESS, {
      initialValue: address.field.value,
      callbackAddress,
    });
  };

  const handlePressDefaultExecutor = () => {
    navigation.navigate(ACustomersSN.EXECUTOR, {
      screenTitle: FIRST_EXECUTOR_NAME,
      callbackSelectExecutor: (executor, onShowToast, goBack) => {
        if (executor.id === executorAdditional.field.value?.id) {
          onShowToast({
            text1: `Исполнитель "${executor.name}" уже выбран в качестве ${SECOND_EXECUTOR_NAME_SELECT}`,
          });
        } else {
          executorDefault.field.onChange(executor);
          goBack();
        }
      },
    });
  };

  const handlePressAdditionalExecutor = () => {
    navigation.navigate(ACustomersSN.EXECUTOR, {
      screenTitle: SECOND_EXECUTOR_NAME,
      callbackSelectExecutor: (executor, onShowToast, goBack) => {
        if (executor.id === executorDefault.field.value?.id) {
          onShowToast({
            text1: `Исполнитель "${executor.name}" уже выбран в качестве ${FIRST_EXECUTOR_NAME_SELECT}`,
          });
        } else {
          executorAdditional.field.onChange(executor);
          goBack();
        }
      },
    });
  };

  return {
    name,
    address,
    executorDefault,
    executorAdditional,
    openingTime,
    closingTime,
    onlyWeekdays,
    handlePressAddress,
    handlePressDefaultExecutor,
    handlePressAdditionalExecutor,
  };
};
