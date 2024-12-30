import { useController, useFormContext } from "react-hook-form";
import { Count } from "@app/lib/constants/count";
import type { CustomerForm } from "@app/lib/models/form/CustomerForm";

export const useACPersonalForm = () => {
  const { control } = useFormContext<CustomerForm>();

  const firstPhone = useController({
    name: "personal_first_phone",
    control,
    rules: {
      required: true,
      maxLength: {
        value: Count.FORM_MAX_LENGTH,
        message: `Макс. количество символов ${Count.FORM_MAX_LENGTH}`,
      },
    },
  });

  const firstName = useController({
    name: "personal_first_name",
    control,
    rules: {
      required: true,
      maxLength: {
        value: Count.FORM_MAX_LENGTH,
        message: `Макс. количество символов ${Count.FORM_MAX_LENGTH}`,
      },
    },
  });

  const secondName = useController({
    name: "personal_second_name",
    control,
    rules: {
      maxLength: {
        value: Count.FORM_MAX_LENGTH,
        message: `Макс. количество символов ${Count.FORM_MAX_LENGTH}`,
      },
    },
  });

  const secondPhone = useController({
    name: "personal_second_phone",
    control,
    rules: {
      required: !!secondName.field.value,
      maxLength: {
        value: Count.FORM_MAX_LENGTH,
        message: `Макс. количество символов ${Count.FORM_MAX_LENGTH}`,
      },
    },
  });

  const onCloserFirst = () => {
    firstPhone.field.onChange("");
    firstName.field.onChange("");
  };

  const onCloserSecond = () => {
    secondPhone.field.onChange("");
    secondName.field.onChange("");
  };

  return {
    firstPhone,
    firstName,
    secondPhone,
    secondName,
    onCloserFirst,
    onCloserSecond,
  };
};
