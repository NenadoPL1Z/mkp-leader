import { getImageById } from "@app/lib/api/media/getImageById";
import { getVideoById } from "@app/lib/api/media/getVideoById";
import type {
  MediaFileFormModel,
  MediaPositionType,
  MediaSourceAdditional,
  MediaPickerAsset,
} from "@app/lib/models/MediaFileModel";

type Source = MediaFileFormModel["source"];

function isLocal(
  type: MediaPositionType,
  source: MediaSourceAdditional,
): source is MediaPickerAsset {
  return type === "local" && Boolean((source as MediaPickerAsset)?.uri);
}

export const getUri = (type: MediaPositionType, source: Source) => {
  if (type === "server") {
    if (source.mediaType === "Изображение") {
      return getImageById(source.id);
    }
    if (source.mediaType === "Видео") {
      return getVideoById(source.id);
    }
  }
  if (isLocal(type, source)) {
    return source.uri || "";
  }

  return source.id;
};
