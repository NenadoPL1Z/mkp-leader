import React from "react";
import { TouchableOpacity, View } from "react-native";
import BasketIcon from "@app/assets/icons/BasketIcon.svg";
import { Colors } from "@app/theme/colors";
import Typography from "@app/ui/Typography";
import ImageUI from "@app/ui/ImageUI/ImageUI";
import { styles } from "./styles";
import { getUri } from "./helpers";
import type { MUItemProps } from "./types";

const MUItem = ({ type, source, onDelete }: MUItemProps) => {
  const uri = getUri(type, source);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.delete}
        onPress={() => onDelete(source.id)}>
        <BasketIcon color={Colors.WHITE} />
      </TouchableOpacity>
      <ImageUI
        resizeMode="cover"
        height={styles.container.height}
        uri={uri}
      />
      <View style={styles.bottom}>
        <Typography
          fontSize={11}
          lineHeight={20}
          color={Colors.WHITE}>
          {source.mediaType}
        </Typography>
      </View>
    </View>
  );
};

export default React.memo(MUItem);
