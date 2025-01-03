import React from "react";
import { View } from "react-native";
import Video from "react-native-video";
import SpinnerUI from "@app/ui/SpinnerUI";
import Typography from "@app/ui/Typography";
import { Colors } from "@app/theme/colors";
import ButtonUI from "@app/ui/ButtonUI";
import { useVideoUI } from "./useVideoUI";
import { styles } from "./styles";
import { useVideoProgress } from "./useVideoProgress";
/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
// @ts-ignore
import type { VideoProperties } from "react-native-video";

const VideoUI = (props: VideoProperties) => {
  const { isLoading, hasError, handleLoad, handleError, onRetry } =
    useVideoUI();
  const { duration, progress, handleProgress, handleDuration } =
    useVideoProgress();

  return (
    <>
      {!hasError && (
        <View style={styles.video}>
          <Video
            style={styles.video}
            resizeMode="cover"
            repeat={true}
            controls={true}
            {...props}
            onLoad={({ duration }) => {
              handleLoad();
              handleDuration(duration);
            }}
            onProgress={({ currentTime }) => handleProgress(currentTime)}
            onError={handleError}
          />
          {!hasError && !isLoading && (
            <View style={styles.progress}>
              <Typography
                fontSize={18}
                lineHeight={20}
                color={Colors.WHITE}>
                {`${progress} / ${duration} сек.`}
              </Typography>
            </View>
          )}
        </View>
      )}
      {isLoading && (
        <View style={styles.absolute}>
          <SpinnerUI size="large" />
        </View>
      )}
      {hasError && (
        <View style={[styles.absolute, styles.error]}>
          <Typography
            fontSize={15}
            lineHeight={20}
            color={Colors.WHITE}
            style={styles.titleError}>
            {hasError}
          </Typography>
          <ButtonUI
            variant="text"
            onPress={onRetry}>
            Повторить загрузку
          </ButtonUI>
        </View>
      )}
    </>
  );
};

export default React.memo(VideoUI);
