import type { Asset } from "react-native-image-picker/src/types.ts";

export const separateMedia = (media?: Asset[]) => {
  const imageArrayPick = [];
  let videoFilePick = null;

  for (const value of media!) {
    if (value.type?.startsWith("image")) {
      imageArrayPick.push(value);
    }

    if (value.type?.startsWith("video")) {
      videoFilePick = value || null;
    }
  }

  return { imageArrayPick, videoFilePick };
};
