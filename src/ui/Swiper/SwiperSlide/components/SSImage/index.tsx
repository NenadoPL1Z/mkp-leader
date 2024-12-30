import React, { useState } from "react";
import { getImageById } from "@app/lib/api/media/getImageById";
import { StyleSheet, View } from "react-native";
import SpinnerUI from "@app/ui/SpinnerUI";
import { ZIndex } from "@app/theme/zIndex";
import ImageUI from "@app/ui/ImageUI/ImageUI";
import type { MediaFileModel } from "@app/lib/models/MediaFileModel";

const SSImage = ({ id }: MediaFileModel) => {
  const uri = getImageById(id);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const handleEndLoading = () => setIsLoading(false);

  return (
    <View style={styles.root}>
      <ImageUI
        uri={uri}
        resizeMode="contain"
        onLoad={handleEndLoading}
        onError={handleEndLoading}
      />
      {isLoading && (
        <View style={styles.loading}>
          <SpinnerUI size="large" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: "100%",
    position: "relative",

    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    position: "absolute",
    zIndex: ZIndex.OVER,
  },
});

export default React.memo(SSImage);
