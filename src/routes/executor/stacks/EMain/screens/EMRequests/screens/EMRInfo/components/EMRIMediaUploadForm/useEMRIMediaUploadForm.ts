import { useForm } from "react-hook-form";
import { useToastLocal } from "@app/hooks/useToastLocal";
import { postServiceVerify } from "@app/lib/api/services/postServiceVerify";
import { useStatus } from "@app/hooks/useStatus";
import { isAxiosError } from "axios";
import type { ServicesDetailModel } from "@app/lib/models/ServiceModel";
import type { EMRIMediaUploadFormProps } from "./types";
import type { MediaForm } from "@app/lib/models/form/MediaForm";

export const useEMRIMediaUploadForm = ({
  id,
  onVerify,
}: EMRIMediaUploadFormProps) => {
  const { toast, onHideToast, onShowToast } = useToastLocal();
  const { isLoading, handleLoadingStatus, handleClearStatus } = useStatus({
    isLoading: false,
  });

  const methods = useForm<MediaForm>();
  const { handleSubmit } = methods;

  const handleShowToast = (text1: string) => {
    onShowToast({ text1 });
  };

  const successApi = (data: ServicesDetailModel) => {
    handleClearStatus();
    onVerify(data);
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

      postServiceVerify(id, data)
        .then((response) => successApi(response.data))
        .catch(rejectApi);
    },
    (errors) => {
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
    onSubmit,
  };
};
