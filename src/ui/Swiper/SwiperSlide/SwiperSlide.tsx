import React from "react";
import { StyleSheet, View } from "react-native";
import SSImage from "@app/ui/Swiper/SwiperSlide/components/SSImage";
import SSVideo from "@app/ui/Swiper/SwiperSlide/components/SSVideo";
import { DEVICE_HEIGHT } from "@app/lib/constants/size";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { MediaFileModel } from "@app/lib/models/MediaFileModel";

type SwiperSlideProps = { isActiveSlide: boolean } & MediaFileModel;

const SwiperSlide = (props: SwiperSlideProps) => {
  const { file_type } = props;
  const isImage = file_type === "Изображение";
  const isVideo = file_type === "Видео";

  const { top, bottom } = useSafeAreaInsets();
  const height = DEVICE_HEIGHT - top - bottom;

  return (
    <View style={[styles.root, { height }]}>
      {isVideo && <SSVideo {...props} />}
      {isImage && <SSImage {...props} />}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {},
});

export default React.memo(SwiperSlide);
