import { useController, useFormContext } from "react-hook-form";
import { Count } from "@app/lib/constants/count";
import type { CustomerForm } from "@app/lib/models/form/CustomerForm";

export const useACUserForm = () => {
  const { control } = useFormContext<CustomerForm>();

  const username = useController({
    name: "username",
    control,
    rules: {
      required: true,
      maxLength: {
        value: Count.FORM_MAX_LENGTH,
        message: `Макс. количество символов ${Count.FORM_MAX_LENGTH}`,
      },
    },
  });
  const password = useController({
    name: "password",
    control,
    rules: {
      required: true,
      maxLength: {
        value: Count.FORM_MAX_LENGTH,
        message: `Макс. количество символов ${Count.FORM_MAX_LENGTH}`,
      },
    },
  });

  return {
    username,
    password,
  };
};
