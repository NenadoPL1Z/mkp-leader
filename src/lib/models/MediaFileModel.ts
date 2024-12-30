import type { Asset } from "react-native-image-picker/src/types";

export type MediaFileType = "Изображение" | "Видео";
export type MediaPositionType = "server" | "local";

export interface MediaFileModel<T extends MediaFileType = MediaFileType> {
  readonly file_type: T;
  readonly id: string;
  readonly owner_type: "Исполнитель" | "Заказчик";
}

export type MediaFormSource = {
  id: string;
  mediaType: MediaFileType;
};

export type OmitedMediaFile = Omit<MediaFileModel, "id" | "file_type">;
export type MediaPickerAsset = Omit<Asset, "id">;
export type MediaSourceAdditional = OmitedMediaFile | MediaPickerAsset;

export type MediaFileFormModel = {
  type: MediaPositionType;
  source: MediaFormSource & MediaSourceAdditional;
};

export type MediaFilesArr = MediaFileModel[];
