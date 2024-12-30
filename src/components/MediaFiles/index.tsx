import React from "react";
import { View, TouchableOpacity } from "react-native";
import ModalFull from "@app/ui/ModalUI/ui/ModalFull";
import Swiper from "@app/ui/Swiper/Swiper";
import { useMediaFiles } from "./useMediaFiles";
import MFImage from "./components/MFImage";
import MFVideo from "./components/MFVideo";
import { styles } from "./styles";
import type { MediaFilesArr } from "@app/lib/models/MediaFileModel";

export type Props = {
  media_files: MediaFilesArr;
};

const MediaFiles = ({ media_files }: Props) => {
  const {
    slideIndex,
    handleChangeIndex,

    isOpen,
    handleOpen,
    handleClose,

    onPress,
  } = useMediaFiles();

  return (
    <>
      <View style={styles.root}>
        {media_files.map((media, index) => (
          <TouchableOpacity
            key={media.id}
            onPress={() => onPress(index)}
            style={styles.item}>
            {media.file_type === "Изображение" && <MFImage {...media} />}
            {media.file_type === "Видео" && <MFVideo {...media} />}
          </TouchableOpacity>
        ))}
      </View>
      <ModalFull
        visible={isOpen}
        onRequestClose={handleOpen}
        onClose={handleClose}>
        <Swiper
          media={media_files}
          currentIndex={slideIndex}
          isNavigation={media_files.length > 1}
          onClose={handleClose}
          onIndexChanged={handleChangeIndex}
        />
      </ModalFull>
    </>
  );
};

export default React.memo(MediaFiles);
