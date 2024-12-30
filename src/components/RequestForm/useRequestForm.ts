import { useToastLocal } from "@app/hooks/useToastLocal";
import { useController, useForm } from "react-hook-form";
import { Count } from "@app/lib/constants/count";
import { mediaUtils } from "@app/lib/utils/mediaUtils";
import { postServiceCreate } from "@app/lib/api/services/postServiceCreate";
import { patchServiceById } from "@app/lib/api/services/patchServiceById";
import { useStatus } from "@app/hooks/useStatus";
import { isAxiosError } from "axios";
import { SWITCH_OPTIONS } from "./constants";
import type { ServicesDetailModel } from "@app/lib/models/ServiceModel";
import type { RequestFormProps } from "./types";
import type { RequestFormModel } from "@app/lib/models/form/RequestForm";

export const useRequestForm = ({
  isEdit,
  initialData,
  callbackEdit,
}: RequestFormProps) => {
  const { toast, onHideToast, onShowToast } = useToastLocal();
  const { isLoading, handleLoadingStatus, handleClearStatus } = useStatus({
    isLoading: false,
  });

  const methods = useForm<RequestFormModel>({
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      emergency: Boolean(initialData?.emergency),
      material: initialData?.material_availability
        ? SWITCH_OPTIONS[1]
        : SWITCH_OPTIONS[0],
      media: mediaUtils.serverToForm(initialData?.media_files),
    },
  });
  const { control, handleSubmit } = methods;

  const title = useController({
    control,
    name: "title",
    rules: {
      required: true,
      maxLength: {
        value: Count.FORM_MAX_LENGTH,
        message: "",
      },
    },
  });

  const emergency = useController({
    control,
    name: "emergency",
  });

  const description = useController({
    control,
    name: "description",
    rules: {
      required: true,
      maxLength: {
        value: Count.DESCRIPTION,
        message: "",
      },
    },
  });

  const material = useController({
    control,
    name: "material",
  });

  const handleShowToast = (text1: string) => {
    onShowToast({ text1 });
  };

  const successApi = (data: ServicesDetailModel) => {
    onHideToast();
    handleClearStatus();
    callbackEdit(data);
  };

  const rejectApi = (e: unknown) => {
    handleClearStatus();
    if (isAxiosError(e)) {
      handleShowToast(JSON.stringify(e?.response));
    }
  };

  const onSubmit = handleSubmit(
    (data) => {
      handleLoadingStatus();

      //? IS_CREATE
      if (!isEdit) {
        postServiceCreate(data)
          .then((r) => successApi(r.data))
          .catch(rejectApi);
        return;
      }

      //? IS_EDIT
      if (isEdit && initialData) {
        patchServiceById(data, initialData)
          .then((r) => successApi(r.data))
          .catch(rejectApi);
        return;
      }

      callbackEdit(null);
    },
    (errors) => {
      if (
        errors.title?.type === "required" &&
        errors.description?.type === "required"
      ) {
        handleShowToast("Заполните все обязательные поля");
        return;
      }

      if (errors.title?.type === "required") {
        handleShowToast("Заполните название задачи");
        return;
      }
      if (errors.description?.type === "required") {
        handleShowToast("Заполните описание задачи");
        return;
      }
      if (errors.title?.type === "maxLength") {
        handleShowToast("Слишком длинное название задачи");
        return;
      }
      if (errors.description?.type === "maxLength") {
        handleShowToast("Слишком длинное описание задачи");
        return;
      }
      if (errors.media?.type === "required") {
        handleShowToast("Добавьте хотя бы одну фотографию");
        return;
      }
    },
  );

  return {
    toast,
    onHideToast,
    handleShowToast,

    isLoading,

    methods,

    title,
    emergency,
    description,
    material,

    onSubmit,
  };
};
