import React from "react";
import { View, StyleSheet } from "react-native";
import ImageUI from "@app/ui/ImageUI/ImageUI";
import { getVideoById } from "@app/lib/api/media/getVideoById";
import { PlayIcon } from "@app/assets/icons/dist";
import { Colors } from "@app/theme/colors";
import type { MediaFileModel } from "@app/lib/models/MediaFileModel";

type Props = MediaFileModel;

const MFVideo = ({ id }: Props) => {
  return (
    <ImageUI
      height={92}
      style={styles.root}
      uri={getVideoById(id)}>
      <View style={styles.play}>
        <PlayIcon />
      </View>
    </ImageUI>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
  },
  play: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.RGBA_BACKDOOR,
    borderRadius: 100,
  },
});

export default React.memo(MFVideo);
