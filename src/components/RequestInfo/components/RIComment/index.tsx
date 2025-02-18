import React from "react";
import { TouchableOpacity, View } from "react-native";
import Typography from "@app/ui/Typography";
import BadgeUI from "@app/ui/BadgeUI";
import { ArrowDownIcon } from "@app/assets/icons/dist";
import { styles } from "./styles.ts";

const RIComment = () => {
  return (
    <TouchableOpacity style={[styles.container, styles.shadow]}>
      <View style={styles.preview}>
        <Typography
          fontSize={16}
          lineHeight={32}
          fontWeight="600">
          Комментарии:
        </Typography>
        <BadgeUI count={1} />
      </View>
      <ArrowDownIcon style={styles.arrowRight} />
    </TouchableOpacity>
  );
};

export default React.memo(RIComment);
