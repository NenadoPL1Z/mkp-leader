import React from "react";
import FastImage from "react-native-fast-image";

import { styles } from "./ImageUI.styles";
import type { ImageUIProps } from "./types";

const ImageUI = ({
  uri,
  height = "100%",
  style,
  ...imageProps
}: ImageUIProps) => {
  return (
    <FastImage
      style={[styles.image, style, { height: height as number }]}
      source={{
        uri,
        priority: FastImage.priority.high,
        cache: FastImage.cacheControl.immutable,
      }}
      resizeMode={imageProps.resizeMode || FastImage.resizeMode.cover}
      {...imageProps}
    />
  );
};

export default React.memo(ImageUI);
