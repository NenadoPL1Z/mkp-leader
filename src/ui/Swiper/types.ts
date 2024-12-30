import type { MediaFilesArr } from "@app/lib/models/MediaFileModel.ts";
import type { PressableProps, ScrollViewProps } from "react-native";

export type SwiperOnChange = (index: number) => void;

export type SwiperProps = {
  media: MediaFilesArr;
  currentIndex?: number;
  onClose: () => void;
  onIndexChanged?: SwiperOnChange;
  isNavigation?: boolean;
  containerProps?: ScrollViewProps;
  slideProps?: PressableProps;
};
