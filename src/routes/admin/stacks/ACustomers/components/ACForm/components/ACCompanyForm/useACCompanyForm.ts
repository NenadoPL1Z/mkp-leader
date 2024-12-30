import { useController, useFormContext } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { ACustomersSN } from "@app/routes/admin/stacks/ACustomers/types";
import { Count } from "@app/lib/constants/count";
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

  return {
    name,
    address,
    openingTime,
    closingTime,
    onlyWeekdays,
    handlePressAddress,
  };
};
