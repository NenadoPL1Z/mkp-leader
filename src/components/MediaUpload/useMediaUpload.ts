import { useController, useFormContext } from "react-hook-form";
import { launchImageLibrary } from "react-native-image-picker";
import { Count } from "@app/lib/constants/count";
import { Response } from "@app/lib/constants/response";
import { Timing } from "@app/lib/constants/timing";
import { mediaUtils } from "@app/lib/utils/mediaUtils";
import { useState } from "react";
import type { MediaType } from "react-native-image-picker/src/types";
import type { MediaUploadProps } from "./types";
import type { MediaForm } from "@app/lib/models/form/MediaForm";

export const useMediaUpload = ({
  required = false,
  callbackShowToast,
}: MediaUploadProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { control } = useFormContext<MediaForm>();

  const media = useController({
    control,
    name: "media",
    rules: {
      required,
      max: {
        value: Count.MEDIA_MAX,
        message: "",
      },
    },
  });

  const { value: formValue = [], onChange } = media.field;
  const formVideos = formValue.filter(
    (item) => item.source.mediaType === "Видео",
  );
  const formPhotos = formValue.filter(
    (item) => item.source.mediaType === "Изображение",
  );

  const mediaLength = formValue.length || 0;
  const selectionLimit = Count.MEDIA_MAX - mediaLength;

  const isMedia = Boolean(mediaLength);
  const isDisabled = selectionLimit === 0;

  const handleDelete = (id: string) => {
    onChange(formValue.filter((item) => item.source.id !== id));
  };

  const handleAddNew = async () => {
    setIsLoading(true);
    const mediaType: MediaType = formVideos.length > 0 ? "photo" : "mixed";
    let timeout = Timing.TOAST_ANIMATION;

    const timeoutDisplay = (callback: () => void) => {
      timeout = timeout ? 0 : Timing.TOAST_ANIMATION;
      setTimeout(() => {
        callback();
      }, timeout);
    };

    await launchImageLibrary({
      includeExtra: true,
      mediaType,
      selectionLimit,
    })
      .then(({ assets = [], errorCode, didCancel, errorMessage }) => {
        //? CANCEL
        if (didCancel) {
          return;
        }

        //? PERMISSIONS
        if (errorCode === "permission") {
          callbackShowToast(Response.MEDIA);
          return;
        }

        //? UNKNOWN ERROR
        if (errorMessage) {
          callbackShowToast(errorMessage);
          return;
        }

        const uploadVideos = assets.filter((item) =>
          item.type?.includes("video"),
        );
        const uploadImages = assets.filter((item) =>
          item.type?.includes("image"),
        );

        const isLimitMedia = assets.length > Count.MEDIA_MAX;
        const isLimitVideos = uploadVideos.length > Count.MEDIA_VIDEO;
        const isLimitPhotos = uploadImages.length > Count.MEDIA_PHOTO;

        //? MAX MEDIA
        if (isLimitMedia) {
          timeoutDisplay(() => {
            callbackShowToast(
              `Вы добавили слишком много медиа контента. Сократили до ${Count.MEDIA_MAX}`,
            );
          });
        }

        //? MAX VIDEOS
        if (isLimitVideos) {
          timeoutDisplay(() => {
            callbackShowToast(
              `Вы добавили слишком много видео. Сократили до ${Count.MEDIA_VIDEO}`,
            );
          });
        }

        //? MAX PHOTOS
        if (isLimitPhotos) {
          timeoutDisplay(() => {
            callbackShowToast(
              `Вы добавили слишком много фото. Сократили до ${Count.MEDIA_PHOTO}`,
            );
          });
        }

        onChange(
          mediaUtils.pickerToForm({
            uploadVideos,
            uploadImages,
            formVideos,
            formPhotos,
          }),
        );
      })
      .catch((error) => {
        if (error?.errorCode === "permission") {
          callbackShowToast(Response.MEDIA);
          return;
        }
        callbackShowToast(JSON.stringify(error));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    formVideos,
    formPhotos,

    isLoading,
    isMedia,
    isDisabled,

    handleDelete,
    handleAddNew,
  };
};
