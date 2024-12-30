import React from "react";
import { getVideoById } from "@app/lib/api/media/getVideoById";
import { View } from "react-native";
import VideoUI from "@app/ui/VideoUI";
import { styles } from "./styles";
import type { MediaFileModel } from "@app/lib/models/MediaFileModel";

type SSVideoProps = { isActiveSlide: boolean } & MediaFileModel;

const SSVideo = ({ id, isActiveSlide }: SSVideoProps) => {
  const uri = getVideoById(id);

  return (
    <View style={styles.root}>
      <VideoUI
        paused={!isActiveSlide}
        source={{
          uri,
          headers: { "Cache-Control": "public, max-age=31536000" },
        }}
      />
    </View>
  );
};

export default React.memo(SSVideo);
