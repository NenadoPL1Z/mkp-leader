import React from "react";
import { View } from "react-native";
import ButtonUI from "@app/ui/ButtonUI";
import Typography from "@app/ui/Typography";
import { Colors } from "@app/theme/colors";
import Scratch from "@app/assets/icons/dist/Scracth";
import MUItem from "@app/components/MediaUpload/components/MUItem";
import { styles } from "./styles";
import { useMediaUpload } from "./useMediaUpload";
import type { MediaUploadProps } from "./types";

const MediaUpload = (props: MediaUploadProps) => {
  const {
    formVideos,
    formPhotos,
    isLoading,
    isMedia,
    isDisabled,
    handleDelete,
    handleAddNew,
  } = useMediaUpload(props);

  return (
    <View>
      {isMedia && (
        <View style={styles.photoList}>
          {[...formVideos, ...formPhotos].map((item) => (
            <MUItem
              key={item.source.id}
              onDelete={handleDelete}
              {...item}
            />
          ))}
        </View>
      )}
      <View style={[styles.button, styles.mb16]}>
        <ButtonUI
          buttonStyle={styles.buttonStyle}
          disabled={isDisabled}
          onPress={handleAddNew}
          loading={isLoading}>
          <Scratch
            style={styles.scratch}
            color={isDisabled ? Colors.GRAY_TEN : Colors.WHITE}
          />
          Добавить фото или видео
        </ButtonUI>
      </View>
      <View>
        <Typography
          color={Colors.GRAY_SEVEN}
          fontSize={13}
          lineHeight={15}
          fontWeight="400">
          Вы можете добавить не более {props.max}х медиафайлов, в том числе одно
          видео.
        </Typography>
      </View>
    </View>
  );
};

export default React.memo(MediaUpload);
