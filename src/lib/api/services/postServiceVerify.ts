import { apiInstance } from "@app/lib/http";
import { Api } from "@app/lib/constants/api";
import { setMediaToFormData } from "@app/lib/functions/setMediaToFormData";
import { TIMEOUT_FILES } from "@app/lib/constants";
import type {
  ServiceId,
  ServicesDetailModel,
} from "@app/lib/models/ServiceModel";
import type { MediaForm } from "@app/lib/models/form/MediaForm";

export const postServiceVerify = (serviceId: ServiceId, form: MediaForm) => {
  const formData = new FormData();

  const videos = [...form.media].filter(
    (item) => item.source.mediaType === "Видео",
  );
  const photos = [...form.media].filter(
    (item) => item.source.mediaType === "Изображение",
  );

  formData.append("service_id", serviceId);
  setMediaToFormData("video_file", videos, formData);
  setMediaToFormData("image_files", photos, formData);

  return apiInstance.post<ServicesDetailModel>(Api.service.verify, formData, {
    headers: {
      timeout: TIMEOUT_FILES,
      "Content-Type": "multipart/form-data",
    },
  });
};
