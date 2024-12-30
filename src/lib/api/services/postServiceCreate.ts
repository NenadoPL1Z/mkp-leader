import { apiInstance } from "@app/lib/http";
import { Api } from "@app/lib/constants/api";
import { setMediaToFormData } from "@app/lib/functions/setMediaToFormData";
import { TIMEOUT_FILES } from "@app/lib/constants";
import type { RequestFormModel } from "@app/lib/models/form/RequestForm";
import type { ServicesDetailModel } from "@app/lib/models/ServiceModel";

export const postServiceCreate = (form: RequestFormModel) => {
  const formData = new FormData();

  const videos = [...form.media].filter(
    (item) => item.source.mediaType === "Видео",
  );
  const photos = [...form.media].filter(
    (item) => item.source.mediaType === "Изображение",
  );

  formData.append("title", form.title);
  formData.append("emergency", form.emergency);
  formData.append("description", form.description);
  formData.append("material_availability", form.material.value === "true");
  setMediaToFormData("video_file", videos, formData);
  setMediaToFormData("image_files", photos, formData);

  return apiInstance.post<ServicesDetailModel>(Api.service.create, formData, {
    headers: {
      timeout: TIMEOUT_FILES,
      "Content-Type": "multipart/form-data",
    },
  });
};
