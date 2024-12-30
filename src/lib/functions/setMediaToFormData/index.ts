import { getSendPhotoObj } from "../getSendPhotoObj";
import type {
  MediaFileFormModel,
  MediaPickerAsset,
} from "@app/lib/models/MediaFileModel";

export const setMediaToFormData = (
  key: "video_file" | "image_files",
  arr: MediaFileFormModel[],
  formData: FormData,
) => {
  if (!arr.length) return;

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i].source as MediaPickerAsset;

    const sendItem = getSendPhotoObj({
      uri: item.uri ?? "",
      type: item.type ?? "",
      fileName: item.fileName ?? "",
    });

    formData.append(key, sendItem);
  }
};
