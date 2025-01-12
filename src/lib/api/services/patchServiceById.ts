import { apiInstance } from "@app/lib/http";
import { Api } from "@app/lib/constants/api";
import { setMediaToFormData } from "@app/lib/functions/setMediaToFormData";
import { TIMEOUT_FILES } from "@app/lib/constants";
import type { ServicesDetailModel } from "@app/lib/models/ServiceModel";
import type { RequestFormModel } from "@app/lib/models/form/RequestForm";

export const patchServiceById = (
  form: RequestFormModel,
  initialValue: ServicesDetailModel,
) => {
  const formData = new FormData();

  //? INITIAL_VALUE
  if (initialValue.executor_default) {
    formData.append("executor_id", +initialValue.executor_default);
  }
  if (initialValue.executor_additional) {
    formData.append("executor_id", +initialValue.executor_additional);
  }
  if (initialValue.deadline_at) {
    formData.append("deadline_at", initialValue.deadline_at);
  }

  const videos = [...form.media].filter(
    (item) => item.type === "local" && item.source.mediaType === "Видео",
  );
  const photos = [...form.media].filter(
    (item) => item.type === "local" && item.source.mediaType === "Изображение",
  );

  //? FORM
  formData.append("title", form.title);
  formData.append("emergency", form.emergency);
  formData.append("description", form.description);
  formData.append("material_availability", form.material.value === "true");
  if (videos.length) {
    setMediaToFormData("video_file", videos, formData);
  }
  if (photos.length) {
    setMediaToFormData("image_files", photos, formData);
  }

  const current = [...form.media]
    .filter((item) => item.type === "server")
    .map((item) => item.source.id);

  //? SERVER_FILES
  if (current.length) {
    formData.append("current_files", JSON.stringify(current));
  }

  return apiInstance.patch<ServicesDetailModel>(
    Api.service.edit(initialValue.id),
    formData,
    {
      timeout: TIMEOUT_FILES,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
};
