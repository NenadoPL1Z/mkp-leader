import { Count } from "@app/lib/constants/count";
import type {
  MediaFileFormModel,
  MediaFilesArr,
} from "@app/lib/models/MediaFileModel";
import type { Asset } from "react-native-image-picker/src/types";

const serverToForm = (
  mediaFiles: MediaFilesArr | undefined | null,
): MediaFileFormModel[] => {
  if (!mediaFiles) return [];
  return mediaFiles.map((item) => ({
    type: "server",
    source: { ...item, mediaType: item.file_type },
  }));
};

const assetToForm = (arr: Asset[]): MediaFileFormModel[] => {
  return arr.map((item, index) => ({
    type: "local",
    source: {
      ...item,
      //? UNIQUE ID
      id: (item.id ?? `photo`) + Date.now() + index,
      mediaType: item.type?.includes("video") ? "Видео" : "Изображение",
    },
  }));
};

type arg = {
  max: number;
  uploadVideos: Asset[];
  uploadImages: Asset[];
  formVideos: MediaFileFormModel[];
  formPhotos: MediaFileFormModel[];
};
const pickerToForm = ({
  max,
  uploadVideos,
  uploadImages,
  formVideos,
  formPhotos,
}: arg): MediaFileFormModel[] => {
  //? ADD VIDEO
  const isMaxVideoInForm = formVideos.length >= Count.MEDIA_VIDEO;
  const videos = isMaxVideoInForm ? formVideos : assetToForm(uploadVideos);
  const videosResult = videos.splice(0, 1);

  //? CALC PHOTO COUNT
  const splicePhotos = videosResult.length ? max - Count.MEDIA_VIDEO : max;

  //? ADD PHOTO
  const photos = [...formPhotos, ...assetToForm(uploadImages)];
  const photosResult = photos.splice(0, splicePhotos);

  return [...videosResult, ...photosResult];
};

export const mediaUtils = {
  serverToForm,
  assetToForm,
  pickerToForm,
};
